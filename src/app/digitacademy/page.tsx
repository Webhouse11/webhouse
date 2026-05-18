'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import EnrollmentNotification from '@/src/components/EnrollmentNotification';
import CourseTicker from '@/src/components/CourseTicker';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Download, 
  Users, 
  Award, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Search,
  Monitor,
  Smartphone,
  Cpu,
  Globe,
  Star as StarIcon,
  PlayCircle,
  ExternalLink,
  Send,
  MessageCircle,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import { useCurrency } from '@/src/hooks/useCurrency';

const courses = [
  // --- AI TOOLS (15) ---
  {
    id: 1,
    title: "AI Tools for Business Growth",
    desc: "Master ChatGPT, Midjourney, and automation to 10x your productivity.",
    outcome: "Save 20+ hours weekly using AI.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["High Income", "AI Mastery"],
    level: "Beginner",
    duration: "4 Hours",
    income: "₦200k - ₦500k/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Prompt Engineering Bootcamp",
    desc: "Learn the art of talking to AI to get perfect results every single time.",
    outcome: "Certified Prompt Engineer status.",
    price: "₦35,000",
    oldPrice: "₦105,000",
    tags: ["Tech", "Future Ready"],
    level: "Intermediate",
    duration: "6 Hours",
    income: "₦300k - ₦700k/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1684163761883-8a30364d9904?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "AI-Driven Data Analytics",
    desc: "Use AI to analyze business data and make smarter decisions for clients.",
    outcome: "Automated reporting systems.",
    price: "₦45,000",
    oldPrice: "₦135,000",
    tags: ["Business", "AI"],
    level: "Advanced",
    duration: "10 Hours",
    income: "₦400k - ₦1M/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "AI Voiceover & Music Mastery",
    desc: "Create professional voiceovers and music tracks using AI tools like ElevenLabs.",
    outcome: "Studio-quality audio without a mic.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["Creative", "Audio"],
    level: "Beginner",
    duration: "3 Hours",
    income: "₦100k - ₦300k/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "ChatGPT for Sales & Outreach",
    desc: "Automate your cold emails and sales scripts using advanced AI personas.",
    outcome: "5x higher reply rates.",
    price: "₦40,000",
    oldPrice: "₦120,000",
    tags: ["Sales", "AI"],
    level: "Beginner",
    duration: "4 Hours",
    income: "₦250k - ₦600k/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1543269608-bc15349e8d45?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "AI SaaS Builder Guide",
    desc: "Build 'No-Code' AI applications and sell them as a service (SaaS).",
    outcome: "Your own AI software product.",
    price: "₦120,000",
    oldPrice: "₦240,000",
    tags: ["Startup", "Dev-Free"],
    level: "Advanced",
    duration: "15 Hours",
    income: "₦1M+ Monthly recurring",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    title: "Midjourney Design Secrets",
    desc: "Generate hyper-realistic photos and logos for brands using AI Art.",
    outcome: "A professional AI design portfolio.",
    price: "₦35,000",
    oldPrice: "₦105,000",
    tags: ["Design", "AI Art"],
    level: "Beginner",
    duration: "5 Hours",
    income: "₦150k - ₦450k/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    title: "AI Video Transformation",
    desc: "Change faces, backgrounds, and automate sub-titles with AI video tools.",
    outcome: "Viral AI-generated video content.",
    price: "₦40,000",
    oldPrice: "₦120,000",
    tags: ["Video", "Editing"],
    level: "Intermediate",
    duration: "6 Hours",
    income: "₦200k - ₦600k/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    title: "Automated Research with AI",
    desc: "Write long-form articles, books, and researchers using deep-link AI tools.",
    outcome: "Write a full book in 2 days.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["Writing", "Research"],
    level: "Intermediate",
    duration: "8 Hours",
    income: "₦300k - ₦800k/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    title: "AI Automation for Agencies",
    desc: "Scale your agency by automating lead gen, onboarding, and fulfillment.",
    outcome: "Operate an agency with zero staff.",
    price: "₦125,000",
    oldPrice: "₦250,000",
    tags: ["Agency", "Scale"],
    level: "Advanced",
    duration: "12 Hours",
    income: "₦1M - ₦3M/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 11,
    title: "SGE & AI Search Optimization",
    desc: "Rank in the new AI-powered search world (Google SGE) using modern SEO tactics.",
    outcome: "Future-proof SEO dominance.",
    price: "₦45,000",
    oldPrice: "₦135,000",
    tags: ["SGE", "SEO"],
    level: "Advanced",
    duration: "9 Hours",
    income: "₦400k - ₦900k/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 12,
    title: "AI Agents & Autonomous Workflows",
    desc: "Build AI agents using CrewAI and LangChain to automate entire business processes.",
    outcome: "Fully automated 'Staff-less' workflows.",
    price: "₦150,000",
    oldPrice: "₦300,000",
    tags: ["Cutting Edge", "Automation"],
    level: "Advanced",
    duration: "15 Hours",
    income: "₦1.5M - ₦4M/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 13,
    title: "Personal Branding with AI",
    desc: "Automate your LinkedIn, x, and Instagram posts to build static authority.",
    outcome: "100k+ reach in 3 months.",
    price: "₦40,000",
    oldPrice: "₦120,000",
    tags: ["Brand", "Authority"],
    level: "Intermediate",
    duration: "7 Hours",
    income: "₦200k - ₦500k/mo",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 14,
    title: "AI Stock Trading Fundamentals",
    desc: "Use AI algorithms to analyze market trends and predict stock movements.",
    outcome: "Rule-based trading systems.",
    price: "₦50,000",
    oldPrice: "₦150,000",
    tags: ["Finance", "Trading"],
    level: "Advanced",
    duration: "10 Hours",
    income: "Variable (Passive)",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1611974769838-efce9173fbc3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 15,
    title: "Custom GPTs for Enterprise",
    desc: "Build highly specific AI agents for large companies and consult for them.",
    outcome: "B2B AI consultancy deals.",
    price: "₦185,000",
    oldPrice: "₦350,000",
    tags: ["Enterprise", "B2B"],
    level: "Advanced",
    duration: "14 Hours",
    income: "₦2M+ per project",
    cat: "ai",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
  },

  // --- CONTENT CREATION (15) ---
  {
    id: 16,
    title: "Smartphone Video Content Pro",
    desc: "Create cinematic videos using only your phone for TikTok and Instagram.",
    outcome: "Viral-ready video editing skills.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["Mobile First", "Content Creation"],
    level: "Beginner",
    duration: "6 Hours",
    income: "₦150k - ₦400k/mo",
    cat: "content",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 17,
    title: "YouTube Faceless Channel Mastery",
    desc: "Build a dollar-earning YouTube channel without ever showing your face.",
    outcome: "Passive income in USD.",
    price: "₦50,000",
    oldPrice: "₦150,000",
    tags: ["Passive Income", "YouTube"],
    level: "Intermediate",
    duration: "10 Hours",
    income: "$500 - $3,000/mo",
    cat: "content",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 18,
    title: "Viral TikTok Growth blueprint",
    desc: "The exact strategy to gain 10k followers in 30 days and monetize them.",
    outcome: "Monetized TikTok presence.",
    price: "₦35,000",
    oldPrice: "₦105,000",
    tags: ["Virality", "Social Media"],
    level: "Beginner",
    duration: "5 Hours",
    income: "₦100k - ₦300k/mo",
    cat: "content",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 19,
    title: "CapCut Pro Editing Mastery",
    desc: "Master transitions, overlays, and advanced effects in CapCut mobile/PC.",
    outcome: "Professional video editor status.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["Editing", "Skill"],
    level: "Beginner",
    duration: "4 Hours",
    income: "₦15k - ₦40k per video",
    cat: "content",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 20,
    title: "Podcast Launch & Growth",
    desc: "Start a podcast that attracts top guests and generates sponsorship revenue.",
    outcome: "Fully launched podcast series.",
    price: "₦45,000",
    oldPrice: "₦135,000",
    tags: ["Audio", "Influence"],
    level: "Intermediate",
    duration: "8 Hours",
    income: "₦200k+ in Sponsorships",
    cat: "content",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 21,
    title: "Visual Storytelling Fundamentals",
    desc: "Learn the psychology of colors and shots to tell stories that evoke emotion.",
    outcome: "Compelling visual narratives.",
    price: "₦40,000",
    oldPrice: "₦120,000",
    tags: ["Creative", "Art"],
    level: "Intermediate",
    duration: "6 Hours",
    income: "Creative Director Role",
    cat: "content",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 22,
    title: "Newsletter Fortune Secrets",
    desc: "Build a massive email list and write newsletters that subscribers love.",
    outcome: "Owned audience asset.",
    price: "₦35,000",
    oldPrice: "₦105,000",
    tags: ["Writing", "Business"],
    level: "Beginner",
    duration: "5 Hours",
    income: "₦100k - ₦500k/mo",
    cat: "content",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 23,
    title: "Graphic Design for Social Media",
    desc: "Create high-converting static posts and carousels using Canva & Photoshop.",
    outcome: "High-end design portfolio.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["Design", "Marketing"],
    level: "Beginner",
    duration: "8 Hours",
    income: "₦50k - ₦150k per client",
    cat: "content",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 24,
    title: "Scriptwriting for Viral Reels",
    desc: "The 3-second hook framework that keeps people watching your content.",
    outcome: "Engagement-focused scripts.",
    price: "₦35,000",
    oldPrice: "₦105,000",
    tags: ["Writing", "Hooks"],
    level: "Beginner",
    duration: "3 Hours",
    income: "₦30k - ₦100k per script",
    cat: "content",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 25,
    title: "UGC Content Creator Mastery",
    desc: "Get paid by brands to create casual review videos from your home.",
    outcome: "Paid brand partnership deals.",
    price: "₦40,000",
    oldPrice: "₦120,000",
    tags: ["UGC", "Ads"],
    level: "Beginner",
    duration: "6 Hours",
    income: "$100 - $500 per video",
    cat: "content",
    image: "https://images.unsplash.com/photo-1496065187357-19ad0ad3f117?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 26,
    title: "Viral Documentary Storytelling",
    desc: "Master the editing and script style of top creators like Iman Gadzhi to hook millions.",
    outcome: "Authority-building viral video.",
    price: "₦60,000",
    oldPrice: "₦180,000",
    tags: ["Elite", "Editing"],
    level: "Advanced",
    duration: "12 Hours",
    income: "₦500k - ₦2M per project",
    cat: "content",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 27,
    title: "Pinterest Affiliate Arbitrage",
    desc: "Use Pinterest's massive search traffic to drive affiliate sales on autopilot.",
    outcome: "Passive affiliate income stream.",
    price: "₦35,000",
    oldPrice: "₦105,000",
    tags: ["Arbitrage", "Passive"],
    level: "Intermediate",
    duration: "5 Hours",
    income: "₦200k - ₦600k/mo",
    cat: "content",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cbca86?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 28,
    title: "Livestream Pro Setup",
    desc: "Set up professional OBS scenes for gaming, teaching, or selling products live.",
    outcome: "Pro-level live broadcast.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["Live", "Tech"],
    level: "Intermediate",
    duration: "5 Hours",
    income: "₦200k+ in Tips/Sales",
    cat: "content",
    image: "https://images.unsplash.com/photo-1478720170044-f8500218b378?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 29,
    title: "AI Stock Media Empire",
    desc: "Generate 4k AI clips and high-end stock photos to sell on global marketplaces.",
    outcome: "Passive AI royalty income.",
    price: "₦40,000",
    oldPrice: "₦120,000",
    tags: ["AI Art", "Passive"],
    level: "Beginner",
    duration: "4 Hours",
    income: "Variable USD Monthly",
    cat: "content",
    image: "https://images.unsplash.com/photo-1493723843671-1d655e7d98f0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 30,
    title: "TikTok Shop Affiliate Mastery",
    desc: "The hottest trend in 2024. Learn to earn consistent commissions without owning products.",
    outcome: "Scalable TikTok Shop income.",
    price: "₦45,000",
    oldPrice: "₦135,000",
    tags: ["Viral Trend", "Affiliate"],
    level: "Beginner",
    duration: "8 Hours",
    income: "₦500k - ₦2.5M/mo",
    cat: "content",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800"
  },

  // --- MARKETING (15) ---
  {
    id: 31,
    title: "Social Media Ads Blueprint",
    desc: "Run profitable Facebook & Instagram ads for any business niche.",
    outcome: "Predictable ROAS for clients.",
    price: "₦45,000",
    oldPrice: "₦135,000",
    tags: ["Marketing", "Sales Focused"],
    level: "Advanced",
    duration: "8 Hours",
    income: "₦300k - ₦800k/mo",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 32,
    title: "Search Engine Optimization Pro",
    desc: "Rank on Page 1 of Google and drive consistent free traffic for years.",
    outcome: "Authority-level SEO skills.",
    price: "₦110,000",
    oldPrice: "₦220,000",
    tags: ["Organic", "Search"],
    level: "Intermediate",
    duration: "12 Hours",
    income: "₦500k - ₦1.2M/mo",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 33,
    title: "Email Marketing Automations",
    desc: "Build lead magnets and automated email sequences that sell while you sleep.",
    outcome: "Automated sales engine.",
    price: "₦35,000",
    oldPrice: "₦105,000",
    tags: ["Automation", "Sales"],
    level: "Intermediate",
    duration: "6 Hours",
    income: "₦200k - ₦600k/mo",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 34,
    title: "Conversion Rate Optimization (CRO)",
    desc: "How to fix a website that isn't selling and double its conversion rate.",
    outcome: "High-demand consultant status.",
    price: "₦60,000",
    oldPrice: "₦180,000",
    tags: ["Logic", "Data"],
    level: "Advanced",
    duration: "10 Hours",
    income: "₦1M+ Monthly potential",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 35,
    title: "Influencer Marketing Secret",
    desc: "Find, vet, and partner with influencers to blow up your brand overnight.",
    outcome: "Scalable brand partnerships.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["Influence", "Partners"],
    level: "Beginner",
    duration: "5 Hours",
    income: "₦150k - ₦400k/mo",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 36,
    title: "Google Search Ads Mastery",
    desc: "Target people actively searching for what you sell on Google.",
    outcome: "Intent-based sales magic.",
    price: "₦55,000",
    oldPrice: "₦165,000",
    tags: ["SEM", "PPC"],
    level: "Advanced",
    duration: "8 Hours",
    income: "₦300k - ₦900k/mo",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 37,
    title: "YouTube Ads for Info-Products",
    desc: "Target high-intent audiences on YouTube to sell courses, books, and coaching.",
    outcome: "Scalable automated sales.",
    price: "₦55,000",
    oldPrice: "₦165,000",
    tags: ["Paid Ads", "YouTube"],
    level: "Advanced",
    duration: "10 Hours",
    income: "₦1M - ₦5M per month",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 38,
    title: "TikTok Ads for E-com Scaling",
    desc: "Master the algorithm and creative strategy to scale brands to 7-figures using TikTok.",
    outcome: "Mastery of viral ad creation.",
    price: "₦50,000",
    oldPrice: "₦150,000",
    tags: ["Scaling", "E-com"],
    level: "Advanced",
    duration: "10 Hours",
    income: "₦500k - ₦2M/mo",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 39,
    title: "LinkedIn Ads for B2B",
    desc: "Target decision-makers at Fortune 500 companies with high-intent ads.",
    outcome: "Enterprise client leads.",
    price: "₦35,000",
    oldPrice: "₦100,000",
    tags: ["B2B", "Corporate"],
    level: "Advanced",
    duration: "10 Hours",
    income: "₦2M+ per deal",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 40,
    title: "High-Ticket Sales Funnels",
    desc: "Design and build $10k+ funnel systems for coaches, consultants, and agencies.",
    outcome: "Expert funnel architect status.",
    price: "₦145,000",
    oldPrice: "₦290,000",
    tags: ["High Ticket", "ROI"],
    level: "Advanced",
    duration: "12 Hours",
    income: "₦1M - ₦3M per project",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 41,
    title: "Spotify & Audio Advertising",
    desc: "Market your product through audio ads on global streaming platforms.",
    outcome: "Auditory brand presence.",
    price: "₦40,000",
    oldPrice: "₦120,000",
    tags: ["Audio", "AdTech"],
    level: "Intermediate",
    duration: "6 Hours",
    income: "₦200k - ₦500k/mo",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 42,
    title: "Social Media Community Managment",
    desc: "How to build and nurture a Facebook/Discord community that sells for you.",
    outcome: "Loyal superfan base.",
    price: "₦35,000",
    oldPrice: "₦105,000",
    tags: ["Community", "Growth"],
    level: "Beginner",
    duration: "7 Hours",
    income: "₦100k - ₦250k/mo",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1522071823991-b5ae7264855d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 43,
    title: "Faceless Pinterest Automation",
    desc: "Build massive Pinterest accounts that drive traffic to e-com stores on autopilot.",
    outcome: "Profitable eCommerce growth.",
    price: "₦45,000",
    oldPrice: "₦135,000",
    tags: ["E-com", "Automation"],
    level: "Intermediate",
    duration: "8 Hours",
    income: "₦300k - ₦1M/mo",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 44,
    title: "Digital PR & Journalist Outreach",
    desc: "Get featured on top news sites like CNN or TechCrunch without paying for ads.",
    outcome: "Massive authority boost.",
    price: "₦65,000",
    oldPrice: "₦195,000",
    tags: ["PR", "Credibility"],
    level: "Advanced",
    duration: "10 Hours",
    income: "₦500k - ₦1.5M/mo",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 45,
    title: "Marketing Psychology 101",
    desc: "Learn why people buy and how to trigger 'Buy' signals in their brain.",
    outcome: "Psychological edge in sales.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["Mindset", "Sales"],
    level: "Beginner",
    duration: "5 Hours",
    income: "Marketing Strategist Path",
    cat: "marketing",
    image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&q=80&w=800"
  },

  // --- BUSINESS / FREELANCE (15) ---
  {
    id: 46,
    title: "Freelance Copywriting Secrets",
    desc: "Write words that sell and land high-paying international clients.",
    outcome: "Land your first $500 client.",
    price: "₦55,000",
    oldPrice: "₦165,000",
    tags: ["High Income", "Global Skills"],
    level: "Intermediate",
    duration: "12 Hours",
    income: "₦500k - ₦1.5M/mo",
    cat: "business",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 47,
    title: "High-Ticket Closing Mastery",
    desc: "Learn the phone skills to close $5k-10k deals for coaches and companies.",
    outcome: "10% commission on every deal.",
    price: "₦50,000",
    oldPrice: "₦120,000",
    tags: ["Elite", "Closing"],
    level: "Advanced",
    duration: "20 Hours",
    income: "$3,000 - $10,000/mo",
    cat: "business",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 48,
    title: "Remote Work Essentials",
    desc: "How to find and land remote jobs in USA/UK and get paid in Dollars.",
    outcome: "USD-based monthly salary.",
    price: "₦40,000",
    oldPrice: "₦120,000",
    tags: ["Dollars", "Jobs"],
    level: "Beginner",
    duration: "6 Hours",
    income: "$1,500 - $4,00b/mo",
    cat: "business",
    image: "https://images.unsplash.com/photo-1522071823991-b5ae7264855d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 49,
    title: "Social Media Agency (SMMA) blueprint",
    desc: "Build a business that manages social media for global companies.",
    outcome: "Recurring agency revenue.",
    price: "₦60,000",
    oldPrice: "₦180,000",
    tags: ["Agency", "Entrepreneur"],
    level: "Intermediate",
    duration: "15 Hours",
    income: "₦500k - ₦3M/mo",
    cat: "business",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 50,
    title: "Upwork & Fiverr Optimization",
    desc: "Get your profile in the top 1% and have clients come to you.",
    outcome: "Top Rated freelancer badge.",
    price: "₦35,000",
    oldPrice: "₦105,000",
    tags: ["Freelance", "Platform"],
    level: "Beginner",
    duration: "5 Hours",
    income: "₦150k - ₦500k/mo",
    cat: "business",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 51,
    title: "Drop-servicing Agency Mastery",
    desc: "The middleman business model. Sell high-end digital services and outsource to experts.",
    outcome: "Automated service agency.",
    price: "₦50,000",
    oldPrice: "₦150,000",
    tags: ["Arbitrage", "Business"],
    level: "Intermediate",
    duration: "12 Hours",
    income: "₦500k - ₦3M/mo",
    cat: "business",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 52,
    title: "Consulting Fee Strategy",
    desc: "How to charge based on results, not hours, and 10x your pricing.",
    outcome: "Premium pricing mindset.",
    price: "₦45,000",
    oldPrice: "₦135,000",
    tags: ["Pricing", "Sales"],
    level: "Advanced",
    duration: "5 Hours",
    income: "Immediate pricing hike",
    cat: "business",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 53,
    title: "Cold Email Infrastructure & 1% Outreach",
    desc: "Build professional cold email engines that land inbox every time and close CEOs.",
    outcome: "High-ticket sales meetings.",
    price: "₦35,000",
    oldPrice: "₦105,000",
    tags: ["Sales", "Infrastructure"],
    level: "Intermediate",
    duration: "6 Hours",
    income: "₦400k - ₦1M/mo",
    cat: "business",
    image: "https://images.unsplash.com/photo-1453722751116-95927d75251c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 54,
    title: "Negotiation Skills for Winners",
    desc: "Never settle for less than you're worth. Advanced negotiation drills.",
    outcome: "Win-win deal structures.",
    price: "₦40,000",
    oldPrice: "₦120,000",
    tags: ["Mindset", "Power"],
    level: "Intermediate",
    duration: "7 Hours",
    income: "Negotiator Career Path",
    cat: "business",
    image: "https://images.unsplash.com/photo-1543269608-bc15349e8d45?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 55,
    title: "Virtual Assistant Bootcamp",
    desc: "Start working for busy executives and manage their life/business remote.",
    outcome: "Stable monthly contract.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["Basic", "Support"],
    level: "Beginner",
    duration: "6 Hours",
    income: "₦80k - ₦200k/mo",
    cat: "business",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 56,
    title: "Online Course Creation",
    desc: "Turn your unique knowledge into a video course and sell it worldwide.",
    outcome: "Your own digital product.",
    price: "₦75,000",
    oldPrice: "₦225,000",
    tags: ["Passive", "Teaching"],
    level: "Intermediate",
    duration: "10 Hours",
    income: "₦1M - ₦5M/year potential",
    cat: "business",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 57,
    title: "Ghostwriting for Creators & CEOs",
    desc: "Build influence and authority for top figures on X (Twitter) and LinkedIn.",
    outcome: "Premium ghostwriter portfolio.",
    price: "₦60,000",
    oldPrice: "₦180,000",
    tags: ["Elite", "Influence"],
    level: "Advanced",
    duration: "10 Hours",
    income: "₦500k - ₦2.5M/mo",
    cat: "business",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 58,
    title: "Public Speaking & Charisma",
    desc: "Command the room (and Zoom calls) with powerful speaking techniques.",
    outcome: "Elite communication skills.",
    price: "₦40,000",
    oldPrice: "₦120,000",
    tags: ["Influence", "Soft Skills"],
    level: "Intermediate",
    duration: "8 Hours",
    income: "Speaker Career Path",
    cat: "business",
    image: "https://images.unsplash.com/photo-1475721027785-f74dea327912?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 59,
    title: "Amazon KDP Publishing",
    desc: "Self-publish low-content books and journals on Amazon for USD royalties.",
    outcome: "Amazon Author status.",
    price: "₦30,000",
    oldPrice: "₦90,000",
    tags: ["Publishing", "Dollars"],
    level: "Beginner",
    duration: "6 Hours",
    income: "$200 - $1,500/mo (Passive)",
    cat: "business",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 60,
    title: "GoHighLevel SaaS Agency",
    desc: "Build a white-labeled software business using GHL to serve local and global clients.",
    outcome: "Recurring software revenue.",
    price: "₦75,000",
    oldPrice: "₦225,000",
    tags: ["SaaS", "Agency"],
    level: "Advanced",
    duration: "15 Hours",
    income: "₦1M - ₦5M/mo",
    cat: "business",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800"
  }
];

const categories = [
  { id: 'all', label: 'All Skills', icon: Globe },
  { id: 'marketing', label: 'Marketing', icon: Target },
  { id: 'ai', label: 'AI Tools', icon: Cpu },
  { id: 'content', label: 'Content', icon: Smartphone },
  { id: 'business', label: 'Freelance', icon: Monitor },
];

export default function DigitAcademy() {
  const [activeCat, setActiveCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => setMounted(true), []);

  const filteredCourses = courses.filter(c => {
    const matchesCat = activeCat === 'all' || c.cat === activeCat;
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold tracking-widest uppercase mb-8"
            >
              <Zap size={14} className="fill-emerald-400" /> The Skill Hub for the Digital Economy
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8"
            >
              Master High-Income <span className="text-emerald-500">Digital Skills</span> Instantly.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative max-w-2xl mb-12 group"
            >
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={24} />
              </div>
              <input
                type="text"
                placeholder="Search for a skill (AI, Video, Marketing...)"
                className="w-full bg-slate-900 border-2 border-slate-800 text-white text-xl font-bold py-6 pl-16 pr-44 rounded-2xl focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-600 shadow-2xl shadow-emerald-500/5 hover:border-slate-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
              <button 
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="absolute right-2 inset-y-2 px-8 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg rounded-xl transition-all active:scale-95 flex items-center gap-2"
              >
                Search <ArrowRight size={20} />
              </button>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-12"
            >
              Learn in-demand skills from industry experts. Get instant access to step-by-step videos, PDFs, and a Telegram mentorship community. Start earning in weeks, not years.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
              >
                Browse All Courses <ArrowRight size={24} />
              </button>
              <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                 <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                        {String.fromCharCode(64 + i)}
                     </div>
                   ))}
                 </div>
                 <div className="text-sm">
                    <div className="text-white font-bold">1,200+ Students</div>
                    <div className="text-slate-400 text-xs">Learning daily</div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract shapes for visual flair */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden lg:block opacity-20">
           <div className="w-[500px] h-[500px] border-[40px] border-emerald-500 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* 2. WHY DIGITACADEMY */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-4">Why DigitAcademy</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">The Modern Way to <span className="text-emerald-500">Learn & Earn</span>.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: PlayCircle, title: "Step-by-Step Videos", desc: "No fluff. Straight to the point. Mobile-friendly video lessons you can watch anywhere." },
               { icon: Download, title: "Instant Access", desc: "Pay and download your curriculum immediately. Start your journey in less than 60 seconds." },
               { icon: Users, title: "Telegram Community", desc: "Join 1,000+ like-minded achievers. Get mentored by experts and network with peers." }
             ].map((feature, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
                 className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all"
               >
                 <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                   <feature.icon size={32} />
                 </div>
                 <h4 className="text-2xl font-black text-slate-900 mb-4">{feature.title}</h4>
                 <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <CourseTicker />

      {/* 3. FEATURED COURSES SECTION */}
      <section id="courses" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-4">Trending Skills</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Access <span className="text-emerald-600">High-Value</span> Knowledge.</h3>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                    activeCat === cat.id 
                    ? "bg-slate-950 text-white shadow-lg" 
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  <cat.icon size={16} /> {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <motion.div
                    layout
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-emerald-500 transition-all shadow-sm hover:shadow-2xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image 
                        src={course.image} 
                        alt={course.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        title={course.title}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                          {course.level}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                        {course.desc}
                      </p>
                      
                      <div className="space-y-4 mb-8">
                         <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                            <Target size={14} className="text-emerald-500" /> {course.outcome}
                         </div>
                         <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                            <TrendingUp size={14} className="text-emerald-500" /> Income: {formatPrice(course.income)}
                         </div>
                         <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                            <Clock size={14} className="text-emerald-500" /> {course.duration} to complete
                         </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-50">
                         <div>
                            <div className="text-slate-400 text-xs line-through font-bold">{formatPrice(course.oldPrice)}</div>
                            <div className="text-2xl font-black text-slate-900">{formatPrice(course.price)}</div>
                         </div>
                         <button className="flex-grow bg-slate-950 hover:bg-emerald-600 text-white p-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 group-hover:scale-105">
                            Enroll Now <ChevronRight size={18} />
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-6">
                    <Search size={40} className="text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">No Courses Found</h3>
                  <p className="text-slate-500 font-medium">Try searching for something else or browse categories.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCat('all');}}
                    className="mt-6 text-emerald-600 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
             <div className="lg:w-1/2">
                <h2 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-4">The Process</h2>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-8">3 Simple Steps to <span className="text-emerald-500">Global Mastery</span>.</h3>
                
                <div className="space-y-12">
                   {[
                     { step: "01", title: "Select Your Skill", desc: "Choose from our curated courses designed for high-demand digital jobs." },
                     { step: "02", title: "Pay & Access Instantly", desc: "Complete your one-time payment and get your download link via WhatsApp/Email." },
                     { step: "03", title: "Learn & Join Community", desc: "Watch the videos, follow the PDFs, and join our mentors in the Telegram group." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-8 group">
                        <div className="text-4xl font-black text-white/10 group-hover:text-emerald-500/20 transition-colors leading-none">{item.step}</div>
                        <div>
                           <h4 className="text-2xl font-black mb-3">{item.title}</h4>
                           <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="lg:w-1/2 relative">
                <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                   <Image 
                     src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                     alt="Process" 
                     fill 
                     className="object-cover opacity-60" 
                     title="Academy process"
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                   
                   {/* Floating Stats Card */}
                   <motion.div 
                     initial={{ x: 50, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     className="absolute bottom-8 right-8 bg-white p-6 rounded-3xl text-slate-900 shadow-2xl"
                   >
                      <div className="flex items-center gap-4 mb-4">
                         <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-black">Success</div>
                         <div className="text-sm font-black">98% Certification rate</div>
                      </div>
                      <div className="flex -space-x-2">
                         {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>)}
                      </div>
                   </motion.div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. CERTIFICATION & TRUST */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="max-w-3xl mx-auto">
             <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-10">
               <Award size={40} />
             </div>
             <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">Get Recognized for <span className="text-emerald-500">Your Expertise</span>.</h3>
             <p className="text-xl text-slate-500 mb-12 font-medium leading-relaxed">
               Complete your practical assignments and receive a professionally designed **DigitAcademy Certificate of Completion**. Use it to boost your CV, LinkedIn profile, or client proposals.
             </p>
             <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-3 bg-slate-50 px-8 py-4 rounded-2xl border border-slate-100">
                   <ShieldCheck size={24} className="text-emerald-500" />
                   <span className="font-black text-slate-700">Verified Credentials</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-8 py-4 rounded-2xl border border-slate-100">
                   <Users size={24} className="text-emerald-500" />
                   <span className="font-black text-slate-700">Telegram Community</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-8 py-4 rounded-2xl border border-slate-100">
                   <StarIcon size={24} className="text-emerald-500 fill-emerald-500" />
                   <span className="font-black text-slate-700">5-Star Education</span>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 6. TELEGRAM SECTION */}
      <section className="py-24 bg-emerald-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-slate-950 rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
              
              <div className="md:w-2/3 relative z-10">
                 <h2 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-6">Mentorship & Support</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8">We Support Every Student <span className="text-emerald-500">Individually</span></h3>
                 <p className="text-slate-400 text-lg mb-10 font-medium leading-relaxed max-w-xl">
                   Beyond the training, we stay connected with you personally. Students receive mentorship, accountability, and direct support via Telegram, WhatsApp, and Email to ensure steady growth and real results.
                 </p>
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-white font-bold">
                       <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                          <Send size={18} className="text-white" />
                       </div>
                       <span>Telegram</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold">
                       <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <MessageCircle size={18} className="text-white" />
                       </div>
                       <span>WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold">
                       <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <Mail size={18} className="text-white" />
                       </div>
                       <span>Email</span>
                    </div>
                 </div>
              </div>
              
              <div className="md:w-1/3 flex justify-center">
                 <div className="w-48 h-48 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-500/50">
                    <Users size={80} className="text-white" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-32 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-10">Stop Searching. <br /> <span className="text-emerald-500 italic lowercase">Start Mastering.</span></h2>
           <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
             The bridge between where you are and where you want to be is a skill. Pick yours today and change your financial story.
           </p>
           <button 
             onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-12 py-6 bg-slate-950 hover:bg-emerald-600 text-white font-black text-2xl rounded-2xl transition-all shadow-2xl hover:shadow-emerald-500/20 active:scale-95"
           >
              Choose My Skill Now
           </button>
           
           <div className="mt-16 pt-16 border-t border-slate-200 flex flex-wrap justify-center gap-12 opacity-50">
              <div className="text-slate-400 font-black lowercase tracking-tight text-2xl">mobile-first</div>
              <div className="text-slate-400 font-black lowercase tracking-tight text-2xl">instant-access</div>
              <div className="text-slate-400 font-black lowercase tracking-tight text-2xl">mentor-led</div>
           </div>
        </div>
      </section>

      {/* Footer minimal info */}
      <footer className="py-12 bg-white border-t border-slate-50 text-center">
      </footer>

      <EnrollmentNotification />
    </div>
  );
}
