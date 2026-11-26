'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Database,
  Edit3,
  HelpCircle,
  KeyRound,
  LogOut,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';

type AdminRole = 'super_admin' | 'editor' | 'viewer';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
  is_active?: number;
  created_at?: string;
}

interface AnalyticsSummary {
  totalConversations: number;
  totalMessages: number;
  totalEnquiries: number;
  pendingUnanswered: number;
  failedResponses: number;
  rateLimitedCount: number;
  avgLatencyMs: number;
  totalPromptTokens: number;
  totalOutputTokens: number;
  kbTotal: number;
  kbIndexed: number;
}

interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  source_url: string;
  content: string;
  tags: string[];
  hasEmbedding: boolean;
  is_active: boolean;
  updated_by?: string;
  updated_at?: string;
}

interface EnquiryItem {
  id: number;
  session_id: string | null;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  service_interest: string;
  project_description: string;
  estimated_budget: string;
  preferred_contact: string;
  status: string;
  notes: string;
  created_at: string;
}

interface UnansweredItem {
  id: number;
  session_id: string;
  question: string;
  assistant_response: string;
  status: string;
  created_at: string;
}

interface SessionItem {
  id: string;
  visitor_name: string | null;
  detected_intent: string | null;
  recommended_service: string | null;
  message_count: number;
  created_at: string;
  updated_at: string;
}

interface ChatTranscriptMsg {
  id: number;
  role: string;
  content: string;
  answered: number;
  latency_ms: number | null;
  created_at: string;
}

type AdminTab = 'overview' | 'knowledge' | 'enquiries' | 'unanswered' | 'conversations' | 'users';

const KB_CATEGORIES = [
  'general',
  'websites',
  'ecommerce',
  'branding',
  'marketing',
  'ai-automation',
  'video',
  'academy',
  'faq',
  'contact',
];

export default function AdminDashboardPage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [initialized, setInitialized] = useState(true);
  const [envPasscodeConfigured, setEnvPasscodeConfigured] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);

  // Auth form state
  const [authMode, setAuthMode] = useState<'login' | 'passcode'>('login');
  const [setupName, setSetupName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authPasscode, setAuthPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [busyMessage, setBusyMessage] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Data states
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [requestedServices, setRequestedServices] = useState<Array<{ service: string; count: number }>>([]);
  const [topQuestions, setTopQuestions] = useState<Array<{ question: string; count: number }>>([]);
  const [recentErrors, setRecentErrors] = useState<Array<{ id: number; endpoint: string; model: string; status: string; error_message: string; created_at: string }>>([]);
  const [unanswered, setUnanswered] = useState<UnansweredItem[]>([]);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [selectedSession, setSelectedSession] = useState<{ session: SessionItem | null; messages: ChatTranscriptMsg[] } | null>(null);

  const [kbItems, setKbItems] = useState<KnowledgeItem[]>([]);
  const [kbSearch, setKbSearch] = useState('');
  const [kbCategoryFilter, setKbCategoryFilter] = useState('all');
  const [editingKb, setEditingKb] = useState<KnowledgeItem | null>(null);
  const [showAddKb, setShowAddKb] = useState(false);
  const [kbForm, setKbForm] = useState({
    title: '',
    category: 'general',
    source_url: '/services',
    content: '',
    tags: '',
    chunkDocument: true,
  });

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [enquiryFilter, setEnquiryFilter] = useState('all');

  const [resolvingItem, setResolvingItem] = useState<UnansweredItem | null>(null);
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState('faq');

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor' as AdminRole,
  });

  const showNotice = (type: 'ok' | 'err', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4500);
  };

  useEffect(() => {
    fetch('/api/admin/auth')
      .then((r) => r.json())
      .then((data) => {
        setInitialized(Boolean(data.initialized));
        setEnvPasscodeConfigured(Boolean(data.envPasscodeConfigured));
      })
      .catch(() => {})
      .finally(() => setCheckingAuth(false));
  }, []);

  const authFetch = useCallback(
    async (url: string, init?: RequestInit) => {
      if (!token) throw new Error('Not authenticated');
      const headers = new Headers(init?.headers);
      headers.set('Authorization', `Bearer ${token}`);
      if (init?.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      return fetch(url, { ...init, headers });
    },
    [token]
  );

  const loadDashboardData = useCallback(async () => {
    if (!token || !user) return;
    try {
      const [analyticsRes, kbRes, enqRes] = await Promise.all([
        authFetch('/api/admin/analytics'),
        authFetch(
          `/api/admin/knowledge?category=${encodeURIComponent(kbCategoryFilter)}&q=${encodeURIComponent(kbSearch)}`
        ),
        authFetch(`/api/admin/enquiries?status=${encodeURIComponent(enquiryFilter)}`),
      ]);

      if (analyticsRes.ok) {
        const aData = await analyticsRes.json();
        setSummary(aData.summary);
        setRequestedServices(aData.requestedServices || []);
        setTopQuestions(aData.topUserQuestions || []);
        setUnanswered(aData.unansweredQuestions || []);
        setSessions(aData.recentSessions || []);
        setRecentErrors(aData.recentErrors || []);
      }

      if (kbRes.ok) {
        const kData = await kbRes.json();
        setKbItems(kData.items || []);
      }

      if (enqRes.ok) {
        const eData = await enqRes.json();
        setEnquiries(eData.enquiries || []);
      }

      if (user.role === 'super_admin') {
        const uRes = await authFetch('/api/admin/users');
        if (uRes.ok) {
          const uData = await uRes.json();
          setAdminUsers(uData.users || []);
        }
      }
    } catch {
      showNotice('err', 'Failed to refresh dashboard data.');
    }
  }, [token, user, authFetch, kbCategoryFilter, kbSearch, enquiryFilter]);

  useEffect(() => {
    if (token && user) {
      loadDashboardData();
    }
  }, [token, user, loadDashboardData]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthBusy(true);
    try {
      const payload = !initialized
        ? { action: 'setup', name: setupName, email: authEmail, password: authPassword }
        : authMode === 'passcode'
        ? { action: 'login', passcode: authPasscode }
        : { action: 'login', email: authEmail, password: authPassword };

      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Authentication failed.');
        return;
      }
      setInitialized(true);
      setToken(data.token);
      setUser(data.user);
      setAuthPassword('');
      setAuthPasscode('');
    } catch {
      setAuthError('Network error while authenticating.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleReindexAll = async () => {
    setBusyMessage('Re-indexing vector embeddings...');
    try {
      const res = await authFetch('/api/admin/knowledge/reindex', {
        method: 'POST',
        body: JSON.stringify({ forceAll: true }),
      });
      const data = await res.json();
      if (res.ok) {
        showNotice('ok', `Indexed ${data.indexed} of ${data.total} active entries.`);
        await loadDashboardData();
      } else {
        showNotice('err', data.error || 'Re-indexing failed.');
      }
    } catch {
      showNotice('err', 'Re-indexing failed.');
    } finally {
      setBusyMessage(null);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const baseTitle = file.name.replace(/\.[^.]+$/, '');
      setKbForm((prev) => ({
        ...prev,
        title: prev.title || baseTitle,
        content: text.slice(0, 40000),
        chunkDocument: true,
      }));
      setShowAddKb(true);
      showNotice('ok', `Loaded "${file.name}". Review and save to index into Webhouse AI.`);
    } catch {
      showNotice('err', 'Could not read uploaded file.');
    } finally {
      e.target.value = '';
    }
  };

  const handleSaveKnowledge = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusyMessage('Saving & indexing knowledge...');
    try {
      const tagsArray = kbForm.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const res = editingKb
        ? await authFetch('/api/admin/knowledge', {
            method: 'PATCH',
            body: JSON.stringify({
              id: editingKb.id,
              title: kbForm.title,
              category: kbForm.category,
              source_url: kbForm.source_url,
              content: kbForm.content,
              tags: tagsArray,
            }),
          })
        : await authFetch('/api/admin/knowledge', {
            method: 'POST',
            body: JSON.stringify({
              title: kbForm.title,
              category: kbForm.category,
              source_url: kbForm.source_url,
              content: kbForm.content,
              tags: tagsArray,
              chunkDocument: kbForm.chunkDocument,
            }),
          });

      const data = await res.json();
      if (!res.ok) {
        showNotice('err', data.error || 'Failed to save entry.');
        return;
      }

      showNotice('ok', editingKb ? 'Knowledge entry updated.' : 'Knowledge entry added & indexed.');
      setShowAddKb(false);
      setEditingKb(null);
      setKbForm({
        title: '',
        category: 'general',
        source_url: '/services',
        content: '',
        tags: '',
        chunkDocument: true,
      });
      await loadDashboardData();
    } catch {
      showNotice('err', 'Failed to save knowledge entry.');
    } finally {
      setBusyMessage(null);
    }
  };

  const handleDeleteKnowledge = async (id: string) => {
    setBusyMessage('Removing entry...');
    try {
      const res = await authFetch(`/api/admin/knowledge?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showNotice('ok', 'Knowledge entry deleted.');
        await loadDashboardData();
      } else {
        const d = await res.json();
        showNotice('err', d.error || 'Delete failed.');
      }
    } finally {
      setBusyMessage(null);
    }
  };

  const handleUpdateEnquiry = async (id: number, status: string, notes: string) => {
    try {
      const res = await authFetch('/api/admin/enquiries', {
        method: 'PATCH',
        body: JSON.stringify({ id, status, notes }),
      });
      if (res.ok) {
        showNotice('ok', `Enquiry #WH-${id} updated to "${status}".`);
        await loadDashboardData();
      } else {
        const d = await res.json();
        showNotice('err', d.error || 'Update failed.');
      }
    } catch {
      showNotice('err', 'Failed to update enquiry.');
    }
  };

  const handleDeleteEnquiry = async (id: number) => {
    try {
      const res = await authFetch(`/api/admin/enquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotice('ok', 'Enquiry removed.');
        await loadDashboardData();
      }
    } catch {
      showNotice('err', 'Failed to delete enquiry.');
    }
  };

  const handleResolveUnanswered = async (addToKnowledge: boolean) => {
    if (!resolvingItem) return;
    setBusyMessage(addToKnowledge ? 'Publishing FAQ to Knowledge Base...' : 'Marking resolved...');
    try {
      const res = await authFetch('/api/admin/unanswered', {
        method: 'PATCH',
        body: JSON.stringify({
          id: resolvingItem.id,
          status: 'resolved',
          addToKnowledge,
          kbTitle: `FAQ: ${resolvingItem.question.slice(0, 140)}`,
          kbCategory: faqCategory,
          kbContent: `Visitor Question: ${resolvingItem.question}\n\nVerified Answer: ${faqAnswer}`,
        }),
      });
      if (res.ok) {
        showNotice('ok', addToKnowledge ? 'FAQ saved & indexed for Webhouse AI.' : 'Marked resolved.');
        setResolvingItem(null);
        setFaqAnswer('');
        await loadDashboardData();
      } else {
        const d = await res.json();
        showNotice('err', d.error || 'Failed to update item.');
      }
    } finally {
      setBusyMessage(null);
    }
  };

  const handleViewSession = async (sessionId: string) => {
    try {
      const res = await authFetch(`/api/admin/analytics?sessionId=${encodeURIComponent(sessionId)}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedSession(data);
      }
    } catch {
      showNotice('err', 'Failed to load conversation.');
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const res = await authFetch(`/api/admin/analytics?sessionId=${encodeURIComponent(sessionId)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showNotice('ok', 'Conversation deleted.');
        if (selectedSession?.session?.id === sessionId) setSelectedSession(null);
        await loadDashboardData();
      }
    } catch {
      showNotice('err', 'Failed to delete session.');
    }
  };

  const handleCreateAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authFetch('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify(newUserForm),
      });
      const d = await res.json();
      if (res.ok) {
        showNotice('ok', `Admin user ${newUserForm.email} created.`);
        setNewUserForm({ name: '', email: '', password: '', role: 'editor' });
        await loadDashboardData();
      } else {
        showNotice('err', d.error || 'Failed to create user.');
      }
    } catch {
      showNotice('err', 'Failed to create user.');
    }
  };

  const handleToggleUserActive = async (target: AdminUser) => {
    try {
      const res = await authFetch('/api/admin/users', {
        method: 'PATCH',
        body: JSON.stringify({ id: target.id, is_active: target.is_active !== 1 }),
      });
      if (res.ok) {
        await loadDashboardData();
      } else {
        const d = await res.json();
        showNotice('err', d.error || 'Action failed.');
      }
    } catch {
      showNotice('err', 'Failed to update user.');
    }
  };

  const canEdit = user?.role === 'super_admin' || user?.role === 'editor';
  const isSuperAdmin = user?.role === 'super_admin';

  if (checkingAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-500">Loading Webhouse AI Admin Console...</p>
      </div>
    );
  }

  if (!token || !user) {
    return (
      <div className="min-h-[80vh] bg-slate-50 py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {!initialized ? 'Initialize Webhouse AI Admin' : 'Webhouse AI Admin Sign In'}
              </h1>
              <p className="text-xs text-slate-500">
                {!initialized
                  ? 'Create the primary Super Admin account to secure the dashboard.'
                  : 'Authorized Webhouse team members only.'}
              </p>
            </div>
          </div>

          {initialized && envPasscodeConfigured && (
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 rounded-lg transition ${
                  authMode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Email & Password
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('passcode')}
                className={`flex-1 py-2 rounded-lg transition ${
                  authMode === 'passcode' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Admin Passcode
              </button>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {!initialized && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={setupName}
                  onChange={(e) => setSetupName(e.target.value)}
                  placeholder="e.g. Oluranti Clement"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {(!initialized || authMode === 'login') && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="admin@webhousemedia.com.ng"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password {!initialized && '(min 8 characters)'}
                  </label>
                  <input
                    type="password"
                    required
                    minLength={!initialized ? 8 : 1}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </>
            )}

            {initialized && authMode === 'passcode' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Server Admin Passcode
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={authPasscode}
                    onChange={(e) => setAuthPasscode(e.target.value)}
                    placeholder="Enter ADMIN_PASSCODE"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {authError && (
              <div className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authBusy}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors disabled:opacity-60"
            >
              {authBusy
                ? 'Authenticating...'
                : !initialized
                ? 'Create Super Admin & Enter'
                : 'Sign In to Console'}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-emerald-700 font-medium">
              Return to Webhouse Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Webhouse AI Control Center</h1>
              <p className="text-xs text-slate-300">
                Signed in as <span className="font-semibold text-white">{user.name}</span> ({user.role})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {busyMessage && (
              <span className="text-xs text-emerald-300 font-medium px-3 py-1 bg-white/5 rounded-lg">
                {busyMessage}
              </span>
            )}
            <button
              type="button"
              onClick={loadDashboardData}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => {
                setToken(null);
                setUser(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div
            className={`px-4 py-3 rounded-xl text-sm font-medium border ${
              toast.type === 'ok'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            {toast.text}
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'overview', label: 'Analytics & Health', icon: BarChart3 },
            { id: 'knowledge', label: `Knowledge Base (${kbItems.length})`, icon: BookOpen },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: ClipboardList },
            {
              id: 'unanswered',
              label: `Unanswered (${unanswered.filter((u) => u.status === 'pending').length})`,
              icon: HelpCircle,
            },
            { id: 'conversations', label: `Conversations (${sessions.length})`, icon: MessageSquare },
            ...(isSuperAdmin ? [{ id: 'users', label: 'Admin Users', icon: Users }] : []),
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-500 hover:text-emerald-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && summary && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Chat Sessions', value: summary.totalConversations },
                { label: 'Visitor Questions', value: summary.totalMessages },
                { label: 'Captured Enquiries', value: summary.totalEnquiries },
                { label: 'Pending Unanswered', value: summary.pendingUnanswered },
                { label: 'Avg AI Latency', value: `${summary.avgLatencyMs} ms` },
                { label: 'Vector Indexed KB', value: `${summary.kbIndexed} / ${summary.kbTotal}` },
                { label: 'AI Errors Logged', value: summary.failedResponses },
                {
                  label: 'Tokens Used (In / Out)',
                  value: `${summary.totalPromptTokens.toLocaleString()} / ${summary.totalOutputTokens.toLocaleString()}`,
                },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  Most Requested Services
                </h2>
                {requestedServices.length === 0 ? (
                  <p className="text-xs text-slate-400">No chat service data recorded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {requestedServices.map((s) => (
                      <div key={s.service} className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700">{s.service}</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          {s.count} chats
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900 mb-4">Top Visitor Questions</h2>
                {topQuestions.length === 0 ? (
                  <p className="text-xs text-slate-400">No questions logged yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {topQuestions.map((q, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between gap-3 text-xs border-b border-slate-100 pb-2 last:border-0"
                      >
                        <span className="text-slate-700 line-clamp-2">{q.question}</span>
                        <span className="shrink-0 font-bold text-slate-500">×{q.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {recentErrors.length > 0 && (
              <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm">
                <h2 className="text-sm font-bold text-amber-950 mb-3">Recent AI API / Rate-Limit Events</h2>
                <div className="space-y-2 text-xs">
                  {recentErrors.map((err) => (
                    <div key={err.id} className="flex flex-wrap justify-between gap-2 bg-amber-50/70 p-2.5 rounded-xl">
                      <span className="font-semibold text-amber-900">
                        [{err.status}] {err.model}
                      </span>
                      <span className="text-slate-700 flex-1">{err.error_message}</span>
                      <span className="text-slate-400">{err.created_at}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* KNOWLEDGE BASE TAB */}
        {activeTab === 'knowledge' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[240px]">
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={kbSearch}
                    onChange={(e) => setKbSearch(e.target.value)}
                    placeholder="Search services, pricing, courses..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <select
                  value={kbCategoryFilter}
                  onChange={(e) => setKbCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="all">All Categories</option>
                  {KB_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {canEdit && (
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 text-xs font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    Upload Document
                    <input
                      type="file"
                      accept=".txt,.md,.csv,.json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleReindexAll}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 text-xs font-semibold"
                  >
                    <Database className="w-3.5 h-3.5 text-emerald-600" />
                    Re-index Vector DB
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingKb(null);
                      setKbForm({
                        title: '',
                        category: 'general',
                        source_url: '/services',
                        content: '',
                        tags: '',
                        chunkDocument: true,
                      });
                      setShowAddKb(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Knowledge
                  </button>
                </div>
              )}
            </div>

            {showAddKb && canEdit && (
              <form
                onSubmit={handleSaveKnowledge}
                className="bg-white rounded-2xl border border-emerald-200 p-5 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    {editingKb ? 'Edit Knowledge Entry' : 'Add Knowledge / Document to Webhouse AI'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddKb(false);
                      setEditingKb(null);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Title (e.g. Website Maintenance Plan)"
                    value={kbForm.title}
                    onChange={(e) => setKbForm((p) => ({ ...p, title: e.target.value }))}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                  <select
                    value={kbForm.category}
                    onChange={(e) => setKbForm((p) => ({ ...p, category: e.target.value }))}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    {KB_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Source URL (e.g. /pricing)"
                    value={kbForm.source_url}
                    onChange={(e) => setKbForm((p) => ({ ...p, source_url: e.target.value }))}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
                <textarea
                  required
                  rows={5}
                  placeholder="Verified business information, prices, timelines, deliverables, or FAQ answer..."
                  value={kbForm.content}
                  onChange={(e) => setKbForm((p) => ({ ...p, content: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <input
                    type="text"
                    placeholder="Comma-separated tags (e.g. website, pricing, lagos)"
                    value={kbForm.tags}
                    onChange={(e) => setKbForm((p) => ({ ...p, tags: e.target.value }))}
                    className="flex-1 min-w-[220px] px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                  {!editingKb && (
                    <label className="flex items-center gap-2 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={kbForm.chunkDocument}
                        onChange={(e) => setKbForm((p) => ({ ...p, chunkDocument: e.target.checked }))}
                      />
                      Auto-chunk long text
                    </label>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  >
                    {editingKb ? 'Save Changes & Re-index' : 'Save & Index Entry'}
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-3">
              {kbItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          item.hasEmbedding
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {item.hasEmbedding ? 'Vector Indexed' : 'Keyword Only'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 whitespace-pre-line line-clamp-3">
                      {item.content}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Source: {item.source_url} {item.updated_by ? `· Updated by ${item.updated_by}` : ''}
                    </p>
                  </div>

                  {canEdit && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingKb(item);
                          setKbForm({
                            title: item.title,
                            category: item.category,
                            source_url: item.source_url,
                            content: item.content,
                            tags: item.tags.join(', '),
                            chunkDocument: false,
                          });
                          setShowAddKb(true);
                        }}
                        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-700"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteKnowledge(item.id)}
                        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:border-red-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4">
              <h2 className="text-sm font-bold text-slate-900">Captured Project Enquiries</h2>
              <select
                value={enquiryFilter}
                onChange={(e) => setEnquiryFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {enquiries.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                No enquiries match this filter yet.
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            #WH-{enq.id}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">
                            {enq.full_name} {enq.business_name ? `(${enq.business_name})` : ''}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {enq.email} · {enq.phone} · Preferred: {enq.preferred_contact}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${enq.full_name}, following up from Webhouse Media on your ${enq.service_interest} enquiry (#WH-${enq.id}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold"
                        >
                          WhatsApp Client
                        </a>
                        {canEdit && (
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateEnquiry(enq.id, e.target.value, enq.notes || '')}
                            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-semibold"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                            <option value="archived">Archived</option>
                          </select>
                        )}
                        {isSuperAdmin && (
                          <button
                            type="button"
                            onClick={() => handleDeleteEnquiry(enq.id)}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1">
                      <p>
                        <strong className="text-slate-700">Service:</strong> {enq.service_interest}{' '}
                        {enq.estimated_budget ? `· Budget: ${enq.estimated_budget}` : ''}
                      </p>
                      <p className="text-slate-700 whitespace-pre-wrap">{enq.project_description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* UNANSWERED QUESTIONS TAB */}
        {activeTab === 'unanswered' && (
          <div className="space-y-4">
            {resolvingItem && canEdit && (
              <div className="bg-white rounded-2xl border border-emerald-200 p-5 space-y-3 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900">
                  Convert to Verified Knowledge Base FAQ
                </h3>
                <p className="text-xs text-slate-600">
                  <strong>Visitor Asked:</strong> {resolvingItem.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <select
                    value={faqCategory}
                    onChange={(e) => setFaqCategory(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    {KB_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  rows={3}
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Write the verified Webhouse answer here..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleResolveUnanswered(true)}
                    disabled={!faqAnswer.trim()}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold disabled:opacity-50"
                  >
                    Save & Index FAQ
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolveUnanswered(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    Mark Resolved Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setResolvingItem(null)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {unanswered.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                  No unanswered visitor questions logged.
                </div>
              ) : (
                unanswered.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            item.status === 'pending'
                              ? 'bg-amber-50 text-amber-800'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="text-[11px] text-slate-400">{item.created_at}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">{item.question}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{item.assistant_response}</p>
                    </div>
                    {canEdit && item.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => {
                          setResolvingItem(item);
                          setFaqAnswer('');
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shrink-0"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Resolve / Add FAQ
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* CONVERSATIONS TAB */}
        {activeTab === 'conversations' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 max-h-[600px] overflow-y-auto">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
                Recent Visitor Sessions
              </h3>
              {sessions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleViewSession(s.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    selectedSession?.session?.id === s.id
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {s.visitor_name || `Session ${s.id.slice(0, 8)}`}
                    </span>
                    <span className="text-[11px] text-slate-500">{s.message_count} msgs</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    {s.recommended_service || 'General Discovery'}
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 min-h-[400px]">
              {selectedSession ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {selectedSession.session?.visitor_name ||
                          `Session ${selectedSession.session?.id.slice(0, 12)}`}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Intent: {selectedSession.session?.detected_intent} · Service:{' '}
                        {selectedSession.session?.recommended_service}
                      </p>
                    </div>
                    {isSuperAdmin && selectedSession.session && (
                      <button
                        type="button"
                        onClick={() => handleDeleteSession(selectedSession.session!.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                    {selectedSession.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`p-3 rounded-xl text-xs ${
                          m.role === 'user'
                            ? 'bg-slate-900 text-white ml-8'
                            : 'bg-slate-50 border border-slate-200 text-slate-800 mr-8'
                        }`}
                      >
                        <div className="flex items-center justify-between opacity-70 mb-1 text-[10px]">
                          <span className="uppercase font-bold">{m.role}</span>
                          <span>
                            {m.latency_ms ? `${m.latency_ms}ms · ` : ''}
                            {m.created_at}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  Select a session on the left to inspect its transcript.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ADMIN USERS TAB (SUPER ADMIN ONLY) */}
        {activeTab === 'users' && isSuperAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form
              onSubmit={handleCreateAdminUser}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 h-fit"
            >
              <h3 className="text-sm font-bold text-slate-900">Invite Team Member</h3>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={newUserForm.name}
                onChange={(e) => setNewUserForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={newUserForm.email}
                onChange={(e) => setNewUserForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
              <input
                type="password"
                required
                minLength={8}
                placeholder="Password (min 8 chars)"
                value={newUserForm.password}
                onChange={(e) => setNewUserForm((p) => ({ ...p, password: e.target.value }))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
              <select
                value={newUserForm.role}
                onChange={(e) =>
                  setNewUserForm((p) => ({ ...p, role: e.target.value as AdminRole }))
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="editor">Editor (Manage KB, Enquiries, FAQs)</option>
                <option value="viewer">Viewer (Read-only Analytics & Logs)</option>
                <option value="super_admin">Super Admin (Full RBAC Control)</option>
              </select>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                Create Admin Account
              </button>
            </form>

            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Team Access Control</h3>
              {adminUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 text-xs"
                >
                  <div>
                    <p className="font-bold text-slate-900">
                      {u.name} <span className="text-slate-400 font-normal">({u.email})</span>
                    </p>
                    <p className="text-slate-500">
                      Role: <strong className="text-emerald-700">{u.role}</strong> · Status:{' '}
                      {u.is_active === 1 ? 'Active' : 'Disabled'}
                    </p>
                  </div>
                  {u.id !== user.id && (
                    <button
                      type="button"
                      onClick={() => handleToggleUserActive(u)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 font-semibold hover:border-slate-400"
                    >
                      {u.is_active === 1 ? 'Disable' : 'Activate'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
