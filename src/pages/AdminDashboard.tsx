import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/src/context/AppContext';
import { LayoutDashboard, Users, FileText, Settings, LogOut, CheckCircle, Clock, Trash2, Eye, X, Mail, Phone, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/src/lib/utils';

export const AdminDashboard = () => {
  const { leads, posts, loading, updateLead, deleteLead, addPost, deletePost } = useApp();
  const [activeTab, setActiveTab] = useState('Leads');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    category: 'AI & Automation',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    icon_name: 'Cpu'
  });

  if (loading) return <div className="p-8">Loading...</div>;

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPost(newPost);
    setShowAddPost(false);
    setNewPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      category: 'AI & Automation',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      icon_name: 'Cpu'
    });
  };

  const stats = [
    { label: "Total Leads", value: leads.length, color: "text-blue-600" },
    { label: "New Inquiries", value: leads.filter(l => l.status === 'new').length, color: "text-emerald-600" },
    { label: "Blog Posts", value: posts.length, color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-black/5 p-6 flex flex-col fixed h-full">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
            <img 
              src="https://res.cloudinary.com/dhzouslh1/image/upload/v1773161041/591626377_1368804921611344_6068326484691096664_n_c1x0d4.jpg" 
              alt="Webhouse Media Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-bold text-lg">Webhouse Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Dashboard" },
            { icon: Users, label: "Leads" },
            { icon: FileText, label: "Blog Posts" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === item.label ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-black/60 hover:bg-black/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => {
            localStorage.removeItem('isAdmin');
            window.location.href = '/login';
          }}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all mt-auto"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold">{activeTab} Overview</h1>
            <p className="text-black/40">Welcome back, Admin</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-xl border border-black/5 text-sm font-medium">
              {format(new Date(), 'MMMM dd, yyyy')}
            </div>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                  <p className="text-sm font-medium text-black/40 mb-1">{stat.label}</p>
                  <p className={cn("text-3xl font-bold", stat.color)}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Leads Summary */}
            <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-black/5 flex justify-between items-center">
                <h3 className="font-bold">Recent Leads</h3>
                <button onClick={() => setActiveTab('Leads')} className="text-sm font-medium text-emerald-600 hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-black/5 text-[11px] uppercase tracking-wider font-bold text-black/40">
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {leads.slice(0, 5).map((lead) => (
                      <tr key={lead.id} className="hover:bg-black/5 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold">{lead.name}</p>
                          <p className="text-xs text-black/40">{lead.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                            lead.status === 'new' ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                          )}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-black/40">
                          {format(new Date(lead.created_at), 'MMM dd, HH:mm')}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => setSelectedLead(lead)}
                            className="text-xs font-bold text-emerald-600 hover:underline"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Leads' && (
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-black/5 flex justify-between items-center">
              <h3 className="font-bold">All Leads</h3>
              <div className="flex gap-2">
                <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">
                  {leads.length} Total
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-black/5 text-[11px] uppercase tracking-wider font-bold text-black/40">
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold">{lead.name}</p>
                        <p className="text-xs text-black/40">ID: #{lead.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">{lead.email}</p>
                        <p className="text-xs text-black/40">{lead.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={lead.status}
                          onChange={(e) => updateLead(lead.id, e.target.value)}
                          className={cn(
                            "text-[10px] font-bold uppercase rounded-full px-2 py-1 border-none focus:ring-2 focus:ring-emerald-500",
                            lead.status === 'new' ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                          )}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="pending">Pending</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-black/40">
                        {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button 
                            onClick={() => setSelectedLead(lead)}
                            className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this lead?')) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Blog Posts' && (
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-black/5 flex justify-between items-center">
              <h3 className="font-bold">Blog Posts</h3>
              <button 
                onClick={() => setShowAddPost(true)}
                className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all"
              >
                Add New Post
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-black/5 text-[11px] uppercase tracking-wider font-bold text-black/40">
                    <th className="px-6 py-4">Post</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold line-clamp-1">{post.title}</p>
                        <p className="text-xs text-black/40">slug: {post.slug}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold uppercase">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-black/40">
                        {format(new Date(post.published_at), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <Link 
                            to={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 hover:bg-black/5 text-black/60 rounded-lg transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this post?')) {
                                deletePost(post.id);
                              }
                            }}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm max-w-2xl">
            <h3 className="font-bold text-xl mb-6">Admin Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black/60">Admin Email</label>
                <input type="email" defaultValue="admin@webhouse.media" className="w-full px-4 py-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-black/60">Notification Email</label>
                <input type="email" defaultValue="webhousemediastudio@gmail.com" className="w-full px-4 py-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <button className="bg-black text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Add Post Modal */}
      {showAddPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddPost(false)}></div>
          <div className="relative bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-black/5 flex justify-between items-center bg-emerald-500 text-white">
              <h3 className="text-2xl font-bold">Create New Blog Post</h3>
              <button onClick={() => setShowAddPost(false)} className="p-2 hover:bg-white/20 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddPost} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Title</label>
                  <input 
                    type="text" 
                    required
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Slug</label>
                  <input 
                    type="text" 
                    required
                    value={newPost.slug}
                    onChange={(e) => setNewPost({...newPost, slug: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Excerpt</label>
                <textarea 
                  required
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-emerald-500 outline-none h-20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Content (HTML)</label>
                <textarea 
                  required
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-emerald-500 outline-none h-40 font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Category</label>
                  <select 
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option>AI & Automation</option>
                    <option>Digital Marketing & Sales</option>
                    <option>Website & Digital Business</option>
                    <option>Digital Products & Online Income</option>
                    <option>Social Media & Content Creation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Image URL</label>
                  <input 
                    type="text" 
                    required
                    value={newPost.image}
                    onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all"
              >
                Publish Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedLead(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-black/5 flex justify-between items-center bg-emerald-500 text-white">
              <div>
                <h3 className="text-2xl font-bold">Lead Details</h3>
                <p className="text-white/80 text-sm">#{selectedLead.id} — Received on {format(new Date(selectedLead.created_at), 'MMMM dd, yyyy')}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-white/20 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-black/40">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Client Name</span>
                  </div>
                  <p className="text-lg font-bold">{selectedLead.name}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-black/40">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Email Address</span>
                  </div>
                  <p className="text-lg font-bold">{selectedLead.email}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-black/40">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Phone Number</span>
                  </div>
                  <p className="text-lg font-bold">{selectedLead.phone}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-black/40">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Status</span>
                  </div>
                  <div className="flex">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase",
                      selectedLead.status === 'new' ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-black/5">
                <div className="flex items-center gap-3 text-black/40">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Message / Requirements</span>
                </div>
                <div className="bg-black/5 p-6 rounded-2xl italic text-black/70 leading-relaxed">
                  "{selectedLead.message}"
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <button 
                  onClick={() => window.location.href = `mailto:${selectedLead.email}`}
                  className="flex-1 bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all"
                >
                  <Mail className="w-4 h-4" /> Reply via Email
                </button>
                <button 
                  onClick={() => window.location.href = `tel:${selectedLead.phone}`}
                  className="flex-1 bg-emerald-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Phone className="w-4 h-4" /> Call Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
