import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Globe, 
  Star, 
  Clock,
  Lock,
  Gift,
  Trophy,
  Users
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Upsell = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = React.useState(600); // 10 minutes countdown

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24">
      {/* Progress Header */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-white border-b border-black/5">
        <div className="h-1.5 bg-slate-100 w-full">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-emerald-500"
          ></motion.div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Step 2 of 3: Finalizing Your Order</span>
          </div>
          <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>Offer expires in: {formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Main Offer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-2xl shadow-black/5 overflow-hidden border border-black/5"
        >
          {/* Hero Section */}
          <div className="bg-emerald-950 p-8 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8"
              >
                <Zap className="w-3 h-3" /> One-Time Exclusive Offer
              </motion.div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Wait! Don't Leave Your <br />
                <span className="text-emerald-400">Digital Empire Incomplete</span>
              </h1>
              
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-0">
                You've just secured your first resource. But why stop there when you can own the <span className="text-white font-bold underline decoration-emerald-500 underline-offset-4">entire library</span> for a fraction of the cost?
              </p>
            </div>
          </div>

          <div className="p-8 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Side: Value Proposition */}
              <div>
                <h2 className="text-2xl font-bold text-black mb-8 flex items-center gap-3">
                  <Trophy className="text-emerald-600 w-6 h-6" />
                  The Digital Empire Master Collection
                </h2>
                
                <div className="space-y-6 mb-12">
                  {[
                    { title: "All 50+ Premium Resources", desc: "Every guide, playbook, and toolkit in our library is yours instantly." },
                    { title: "Lifetime Access & Updates", desc: "Never pay for another resource again. Get all future updates for free." },
                    { title: "VIP Mastermind Access", desc: "Join our private community of 5,000+ successful digital entrepreneurs." },
                    { title: "Priority 1-on-1 Support", desc: "Get direct access to our team for implementation help whenever you need it." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-black mb-1">{item.title}</h4>
                        <p className="text-sm text-black/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-3xl p-8 border border-black/5">
                  <h4 className="font-bold text-black mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-emerald-600" />
                    Exclusive Bonuses Included:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-black/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      30-Min Strategy Call with Our Team ($150 Value)
                    </li>
                    <li className="flex items-center gap-2 text-sm text-black/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      Private Resource Library Dashboard Access
                    </li>
                    <li className="flex items-center gap-2 text-sm text-black/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      Monthly Live Q&A Sessions
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side: Pricing & CTA */}
              <div className="bg-slate-50 rounded-[2.5rem] p-8 lg:p-12 border border-black/5 sticky top-32">
                <div className="text-center mb-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Total Value: $975.00+</p>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="text-2xl text-black/30 line-through font-bold">$497.00</span>
                    <span className="text-5xl font-bold text-emerald-600">$97.00</span>
                  </div>
                  <p className="text-sm font-bold text-emerald-600/60">One-Time Payment • Save 90%</p>
                </div>

                <div className="space-y-4 mb-8">
                  <a 
                    href="https://selar.com/37j713171k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 text-white py-6 rounded-2xl font-bold text-xl hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/40 flex items-center justify-center gap-3 group"
                  >
                    YES! Upgrade My Order <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  <button 
                    onClick={() => navigate('/resources')}
                    className="w-full py-4 text-black/40 font-bold hover:text-black transition-colors text-sm"
                  >
                    No thanks, I'll pass on this 90% discount and just take my initial purchase.
                  </button>
                </div>

                <div className="pt-8 border-t border-black/10">
                  <div className="flex items-center justify-center gap-6 mb-6 opacity-60">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-black/30 uppercase tracking-widest">
                    <Lock className="w-3 h-3" /> 256-Bit Secure SSL Encryption
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "Secure Checkout", desc: "Your payment is processed through industry-standard encryption." },
            { icon: Download, title: "Instant Access", desc: "Get your login details and download links immediately after purchase." },
            { icon: Users, title: "Join 5,000+ Others", desc: "Our resources are trusted by thousands of entrepreneurs worldwide." }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <item.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-bold text-black mb-2">{item.title}</h4>
              <p className="text-sm text-black/60">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold mb-12">What Our Master Collection Owners Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "David Miller",
                role: "SaaS Founder",
                content: "Buying the Master Collection was the best business decision I made this year. Having every resource at my fingertips saved me months of trial and error.",
                image: "https://i.pravatar.cc/150?u=david"
              },
              {
                name: "Jessica Wu",
                role: "Creative Director",
                content: "The value here is insane. I've used at least 10 of the guides already, and each one has paid for itself multiple times over.",
                image: "https://i.pravatar.cc/150?u=jessica"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-black/5 text-left shadow-sm">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-black/70 italic mb-8 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-black">{t.name}</h4>
                    <p className="text-xs text-black/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
