import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Cpu, BarChart3, ShieldCheck, Zap, Layers, Users, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { HeroSlider } from '@/src/components/HeroSlider';
import { TestimonialSlider } from '@/src/components/TestimonialSlider';
import { TechNews } from '@/src/components/TechNews';
import { BLOG_POSTS } from '../lib/blog-data';
import { Calendar, ChevronRight } from 'lucide-react';

const services = [
  {
    title: "Website Development",
    desc: "High-converting websites and complex web applications built for scale.",
    icon: Globe,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Custom SaaS Development",
    desc: "End-to-end software as a service platforms with robust architecture.",
    icon: Layers,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "AI Automation Systems",
    desc: "Intelligent workflows that save time and reduce operational costs.",
    icon: Cpu,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Digital Sales Funnels",
    desc: "Automated marketing systems designed to convert visitors into loyal clients.",
    icon: BarChart3,
    color: "bg-emerald-50 text-emerald-600"
  }
];

export const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Our Core Expertise</h2>
              <p className="text-black/60 text-lg">
                We focus on building digital systems that serve as the backbone of your business growth.
              </p>
            </div>
            <Link to="/services" className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl border border-black/5 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-black/5 transition-all bg-white"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", s.color)}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-black/60 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* Tech News Section */}
      <TechNews />

      {/* Latest Insights Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Blog</span>
              <h2 className="text-4xl font-black mb-4 tracking-tight">Latest <span className="text-emerald-600">Insights</span> & Guides</h2>
              <p className="text-black/60 text-lg">
                Practical strategies and "How-To" guides to help you scale your digital business.
              </p>
            </div>
            <Link to="/blog" className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-emerald-600 transition-all flex items-center gap-2">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl border border-black/5 overflow-hidden hover:shadow-2xl hover:shadow-emerald-100 hover:-translate-y-2 transition-all duration-500"
              >
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-600 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-black/40 uppercase tracking-wider mb-4">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-black/60 text-sm leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="text-emerald-600 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-500 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Ready to Build Your Digital Growth System?</h2>
              <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                Join the ranks of businesses scaling through intelligent technology and strategic digital infrastructure.
              </p>
              <Link to="/contact" className="bg-white text-emerald-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all inline-flex items-center gap-2">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
