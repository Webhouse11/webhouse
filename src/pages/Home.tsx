import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Cpu, BarChart3, ShieldCheck, Zap, Layers, Users, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { HeroSlider } from '@/src/components/HeroSlider';

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

      {/* Why Choose Us */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 leading-tight">Why Forward-Thinking Businesses Choose Webhouse</h2>
              <div className="space-y-8">
                {[
                  { title: "Strategic Thinking", desc: "We analyze your business model before writing a single line of code." },
                  { title: "Scalable Architecture", desc: "Our systems are built to grow from 100 to 1,000,000 users seamlessly." },
                  { title: "Automation Driven", desc: "We eliminate repetitive tasks through intelligent software integration." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Cpu className="w-32 h-32 text-emerald-400 mx-auto mb-6" />
                  <p className="text-2xl font-bold">Webhouse Certified</p>
                </div>
              </div>
            </div>
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
