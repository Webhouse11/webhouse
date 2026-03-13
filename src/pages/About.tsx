import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Eye, Shield, Award } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl font-bold mb-8">Our Story</h1>
            <p className="text-xl text-black/60 leading-relaxed mb-6">
              Webhouse Media and Marketing Solution was founded on a simple premise: businesses don't just need websites; they need digital systems that work while they sleep.
            </p>
            <p className="text-lg text-black/60 leading-relaxed">
              We've evolved from a creative agency into a digital systems development powerhouse, helping startups and enterprises build the infrastructure required for modern scale.
            </p>
          </motion.div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] bg-black/5 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2301" 
                alt="Webhouse Office" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Mission/Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="p-12 rounded-[3rem] bg-black text-white">
            <Target className="w-12 h-12 text-emerald-400 mb-8" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              To empower businesses with intelligent digital systems that automate growth, enhance brand authority, and drive sustainable revenue.
            </p>
          </div>
          <div className="p-12 rounded-[3rem] bg-emerald-500 text-white">
            <Eye className="w-12 h-12 text-black mb-8" />
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              To be the global benchmark for digital systems strategy, known for engineering the most efficient business growth infrastructures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
