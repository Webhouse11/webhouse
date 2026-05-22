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

/*
const rawCourses = [
  // COMMENTED OUT OLD SYSTEM DATA FOR RAPID RE-COMPILING
  // --- FLAGSHIP COURSE ---
  {
    id: 100,
    title: "Viral Storytelling & AI Content Automation",
    desc: "Learn How to Create Viral Stories for 10+ Global Platforms, Use AI Automation to Work Smarter and Faster, Build Massive Audience Engagement, Grow a Loyal Community, and Turn Your Content Into Consistent Online Income.",
    outcome: "Command 10+ platforms with AI scale.",
    price: "₦75,000",
    oldPrice: "₦180,000",
    tags: ["Flagship", "Viral Masterclass"],
    level: "All Levels",
    duration: "18 Hours",
    income: "₦500k - ₦2.5M/mo",
    cat: "content",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800"
  },
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
*/

const courseDirectoryData = [
  // --- AI & Automation ---
  {
    rank: 1,
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "AI Prompting & Workflow Automation",
    desc1: "How to write powerful AI prompts that get real results",
    desc2: "How to automate your daily work using ChatGPT, Claude & Zapier",
    level: "Beginner-friendly",
    income: "",
    trending: true,
    new: false,
  },
  {
    rank: 2,
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "AI-Powered Content Writing",
    desc1: "How to write blogs, ads & emails 10x faster using AI tools",
    desc2: "How to build a content writing business with AI assistance",
    level: "Beginner-friendly",
    income: "$30–75K",
    trending: false,
    new: false,
  },
  {
    rank: 3,
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "AI Video Production",
    desc1: "How to create professional videos using Runway, HeyGen & Sora",
    desc2: "How to start an AI video agency and land paying clients",
    level: "Intermediate",
    income: "$50–130K",
    trending: true,
    new: false,
  },
  {
    rank: 4,
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "n8n / Make.com Automation",
    desc1: "How to build powerful business automations with n8n and Make.com",
    desc2: "How to sell automation systems as a done-for-you service",
    level: "Intermediate",
    income: "$60–140K",
    trending: true,
    new: false,
  },
  {
    rank: 5,
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "Prompt Engineering (Advanced)",
    desc1: "How to engineer advanced prompts for LLMs, agents & pipelines",
    desc2: "How to get hired as a prompt engineer or AI consultant",
    level: "Advanced",
    income: "$80–180K",
    trending: true,
    new: false,
  },
  {
    rank: 6,
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "AI Chatbot & Agent Development",
    desc1: "How to build custom AI chatbots using Claude, GPT & LangChain",
    desc2: "How to sell AI agent solutions to businesses as a service",
    level: "Advanced",
    income: "$80–200K",
    trending: true,
    new: false,
  },

  // --- Content Creation ---
  {
    rank: 7,
    category: "content-creation",
    categoryLabel: "Content Creation",
    title: "Short-Form Video Creation",
    desc1: "How to create scroll-stopping TikTok & Reels from scratch",
    desc2: "How to grow to 10K followers with short-form video strategy",
    level: "Beginner-friendly",
    income: "",
    trending: true,
    new: false,
  },
  {
    rank: 8,
    category: "content-creation",
    categoryLabel: "Content Creation",
    title: "Copywriting & Persuasion",
    desc1: "How to write copy that sells — ads, landing pages & emails",
    desc2: "How to charge premium rates as a freelance copywriter",
    level: "Beginner-friendly",
    income: "$40–100K",
    trending: false,
    new: false,
  },
  {
    rank: 9,
    category: "content-creation",
    categoryLabel: "Content Creation",
    title: "Personal Branding & LinkedIn Growth",
    desc1: "How to build a personal brand on LinkedIn that attracts opportunities",
    desc2: "How to grow to 5,000+ LinkedIn followers and monetize your audience",
    level: "Beginner-friendly",
    income: "$30–80K",
    trending: true,
    new: false,
  },
  {
    rank: 10,
    category: "content-creation",
    categoryLabel: "Content Creation",
    title: "Video Editing (Premiere, CapCut)",
    desc1: "How to edit videos professionally with CapCut and Premiere Pro",
    desc2: "How to get paid editing videos for content creators & brands",
    level: "Beginner-friendly",
    income: "$30–80K",
    trending: false,
    new: false,
  },
  {
    rank: 11,
    category: "content-creation",
    categoryLabel: "Content Creation",
    title: "Community Building & Monetization",
    desc1: "How to build and monetize an online community on Skool or Discord",
    desc2: "How to turn your audience into a paid membership business",
    level: "Intermediate",
    income: "$40–150K",
    trending: false,
    new: false,
  },

  // --- Marketing ---
  {
    rank: 12,
    category: "marketing",
    categoryLabel: "Marketing",
    title: "Social Media Marketing",
    desc1: "How to manage social media accounts and get paid for it",
    desc2: "How to build a brand audience from zero on Instagram & LinkedIn",
    level: "Beginner-friendly",
    income: "",
    trending: false,
    new: false,
  },
  {
    rank: 13,
    category: "marketing",
    categoryLabel: "Marketing",
    title: "Sales Funnel Building",
    desc1: "How to build high-converting sales funnels with ClickFunnels 2.0",
    desc2: "How to design lead generation systems that sell on autopilot",
    level: "Intermediate",
    income: "$50–120K",
    trending: true,
    new: false,
  },
  {
    rank: 14,
    category: "marketing",
    categoryLabel: "Marketing",
    title: "SEO & Content Strategy",
    desc1: "How to rank on Google in 2026 using AI-era SEO techniques",
    desc2: "How to build a content strategy that drives organic traffic",
    level: "Intermediate",
    income: "$40–100K",
    trending: false,
    new: false,
  },
  {
    rank: 15,
    category: "marketing",
    categoryLabel: "Marketing",
    title: "Email Marketing & Automation",
    desc1: "How to build an email list from scratch and turn it into income",
    desc2: "How to set up automated email sequences that convert subscribers",
    level: "Beginner-friendly",
    income: "$35–80K",
    trending: false,
    new: false,
  },
  {
    rank: 16,
    category: "marketing",
    categoryLabel: "Marketing",
    title: "Paid Ads (Meta, Google, TikTok)",
    desc1: "How to run profitable Meta and Google ads for small businesses",
    desc2: "How to build a paid ads agency with recurring retainer clients",
    level: "Intermediate",
    income: "$50–130K",
    trending: false,
    new: false,
  },

  // --- Development ---
  {
    rank: 17,
    category: "development",
    categoryLabel: "Development",
    title: "No-Code / Low-Code Development",
    desc1: "How to build web apps without writing code using Webflow & Bubble",
    desc2: "How to launch a no-code SaaS product in 30 days",
    level: "Intermediate",
    income: "",
    trending: true,
    new: false,
  },
  {
    rank: 18,
    category: "development",
    categoryLabel: "Development",
    title: "WordPress & Website Development",
    desc1: "How to build professional WordPress websites for clients",
    desc2: "How to launch a web design freelance business from scratch",
    level: "Beginner-friendly",
    income: "$40–90K",
    trending: false,
    new: false,
  },

  // --- Tech & Security ---
  {
    rank: 19,
    category: "tech-security",
    categoryLabel: "Tech & Security",
    title: "Cybersecurity Fundamentals",
    desc1: "How to get your first cybersecurity certification (CompTIA Security+)",
    desc2: "How to protect businesses from cyber threats as a freelancer",
    level: "Intermediate",
    income: "",
    trending: true,
    new: false,
  },
  {
    rank: 20,
    category: "tech-security",
    categoryLabel: "Tech & Security",
    title: "Cloud Computing (AWS, GCP)",
    desc1: "How to pass your AWS Cloud Practitioner exam from scratch",
    desc2: "How to deploy apps and manage cloud infrastructure for clients",
    level: "Advanced",
    income: "$80–160K",
    trending: false,
    new: false,
  },

  // --- Data & AI ---
  {
    rank: 21,
    category: "data-ai",
    categoryLabel: "Data & AI",
    title: "Data Analytics & Visualization",
    desc1: "How to analyze data and build dashboards with Power BI & Looker",
    desc2: "How to turn raw data into business insights clients will pay for",
    level: "Intermediate",
    income: "",
    trending: false,
    new: false,
  },
  {
    rank: 22,
    category: "data-ai",
    categoryLabel: "Data & AI",
    title: "Python for Automation & Data",
    desc1: "How to learn Python from zero and automate repetitive tasks",
    desc2: "How to use Python to scrape data, build bots & create scripts",
    level: "Intermediate",
    income: "$60–140K",
    trending: false,
    new: false,
  },
  {
    rank: 23,
    category: "data-ai",
    categoryLabel: "Data & AI",
    title: "Machine Learning Basics",
    desc1: "How to get started with machine learning using Python & HuggingFace",
    desc2: "How to fine-tune AI models and build RAG-powered applications",
    level: "Advanced",
    income: "$90–200K",
    trending: false,
    new: false,
  },

  // --- Design ---
  {
    rank: 24,
    category: "design",
    categoryLabel: "Design",
    title: "UX / UI Design",
    desc1: "How to design beautiful, user-friendly interfaces with Figma",
    desc2: "How to get your first UX design client with a portfolio",
    level: "Intermediate",
    income: "",
    trending: false,
    new: false,
  },
  {
    rank: 25,
    category: "design",
    categoryLabel: "Design",
    title: "Graphic Design (Canva, Figma)",
    desc1: "How to create stunning graphics for brands using Canva & Figma",
    desc2: "How to build a graphic design side income with digital templates",
    level: "Beginner-friendly",
    income: "$30–70K",
    trending: false,
    new: false,
  },
  {
    rank: 26,
    category: "design",
    categoryLabel: "Design",
    title: "AR / VR Content & Spatial Design",
    desc1: "How to create augmented reality experiences for Apple Vision Pro",
    desc2: "How to design immersive spatial content for the next web",
    level: "Advanced",
    income: "$80–180K",
    trending: true,
    new: false,
  },
  {
    rank: 27,
    category: "design",
    categoryLabel: "Design",
    title: "Brand Identity Design",
    desc1: "How to design a complete brand identity — logo, colours & typography",
    desc2: "How to charge $2K–$10K for brand identity packages as a designer",
    level: "Intermediate",
    income: "$50–120K",
    trending: true,
    new: true,
  },
  {
    rank: 28,
    category: "design",
    categoryLabel: "Design",
    title: "Motion Graphics & Animation",
    desc1: "How to create eye-catching motion graphics with After Effects",
    desc2: "How to use motion design to elevate brand videos and social content",
    level: "Intermediate",
    income: "$55–130K",
    trending: false,
    new: true,
  },
  {
    rank: 29,
    category: "design",
    categoryLabel: "Design",
    title: "AI-Generated Visual Design",
    desc1: "How to create professional design assets using Midjourney & Adobe Firefly",
    desc2: "How to build a design business selling AI-generated visuals and templates",
    level: "Beginner-friendly",
    income: "$40–100K",
    trending: true,
    new: true,
  },

  // --- Business Systems ---
  {
    rank: 30,
    category: "business-systems",
    categoryLabel: "Business Systems",
    title: "E-Commerce & Dropshipping Ops",
    desc1: "How to launch a profitable dropshipping store in 2026",
    desc2: "How to automate your Shopify store and scale to consistent revenue",
    level: "Intermediate",
    income: "",
    trending: false,
    new: false,
  },
  {
    rank: 31,
    category: "business-systems",
    categoryLabel: "Business Systems",
    title: "GoHighLevel & CRM Systems",
    desc1: "How to set up GoHighLevel for agencies and service businesses",
    desc2: "How to sell GHL SaaS subscriptions and earn recurring income",
    level: "Intermediate",
    income: "$60–130K",
    trending: true,
    new: true,
  },
  {
    rank: 32,
    category: "business-systems",
    categoryLabel: "Business Systems",
    title: "Affiliate Marketing Systems",
    desc1: "How to build a content + funnel + email affiliate marketing system",
    desc2: "How to earn passive income promoting digital products online",
    level: "Intermediate",
    income: "$40–150K",
    trending: false,
    new: true,
  },
  {
    rank: 33,
    category: "business-systems",
    categoryLabel: "Business Systems",
    title: "Digital Product Creation",
    desc1: "How to create and sell digital products — courses, templates & tools",
    desc2: "How to build a passive income system with digital downloads",
    level: "Intermediate",
    income: "$50–200K+",
    trending: false,
    new: true,
  },

  // --- Digital Asset Trading ---
  {
    rank: 34,
    category: "digital-asset-trading",
    categoryLabel: "Digital Asset Trading",
    title: "Crypto Trading Fundamentals",
    desc1: "How to buy, sell and manage cryptocurrency safely as a beginner",
    desc2: "How to read crypto charts and make informed trading decisions",
    level: "Beginner-friendly",
    income: "",
    trending: true,
    new: true,
  },
  {
    rank: 35,
    category: "digital-asset-trading",
    categoryLabel: "Digital Asset Trading",
    title: "Technical Analysis for Crypto",
    desc1: "How to use candlestick patterns, RSI & MACD to trade crypto profitably",
    desc2: "How to build a technical analysis system for consistent crypto trades",
    level: "Intermediate",
    income: "Variable Income",
    trending: true,
    new: true,
  },
  {
    rank: 36,
    category: "digital-asset-trading",
    categoryLabel: "Digital Asset Trading",
    title: "NFT Creation & Monetization",
    desc1: "How to create, mint and sell NFTs on OpenSea and Magic Eden",
    desc2: "How to build an NFT brand and generate royalty income from digital art",
    level: "Intermediate",
    income: "Variable Income",
    trending: false,
    new: true,
  },
  {
    rank: 37,
    category: "digital-asset-trading",
    categoryLabel: "Digital Asset Trading",
    title: "DeFi & Yield Strategies",
    desc1: "How to earn passive income through DeFi protocols, staking & liquidity pools",
    desc2: "How to navigate decentralized exchanges and maximize yield safely",
    level: "Advanced",
    income: "Variable Income",
    trending: true,
    new: true,
  },
  {
    rank: 38,
    category: "digital-asset-trading",
    categoryLabel: "Digital Asset Trading",
    title: "Crypto Copy Trading & Bots",
    desc1: "How to set up automated crypto trading bots that trade while you sleep",
    desc2: "How to use copy trading platforms to mirror top crypto traders profitably",
    level: "Intermediate",
    income: "Variable Income",
    trending: true,
    new: true,
  },
  {
    rank: 39,
    category: "digital-asset-trading",
    categoryLabel: "Digital Asset Trading",
    title: "Domain Flipping & Digital Real Estate",
    desc1: "How to buy and sell premium domain names for profit",
    desc2: "How to build a domain flipping business and earn from digital real estate",
    level: "Intermediate",
    income: "$30–150K",
    trending: false,
    new: true,
  },
  {
    rank: 40,
    category: "digital-asset-trading",
    categoryLabel: "Digital Asset Trading",
    title: "Meme Coin Research & Trading",
    desc1: "How to research, evaluate and trade meme coins before they pump",
    desc2: "How to spot early meme coin opportunities using on-chain data & sentiment",
    level: "Intermediate",
    income: "Variable Income",
    trending: true,
    new: true,
  }
];

const courses = courseDirectoryData.map(course => {
  let price = "₦35,000";
  let oldPrice = "₦105,000";
  if (course.level === "Beginner-friendly") {
    price = "₦20,000";
    oldPrice = "₦60,000";
  } else if (course.level === "Advanced" || course.rank === 1 || course.rank === 30) {
    price = "₦55,000";
    oldPrice = "₦165,000";
  }
  
  return {
    ...course,
    id: course.rank,
    price,
    oldPrice
  };
});

const categories = [
  { id: 'all', label: 'All', icon: Globe },
  { id: 'ai-automation', label: 'AI & Automation', icon: Cpu },
  { id: 'content-creation', label: 'Content Creation', icon: Smartphone },
  { id: 'marketing', label: 'Marketing', icon: Target },
  { id: 'development', label: 'Development', icon: Monitor },
  { id: 'tech-security', label: 'Tech & Security', icon: ShieldCheck },
  { id: 'data-ai', label: 'Data & AI', icon: Zap },
  { id: 'design', label: 'Design', icon: Award },
  { id: 'business-systems', label: 'Business Systems', icon: Download },
  { id: 'digital-asset-trading', label: 'Digital Asset Trading', icon: TrendingUp }
];

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case 'ai-automation': return { accent: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-100', bg: 'bg-indigo-50/50' };
    case 'content-creation': return { accent: 'bg-rose-500', text: 'text-rose-600', border: 'border-rose-100', bg: 'bg-rose-50/50' };
    case 'marketing': return { accent: 'bg-sky-500', text: 'text-sky-600', border: 'border-sky-100', bg: 'bg-sky-50/50' };
    case 'development': return { accent: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-100', bg: 'bg-amber-50/50' };
    case 'tech-security': return { accent: 'bg-violet-500', text: 'text-violet-600', border: 'border-violet-100', bg: 'bg-violet-50/50' };
    case 'data-ai': return { accent: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-100', bg: 'bg-emerald-50/50' };
    case 'design': return { accent: 'bg-fuchsia-500', text: 'text-fuchsia-600', border: 'border-fuchsia-100', bg: 'bg-fuchsia-50/50' };
    case 'business-systems': return { accent: 'bg-teal-500', text: 'text-teal-600', border: 'border-teal-100', bg: 'bg-teal-50/50' };
    case 'digital-asset-trading': return { accent: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-100', bg: 'bg-cyan-50/50' };
    default: return { accent: 'bg-slate-500', text: 'text-slate-600', border: 'border-slate-100', bg: 'bg-slate-50/50' };
  }
};

const getModulesForCourse = (title: string, categoryLabel: string, category: string) => {
  switch (category) {
    case 'ai-automation':
      return [
        {
          name: "Module 1: Cognitive Foundations & Setup",
          lessons: [
            `Understanding LLM architectures, context windows, and model selection for ${title}`,
            `The Golden Prompt Framework: Mastering systemic role-play, constraints, and dynamic variables`,
            `Designing dynamic assistant personas tailored specifically for automated output`,
            `Provisioning developer workspace accounts across key LLM dashboard APIs`
          ]
        },
        {
          name: "Module 2: Advanced Agents & Workflow Engineering",
          lessons: [
            `Constructing automated event listeners and webhooks in n8n and Make.com`,
            `Configuring recursive database loops and API payloads without manual intervention`,
            `Handling exception loops: Debugging rate limits, schema mismatches, and network interruptions`,
            `Step-by-step assembly of an end-to-end active pipeline with local file systems`
          ]
        },
        {
          name: "Module 3: Enterprise Scale & Document Pipelines",
          lessons: [
            `Deploying custom retrieval systems (RAG) using structured company records`,
            `Automating multi-modal delivery grids (audio generation, vector arts, document templates)`,
            `Building self-improving evaluation loops with automated testing protocols`,
            `Securing dynamic key vaults and client authentication states for server compliance`
          ]
        },
        {
          name: "Module 4: Global Consulting & Retainer Acquisition",
          lessons: [
            `Structuring an Audit presentation to demonstrate business operations time-savings`,
            `Drafting premium service agreements to lock in predictable $3,000+ monthly retainers`,
            `Launching outreach sequences on LinkedIn and via cold emails targeting CEOs and Operators`,
            `Fulfillment capstone: Delivering a production-grade automated agent architecture`
          ]
        }
      ];
    case 'content-creation':
      return [
        {
          name: "Module 1: Visual Psychology & Retention Core",
          lessons: [
            `Analyzing retention analytics: Rhythmic editing pacing, click triggers, and visual patterns`,
            `The 3-Second Hook Method: Designing semantic hooks that prevent immediate scroll-aways`,
            `Selecting hardware: Setting up eye-safe ring lighting, key lights, and professional studio microphones`,
            `Formulating a content strategy roadmap customized for the theme of ${title}`
          ]
        },
        {
          name: "Module 2: Scriptwriting & Cinematic Assembly",
          lessons: [
            `Interactive copywriting: Crafting narrative arcs, climaxes, and call-to-actions (CTAs)`,
            `Cinematic desktop and mobile editing walkthrough in CapCut and Premiere Pro`,
            `Enhancing retention with sound styling, sound effect layers, text tracks, and transitions`,
            `Color grading presets and visual assets management to standardize video aesthetics`
          ]
        },
        {
          name: "Module 3: Omnichannel Distribution & SEO Analytics",
          lessons: [
            `Adapting layout ratios and description metadata for Shorts, Reels, TikTok, and X`,
            `Leveraging automated tools for transcript generation, styling, and key subtitle burns`,
            `Monitoring performance analytics: Watch-time curves, click-through metrics, and share ratios`,
            `Designing a high-speed weekly uploading framework with batch production methods`
          ]
        },
        {
          name: "Module 4: Superfan Community Assets & Brand Sponsorships",
          lessons: [
            `Creating dynamic media kit pages and pitching structures to land high-yield sponsorships`,
            `Setting up membership community platforms (Skool, Discord) to monetize user metrics`,
            `Establishing automatic digital delivery sheets to manage client asset deadlines`,
            `Graduation Capstone: Writing, staging, editing, and publishing a high-retention content piece`
          ]
        }
      ];
    case 'marketing':
      return [
        {
          name: "Module 1: Strategic Funnels & Intent Tracking",
          lessons: [
            `Architecting the digital user flow: Awareness, consideration, conversion, and retention pathways`,
            `Target client mapping: Drafting detailed buyer personas and search-intent logs`,
            `Deploying conversion mechanisms: Tracking pixels, custom event loops, and API postback scripts`,
            `Evaluating baseline analytics: Cost-per-acquisition (CPA), conversion ratios, and lifetime value`
          ]
        },
        {
          name: "Module 2: Persuasive Messaging & Paid Ad Pipelines",
          lessons: [
            `The science of high-converting text sequences: Addressing consumer friction, urgency, and proof points`,
            `Step-by-step configuration of advanced targeted ad campaigns on Meta, Google, and TikTok`,
            `Devising structured A/B testing checklists to isolate visual variables and reduce cost-per-click`,
            `Budget scaling rules: Safely increasing advertising investments without degrading campaign returns`
          ]
        },
        {
          name: "Module 3: Automation Frameworks & Lead Handshakes",
          lessons: [
            `Configuring drag-and-drop lead pages and sales systems on GoHighLevel or modern CRMs`,
            `Programming conditional follow-up models (trigger emails, text notifications, scheduled meetings)`,
            `Speed optimization: Creating high-performance responsive web assets designed for rapid checkout`,
            `Establishing calendar booking systems and automated reminders to minimize meeting attendance drops`
          ]
        },
        {
          name: "Module 4: Securing Enterprise Retainers & Closing Deals",
          lessons: [
            `Structuring tiered consulting pitches and ROI audits to win commercial business clients`,
            `Deploying outbound campaigns: Securing high-ticket strategy calls using email systems`,
            `Writing strict consulting retainer agreements with solid payment schedules and milestone audits`,
            `Interactive milestone: Completing a functional campaign setup and testing lead postbacks`
          ]
        }
      ];
    case 'development':
      return [
        {
          name: "Module 1: Code-Free Architecture & Design Translators",
          lessons: [
            `Web hosting fundamentals: Custom DNS records, SSL handshakes, and database structures`,
            `Deconstructing visual layout systems (Flexbox, Grid) to build precise designs`,
            `Setting up design variables (fonts, styles, icons, palette tokens) in Figma`,
            `Analyzing web performance benchmarks and page-weight limits for maximum speed`
          ]
        },
        {
          name: "Module 2: CMS Databases & Interactive Dynamic Components",
          lessons: [
            `Constructing relational databases (Collections, Items, Custom Fields) in Webflow/Bubble`,
            `Designing user-friendly catalog pages with custom filters, search boxes, and list loops`,
            `Integrating global and local checkout models (Stripe, Paystack, Apple Pay Express)`,
            `Troubleshooting layout breaks across mobile, tablet, and wide desktop screens`
          ]
        },
        {
          name: "Module 3: API Connections & Advanced Script Injections",
          lessons: [
            `Connecting the web portal to external tools (CRMs, sheets, mailing apps) via Zapier`,
            `Incorporating precise micro-interactions, smooth scroll sequences, and pop-up overlays`,
            `Optimizing technical SEO structures: Structured schemas, robots configurations, and sitemaps`,
            `Implementing client-side performance tests and compiling pre-release bug checklists`
          ]
        },
        {
          name: "Module 4: Building a $5k+ Web Engineering Business",
          lessons: [
            `Building a highly polished web portfolio that establishes strong technical credibility`,
            `Developing monthly technical maintenance proposals to turn one-off clients into static monthly income`,
            `Winning local business clients: Discovering slow legacy templates and proposing fast design upgrades`,
            `Graduation Project: Deploying a fully functional web platform with an operational checkout system`
          ]
        }
      ];
    case 'tech-security':
      return [
        {
          name: "Module 1: Systems Architecture & Command Terminals",
          lessons: [
            `Deciphering DNS records, gateway routes, subnet masks, and network transmission metrics`,
            `Mapping operational layouts: Cloud hosts, legacy on-prem servers, and virtual machines`,
            `Mastering command line interfaces: Running system bash/zsh command loops and file permission overrides`,
            `Installing key system monitoring modules to log daily technical events`
          ]
        },
        {
          name: "Module 2: Hardening Infrastructure & Risk Management",
          lessons: [
            `Understanding CompTIA Security+ frameworks: Symmetric/asymmetric encryption, firewall boundaries, and SSH keys`,
            `Running vulnerability audit scanners inside mock server environments`,
            `Implementing security measures: Access logs, IP security rules, and auto-backup schedules`,
            `Performing secure backup restore drills to guarantee data persistence after network loss`
          ]
        },
        {
          name: "Module 3: Cloud Provisioning & Resource Architecture",
          lessons: [
            `Navigating client portals (AWS, Google Cloud) and creating strict user profiles (IAM)`,
            `Deploying auto-scaling servers, storage buckets, and isolated virtual networks`,
            `Setting up continuous telemetry dashboards with real-time incident notifications`,
            `Monitoring operational expenses: Optimizing resource idle caps to reduce cloud utility bills`
          ]
        },
        {
          name: "Module 4: Landing Remote Enterprise Contracts",
          lessons: [
            `Drafting visual risk assessment sheets to pitch network hardening contracts to organizations`,
            `Optimizing resumes and professional profiles to pass rigid Corporate recruiter filters`,
            `Navigating high-level technical interviews and executing systematic system code audits`,
            `Milestone checklist: Designing, configuring, and testing a secure virtual network environment`
          ]
        }
      ];
    case 'data-ai':
      return [
        {
          name: "Module 1: Relational Data Engines & Raw Cleaning Scripts",
          lessons: [
            `Writing optimized SQL query lines to extract specific metrics from massive databases`,
            `Python foundations: Data arrays, loop operations, custom functions, and pandas dictionaries`,
            `Refining disorganized files: Stripping Null values, aligning headers, and parsing timestamps`,
            `Establishing safe sandbox environments to test analytical computational models`
          ]
        },
        {
          name: "Module 2: Executive visual Canvas & Intelligence Dashboards",
          lessons: [
            `Configuring beautiful multi-page dashboards on Power BI and Google Looker Studio`,
            `Selecting operational KPIs: Measuring conversion rates, product margins, and customer retention`,
            `Programming dynamic filter controls and multi-level data tables for non-technical users`,
            `Setting up automated, quiet dashboard data refreshes directly via source databases`
          ]
        },
        {
          name: "Module 3: Predictive Algorithms & Local Vector Retrieval",
          lessons: [
            `Utilizing statistical regression models to predict customer demands and churn risks`,
            `Feeding company knowledge trees to LLMs using specialized vector formats`,
            `Validating analytical outputs against confidence brackets and error profiles`,
            `Interfacing notebooks with clean database drivers to compile high-speed analytics`
          ]
        },
        {
          name: "Module 4: High-Value Analytical Consulting Deals",
          lessons: [
            `Building a professional portfolio that demonstrates direct business cost reductions`,
            `Drafting standard diagnostic checklists to analyze complex corporate data structures`,
            `Presenting structural database recommendations to executive business management`,
            `Graduation Project: Processing raw logs, generating intelligence grids, and presenting results`
          ]
        }
      ];
    case 'design':
      return [
        {
          name: "Module 1: High-Response Design Science & Figma",
          lessons: [
            `Mastering cognitive layouts: Color psychology curves, custom sans typeface pairings, and space units`,
            `Figma professional setup: Fluid grid arrays, absolute auto-layouts, nested variants, and style tokens`,
            `Performing interactive user audits: Uncovering flow friction in popular live web products`,
            `Creating detailed wireframe patterns to map user behavior prior to full design execution`
          ]
        },
        {
          name: "Module 2: High-Fidelity UI & Unified Brand Manuals",
          lessons: [
            `Step-by-step styling of highly responsive modular web pages and custom mobile views`,
            `Crafting comprehensive brand kits: Signature logotypes, color palettes, and styled vectors`,
            `Configuring functional screen animations: Micro-hover states, bounce dynamics, and view transitions`,
            `Assembling responsive UI component sheets to guide and accelerate code integration`
          ]
        },
        {
          name: "Module 3: Advanced AI Asset Engines & Next-Gen Spatial Layouts",
          lessons: [
            `Using hyper-realistic Midjourney and Firefly generation sequences to produce product assets`,
            `Formulating spatial grid standards and custom depth vectors for augmented/virtual interfaces`,
            `Optimizing design formats: Standardizing vector layers, clean SVG shapes, and small file outputs`,
            `Automating graphic asset arrays: Generating batch branding sets using dynamic design templates`
          ]
        },
        {
          name: "Module 4: Display Portfolios & Premium Client Proposals",
          lessons: [
            `Structuring an exceptional BeHance and Dribbble presentation to showcase design quality`,
            `Pitching $3,000+ brand identity systems by demonstrating customer trust improvements`,
            `Winning consistent visual roles through targeted design critiques of active client websites`,
            `Graduation milestone: Completing and presenting a fully realized high-fidelity responsive application design`
          ]
        }
      ];
    case 'business-systems':
      return [
        {
          name: "Module 1: Commerce Operations & Asset Provisioning",
          lessons: [
            `Commerce parameters: Evaluating suppliers, product selection frameworks, and shipping margins`,
            `Step-by-step setup of custom white-label storefronts across Shopify and GoHighLevel`,
            `Configuring essential pixels, event variables, and analytic tracking loops`,
            `Structuring an optimal weekly store administration schedule to manage asset logistics`
          ]
        },
        {
          name: "Module 2: Multi-Step Sales Funnels & CRM Telemetry",
          lessons: [
            `Drafting high-intent product landers, expressive checkouts, and strategic up-sell offers`,
            `Setting up system pipeline boards to monitor user progress from lead to client`,
            `Connecting cloud apps (Stripe, databases, sheets) to sync custom transactions`,
            `Configuring email and text scripts to recover abandoned shopping baskets automagically`
          ]
        },
        {
          name: "Module 3: Residual Asset Systems & Interactive Client Portals",
          lessons: [
            `Programming systems to deliver digital downloads and templates upon confirmation`,
            `Structuring recurring subscription circles and course vaults with custom access rules`,
            `Integrating with automated affiliate loops to leverage social traffic for passive scaling`,
            `Performing systematic transaction drills to prevent shipping delays and system bottlenecks`
          ]
        },
        {
          name: "Module 4: Launch Strategies & High-Ticket Agency Retainers",
          lessons: [
            `Creating visually compelling service decks and system customization proposals`,
            `Selling operations-management frameworks as a recurring high-yield agency service`,
            `Launching precise email-outreach pipelines to close physical business owners on software retainers`,
            `Interactive capstone: Launching an express checkout and confirming automated record delivery`
          ]
        }
      ];
    case 'digital-asset-trading':
      return [
        {
          name: "Module 1: Ledger Economics & Security Infrastructure",
          lessons: [
            `The structural mechanics of decentralized ledger systems, smart contract systems, and nodes`,
            `Hardening your terminal: Constructing cold wallets, hardware key protocols, and physical backup tokens`,
            `Sourcing reliable market data sources, order volumes, and real-time network trackers`,
            `Deconstructing the visual mechanics of order-books, dynamic spreads, and execution layers`
          ]
        },
        {
          name: "Module 2: Core Risk Architecture & Pattern Analysis",
          lessons: [
            `Analyzing candlestick layouts, support trends, liquidity pools, and directional moving indicators`,
            `Implementing rigorous transaction rules: Defining position sizing caps and maximum loss limits`,
            `Using automated token checkers, network scan matrices, and social momentum alerts`,
            `Performing mock transaction loops in demo environments to build absolute tactical discipline`
          ]
        },
        {
          name: "Module 3: Automation Scripts, DeFi Yield, & Long-Term Allocation",
          lessons: [
            `Connecting automated copy-trading systems that mirror top historic performance curves`,
            `Deploying capital safely into staking chains, liquid vaults, and yield optimization protocols`,
            `Auditing digital assets, token models, domains, and transaction volumes`,
            `Programming dynamic trackers and automated price alerts to run in the background`
          ]
        },
        {
          name: "Module 4: Systematic Wealth Management Systems",
          lessons: [
            `Designing algorithmic portfolio rules which rebalance assets automatically based on volatility`,
            `Compiling an end-to-end operational spreadsheet to track passive income performance`,
            `Executing structured risk validation drills under heavy market contraction simulations`,
            `Graduation Capstone: Formulating a professional, customized digital asset trade strategy document`
          ]
        }
      ];
    default:
      return [
        {
          name: "Module 1: Foundations & Architecture",
          lessons: [
            `Historical evolution and core definitions of ${categoryLabel}`,
            `Essential software tooling & API integrations required for ${title}`,
            `Mapping out your primary high-speed workflow & test-bed environment`,
            `Analyzing 2026 real-world benchmark standards and case studies`
          ]
        },
        {
          name: "Module 2: Direct Step-by-Step Practical Blueprint",
          lessons: [
            `A-Z technical walkthrough of the most important interfaces`,
            `Advanced optimizations to double design speed and output quality`,
            `Troubleshooting live production errors and debugging common blocks`,
            `Launching your first functional prototype and system test`
          ]
        },
        {
          name: "Module 3: Advanced Automation & Scale Logic",
          lessons: [
            `Building robotic background scripts to save 15+ hours weekly`,
            `Connecting multi-tool pipelines with unified cloud workflows`,
            `Negotiation systems to command high-ticket client secure retainers`,
            `Structuring your personalized brand identity for global authority`
          ]
        },
        {
          name: "Module 4: Real Gigs Closing & Certification Mastery",
          lessons: [
            `Accessing high-conversion email templates & proposal pitches`,
            `Closing high-paying international clients on Upwork/LinkedIn with no experience`,
            `Submitting your real capstone graduation assignment to the jury`,
            `Securing your accredited DigitAcademy Certificate of Completion`
          ]
        }
      ];
  }
};

export default function DigitAcademy() {
  const [activeCat, setActiveCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseForOutline, setSelectedCourseForOutline] = useState<any | null>(null);
  const [checkedLessons, setCheckedLessons] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const { currency, formatPrice } = useCurrency();

  useEffect(() => setMounted(true), []);

  const filteredCourses = courses.filter(c => {
    const matchesCat = activeCat === 'all' || c.category === activeCat;
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.desc1.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.desc2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
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

      {/* FLAGSHIP MASTERCLASS SECTOR */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-y border-emerald-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-flex items-center gap-2">
              <Award size={14} className="text-emerald-400" /> Flagship Program of the Year
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3">
              The Flagship <span className="text-emerald-400">Masterclass</span>
            </h2>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Product Info */}
              <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-black uppercase tracking-widest mb-6">
                  <Zap size={16} className="fill-emerald-400" /> Premium Blueprint
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
                  Viral Storytelling & <br />AI Content Automation
                </h3>
                
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-medium mb-8">
                  Learn How to Create Viral Stories for 10+ Global Platforms, Use AI Automation to Work Smarter and Faster, Build Massive Audience Engagement, Grow a Loyal Community, and Turn Your Content Into Consistent Online Income.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "Mastery across 10+ global social platforms",
                    "Advanced AI automation workflows & engines",
                    "Massive audience build & tribe engagement",
                    "Predictable content monetization systems",
                    "Personal Telegram advisory & mentorship group",
                    "Lifetime downloads and interactive syllabus updates"
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-1" />
                      <span className="text-sm font-semibold text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8 border-t border-white/10">
                  <div className="mb-4 sm:mb-0">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest block mb-1">Tuition Fee</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">{formatPrice("₦55,000")}</span>
                      <span className="text-sm text-slate-500 line-through font-bold">{formatPrice("₦165,000")}</span>
                    </div>
                  </div>
                  <a 
                    href={`https://wa.me/2348152469749?text=${encodeURIComponent("Hello Webhouse Lab, I would like to enroll in the Flagship 'Viral Storytelling & AI Content Automation' Masterclass.")}`}
                    target="_blank"
                    className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2 text-center"
                    rel="noopener noreferrer"
                  >
                    Enroll & Gain Instant Access <ArrowRight size={20} />
                  </a>
                </div>
              </div>

              {/* Product Visual */}
              <div className="lg:col-span-5 relative aspect-square lg:aspect-auto min-h-[400px] bg-slate-900 border-t lg:border-t-0 lg:border-l border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"
                  alt="Flagship Masterclass visual"
                  fill
                  className="object-cover opacity-80"
                  referrerPolicy="no-referrer"
                  title="Flagship curriculum preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-transparent to-transparent"></div>
                
                {/* Visual Accent badge */}
                <div className="absolute top-8 right-8 bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                  Flagship
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COURSES SECTION */}
      <section id="courses" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-md">
                Active Directory
              </span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mt-4">
                How To — <span className="text-emerald-500 block sm:inline">Top 40 Digital Skills Courses 2026</span>
              </h3>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 w-full xl:w-auto">
              {categories.map((cat) => {
                const isActive = activeCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCat(cat.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 ${
                      isActive 
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20 active:scale-95" 
                      : "bg-white text-slate-500 border border-slate-100/80 hover:bg-slate-50 hover:text-slate-700"
                    }`}
                  >
                    <cat.icon size={14} className={isActive ? "text-emerald-400" : "text-slate-400"} /> {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grouped view for "All" / List view for selected category */}
          {activeCat === 'all' ? (
            <div className="space-y-20">
              {categories.filter(c => c.id !== 'all').map((cat) => {
                const catCourses = filteredCourses.filter(c => c.category === cat.id);
                if (catCourses.length === 0) return null;

                return (
                  <div key={cat.id} className="space-y-8">
                    {/* Category Divider Header */}
                    <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 text-emerald-400 rounded-xl flex items-center justify-center font-bold">
                          <cat.icon size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                            Category Blueprint
                          </span>
                          <h4 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                            {cat.label}
                          </h4>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        {catCourses.length} {catCourses.length === 1 ? 'skill' : 'skills'} loaded
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {catCourses.map((course) => {
                        const { accent, text, border, bg } = getCategoryColor(course.category);
                        const isNewCard = course.new || course.rank >= 31;

                        return (
                          <motion.div
                            layout
                            key={course.rank}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className={`group flex flex-col justify-between bg-white rounded-3xl overflow-hidden transition-all duration-300 border shadow-sm hover:shadow-xl ${
                              isNewCard
                                ? "border-2 border-blue-500 shadow-blue-500/5 hover:border-blue-600"
                                : "border-slate-150 hover:border-emerald-500"
                            }`}
                          >
                            <div className={`h-1.5 w-full ${accent}`} />
                            
                            {/* Card Top Information */}
                            <div className="p-6 pb-0 flex items-center justify-between">
                              <span className="font-mono text-xs font-black text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                #{String(course.rank).padStart(2, '0')}
                              </span>
                              
                              <div className="flex gap-1.5">
                                <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded bg-slate-100 text-slate-700">
                                  {course.level}
                                </span>
                                {isNewCard && (
                                  <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded bg-blue-500 text-white animate-pulse">
                                    New
                                  </span>
                                )}
                                {course.trending && (
                                  <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded bg-amber-500 text-slate-950 font-extrabold flex items-center gap-1">
                                    <TrendingUp size={10} /> HOT
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Card core center content */}
                            <div className="p-6 pt-4 flex-grow flex flex-col justify-between">
                              <div className="mb-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                                  HOW TO
                                </span>
                                <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug tracking-tight mb-4">
                                  {course.title}
                                </h4>

                                <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                                  <div className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                    <p className="text-[12px] font-semibold text-slate-600 leading-relaxed">
                                      {course.desc1}
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                    <p className="text-[12px] font-semibold text-slate-600 leading-relaxed">
                                      {course.desc2}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="flex flex-wrap gap-1.5">
                                  {course.income && !(currency.code === 'NGN' && course.income.includes('$')) && (
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-extrabold text-[10px] uppercase tracking-wider rounded-md border border-emerald-100/50 flex items-center gap-1.5">
                                      <TrendingUp size={12} className="text-emerald-500" /> {course.income}
                                    </span>
                                  )}
                                  <span className={`px-3 py-1 ${bg} ${text} font-extrabold text-[10px] uppercase tracking-wider rounded-md flex items-center gap-1.5`}>
                                    <Zap size={12} /> {course.categoryLabel}
                                  </span>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                                  <div>
                                    <span className="text-[10px] text-slate-400 font-bold block line-through leading-none mb-1">
                                      {formatPrice(course.oldPrice)}
                                    </span>
                                    <span className="text-lg font-black text-slate-950 leading-none">
                                      {formatPrice(course.price)}
                                    </span>
                                  </div>
                                  <motion.a
                                    href={`https://wa.me/2348152469749?text=${encodeURIComponent(
                                      `Hello Webhouse, I want to get the resource pack and secure my access for: "${course.title}" (${course.categoryLabel}) under DigitAcademy. Please guide me on payment or delivery!`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-grow py-3 px-3 bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 text-center"
                                    animate={{
                                      scale: [1, 1.02, 1],
                                      boxShadow: [
                                        "0 0 0 0px rgba(16, 185, 129, 0)",
                                        "0 0 0 6px rgba(16, 185, 129, 0.35)",
                                        "0 0 0 0px rgba(16, 185, 129, 0)",
                                      ]
                                    }}
                                    transition={{
                                      duration: 2.2,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                  >
                                    Get Your Resource Here ↗
                                  </motion.a>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {filteredCourses.length === 0 && (
                <div className="py-20 text-center col-span-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <Search size={32} className="text-slate-400" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">No matches found</h4>
                  <p className="text-sm text-slate-500 font-medium">Try checking your spelling or clear search filters.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-emerald-600 font-bold hover:underline"
                  >
                    Clear search query
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => {
                    const { accent, text, border, bg } = getCategoryColor(course.category);
                    const isNewCard = course.new || course.rank >= 31;

                    return (
                      <motion.div
                        layout
                        key={course.rank}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className={`group flex flex-col justify-between bg-white rounded-3xl overflow-hidden transition-all duration-300 border shadow-sm hover:shadow-xl ${
                          isNewCard
                            ? "border-2 border-blue-500 shadow-blue-500/5 hover:border-blue-600"
                            : "border-slate-150 hover:border-emerald-500"
                        }`}
                      >
                        <div className={`h-1.5 w-full ${accent}`} />
                        
                        {/* Card Top Info */}
                        <div className="p-6 pb-0 flex items-center justify-between">
                          <span className="font-mono text-xs font-black text-slate-400 bg-slate-50 px-2 py-1 rounded">
                            #{String(course.rank).padStart(2, '0')}
                          </span>
                          
                          <div className="flex gap-1.5">
                            <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded bg-slate-100 text-slate-700">
                              {course.level}
                            </span>
                            {isNewCard && (
                              <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded bg-blue-500 text-white animate-pulse">
                                New
                              </span>
                            )}
                            {course.trending && (
                              <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded bg-amber-500 text-slate-950 font-extrabold flex items-center gap-1">
                                <TrendingUp size={10} /> HOT
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card center content */}
                        <div className="p-6 pt-4 flex-grow flex flex-col justify-between">
                          <div className="mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                              HOW TO
                            </span>
                            <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug tracking-tight mb-4">
                              {course.title}
                            </h4>

                            <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                              <div className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                <p className="text-[12px] font-semibold text-slate-600 leading-relaxed">
                                  {course.desc1}
                                </p>
                              </div>
                              <div className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                <p className="text-[12px] font-semibold text-slate-600 leading-relaxed">
                                  {course.desc2}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-1.5">
                              {course.income && !(currency.code === 'NGN' && course.income.includes('$')) && (
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-extrabold text-[10px] uppercase tracking-wider rounded-md border border-emerald-100/50 flex items-center gap-1.5">
                                  <TrendingUp size={12} className="text-emerald-500" /> {course.income}
                                </span>
                              )}
                              <span className={`px-3 py-1 ${bg} ${text} font-extrabold text-[10px] uppercase tracking-wider rounded-md flex items-center gap-1.5`}>
                                <Zap size={12} /> {course.categoryLabel}
                              </span>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                              <div>
                                <span className="text-[10px] text-slate-400 font-bold block line-through leading-none mb-1">
                                  {formatPrice(course.oldPrice)}
                                </span>
                                <span className="text-lg font-black text-slate-950 leading-none">
                                  {formatPrice(course.price)}
                                </span>
                              </div>
                              <motion.a
                                href={`https://wa.me/2348152469749?text=${encodeURIComponent(
                                  `Hello Webhouse, I want to get the resource pack and secure my access for: "${course.title}" (${course.categoryLabel}) under DigitAcademy. Please guide me on payment or delivery!`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-grow py-3 px-3 bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 text-center"
                                animate={{
                                  scale: [1, 1.02, 1],
                                  boxShadow: [
                                    "0 0 0 0px rgba(16, 185, 129, 0)",
                                    "0 0 0 6px rgba(16, 185, 129, 0.35)",
                                    "0 0 0 0px rgba(16, 185, 129, 0)",
                                  ]
                                }}
                                transition={{
                                  duration: 2.2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                Get Your Resource Here ↗
                              </motion.a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-20 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
                      <Search size={32} className="text-slate-400" />
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
          )}
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

      {/* Interactive Outline Modal Popup */}
      <AnimatePresence>
        {selectedCourseForOutline && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourseForOutline(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white text-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              {/* Color accent block */}
              <div className={`h-2 w-full ${getCategoryColor(selectedCourseForOutline.category).accent}`} />

              {/* Header summary */}
              <div className="p-8 pb-6 border-b border-slate-100 flex justify-between items-start gap-4 bg-slate-50">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-black tracking-widest rounded">
                      Interactive Syllabus
                    </span>
                    <span className="text-slate-400 font-mono text-xs font-bold">
                      Rank #{selectedCourseForOutline.rank}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                    {selectedCourseForOutline.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-semibold mt-1">
                    Category: {selectedCourseForOutline.categoryLabel} &bull; Tier: {selectedCourseForOutline.level}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCourseForOutline(null)}
                  className="w-10 h-10 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center font-bold text-slate-800 transition-colors shrink-0"
                >
                  &times;
                </button>
              </div>

              {/* Scrollable content area showcasing the modules step by step */}
              <div className="p-8 overflow-y-auto space-y-8 flex-grow">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
                  <Zap size={24} className="text-emerald-500 shrink-0" />
                  <div className="text-xs font-semibold text-slate-700 leading-snug">
                    Click the checkboxes below to generate your custom progression blueprint.
                    {selectedCourseForOutline.income && !(currency.code === 'NGN' && selectedCourseForOutline.income.includes('$')) ? (
                      <> Earning potential for this skill is <span className="font-extrabold text-emerald-600">{selectedCourseForOutline.income}</span>!</>
                    ) : ''}
                  </div>
                </div>

                <div className="space-y-6">
                  {getModulesForCourse(selectedCourseForOutline.title, selectedCourseForOutline.categoryLabel, selectedCourseForOutline.category).map((module, mIdx) => (
                    <div key={mIdx} className="space-y-3 bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        {module.name}
                      </h4>
                      
                      <div className="grid grid-cols-1 gap-2.5 pl-4">
                        {module.lessons.map((lesson, lIdx) => {
                          const lessonId = `${selectedCourseForOutline.rank}-${mIdx}-${lIdx}`;
                          const isChecked = !!checkedLessons[lessonId];
                          return (
                            <label key={lIdx} className="flex items-start gap-3 cursor-pointer select-none py-1 hover:opacity-80 transition-opacity">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  setCheckedLessons(prev => ({
                                    ...prev,
                                    [lessonId]: e.target.checked
                                  }));
                                }}
                                className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer"
                              />
                              <span className={`text-xs font-semibold text-slate-600 leading-relaxed ${isChecked ? 'line-through text-slate-400' : ''}`}>
                                {lesson}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer actions */}
              <div className="p-8 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Interactive Blueprint
                  </span>
                  <span className="text-sm font-black text-slate-800">
                    {Object.keys(checkedLessons).filter(k => k.startsWith(`${selectedCourseForOutline.rank}-`)).length} of 16 targets marked
                  </span>
                </div>

                <a
                  href={`https://wa.me/2348152469749?text=${encodeURIComponent(
                    `Hello Webhouse, I successfully generated my DigitAcademy custom outline for the course: "${selectedCourseForOutline.title}" (${selectedCourseForOutline.categoryLabel}). I want to lock in my spot for ${formatPrice(selectedCourseForOutline.price)}!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/15 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  Lock in & Enroll via WhatsApp <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <EnrollmentNotification />
    </div>
  );
}
