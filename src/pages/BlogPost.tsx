import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, MessageSquare, ChevronRight, Clock, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../lib/blog-data';

export const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-emerald-600 hover:underline">Back to blog</Link>
      </div>
    );
  }

  const Icon = post.icon;
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <div className="pt-32 pb-20">
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
        
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-4 h-4" /> {post.date}
                </span>
                <span className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" /> 8 min read
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-xl">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold">{post.author}</p>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Lead Strategist</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <article className="prose prose-lg max-w-none prose-emerald prose-headings:font-black prose-headings:tracking-tight prose-p:text-black/70 prose-p:leading-relaxed prose-img:rounded-3xl prose-strong:text-black prose-a:text-emerald-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline">
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                  className="blog-content"
                />
              </article>

              {/* Share & Tags */}
              <div className="mt-20 pt-10 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-black/40 uppercase tracking-widest">Share:</span>
                  <div className="flex gap-2">
                    {['fb', 'tw', 'ln'].map(social => (
                      <button key={social} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all text-black/40">
                        <Share2 className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-bold text-black/60">{post.category}</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              {/* Author Card */}
              <div className="bg-black rounded-3xl p-8 text-white">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-bold text-3xl mb-6 shadow-2xl shadow-emerald-500/20">
                  {post.author.charAt(0)}
                </div>
                <h4 className="text-xl font-bold mb-2">{post.author}</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Oluranti is a digital systems expert with over a decade of experience in AI, automation, and marketing infrastructure.
                </p>
                <div className="flex gap-4">
                  <button className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-bold uppercase tracking-widest">Follow</button>
                  <button className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-bold uppercase tracking-widest">Profile</button>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                    Related <span className="text-emerald-600">Insights</span>
                  </h4>
                  <div className="space-y-6">
                    {relatedPosts.map(rp => (
                      <Link key={rp.id} to={`/blog/${rp.id}`} className="group flex gap-4">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                          <img 
                            src={rp.image} 
                            alt={rp.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-sm group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                            {rp.title}
                          </h5>
                          <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                            {rp.date}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
                <h4 className="text-xl font-bold mb-4">Stay Updated</h4>
                <p className="text-black/60 text-sm leading-relaxed mb-6">
                  Get the latest digital growth strategies delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="w-full px-6 py-3 rounded-2xl bg-white border-none text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                  <button className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all">
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Global CSS for blog content */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content h2 {
          font-size: 2rem;
          font-weight: 900;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: black;
          letter-spacing: -0.02em;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: rgba(0, 0, 0, 0.7);
        }
        .blog-content .cta-box {
          margin-top: 4rem;
          padding: 3rem;
          background: #f0fdf4;
          border-radius: 2rem;
          border: 1px solid #dcfce7;
          text-align: center;
        }
        .blog-content .cta-box h3 {
          font-size: 1.75rem;
          font-weight: 900;
          margin-bottom: 1rem;
          color: black;
        }
        .blog-content .cta-box p {
          margin-bottom: 2rem;
        }
        .blog-content .cta-button {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: #059669;
          color: white;
          font-weight: 700;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .blog-content .cta-button:hover {
          background: #047857;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(5, 150, 105, 0.2);
        }
      `}} />
    </div>
  );
};
