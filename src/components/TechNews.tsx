import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Brain, Rocket, Lightbulb, Zap, Target, Globe, Users } from 'lucide-react';

const philosophy = [
  {
    title: "Technology First",
    description: "We believe technology is the engine of modern business growth.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    color: "emerald"
  },
  {
    title: "AI-Driven Innovation",
    description: "Artificial Intelligence is not the future — it is the present. We leverage AI to automate, optimize, and scale marketing systems.",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    color: "blue"
  },
  {
    title: "Innovation Without Limits",
    description: "We constantly explore new ideas, tools, and strategies that push businesses beyond ordinary growth.",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    color: "purple"
  },
  {
    title: "Motivation & Leadership",
    description: "We believe business growth begins with mindset. Our brand inspires entrepreneurs to dream bigger, act boldly, and lead confidently.",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    color: "orange"
  }
];

const buildingPoints = [
  { text: "Technology meets marketing", icon: Zap },
  { text: "AI powers business growth", icon: Target },
  { text: "Ideas become global brands", icon: Globe },
  { text: "Entrepreneurs become industry leaders", icon: Users }
];

export const TechNews = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {philosophy.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-black rounded-[2.5rem] overflow-hidden aspect-[16/10] md:aspect-auto md:h-[400px]"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-white/80 text-lg max-w-md leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
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
