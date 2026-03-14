import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Newspaper, ExternalLink, Clock, RefreshCw, ArrowRight } from 'lucide-react';

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  description: string;
  thumbnail: string;
  author: string;
}

export const TechNews = () => {
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setError(false);
    try {
      // Using TechCrunch RSS feed via rss2json API
      const rssUrl = 'https://techcrunch.com/feed/';
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
      const data = await response.json();
      
      if (data.status === 'ok') {
        // Take only 6 items as requested
        setNews(data.items.slice(0, 6));
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
    // Auto-refresh every 5 minutes to keep it fresh
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-wider text-sm mb-4">
              <Newspaper className="w-4 h-4" />
              <span>Live Updates</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Tech News</h2>
            <p className="text-black/60 text-lg">
              Fresh insights from the tech world and digital systems landscape, updated daily.
            </p>
          </div>
          <button 
            onClick={fetchNews}
            className="flex items-center gap-2 text-sm font-semibold text-black/40 hover:text-emerald-600 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Feed
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-black/5 rounded-2xl mb-4" />
                <div className="h-4 bg-black/5 rounded w-3/4 mb-2" />
                <div className="h-4 bg-black/5 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-emerald-50 rounded-[2rem] border border-emerald-100">
            <p className="text-emerald-800 font-medium">Unable to load fresh news at the moment.</p>
            <button onClick={fetchNews} className="mt-4 text-emerald-600 underline">Try again</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] border border-black/5 overflow-hidden hover:border-emerald-500/20 transition-all"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={item.thumbnail || `https://picsum.photos/seed/${i}/800/450`} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-black">
                    {item.title}
                  </h3>
                  
                  <p className="text-black/60 text-sm leading-relaxed">
                    {item.description.replace(/<[^>]*>?/gm, '').split('\n')[0]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
