import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Target, 
  TrendingUp, 
  Cpu, 
  Globe, 
  BarChart3, 
  Users, 
  Mail, 
  Phone,
  AlertCircle,
  Lightbulb,
  Rocket,
  DollarSign,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const ProblemCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
      <AlertCircle className="text-red-500 w-5 h-5" />
    </div>
    <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
    <p className="text-white/60 text-sm">{desc}</p>
  </div>
);

const StepCard = ({ number, title, desc }: { number: string; title: string; desc: string }) => (
  <div className="relative p-8 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all">
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-900 text-amber-400 rounded-full flex items-center justify-center font-bold text-xl border-4 border-white shadow-lg">
      {number}
    </div>
    <h4 className="text-xl font-bold mb-3 mt-2">{title}</h4>
    <p className="text-black/60">{desc}</p>
  </div>
);

const PricingCard = ({ 
  tier, 
  price, 
  features, 
  highlight = false,
  cta = "Get Started"
}: { 
  tier: string; 
  price: string; 
  features: string[]; 
  highlight?: boolean;
  cta?: string;
}) => (
  <div className={cn(
    "p-8 rounded-[2.5rem] border transition-all relative flex flex-col h-full",
    highlight 
      ? "bg-blue-900 border-amber-400/50 text-white shadow-2xl scale-105 z-10" 
      : "bg-white border-black/5 text-black hover:border-blue-900/20"
  )}>
    {highlight && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-blue-900 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
        Most Popular
      </div>
    )}
    <div className="mb-8">
      <h3 className={cn("text-xl font-bold mb-2", highlight ? "text-amber-400" : "text-blue-900")}>{tier}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold">${price}</span>
        <span className={cn("text-sm", highlight ? "text-white/60" : "text-black/40")}>/one-time</span>
      </div>
    </div>
    <ul className="space-y-4 mb-10 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <CheckCircle2 className={cn("w-5 h-5 flex-shrink-0", highlight ? "text-amber-400" : "text-blue-900")} />
          <span className={highlight ? "text-white/80" : "text-black/70"}>{f}</span>
        </li>
      ))}
    </ul>
    <button className={cn(
      "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
      highlight 
        ? "bg-amber-400 text-blue-900 hover:bg-amber-300" 
        : "bg-blue-900 text-white hover:bg-blue-800"
    )}>
      {cta} <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

export const Training = () => {
  return (
    <div className="bg-white selection:bg-amber-400 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,1),transparent_70%)]"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-400/20 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Zap className="w-3 h-3" /> New Training Program
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]"
            >
              How to Build an Automated Blog That Posts Daily, Designs Its Own Template, and Triggers Monetization — <span className="text-amber-400 italic">Even If You Don’t Know How to Code</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Master the art of AI-powered blogging. This training teaches you how to build systems that generate high-quality SEO content based on real-time daily search trends automatically.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-amber-400 text-blue-950 px-10 py-5 rounded-full font-bold text-lg hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-400/10">
                Start Training <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm">
                Book Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight">Blogging is hard. <br/><span className="text-amber-400">Automation makes it easy.</span></h2>
              <p className="text-lg text-white/60 mb-12">
                Most bloggers quit within the first 3 months. Why? Because the manual grind is exhausting and the technical barriers are high.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProblemCard title="Content Fatigue" desc="Not knowing what to write or spending hours on a single post." />
                <ProblemCard title="Technical Walls" desc="Difficulty building and maintaining a professional website." />
                <ProblemCard title="SEO Mystery" desc="Lack of knowledge on how to rank on the first page of Google." />
                <ProblemCard title="Monetization Gap" desc="Struggling to turn traffic into actual revenue streams." />
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center rotate-12 shadow-xl">
                <span className="text-blue-900 font-bold text-center leading-tight text-sm">AI<br/>POWERED</span>
              </div>
              <h3 className="text-2xl font-bold mb-6">The AI Revolution is Here</h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Modern AI automation has completely changed the blogging landscape. We leverage powerful tools to build systems that do the heavy lifting for you.
              </p>
              <ul className="space-y-6">
                {[
                  { icon: Cpu, name: "Google AI Studio", desc: "For advanced content generation and reasoning." },
                  { icon: TrendingUp, name: "Google Trends", desc: "To identify what people are searching for right now." },
                  { icon: Zap, name: "RSS Automation", desc: "To keep your blog fresh with real-time updates." }
                ].map((tool, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-800 flex items-center justify-center flex-shrink-0">
                      <tool.icon className="text-amber-400 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{tool.name}</h4>
                      <p className="text-white/50 text-sm">{tool.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6 text-blue-950">What You Will Learn</h2>
            <p className="text-lg text-black/60">
              A comprehensive curriculum designed to take you from zero to a fully automated blogging empire.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI SEO Architecture", desc: "How to build AI automated SEO blogs that search engines love." },
              { title: "Trend-Driven Content", desc: "Generate blog content automatically based on real-time search trends." },
              { title: "API Orchestration", desc: "Connect powerful APIs for seamless automated content generation." },
              { title: "RSS Feed Integration", desc: "Keep your blog updated with fresh content from around the web." },
              { title: "Premium Design Cloning", desc: "How to clone high-end templates from ThemeForest for a pro look." },
              { title: "Vercel Deployment", desc: "Deploy your websites with lightning speed using Vercel." },
              { title: "Monetization Mastery", desc: "Integrate Google AdSense and other ad networks for passive income." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-6 rounded-2xl border border-black/5 hover:bg-blue-50 transition-colors"
              >
                <CheckCircle2 className="text-blue-900 w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-950 mb-1">{item.title}</h4>
                  <p className="text-sm text-black/60">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How the System Works */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6 text-blue-950">How the Automated System Works</h2>
            <p className="text-lg text-black/60">
              Six simple steps to launch your automated blogging business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <StepCard number="01" title="Niche Research" desc="Identify highly profitable and low-competition niches using data." />
            <StepCard number="02" title="System Build" desc="Set up your core automated AI blogging infrastructure." />
            <StepCard number="03" title="Data Connection" desc="Connect real-time search data and RSS feeds to your system." />
            <StepCard number="04" title="Content Engine" desc="Configure the AI to generate multiple high-quality posts daily." />
            <StepCard number="05" title="Online Deployment" desc="Push your blog live using modern cloud hosting platforms." />
            <StepCard number="06" title="Monetization" desc="Activate ad networks and start generating passive revenue." />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6 text-blue-950">Choose Your Training Path</h2>
            <p className="text-lg text-black/60">
              Select the package that fits your goals and start your automation journey today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <PricingCard 
              tier="Starter Package"
              price="97"
              features={[
                "Access to basic AI automated blog training",
                "Learn how to build your first automated blog",
                "SEO content automation setup",
                "Blog deployment guide",
                "7 days email support"
              ]}
            />
            <PricingCard 
              tier="Professional Package"
              price="297"
              highlight={true}
              features={[
                "Everything in Starter Package",
                "Advanced automation workflow",
                "API integration training",
                "RSS automated content system",
                "Premium blog template setup",
                "Monetization training",
                "30 days priority support"
              ]}
              cta="Join Professional"
            />
            <PricingCard 
              tier="Elite Package"
              price="997"
              features={[
                "Everything in Professional Package",
                "Done-for-you automated blog setup",
                "3 niche blogs created for you",
                "Premium template installation",
                "Full monetization setup",
                "Private 1-on-1 consultation",
                "Lifetime VIP support"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Why This Training Is Different */}
      <section className="py-24 bg-blue-950 text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Why This Training Is <span className="text-amber-400">Different</span></h2>
              <div className="space-y-6">
                {[
                  { title: "True Automation", desc: "We don't just teach you how to write with AI; we teach you how to build a system that writes without you." },
                  { title: "No Coding Required", desc: "Our methods are designed for entrepreneurs, not just developers." },
                  { title: "Scalable Model", desc: "Once you build one, you can replicate the system across dozens of niches." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="text-blue-950 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="aspect-square bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center text-center">
                  <Rocket className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <p className="font-bold">Fast Launch</p>
                </div>
                <div className="aspect-square bg-blue-900 border border-amber-400/30 rounded-3xl p-8 flex flex-col justify-center text-center">
                  <DollarSign className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <p className="font-bold">Passive ROI</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="aspect-square bg-blue-900 border border-amber-400/30 rounded-3xl p-8 flex flex-col justify-center text-center">
                  <Globe className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <p className="font-bold">Global Scale</p>
                </div>
                <div className="aspect-square bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center text-center">
                  <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <p className="font-bold">Elite Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Training Is For */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-[3rem] p-12 lg:p-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 text-blue-950">Who Is This Training For?</h2>
              <p className="text-lg text-black/60">
                If you fit any of these profiles, you're in the right place.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Beginners who want to start blogging",
                "Entrepreneurs seeking passive income",
                "Digital marketers looking for an edge",
                "Content creators wanting to scale",
                "AI automation enthusiasts",
                "Niche site builders"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <span className="font-medium text-blue-950">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Start Building Your Automated Empire Today</h2>
              <p className="text-white/70 text-xl mb-12 max-w-2xl mx-auto">
                Don't get left behind in the manual blogging era. Join the AI revolution and build a business that scales.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <button className="bg-amber-400 text-blue-900 px-12 py-6 rounded-full font-bold text-xl hover:bg-amber-300 transition-all shadow-2xl shadow-amber-400/20">
                  Enroll in Training Now
                </button>
              </div>
              <div className="pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 text-white">
                  <Mail className="text-amber-400 w-5 h-5" />
                  <span className="font-medium">webhousemediastudio@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-white">
                  <Phone className="text-amber-400 w-5 h-5" />
                  <span className="font-medium">+234 806 018 0077</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
