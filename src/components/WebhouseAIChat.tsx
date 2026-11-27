'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Markdown from 'react-markdown';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  BellOff,
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
  Smile,
  User,
  X,
} from 'lucide-react';

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

const WELCOME_PARAGRAPHS = [
  'Hello! 👋 Welcome to Webhouse Media and Marketing Solution!',
  "It's wonderful to have you here.",
  'What would you love to know about us? Are you looking for a professional website, business automation, digital marketing, branding, AI solutions or something special for your business?',
  "I'm Webhouse AI, your intelligent digital assistant.",
  "Tell me what you need, and let's explore how Webhouse can help you achieve it. 😊",
];

const WELCOME_CHAT_MESSAGE = `${WELCOME_PARAGRAPHS.join('\n\n')}\n\n**How can we be of help to you today?**`;

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

function emitPanelState(isPanelVisible: boolean) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('webhouse-ai-panel-state', { detail: { open: isPanelVisible } })
    );
  }
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
    emitPanelState(viewMode === 'welcome' || viewMode === 'chat');
  }, [viewMode]);

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

    // Restore conversation messages for this browsing session if available
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
      // ignore corrupted session storage
    }

    setMessages(restoredMessages ?? [createWelcomeMessage()]);
  }, []);

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

    if (!mutedPermanently && !alreadyHandledThisSession) {
      welcomeTimerRef.current = setTimeout(() => {
        welcomeTimerRef.current = null;
        if (viewModeRef.current === 'closed') {
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
        }
      }, 2000);
    }

    return () => {
      if (welcomeTimerRef.current) {
        clearTimeout(welcomeTimerRef.current);
        welcomeTimerRef.current = null;
      }
    };
  }, [mounted, pathname]);

  // Save messages to sessionStorage so navigation / reload preserves conversation
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

  useEffect(() => {
    if (viewMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [messages, viewMode, showEnquiryForm, enquirySuccess, prefersReducedMotion]);

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

  const transitionToFullChat = (focusInput = true) => {
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
          // ignore selection range errors on unsupported input types
        }
      }
    }, 30);
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
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const handleCloseChat = () => {
    cancelWelcomeTimer();
    // Once user closes, keep welcome dismissed for rest of browsing session
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

    // Ensure seamless promotion into full chat if invoked from welcome view
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

  const morphTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 320, damping: 30, mass: 0.85 };

  return (
    <div
      className={`fixed z-[110] flex flex-col items-end pointer-events-none ${
        isChatMode
          ? 'inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6'
      }`}
    >
      <AnimatePresence mode="wait">
        {panelOpen && (
          <motion.section
            key="webhouse-ai-shell"
            layout={!prefersReducedMotion}
            role="dialog"
            aria-label="Webhouse AI Digital Receptionist"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.94 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.94 }
            }
            transition={morphTransition}
            style={{ transformOrigin: 'bottom right' }}
            className={`pointer-events-auto bg-white shadow-[0_24px_60px_-15px_rgba(15,23,42,0.28)] border border-slate-200/90 overflow-hidden flex flex-col ${
              isChatMode
                ? 'w-full sm:w-[420px] h-[min(88dvh,640px)] sm:h-[min(640px,calc(100dvh-4.5rem))] rounded-t-3xl sm:rounded-3xl'
                : isWelcomeMode
                ? 'w-[calc(100vw-2rem)] sm:w-[400px] max-h-[min(82dvh,600px)] rounded-3xl'
                : 'w-[calc(100vw-2rem)] sm:w-[360px] rounded-2xl'
            }`}
          >
            {/* Unified Brand Header */}
            <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between gap-2 shrink-0 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md ring-2 ring-emerald-400/25">
                  <Smile className="w-5 h-5 text-white" />
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900"
                    title="Online and ready to help"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm tracking-tight truncate">Webhouse AI</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 whitespace-nowrap">
                      <span
                        className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${
                          prefersReducedMotion ? '' : 'animate-pulse'
                        }`}
                      />
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate">
                    {isWelcomeMode
                      ? 'Digital Receptionist · Webhouse Media'
                      : 'We design systems · Webhouse Media'}
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
                      title="New Conversation"
                      aria-label="New Conversation"
                      className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </>
                )}

                {!isWelcomeMode && (
                  <button
                    type="button"
                    onClick={() =>
                      setViewMode(isMinimizedMode ? 'chat' : 'minimized')
                    }
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

                <button
                  type="button"
                  onClick={isWelcomeMode ? () => handleDismissWelcome(false) : handleCloseChat}
                  title={isWelcomeMode ? 'Dismiss welcome' : 'Close Assistant'}
                  aria-label={isWelcomeMode ? 'Dismiss welcome' : 'Close Assistant'}
                  className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body Area: Smoothly morphs between Welcome Invitation & Full Conversation */}
            {!isMinimizedMode && (
              <>
                {isWelcomeMode ? (
                  <motion.div
                    key="welcome-body"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-gradient-to-b from-slate-50 to-white"
                  >
                    {/* Greeting Card */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-sm space-y-2 text-[13px] leading-relaxed text-slate-700">
                      {WELCOME_PARAGRAPHS.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className={
                            idx === 0
                              ? 'font-semibold text-slate-900 text-[13.5px]'
                              : ''
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                      <p className="pt-1 font-semibold text-emerald-700">
                        How can we be of help to you today?
                      </p>
                    </div>

                    {/* Quick Suggestions */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold text-slate-500 px-0.5">
                        Quick ways to get started
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {QUICK_SUGGESTIONS.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => sendMessage(suggestion)}
                            className="text-left text-[12.5px] font-medium px-3 py-2.5 min-h-[42px] rounded-xl bg-white border border-slate-200 text-slate-800 hover:border-emerald-500 hover:text-emerald-800 hover:bg-emerald-50/60 active:scale-[0.99] transition-all shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Brand Ethos & Optional Mute */}
                    <div className="flex items-center justify-between gap-2 pt-0.5 px-0.5 text-[11px] text-slate-400">
                      <span className="italic truncate">
                        We don&apos;t just offer services — we design systems.
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDismissWelcome(true)}
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-700 whitespace-nowrap shrink-0 transition-colors"
                        title="Do not show this welcome automatically again"
                      >
                        <BellOff className="w-3 h-3" />
                        <span>Mute greeting</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Full Conversation Message Feed */
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50">
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
                            <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <Smile className="w-4 h-4" />
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
                                  ? 'bg-slate-900 text-white rounded-tr-sm'
                                  : msg.isError
                                  ? 'bg-amber-50 border border-amber-200 text-amber-950 rounded-tl-sm'
                                  : 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-sm'
                              }`}
                            >
                              {!isUser && !msg.content && isStreaming ? (
                                <div className="flex items-center gap-2 py-1">
                                  <div className="flex items-center gap-1">
                                    <span
                                      className={`w-2 h-2 rounded-full bg-emerald-500 ${
                                        prefersReducedMotion ? '' : 'animate-bounce'
                                      }`}
                                    />
                                    <span
                                      className={`w-2 h-2 rounded-full bg-emerald-500 ${
                                        prefersReducedMotion ? '' : 'animate-bounce'
                                      }`}
                                      style={{ animationDelay: '150ms' }}
                                    />
                                    <span
                                      className={`w-2 h-2 rounded-full bg-emerald-500 ${
                                        prefersReducedMotion ? '' : 'animate-bounce'
                                      }`}
                                      style={{ animationDelay: '300ms' }}
                                    />
                                  </div>
                                  <span className="text-xs text-slate-400 font-medium">
                                    Webhouse AI is typing...
                                  </span>
                                </div>
                              ) : isUser ? (
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                              ) : (
                                <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-slate-900 prose-a:text-emerald-700">
                                  <Markdown>{msg.content}</Markdown>
                                </div>
                              )}

                              {/* Timestamp & Copy */}
                              {!isUser && msg.content && (
                                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] text-slate-400">
                                  <span>{msg.timestamp}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopy(msg.id, msg.content)}
                                    className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-700 transition-colors"
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

                            {/* Verified Sources */}
                            {!isUser && msg.sources && msg.sources.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {msg.sources.map((src, idx) =>
                                  src.url.startsWith('http') ? (
                                    <a
                                      key={`${msg.id}-src-${idx}`}
                                      href={src.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-700 transition-colors"
                                    >
                                      <span className="truncate max-w-[160px]">{src.title}</span>
                                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                    </a>
                                  ) : (
                                    <Link
                                      key={`${msg.id}-src-${idx}`}
                                      href={src.url}
                                      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-700 transition-colors"
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
                              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-700 space-y-2">
                                <p className="font-semibold text-emerald-950">
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
                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-emerald-300 text-emerald-900 font-semibold hover:bg-emerald-100/60 transition"
                                  >
                                    <ClipboardList className="w-3.5 h-3.5" />
                                    Leave Project Brief
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          {isUser && (
                            <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}

                    {/* Quick Suggestions when conversation is fresh in chat view */}
                    {messages.length === 1 && !showEnquiryForm && (
                      <div className="space-y-2 pt-1">
                        <p className="text-[11px] font-semibold text-slate-500 px-1">
                          Quick ways to get started
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {QUICK_SUGGESTIONS.map((q) => (
                            <button
                              key={q}
                              type="button"
                              onClick={() => sendMessage(q)}
                              className="text-left text-xs font-medium px-3 py-2 min-h-[40px] rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Inline Consent-Gated Project Enquiry Form */}
                    {showEnquiryForm && (
                      <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            <ClipboardList className="w-4 h-4 text-emerald-600" />
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
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                              />
                              <input
                                type="text"
                                placeholder="Business Name"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="email"
                                required
                                placeholder="Email Address *"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                              />
                              <input
                                type="tel"
                                required
                                placeholder="WhatsApp / Phone *"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <select
                                value={serviceInterest}
                                onChange={(e) => setServiceInterest(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
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
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                            <select
                              value={preferredContact}
                              onChange={(e) => setPreferredContact(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
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
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                            />
                            <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={consentGiven}
                                onChange={(e) => setConsentGiven(e.target.checked)}
                                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                              />
                              <span>
                                I consent to Webhouse Media storing my enquiry details and contacting me regarding this request.
                              </span>
                            </label>
                            {enquiryError && (
                              <p className="text-[11px] text-red-600 font-medium">{enquiryError}</p>
                            )}
                            <button
                              type="submit"
                              disabled={enquirySubmitting}
                              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors disabled:opacity-60"
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

                {/* Shared Persistent Question Input Footer (preserves text & focus smoothly during expansion) */}
                <form
                  key="webhouse-shared-input-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                      sendMessage();
                    } else if (isWelcomeMode) {
                      transitionToFullChat(true);
                    }
                  }}
                  className="p-3 bg-white border-t border-slate-200/90 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
                >
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onFocus={() => {
                        if (isWelcomeMode) {
                          transitionToFullChat(false);
                        }
                      }}
                      onChange={(e) => {
                        setInput(e.target.value);
                        if (isWelcomeMode) {
                          transitionToFullChat(false);
                        }
                      }}
                      placeholder="Type your question here or ask me anything..."
                      disabled={isStreaming}
                      maxLength={2000}
                      aria-label="Ask Webhouse AI a question"
                      className="flex-1 min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-colors text-slate-900 placeholder:text-slate-400"
                    />
                    <button
                      type="submit"
                      disabled={isStreaming || !input.trim()}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Persistent Floating Webhouse AI Button (visible whenever welcome/chat is closed) */}
      <AnimatePresence>
        {!panelOpen && (
          <motion.button
            key="webhouse-ai-launcher"
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
            className="pointer-events-auto relative flex items-center gap-2.5 px-4 py-3 min-h-[48px] rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-[0_14px_34px_-8px_rgba(15,23,42,0.5)] border border-emerald-500/40 transition-colors group"
            aria-label="Open Webhouse AI Assistant"
          >
            {/* Subtle, non-aggressive breathing halo */}
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.1, 0.35] }}
                transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full border border-emerald-400/50 pointer-events-none"
              />
            )}
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 shrink-0 shadow-inner">
              <Smile className="w-4 h-4 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-slate-900" />
            </div>
            <span className="text-sm font-bold tracking-tight whitespace-nowrap">
              Ask Webhouse AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
