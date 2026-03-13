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

interface AppContextType {
  leads: Lead[];
  posts: BlogPost[];
  loading: boolean;
  refreshLeads: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  submitLead: (data: any) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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

  const submitLead = async (data: any) => {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    await refreshLeads();
  };

  useEffect(() => {
    Promise.all([refreshLeads(), refreshPosts()]).finally(() => setLoading(false));
  }, []);

  return (
    <AppContext.Provider value={{ leads, posts, loading, refreshLeads, refreshPosts, submitLead }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
