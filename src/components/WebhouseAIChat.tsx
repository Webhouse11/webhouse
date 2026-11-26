'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Markdown from 'react-markdown';
import { AnimatePresence, motion } from 'motion/react';
import {
  Bot,
  Check,
  CheckCircle2,
  ClipboardList,
  Copy,
  ExternalLink,
  MessageSquare,
  Minimize2,
  RotateCcw,
  Send,
  Sparkles,
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

const WELCOME_MESSAGE =
  "Hello! 👋 Welcome to Webhouse Media and Marketing Solution! ✨ I'm Webhouse AI, your friendly digital assistant. I can help you explore our services 🚀, understand our solutions 💡, get project guidance, and find the right digital solution for your business. What would you like to know today? 😊";

const SUGGESTED_QUESTIONS = [
  'What services does Webhouse offer?',
  'How much does a business website cost?',
  'Tell me about BrandBox and PostPilot',
  'Can you automate my business with AI?',
  'Tell me about DigitAcademy courses',
  'How do I start a project with Webhouse?',
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
    content: WELCOME_MESSAGE,
    timestamp: '',
  };
}

export function WebhouseAIChat() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([createWelcomeMessage()]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Inline Enquiry Form State
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquiryError, setEnquiryError] = useState<string | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState<{ referenceCode: string; message: string } | null>(null);
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

  useEffect(() => {
    setMounted(true);
    try {
      const savedSession = window.localStorage.getItem('webhouse_ai_session_id');
      if (savedSession && /^[a-zA-Z0-9_-]{8,80}$/.test(savedSession)) {
        setSessionId(savedSession);
      } else {
        const nextId =
          typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : `wh_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
        window.localStorage.setItem('webhouse_ai_session_id', nextId);
        setSessionId(nextId);
      }
    } catch {
      setSessionId(`wh_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`);
    }
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: WELCOME_MESSAGE,
        timestamp: formatTime(new Date()),
      },
    ]);
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, showEnquiryForm, enquirySuccess]);

  if (!mounted || pathname?.startsWith('/admin')) {
    return null;
  }

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
    const nextId =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `wh_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    try {
      window.localStorage.setItem('webhouse_ai_session_id', nextId);
    } catch {
      // ignore
    }
    setSessionId(nextId);
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: WELCOME_MESSAGE,
        timestamp: formatTime(new Date()),
      },
    ]);
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
          const sources = Array.isArray(parsed.sources) ? (parsed.sources as SourceItem[]) : undefined;
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
            if (recommendedService && SERVICE_OPTIONS.some((s) => recommendedService.includes(s.split(' ')[0]))) {
              const matched = SERVICE_OPTIONS.find((s) => recommendedService.includes(s.split(' ')[0]));
              if (matched) setServiceInterest(matched);
            }
          }

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? { ...m, sources, action, recommendedService }
                : m
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

  return (
    <div className="fixed bottom-6 right-6 z-[110] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={`mb-3 w-[calc(100vw-2rem)] sm:w-[410px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col ${
              isMinimized ? 'h-auto' : 'h-[min(620px,calc(100vh-7.5rem))]'
            }`}
          >
            {/* Header */}
            <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm tracking-tight truncate">Webhouse AI</h3>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Ready
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate">
                    Digital Systems Consultant · Webhouse Lab
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsMinimized(false);
                    setShowEnquiryForm((v) => !v);
                  }}
                  title="Start a Project Enquiry"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ClipboardList className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetChat}
                  disabled={isStreaming}
                  title="New Conversation"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized((v) => !v)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Message Feed */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50">
                  {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isUser && (
                          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}

                        <div className={`max-w-[85%] space-y-2 ${isUser ? 'items-end flex flex-col' : ''}`}>
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
                              <div className="flex items-center gap-1.5 py-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                                <span
                                  className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                                  style={{ animationDelay: '150ms' }}
                                />
                                <span
                                  className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                                  style={{ animationDelay: '300ms' }}
                                />
                              </div>
                            ) : isUser ? (
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                            ) : (
                              <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-slate-900 prose-a:text-emerald-700">
                                <Markdown>{msg.content}</Markdown>
                              </div>
                            )}

                            {/* Sources & Timestamp */}
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
                                Live representative availability is not confirmed inside this chat. You can message us directly on WhatsApp or continue chatting with Webhouse AI here.
                              </p>
                              <div className="flex flex-wrap gap-2 pt-1">
                                <a
                                  href={`https://wa.me/2348152469749?text=${encodeURIComponent(
                                    'Hello Webhouse Media, I was chatting with Webhouse AI and would like to speak with your team.'
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-semibold hover:brightness-95 transition"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  WhatsApp (+234 815 246 9749)
                                </a>
                                <button
                                  type="button"
                                  onClick={() => setShowEnquiryForm(true)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 font-semibold hover:bg-emerald-100/60 transition"
                                >
                                  <ClipboardList className="w-3.5 h-3.5" />
                                  Leave Project Brief
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {isUser && (
                          <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Quick Suggestions when conversation is fresh */}
                  {messages.length === 1 && !showEnquiryForm && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1">
                        Suggested Questions
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {SUGGESTED_QUESTIONS.map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => sendMessage(q)}
                            className="text-left text-xs px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/40 transition-colors"
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
                          className="text-slate-400 hover:text-slate-700"
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

                {/* Input Footer */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="p-3 bg-white border-t border-slate-200 shrink-0"
                >
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask Webhouse AI about services, pricing, training..."
                      disabled={isStreaming}
                      maxLength={2000}
                      className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isStreaming || !input.trim()}
                      className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          if (isOpen && isMinimized) {
            setIsMinimized(false);
          } else {
            setIsOpen((v) => !v);
            setIsMinimized(false);
          }
        }}
        className="flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-2xl border border-emerald-500/40 transition-colors"
        aria-label="Toggle Webhouse AI Assistant"
      >
        <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
        </div>
        <span className="text-sm font-bold tracking-tight">Ask Webhouse AI</span>
      </motion.button>
    </div>
  );
}
