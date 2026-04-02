import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Brain, Rocket, Lightbulb, Zap, Target, Globe, Users, RefreshCw, AlertCircle } from 'lucide-react';

interface NewsItem {
  caption: string;
  time: string;
  image: string;
  link: string;
}

const buildingPoints = [
  { text: "Technology meets marketing", icon: Zap },
  { text: "AI powers business growth", icon: Target },
  { text: "Ideas become global brands", icon: Globe },
  { text: "Entrepreneurs become industry leaders", icon: Users }
];

export const TechNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setError(false);
    try {
      // Using TechCrunch RSS feed via rss2json API
      const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/feed/&api_key=');
      const data = await response.json();
      
      if (data.status === 'ok') {
        const formattedNews = data.items.slice(0, 8).map((item: any) => {
          // Calculate relative time
          const pubDate = new Date(item.pubDate);
          const now = new Date();
          const diffMs = now.getTime() - pubDate.getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMins / 60);
          const diffDays = Math.floor(diffHours / 24);

          let timeStr = 'Just now';
          if (diffDays > 0) timeStr = `${diffDays}d ago`;
          else if (diffHours > 0) timeStr = `${diffHours}h ago`;
          else if (diffMins > 0) timeStr = `${diffMins}m ago`;

          return {
            caption: item.title,
            time: timeStr,
            image: item.thumbnail || item.enclosure?.link || `https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=200&seed=${item.guid}`,
            link: item.link
          };
        });
        setNews(formattedNews);
      } else {
        throw new Error('Failed to fetch news');
      }
    } catch (err) {
      console.error('Error fetching RSS feed:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Refresh news every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hot News Feed Section */}
        <div className="mb-32">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 mb-6"
            >
              <Zap className="w-6 h-6 animate-pulse" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-black mb-4 tracking-tighter">..Breaking News</h2>
              <div className="flex items-center justify-center gap-4 mb-12">
                <p className="text-emerald-600 text-sm font-bold uppercase tracking-[0.4em]">Real-time Industry Updates</p>
                {loading && <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />}
              </div>
            </motion.div>

            {/* Tech News Hero Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-5xl aspect-[21/9] rounded-[2.5rem] overflow-hidden relative shadow-2xl mb-16 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200" 
                alt="Tech News"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 lg:p-12">
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">Global Network</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">Instant Updates</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {error ? (
            <div className="text-center py-12 bg-red-50 rounded-3xl border border-red-100">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-900 mb-2">Unable to load news</h3>
              <p className="text-red-700 mb-6">There was a problem connecting to the news feed.</p>
              <button 
                onClick={fetchNews}
                className="px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading && news.length === 0 ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-black/5 flex items-center gap-4 animate-pulse">
                    <div className="w-20 h-20 bg-slate-200 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-3 bg-slate-200 rounded w-1/4" />
                      <div className="h-4 bg-slate-200 rounded w-full" />
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                    </div>
                  </div>
                ))
              ) : (
                news.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="p-4 bg-slate-50 rounded-2xl border border-black/5 hover:border-emerald-500/20 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                      <img 
                        src={item.image} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{item.time}</span>
                      </div>
                      <p className="text-sm md:text-base font-bold text-black/80 leading-snug line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </motion.a>
                ))
              )}
            </div>
          )}
        </div>

        {/* What We Are Building Section */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-emerald-500 to-transparent mb-12" />
          
          <div className="pt-32 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                What We Are <span className="text-emerald-500 italic">Building</span>
              </h2>
              <p className="text-2xl text-black/60 mb-16 leading-relaxed">
                We are not just running a marketing agency. We are building a digital innovation hub where:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {buildingPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <point.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-semibold text-emerald-900">{point.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
