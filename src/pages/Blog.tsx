import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag, ChevronRight, Share2 } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../lib/blog-data';
import { ShareButtons } from '../components/ShareButtons';

const BlogCard = ({ post, index }: { post: BlogPost; index: number; key?: React.Key }) => {
  const Icon = post.icon;
  const shareUrl = `${window.location.origin}/blog/${post.id}`;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-3xl border border-black/5 overflow-hidden hover:shadow-2xl hover:shadow-emerald-100 hover:-translate-y-2 transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <Link to={`/blog/${post.id}`} className="block h-full">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-6 left-6">
            <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
              <Icon className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="inline-flex items-center gap-2 text-white text-sm font-bold">
              Read Article <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
        {/* Quick Share Overlay */}
        <div className="absolute top-6 right-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/20">
            <ShareButtons url={shareUrl} title={post.title} className="flex-col gap-2" />
          </div>
        </div>
      </div>

      <div className="p-8">
        <Link to={`/blog/${post.id}`} className="block">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-black/40 uppercase tracking-wider">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
          </div>

          <h3 className="text-xl font-bold text-black mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-black/60 text-sm leading-relaxed mb-8 line-clamp-3">
            {post.excerpt}
          </p>
        </Link>

        <div className="flex items-center justify-between pt-6 border-t border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
              {post.author.charAt(0)}
            </div>
            <span className="text-xs font-bold text-black/60">{post.author}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to={`/blog/${post.id}`} className="text-emerald-600 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
              Read More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Blog = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(post => post.category)))];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-20">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-50/50 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider mb-6">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tight">
              Latest <span className="text-emerald-600">Insights</span> & Guides
            </h1>
            <p className="text-xl text-black/60 max-w-3xl mx-auto leading-relaxed">
              Practical "How-To" guides and expert advice to help you automate, scale, and grow your digital business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-y border-black/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                      : 'bg-black/5 text-black/60 hover:bg-black/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/5 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-black/20" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">No articles found</h3>
                <p className="text-black/60">Try adjusting your search or category filter.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                  className="mt-6 text-emerald-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
