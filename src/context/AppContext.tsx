'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  image_url: string;
  meta_title: string;
  meta_description: string;
  published_at: string;
}

interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

interface AppContextType {
  leads: Lead[];
  posts: BlogPost[];
  loading: boolean;
  currency: CurrencyInfo;
  formatPrice: (usdPrice: number) => string;
  refreshLeads: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  submitLead: (data: any) => Promise<void>;
  updateLead: (id: number, status: string) => Promise<void>;
  deleteLead: (id: number) => Promise<void>;
  addPost: (data: any) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<CurrencyInfo>({ code: 'USD', symbol: '$', rate: 1 });

  const refreshLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  const refreshPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const detectCurrency = async () => {
    try {
      // 1. Detect IP and Currency Code
      const ipRes = await fetch('https://ipapi.co/json/').catch(() => null);
      let ipData: any = null;
      if (ipRes && ipRes.ok) {
        ipData = await ipRes.json();
      }
      
      const targetCurrency = ipData?.currency || 'USD';
      const targetSymbol = ipData?.currency_symbol || '$';

      if (targetCurrency === 'USD') {
        setCurrency({ code: 'USD', symbol: '$', rate: 1 });
        return;
      }

      // 2. Fetch Exchange Rate from USD to Target Currency
      const rateRes = await fetch('https://open.er-api.com/v6/latest/USD').catch(() => null);
      if (rateRes && rateRes.ok) {
        const rateData = await rateRes.json();
        const rate = rateData.rates[targetCurrency] || 1;
        setCurrency({
          code: targetCurrency,
          symbol: targetSymbol,
          rate: rate
        });
      }
    } catch (err) {
      console.error('Currency detection failed:', err);
    }
  };

  const formatPrice = (usdPrice: number) => {
    const localPrice = usdPrice * currency.rate;
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: 0
    }).format(localPrice);
  };

  const submitLead = async (data: any) => {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    await refreshLeads();
  };

  const updateLead = async (id: number, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    await refreshLeads();
  };

  const deleteLead = async (id: number) => {
    await fetch(`/api/leads/${id}`, {
      method: 'DELETE',
    });
    await refreshLeads();
  };

  const addPost = async (data: any) => {
    await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    await refreshPosts();
  };

  const deletePost = async (id: number) => {
    await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });
    await refreshPosts();
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([refreshLeads(), refreshPosts(), detectCurrency()])
      .catch(err => console.error("Initial load error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppContext.Provider value={{ 
      leads, 
      posts, 
      loading, 
      currency,
      formatPrice,
      refreshLeads, 
      refreshPosts, 
      submitLead, 
      updateLead, 
      deleteLead, 
      addPost, 
      deletePost 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
