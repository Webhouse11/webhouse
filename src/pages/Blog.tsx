import React from 'react';
import { useApp } from '@/src/context/AppContext';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const Blog = () => {
  const { posts, loading } = useApp();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-8">Insights & <span className="text-black/40">Digital Strategy</span></h1>
            <p className="text-xl text-black/60 leading-relaxed">
              Expert perspectives on building digital systems, AI automation, and scaling your business in the digital age.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            <input 
              placeholder="Search articles..." 
              className="w-full pl-12 pr-4 py-3 rounded-full border border-black/10 focus:border-black focus:ring-0 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-black/5 rounded-3xl mb-6"></div>
                <div className="h-6 bg-black/5 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-black/5 rounded w-full mb-2"></div>
                <div className="h-4 bg-black/5 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-black/5 rounded-[3rem]">
            <p className="text-xl text-black/40">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="aspect-video rounded-[2rem] bg-black/5 overflow-hidden mb-6 relative">
                    <img 
                      src={post.image_url || `https://picsum.photos/seed/${post.id}/800/600`} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-black/60 mb-6 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs font-medium text-black/40">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(post.published_at), 'MMM dd, yyyy')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
