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
    Promise.all([refreshLeads(), refreshPosts()]).finally(() => setLoading(false));
  }, []);

  return (
    <AppContext.Provider value={{ leads, posts, loading, refreshLeads, refreshPosts, submitLead, updateLead, deleteLead, addPost, deletePost }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
