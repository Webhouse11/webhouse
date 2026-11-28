'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Markdown from 'react-markdown';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  BellOff,
  Bot,
  Check,
  CheckCircle2,
  ClipboardList,
  Copy,
  ExternalLink,
  Maximize2,
  MessageSquare,
  Minimize2,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import robotAvatar from '@/src/assets/images/webhouse_robot_avatar_1795846309041.jpg';

interface SourceItem {
  title: string;
  url: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: SourceItem[];
  action?: 'show_enquiry_form' | 'show_whatsapp_handoff' | null;
  recommendedService?: string;
  isError?: boolean;
}

type ViewMode = 'closed' | 'welcome' | 'chat' | 'minimized';

const SESSION_ID_KEY = 'webhouse_ai_session_id';
const WELCOME_STATE_KEY = 'webhouse_ai_welcome_state'; // 'shown' | 'dismissed' | 'engaged'
const MUTE_PREF_KEY = 'webhouse_ai_mute_welcome';
const SESSION_MESSAGES_KEY = 'webhouse_ai_session_messages';

const WELCOME_CHAT_MESSAGE = `**HELLO! WELCOME TO WEBHOUSE.** 👋

I'm **Webhouse AI**, your intelligent digital assistant.

How can we be of help to you today? What would you love to know about our services, products, digital solutions or business systems?

Tell me what you need. I'm here to help you find the right solution. 😊`;

const QUICK_SUGGESTIONS = [
  '🌐 I Need a Website.',
  '🚀 Explore Your Services.',
  '🤖 I Need AI Automation.',
  '🎨 I Need Branding and Design.',
  '📈 I Want Digital Marketing.',
  '💬 I Want to Start a Project.',
];

const SERVICE_OPTIONS = [
  'Website Development',
  'E-Commerce Website',
  'BrandBox (Branding & Identity)',
  'PostPilot (Social Media & Ads)',
  'AI Business Automation',
  'AI & Bulk Video Production',
  'Custom SaaS / Web App',
  'DigitAcademy Training',
  'General Consultation',
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function createWelcomeMessage(): ChatMessage {
  return {
    id: 'welcome',
    role: 'assistant',
    content: WELCOME_CHAT_MESSAGE,
    timestamp: formatTime(new Date()),
  };
}

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `wh_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function RoboticAvatar({
  size = 'md',
  animated = true,
}: {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  const dims =
    size === 'lg'
      ? 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl'
      : size === 'md'
      ? 'w-10 h-10 rounded-2xl'
      : 'w-8 h-8 rounded-xl';

  return (
    <div
      className={`relative ${dims} shrink-0 overflow-hidden bg-slate-900 border border-sky-400/50 shadow-[0_0_24px_-4px_rgba(56,189,248,0.5)] flex items-center justify-center`}
    >
      {animated && (
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.24),transparent_72%)] pointer-events-none z-10"
        />
      )}
      {!imgError ? (
        <Image
          src={robotAvatar}
          alt="Webhouse AI Robotic Assistant"
          fill
          sizes={size === 'lg' ? '96px' : size === 'md' ? '40px' : '32px'}
          className="object-cover object-top"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          priority={size === 'lg'}
        />
      ) : (
        <Bot className={size === 'lg' ? 'w-10 h-10 text-sky-300' : 'w-5 h-5 text-sky-300'} />
      )}
    </div>
  );
}

export function WebhouseAIChat() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('closed');
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Inline Enquiry Form State
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquiryError, setEnquiryError] = useState<string | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState<{
    referenceCode: string;
    message: string;
  } | null>(null);
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Website Development');
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [preferredContact, setPreferredContact] = useState('WhatsApp');
  const [projectDescription, setProjectDescription] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const viewModeRef = useRef<ViewMode>('closed');
  const welcomeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  // 1. Hydrate session and persisted conversation once on mount
  useEffect(() => {
    setMounted(true);

    let activeSessionId = '';
    try {
      const savedSession = window.localStorage.getItem(SESSION_ID_KEY);
      if (savedSession && /^[a-zA-Z0-9_-]{8,80}$/.test(savedSession)) {
        activeSessionId = savedSession;
      } else {
        activeSessionId = generateSessionId();
        window.localStorage.setItem(SESSION_ID_KEY, activeSessionId);
      }
    } catch {
      activeSessionId = generateSessionId();
    }
    setSessionId(activeSessionId);

    let restoredMessages: ChatMessage[] | null = null;
    try {
      const rawMessages = window.sessionStorage.getItem(SESSION_MESSAGES_KEY);
      if (rawMessages) {
        const parsed = JSON.parse(rawMessages) as {
          sessionId?: string;
          messages?: ChatMessage[];
        };
        if (
          parsed?.sessionId === activeSessionId &&
          Array.isArray(parsed.messages) &&
          parsed.messages.length > 0
        ) {
          restoredMessages = parsed.messages;
        }
      }
    } catch {
      // ignore corrupted storage
    }

    setMessages(restoredMessages ?? [createWelcomeMessage()]);
  }, []);

  // 2. Wait for full document load + 1000ms before triggering the left-to-center robotic entrance
  useEffect(() => {
    if (!mounted || pathname?.startsWith('/admin')) return;
    if (welcomeTimerRef.current || viewModeRef.current !== 'closed') return;

    let mutedPermanently = false;
    let sessionWelcomeState = '';
    try {
      mutedPermanently = window.localStorage.getItem(MUTE_PREF_KEY) === 'true';
      sessionWelcomeState = window.sessionStorage.getItem(WELCOME_STATE_KEY) || '';
    } catch {
      // ignore storage errors
    }

    const alreadyHandledThisSession =
      sessionWelcomeState === 'dismissed' ||
      sessionWelcomeState === 'engaged' ||
      sessionWelcomeState === 'shown';

    if (mutedPermanently || alreadyHandledThisSession) return;

    let cancelled = false;

    const scheduleEntrance = () => {
      if (cancelled || welcomeTimerRef.current) return;
      welcomeTimerRef.current = setTimeout(() => {
        welcomeTimerRef.current = null;
        if (cancelled || viewModeRef.current !== 'closed') return;
        try {
          const latestState = window.sessionStorage.getItem(WELCOME_STATE_KEY);
          if (
            latestState === 'dismissed' ||
            latestState === 'engaged' ||
            latestState === 'shown'
          ) {
            return;
          }
          window.sessionStorage.setItem(WELCOME_STATE_KEY, 'shown');
        } catch {
          // ignore
        }
        setViewMode('welcome');
      }, 1000); // 800-1200ms after full load
    };

    const onWindowLoad = () => {
      scheduleEntrance();
    };

    if (document.readyState === 'complete') {
      scheduleEntrance();
    } else {
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', onWindowLoad);
      if (welcomeTimerRef.current) {
        clearTimeout(welcomeTimerRef.current);
        welcomeTimerRef.current = null;
      }
    };
  }, [mounted, pathname]);

  // 3. Persist active messages across page navigation within the browsing session
  useEffect(() => {
    if (!mounted || !sessionId || messages.length === 0) return;
    try {
      window.sessionStorage.setItem(
        SESSION_MESSAGES_KEY,
        JSON.stringify({ sessionId, messages: messages.slice(-30) })
      );
    } catch {
      // ignore quota limits
    }
  }, [mounted, sessionId, messages]);

  // 4. Scroll feed smoothly on new messages
  useEffect(() => {
    if (viewMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [messages, viewMode, showEnquiryForm, enquirySuccess, prefersReducedMotion]);

  // 5. Escape key closes welcome/chat cleanly
  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && viewModeRef.current === 'welcome') {
        try {
          window.sessionStorage.setItem(WELCOME_STATE_KEY, 'dismissed');
        } catch {
          // ignore
        }
        setViewMode('closed');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mounted]);

  if (!mounted || pathname?.startsWith('/admin')) {
    return null;
  }

  const cancelWelcomeTimer = () => {
    if (welcomeTimerRef.current) {
      clearTimeout(welcomeTimerRef.current);
      welcomeTimerRef.current = null;
    }
  };

  const markSessionState = (state: 'shown' | 'dismissed' | 'engaged') => {
    try {
      window.sessionStorage.setItem(WELCOME_STATE_KEY, state);
    } catch {
      // ignore
    }
  };

  const transitionToRightChat = (focusInput = true) => {
    cancelWelcomeTimer();
    markSessionState('engaged');
    setViewMode('chat');
    setTimeout(() => {
      const el = inputRef.current;
      if (!el) return;
      if (focusInput || document.activeElement !== el) {
        el.focus();
        const len = el.value.length;
        try {
          el.setSelectionRange(len, len);
        } catch {
          // ignore unsupported selection range
        }
      }
    }, 50);
  };

  const handleDismissWelcome = (muteForever = false) => {
    cancelWelcomeTimer();
    markSessionState('dismissed');
    if (muteForever) {
      try {
        window.localStorage.setItem(MUTE_PREF_KEY, 'true');
      } catch {
        // ignore
      }
    }
    setViewMode('closed');
  };

  const handleOpenFromLauncher = () => {
    cancelWelcomeTimer();
    markSessionState('engaged');
    setViewMode('chat');
    setTimeout(() => inputRef.current?.focus(), 70);
  };

  const handleCloseChat = () => {
    cancelWelcomeTimer();
    markSessionState('dismissed');
    setViewMode('closed');
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000);
    } catch {
      // ignore clipboard restrictions
    }
  };

  const handleResetChat = () => {
    if (isStreaming) return;
    const nextId = generateSessionId();
    try {
      window.localStorage.setItem(SESSION_ID_KEY, nextId);
      window.sessionStorage.removeItem(SESSION_MESSAGES_KEY);
    } catch {
      // ignore
    }
    setSessionId(nextId);
    setMessages([createWelcomeMessage()]);
    setShowEnquiryForm(false);
    setEnquirySuccess(null);
    setEnquiryError(null);
  };

  const buildHistoryForServer = (currentMessages: ChatMessage[]) => {
    const clean = currentMessages.filter(
      (m) => m.id !== 'welcome' && !m.isError && m.content.trim().length > 0
    );
    const pairs: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    for (let i = 0; i < clean.length - 1; i++) {
      if (clean[i].role === 'user' && clean[i + 1].role === 'assistant') {
        pairs.push(
          { role: 'user', content: clean[i].content },
          { role: 'assistant', content: clean[i + 1].content }
        );
        i++;
      }
    }
    return pairs.slice(-10);
  };

  const sendMessage = async (textOverride?: string) => {
    const trimmed = (textOverride ?? input).trim();
    if (!trimmed || isStreaming) return;

    if (viewMode !== 'chat') {
      cancelWelcomeTimer();
      markSessionState('engaged');
      setViewMode('chat');
    }

    const userMsgId = `u_${Date.now()}`;
    const assistantMsgId = `a_${Date.now() + 1}`;
    const nowTime = formatTime(new Date());

    const historyForServer = buildHistoryForServer(messages);

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', content: trimmed, timestamp: nowTime },
      { id: assistantMsgId, role: 'assistant', content: '', timestamp: nowTime },
    ]);
    if (!textOverride) setInput('');
    setIsStreaming(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
          history: historyForServer,
        }),
      });

      if (!response.ok) {
        let errMessage = 'Unable to reach Webhouse AI right now.';
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errData = await response.json().catch(() => null);
          if (errData?.error) errMessage = errData.error;
        } else if (response.status === 404) {
          errMessage = 'Webhouse AI endpoint is updating. Please refresh the page and try again.';
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, content: errMessage, isError: true } : m
          )
        );
        setIsStreaming(false);
        return;
      }

      if (!response.body) {
        throw new Error('No response stream received.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const processEventBlock = (block: string) => {
        const lines = block.split('\n');
        let eventName = 'message';
        const dataLines: string[] = [];
        for (const line of lines) {
          if (line.startsWith('event:')) {
            eventName = line.slice(6).trim();
          } else if (line.startsWith('data:')) {
            dataLines.push(line.slice(5).trim());
          }
        }
        const dataStr = dataLines.join('\n');
        if (!dataStr) return;

        let parsed: Record<string, unknown> | null = null;
        try {
          parsed = JSON.parse(dataStr);
        } catch {
          return;
        }
        if (!parsed) return;

        if (eventName === 'chunk' && typeof parsed.text === 'string') {
          const chunkText = parsed.text;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, content: m.content + chunkText } : m
            )
          );
        } else if (eventName === 'meta') {
          const sources = Array.isArray(parsed.sources)
            ? (parsed.sources as SourceItem[])
            : undefined;
          const action =
            parsed.action === 'show_enquiry_form' || parsed.action === 'show_whatsapp_handoff'
              ? parsed.action
              : null;
          const recommendedService =
            typeof parsed.recommendedService === 'string' ? parsed.recommendedService : undefined;

          if (typeof parsed.sessionId === 'string' && parsed.sessionId) {
            setSessionId(parsed.sessionId);
          }

          if (action === 'show_enquiry_form') {
            setShowEnquiryForm(true);
            setEnquirySuccess(null);
            if (
              recommendedService &&
              SERVICE_OPTIONS.some((s) => recommendedService.includes(s.split(' ')[0]))
            ) {
              const matched = SERVICE_OPTIONS.find((s) =>
                recommendedService.includes(s.split(' ')[0])
              );
              if (matched) setServiceInterest(matched);
            }
          }

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, sources, action, recommendedService } : m
            )
          );
        } else if (eventName === 'error' && typeof parsed.error === 'string') {
          const errText = parsed.error;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? { ...m, content: m.content ? `${m.content}\n\n${errText}` : errText, isError: true }
                : m
            )
          );
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';
        for (const evt of events) {
          if (evt.trim()) processEventBlock(evt);
        }
      }
      if (buffer.trim()) {
        processEventBlock(buffer);
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content:
                  m.content ||
                  'Unable to reach Webhouse AI right now. Please check your connection or message our team on WhatsApp at +234 815 246 9749.',
                isError: true,
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryError(null);

    if (!consentGiven) {
      setEnquiryError('Please tick the consent box so our team can contact you.');
      return;
    }

    setEnquirySubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          fullName,
          businessName,
          email,
          phone,
          serviceInterest,
          estimatedBudget,
          preferredContact,
          projectDescription,
          consentGiven: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEnquiryError(data?.error || 'Could not submit your enquiry. Please check all fields.');
        return;
      }

      setEnquirySuccess({
        referenceCode: data.referenceCode,
        message: data.message,
      });
      setMessages((prev) => [
        ...prev,
        {
          id: `enq_${Date.now()}`,
          role: 'assistant',
          content: `Thank you so much, ${fullName}! 🎉 Your project enquiry (**${data.referenceCode}**) for **${serviceInterest}** has been recorded ✅. Our team will follow up with you via **${preferredContact}** shortly! 🚀`,
          timestamp: formatTime(new Date()),
        },
      ]);
      setFullName('');
      setBusinessName('');
      setEmail('');
      setPhone('');
      setEstimatedBudget('');
      setProjectDescription('');
      setConsentGiven(false);
    } catch {
      setEnquiryError('Network error submitting enquiry. Please try again or reach us on WhatsApp.');
    } finally {
      setEnquirySubmitting(false);
    }
  };

  const panelOpen = viewMode !== 'closed';
  const isWelcomeMode = viewMode === 'welcome';
  const isChatMode = viewMode === 'chat';
  const isMinimizedMode = viewMode === 'minimized';

  const stageAlignmentClass = isWelcomeMode
    ? 'items-center justify-center p-3 sm:p-6'
    : isChatMode
    ? 'items-end justify-center sm:items-end sm:justify-end sm:p-6'
    : 'items-end justify-end p-4 sm:p-6';

  return (
    <>
      {/* Full-viewport choreographed stage (zero horizontal overflow, zero layout shift) */}
      <div
        className={`fixed inset-0 z-[110] pointer-events-none overflow-hidden flex ${stageAlignmentClass}`}
      >
        {/* Subtle Glass Backdrop Overlay during Central Welcome */}
        <AnimatePresence>
          {isWelcomeMode && (
            <motion.div
              key="webhouse-welcome-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.05 : 0.4 }}
              onClick={() => handleDismissWelcome(false)}
              aria-hidden="true"
              className="fixed inset-0 bg-slate-950/45 backdrop-blur-[4px] pointer-events-auto"
            />
          )}
        </AnimatePresence>

        {/* Single Persistent Morphing Assistant Container (slides from left -> center -> transforms to right) */}
        <AnimatePresence>
          {panelOpen && (
            <motion.section
              key="webhouse-ai-shell"
              layout={!prefersReducedMotion}
              role="dialog"
              aria-modal={isWelcomeMode ? 'true' : undefined}
              aria-label="Webhouse AI Digital Assistant"
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : isWelcomeMode
                  ? { opacity: 0, x: '-100vw', scale: 0.94 }
                  : { opacity: 0, x: 48, scale: 0.96 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, x: 0, scale: 1 }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: 40, scale: 0.94 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : {
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                      layout: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
                    }
              }
              className={`relative z-10 pointer-events-auto flex flex-col overflow-hidden backdrop-blur-xl ${
                isWelcomeMode
                  ? 'w-full max-w-[560px] max-h-[min(88dvh,720px)] rounded-3xl bg-slate-950/92 text-white border border-sky-400/30 shadow-[0_0_70px_-15px_rgba(56,189,248,0.42),0_32px_80px_-20px_rgba(2,6,23,0.75)]'
                  : isChatMode
                  ? 'w-full sm:w-[430px] md:w-[450px] h-[90dvh] sm:h-[min(660px,calc(100dvh-7.5rem))] rounded-t-3xl sm:rounded-3xl bg-white/95 text-slate-900 border border-sky-200/80 shadow-[0_0_50px_-15px_rgba(56,189,248,0.28),0_25px_70px_-15px_rgba(15,23,42,0.35)]'
                  : 'w-[calc(100vw-2rem)] sm:w-[360px] rounded-2xl bg-slate-950/95 text-white border border-sky-400/35 shadow-[0_18px_45px_-12px_rgba(15,23,42,0.55)]'
              }`}
            >
              {/* Subtle illuminated top rim glow */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/80 to-transparent pointer-events-none"
              />

              {/* Persistent Morphing Header */}
              <motion.div
                layout={!prefersReducedMotion ? 'position' : false}
                className={`px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 shrink-0 ${
                  isWelcomeMode
                    ? 'border-b border-white/10 bg-slate-900/60'
                    : 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-b border-sky-400/20'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <RoboticAvatar size="md" animated={!prefersReducedMotion} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-sky-300 uppercase flex items-center gap-1.5 truncate">
                        <span
                          className={`w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)] shrink-0 ${
                            prefersReducedMotion ? '' : 'animate-pulse'
                          }`}
                        />
                        WEBHOUSE AI — SYSTEM ONLINE
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 truncate mt-0.5">
                      {isWelcomeMode
                        ? 'Digital Receptionist · Webhouse Media'
                        : 'Intelligent Digital Assistant · Webhouse Media'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {isChatMode && (
                    <>
                      <button
                        type="button"
                        onClick={() => setShowEnquiryForm((v) => !v)}
                        title="Start a Project Enquiry"
                        aria-label="Start a Project Enquiry"
                        className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <ClipboardList className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleResetChat}
                        disabled={isStreaming}
                        title="Clear Conversation"
                        aria-label="Clear Conversation"
                        className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {!isWelcomeMode && (
                    <button
                      type="button"
                      onClick={() => setViewMode(isMinimizedMode ? 'chat' : 'minimized')}
                      title={isMinimizedMode ? 'Expand Chat' : 'Minimize Chat'}
                      aria-label={isMinimizedMode ? 'Expand Chat' : 'Minimize Chat'}
                      className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {isMinimizedMode ? (
                        <Maximize2 className="w-4 h-4" />
                      ) : (
                        <Minimize2 className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  {isWelcomeMode ? (
                    <button
                      type="button"
                      onClick={() => handleDismissWelcome(false)}
                      aria-label="Cancel welcome experience"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold transition-colors border border-white/10"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCloseChat}
                      title="Close Assistant"
                      aria-label="Close Assistant"
                      className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Content Body */}
              {!isMinimizedMode && (
                <>
                  {isWelcomeMode ? (
                    /* CENTRAL ROBOTIC WELCOME CONSOLE */
                    <div
                      key="welcome-body"
                      className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 sm:py-6 space-y-5 relative"
                    >
                      {/* Subtle electric-blue ambient radial behind robot */}
                      <div
                        aria-hidden="true"
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-40 bg-sky-500/15 blur-3xl rounded-full pointer-events-none"
                      />

                      {/* 3D Robotic Showcase + Headline */}
                      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                        <div className="relative shrink-0">
                          <RoboticAvatar size="lg" animated={!prefersReducedMotion} />
                          <span
                            aria-hidden="true"
                            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-lg border-2 border-slate-950"
                          >
                            <Sparkles className="w-3 h-3" />
                          </span>
                        </div>

                        <div className="space-y-2 min-w-0">
                          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                            HELLO! WELCOME TO WEBHOUSE.
                          </h2>
                          <p className="text-sm font-medium text-sky-200">
                            I&apos;m Webhouse AI, your intelligent digital assistant.
                          </p>
                          <p className="text-[13px] text-slate-300 leading-relaxed">
                            How can we be of help to you today?
                          </p>
                        </div>
                      </div>

                      {/* Core Reception Message */}
                      <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 space-y-2 text-[13.5px] leading-relaxed text-slate-200">
                        <p>
                          What would you love to know about our services, products, digital solutions or business systems?
                        </p>
                        <p className="text-sky-200 font-medium">
                          Tell me what you need. I&apos;m here to help you find the right solution.
                        </p>
                      </div>

                      {/* Quick Launch Prompts */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          Quick Ways To Start
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {QUICK_SUGGESTIONS.map((q) => (
                            <button
                              key={q}
                              type="button"
                              onClick={() => sendMessage(q)}
                              className="text-left text-xs font-medium px-3 py-2.5 min-h-[42px] rounded-xl bg-white/[0.05] hover:bg-sky-500/15 border border-white/10 hover:border-sky-400/50 text-slate-100 transition-all"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Brand Ethos & Mute Option */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-400 border-t border-white/10">
                        <span className="font-mono tracking-wide text-slate-400">
                          WE DON&apos;T JUST OFFER SERVICES — WE DESIGN SYSTEMS.
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDismissWelcome(true)}
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-sky-300 transition-colors py-1"
                        >
                          <BellOff className="w-3 h-3" />
                          <span>Don&apos;t auto-show again</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* RIGHT-SIDE FULL CONVERSATION WORKSPACE */
                    <div
                      key="chat-body"
                      className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/95"
                    >
                      {messages.map((msg) => {
                        const isUser = msg.role === 'user';
                        return (
                          <motion.div
                            key={msg.id}
                            initial={
                              prefersReducedMotion
                                ? { opacity: 1 }
                                : { opacity: 0, y: 8 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            className={`flex gap-2.5 ${
                              isUser ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {!isUser && (
                              <div className="mt-0.5">
                                <RoboticAvatar size="sm" animated={false} />
                              </div>
                            )}

                            <div
                              className={`max-w-[85%] space-y-2 ${
                                isUser ? 'items-end flex flex-col' : ''
                              }`}
                            >
                              <div
                                className={`rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-sm ${
                                  isUser
                                    ? 'bg-slate-900 text-white rounded-tr-sm border border-sky-400/20'
                                    : msg.isError
                                    ? 'bg-amber-50 border border-amber-200 text-amber-950 rounded-tl-sm'
                                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-sm'
                                }`}
                              >
                                {!isUser && !msg.content && isStreaming ? (
                                  <div className="flex items-center gap-2 py-1">
                                    <div className="flex items-center gap-1">
                                      <span
                                        className={`w-2 h-2 rounded-full bg-sky-500 ${
                                          prefersReducedMotion ? '' : 'animate-bounce'
                                        }`}
                                      />
                                      <span
                                        className={`w-2 h-2 rounded-full bg-sky-500 ${
                                          prefersReducedMotion ? '' : 'animate-bounce'
                                        }`}
                                        style={{ animationDelay: '150ms' }}
                                      />
                                      <span
                                        className={`w-2 h-2 rounded-full bg-sky-500 ${
                                          prefersReducedMotion ? '' : 'animate-bounce'
                                        }`}
                                        style={{ animationDelay: '300ms' }}
                                      />
                                    </div>
                                    <span className="text-xs text-slate-400 font-medium">
                                      Webhouse AI is thinking...
                                    </span>
                                  </div>
                                ) : isUser ? (
                                  <p className="whitespace-pre-wrap">{msg.content}</p>
                                ) : (
                                  <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-slate-900 prose-a:text-sky-700">
                                    <Markdown>{msg.content}</Markdown>
                                  </div>
                                )}

                                {!isUser && msg.content && (
                                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] text-slate-400">
                                    <span>{msg.timestamp}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopy(msg.id, msg.content)}
                                      className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-700 transition-colors"
                                    >
                                      {copiedId === msg.id ? (
                                        <>
                                          <Check className="w-3 h-3 text-emerald-600" />
                                          <span className="text-emerald-600">Copied</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" />
                                          <span>Copy</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Verified Knowledge Sources */}
                              {!isUser && msg.sources && msg.sources.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  {msg.sources.map((src, idx) =>
                                    src.url.startsWith('http') ? (
                                      <a
                                        key={`${msg.id}-src-${idx}`}
                                        href={src.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-sky-500 hover:text-sky-700 transition-colors"
                                      >
                                        <span className="truncate max-w-[160px]">{src.title}</span>
                                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                      </a>
                                    ) : (
                                      <Link
                                        key={`${msg.id}-src-${idx}`}
                                        href={src.url}
                                        className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-sky-500 hover:text-sky-700 transition-colors"
                                      >
                                        <span className="truncate max-w-[160px]">{src.title}</span>
                                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}

                              {/* WhatsApp Handoff Card */}
                              {!isUser && msg.action === 'show_whatsapp_handoff' && (
                                <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-xs text-slate-700 space-y-2">
                                  <p className="font-semibold text-slate-950">
                                    Connect with the Webhouse Team
                                  </p>
                                  <p className="text-slate-600 leading-relaxed">
                                    You can message us directly on WhatsApp or continue chatting with Webhouse AI here.
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-1">
                                    <a
                                      href={`https://wa.me/2348152469749?text=${encodeURIComponent(
                                        'Hello Webhouse Media, I was chatting with Webhouse AI and would like to speak with your team.'
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-white font-semibold hover:brightness-95 transition"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5" />
                                      WhatsApp (+234 815 246 9749)
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => setShowEnquiryForm(true)}
                                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-sky-300 text-slate-900 font-semibold hover:bg-sky-100/60 transition"
                                    >
                                      <ClipboardList className="w-3.5 h-3.5" />
                                      Leave Project Brief
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {isUser && (
                              <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                                <User className="w-4 h-4" />
                              </div>
                            )}
                          </motion.div>
                        );
                      })}

                      {/* Quick Suggestions when conversation is fresh in right-side chat */}
                      {messages.length === 1 && !showEnquiryForm && (
                        <div className="space-y-2 pt-1">
                          <p className="text-[11px] font-semibold text-slate-500 px-1">
                            Suggested Prompts
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {QUICK_SUGGESTIONS.map((q) => (
                              <button
                                key={q}
                                type="button"
                                onClick={() => sendMessage(q)}
                                className="text-left text-xs font-medium px-3 py-2 min-h-[40px] rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-sky-500 hover:text-sky-700 hover:bg-sky-50/60 transition-colors"
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Inline Consent-Gated Project Enquiry Form */}
                      {showEnquiryForm && (
                        <div className="bg-white border border-sky-200 rounded-2xl p-4 shadow-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                              <ClipboardList className="w-4 h-4 text-sky-600" />
                              Project Enquiry Form
                            </h4>
                            <button
                              type="button"
                              onClick={() => setShowEnquiryForm(false)}
                              className="text-slate-400 hover:text-slate-700 p-1"
                              aria-label="Close Enquiry Form"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {enquirySuccess ? (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-2 text-xs text-emerald-950">
                              <div className="flex items-center gap-2 font-bold text-emerald-800">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                Enquiry Recorded ({enquirySuccess.referenceCode})
                              </div>
                              <p>{enquirySuccess.message}</p>
                              <a
                                href={`https://wa.me/2348152469749?text=${encodeURIComponent(
                                  `Hello Webhouse Media, I just submitted enquiry ${enquirySuccess.referenceCode}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-semibold"
                              >
                                Follow up on WhatsApp
                              </a>
                            </div>
                          ) : (
                            <form onSubmit={handleEnquirySubmit} className="space-y-2.5 text-xs">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  required
                                  placeholder="Full Name *"
                                  value={fullName}
                                  onChange={(e) => setFullName(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                                />
                                <input
                                  type="text"
                                  placeholder="Business Name"
                                  value={businessName}
                                  onChange={(e) => setBusinessName(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="email"
                                  required
                                  placeholder="Email Address *"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                                />
                                <input
                                  type="tel"
                                  required
                                  placeholder="WhatsApp / Phone *"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <select
                                  value={serviceInterest}
                                  onChange={(e) => setServiceInterest(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-sky-500"
                                >
                                  {SERVICE_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  type="text"
                                  placeholder="Estimated Budget (e.g. ₦250k)"
                                  value={estimatedBudget}
                                  onChange={(e) => setEstimatedBudget(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                                />
                              </div>
                              <select
                                value={preferredContact}
                                onChange={(e) => setPreferredContact(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-sky-500"
                              >
                                <option value="WhatsApp">Preferred Contact: WhatsApp</option>
                                <option value="Email">Preferred Contact: Email</option>
                                <option value="Phone Call">Preferred Contact: Phone Call</option>
                              </select>
                              <textarea
                                required
                                rows={2}
                                placeholder="Briefly describe your project goals or questions *"
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                              />
                              <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={consentGiven}
                                  onChange={(e) => setConsentGiven(e.target.checked)}
                                  className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                />
                                <span>
                                  I consent to Webhouse Media storing my enquiry details and contacting me regarding this request.
                                </span>
                              </label>
                              {enquiryError && (
                                <p className="text-[11px] text-red-600 font-medium">
                                  {enquiryError}
                                </p>
                              )}
                              <button
                                type="submit"
                                disabled={enquirySubmitting}
                                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors disabled:opacity-60"
                              >
                                {enquirySubmitting ? 'Submitting Enquiry...' : 'Submit Project Enquiry'}
                              </button>
                            </form>
                          )}
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  )}

                  {/* Shared Persistent Input Bar (never destroyed across welcome -> right-side transformation) */}
                  <motion.form
                    key="webhouse-shared-input-form"
                    layout={!prefersReducedMotion ? 'position' : false}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (input.trim()) {
                        sendMessage();
                      } else if (isWelcomeMode) {
                        transitionToRightChat(true);
                      }
                    }}
                    className={`p-3.5 sm:p-4 shrink-0 pb-[max(0.85rem,env(safe-area-inset-bottom))] ${
                      isWelcomeMode
                        ? 'bg-slate-900/70 border-t border-white/10'
                        : 'bg-white border-t border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onFocus={() => {
                          if (isWelcomeMode) {
                            transitionToRightChat(false);
                          }
                        }}
                        onChange={(e) => {
                          setInput(e.target.value);
                          if (isWelcomeMode) {
                            transitionToRightChat(false);
                          }
                        }}
                        placeholder="Ask me anything about Webhouse..."
                        disabled={isStreaming}
                        maxLength={2000}
                        aria-label="Ask me anything about Webhouse"
                        className={`flex-1 min-h-[46px] px-4 py-2.5 text-sm rounded-2xl border focus:outline-none transition-all ${
                          isWelcomeMode
                            ? 'bg-white/10 border-sky-400/35 text-white placeholder:text-slate-300 focus:bg-white/15 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/25'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15'
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={isStreaming || !input.trim()}
                        className="min-w-[46px] min-h-[46px] flex items-center justify-center rounded-2xl bg-sky-600 hover:bg-sky-500 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-[0_6px_18px_-4px_rgba(2,132,199,0.6)]"
                        aria-label="Send message"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.form>
                </>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Floating Bottom-Right Robotic AI Launcher */}
      <AnimatePresence>
        {!panelOpen && (
          <motion.button
            key="webhouse-ai-robot-launcher"
            type="button"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.85, y: 12 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.85, y: 8 }
            }
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={handleOpenFromLauncher}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[110] flex items-center gap-2.5 pl-2 pr-4 py-2 min-h-[52px] rounded-full bg-slate-950 hover:bg-slate-900 text-white shadow-[0_14px_38px_-8px_rgba(2,132,199,0.5),0_10px_25px_-10px_rgba(15,23,42,0.7)] border border-sky-400/45 transition-colors group"
            aria-label="Open Webhouse AI Assistant"
          >
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.12, 0.45] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full border border-sky-400/60 pointer-events-none"
              />
            )}
            <div className="relative">
              <RoboticAvatar size="sm" animated={false} />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-sky-400 border-2 border-slate-950" />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap leading-none">
                Webhouse AI
              </span>
              <span className="text-[10px] font-mono text-sky-300 leading-tight mt-0.5 hidden sm:block">
                SYSTEM ONLINE
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
