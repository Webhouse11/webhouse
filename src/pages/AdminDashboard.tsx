import React from 'react';
import { useApp } from '@/src/context/AppContext';
import { LayoutDashboard, Users, FileText, Settings, LogOut, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const AdminDashboard = () => {
  const { leads, loading } = useApp();

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-black/5 p-6 flex flex-col">
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
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: Users, label: "Leads" },
            { icon: FileText, label: "Blog Posts" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <button key={i} className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              item.active ? "bg-emerald-500 text-white" : "text-black/60 hover:bg-black/5"
            )}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <p className="text-black/40">Welcome back, Admin</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-xl border border-black/5 text-sm font-medium">
              {format(new Date(), 'MMMM dd, yyyy')}
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Leads", value: leads.length, color: "text-blue-600" },
            { label: "New Inquiries", value: leads.filter(l => l.status === 'new').length, color: "text-emerald-600" },
            { label: "Pending Projects", value: 0, color: "text-orange-600" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-black/5">
              <p className="text-sm font-medium text-black/40 mb-1">{stat.label}</p>
              <p className={cn("text-3xl font-bold", stat.color)}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Leads Table */}
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
          <div className="p-6 border-b border-black/5 flex justify-between items-center">
            <h3 className="font-bold">Recent Leads</h3>
            <button className="text-sm font-medium text-black/40 hover:text-black">View All</button>
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
                {leads.map((lead) => (
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
                      <button className="text-xs font-bold text-black hover:underline">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

import { cn } from '@/src/lib/utils';
