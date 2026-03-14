import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Tunde Oladapo",
    role: "CEO, TechFlow Nigeria",
    content: "Webhouse Media transformed our digital presence in Lagos. Their AI automation systems saved us 40% in operational costs within the first six months.",
    location: "Lagos, Nigeria",
    rating: 5
  },
  {
    name: "Amara Kalu",
    role: "Founder, AgriGrow Kenya",
    content: "The custom SaaS platform built by Webhouse is world-class. We've scaled to 5 countries in Africa effortlessly thanks to their robust architecture.",
    location: "Nairobi, Kenya",
    rating: 5
  },
  {
    name: "David Sterling",
    role: "Marketing Director",
    content: "Strategic and highly professional. They don't just build websites; they build growth engines. Their focus on ROI is truly unmatched.",
    location: "London, UK",
    rating: 5
  },
  {
    name: "Fatoumata Bah",
    role: "E-commerce Manager",
    content: "The best digital agency in West Africa. Their digital sales funnels have tripled our conversion rates in less than a year.",
    location: "Accra, Ghana",
    rating: 5
  },
  {
    name: "John Mensah",
    role: "Director of Operations",
    content: "Webhouse Media's AI automation systems have revolutionized how we handle logistics. Highly recommended for any scaling business.",
    location: "Kumasi, Ghana",
    rating: 5
  }
];

export const TestimonialSlider = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  React.useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-white/60 text-lg">Trusted by forward-thinking businesses across Africa and beyond.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-12 -left-12 opacity-10">
            <Quote className="w-32 h-32" />
          </div>

          <div className="relative z-10 min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full text-center"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                
                <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 italic">
                  "{testimonials[current].content}"
                </p>
                
                <div>
                  <h4 className="text-xl font-bold text-emerald-500">{testimonials[current].name}</h4>
                  <p className="text-white/60">{testimonials[current].role}</p>
                  <p className="text-white/40 text-sm mt-1">{testimonials[current].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === i ? "w-8 bg-emerald-500" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
