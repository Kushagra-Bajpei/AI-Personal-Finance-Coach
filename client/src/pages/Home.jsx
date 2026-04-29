import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Brain, Palette, MessageCircle, Zap, Star, ChevronRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { FadeIn, StaggerChildren, StaggerItem } from '../components/AnimationWrappers';
import PublicLayout from '../layouts/PublicLayout';

import ctaPortalImg from '../assets/cta_portal.png';
import feature1Img from '../assets/feature1.png';
import feature2Img from '../assets/feature2.png';
import feature3Img from '../assets/feature3.png';
import step1Img from '../assets/step1.png';

// Professional Bento-style financial preview
function ChatPreview({ dark }) {
  const messages = [
    { role: 'ai', text: "Analyzing your weekend spending... You spent 20% less than last week! Great progress." },
    { role: 'user', text: "How much did I spend on groceries?" },
    { role: 'ai', text: "You spent ₹4,200 on groceries this week. You have ₹1,800 left in your monthly budget." },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12 px-4">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 via-transparent to-cyan-500/5 rounded-[3rem] pointer-events-none" />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-stretch">
        
        {/* Main Chat Bento - 7/12 width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`md:col-span-7 rounded-[2rem] overflow-hidden border ${dark ? 'bg-[#0a0a0f] border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}
        >
          {/* Header */}
          <div className={`px-8 py-6 border-b ${dark ? 'border-white/5' : 'border-slate-100'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Financial Coach</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-emerald-500 font-medium uppercase tracking-wider">AI Powered</span>
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold border ${dark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              LIVE SESSION
            </div>
          </div>

          {/* Chat content */}
          <div className="p-8 space-y-6 h-[380px] overflow-hidden">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                      : dark
                      ? 'bg-white/5 text-slate-300 border border-white/10'
                      : 'bg-slate-50 text-slate-700 border border-slate-100'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {/* Animated Typing */}
            <div className="flex justify-start">
              <div className={`px-5 py-3.5 rounded-2xl ${dark ? 'bg-white/5 border border-white/10' : 'bg-slate-50'}`}>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-500/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Input field preview */}
          <div className={`p-6 border-t ${dark ? 'border-white/5' : 'border-slate-100'}`}>
            <div className={`flex items-center gap-4 px-5 py-3.5 rounded-xl ${dark ? 'bg-white/5' : 'bg-slate-50'} border ${dark ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="flex-1 text-xs text-slate-500 font-medium">Ask about your budget...</div>
              <ArrowRight className="w-4 h-4 text-violet-500" />
            </div>
          </div>
        </motion.div>

        {/* Right Column Bento Cards - 5/12 width */}
        <div className="md:col-span-5 grid grid-rows-3 gap-4 lg:gap-6">
          
          {/* Card 1: Balance & Trend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`row-span-1 rounded-[2rem] p-8 border ${dark ? 'bg-[#0a0a0f] border-white/5 shadow-xl' : 'bg-white border-slate-200 shadow-lg'} flex flex-col justify-between`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Balance</span>
                <h3 className={`text-3xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>₹1,24,500</h3>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold">
                +12.4%
              </div>
            </div>
            {/* Simple Trendline Mockup */}
            <div className="h-10 w-full flex items-end gap-1 px-1">
              {[40, 60, 35, 70, 55, 90, 80, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className={`flex-1 rounded-t-sm ${i === 7 ? 'bg-violet-600' : 'bg-violet-600/20'}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Card 2: Categories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`row-span-1 rounded-[2rem] p-8 border ${dark ? 'bg-[#0a0a0f] border-white/5 shadow-xl' : 'bg-white border-slate-200 shadow-lg'} space-y-5`}
          >
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Top Categories</span>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className={dark ? 'text-slate-300' : 'text-slate-700'}>Shopping</span>
                  <span className={dark ? 'text-white' : 'text-slate-900'}>₹12,000</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1.5, delay: 0.8 }} className="h-full bg-violet-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className={dark ? 'text-slate-300' : 'text-slate-700'}>Entertainment</span>
                  <span className={dark ? 'text-white' : 'text-slate-900'}>₹5,500</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "30%" }} transition={{ duration: 1.5, delay: 1 }} className="h-full bg-cyan-500" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Coach Insight */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className={`row-span-1 rounded-[2rem] p-8 border ${dark ? 'bg-gradient-to-br from-violet-600 to-violet-900 border-none' : 'bg-gradient-to-br from-violet-600 to-indigo-600 border-none'} shadow-xl text-white flex flex-col justify-center gap-3`}
          >
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider opacity-80">
              <Zap className="w-3.5 h-3.5" /> Pro Insight
            </div>
            <p className="text-sm font-medium leading-relaxed">
              Based on your patterns, you could save **₹8,400** extra this year by optimizing your monthly subscriptions.
            </p>
            <div className="text-[10px] font-bold underline cursor-pointer hover:opacity-80 transition-opacity">
              VIEW DETAILED PLAN
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

const features = [
  {
    image: feature1Img,
    title: 'AI Financial Analysis',
    desc: 'Advanced neural networks interpret your spending habits and provide actionable budgeting advice.',
    color: 'from-blue-500 to-green-600',
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
  },
  {
    image: feature2Img,
    title: 'Budgeting Insights',
    desc: 'Transform raw transaction data into clear, visual charts that track your financial health in real time.',
    color: 'from-green-500 to-emerald-600',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
  },
  {
    image: feature3Img,
    title: 'Conversational Advice',
    desc: 'Engage in natural dialogue with your AI coach to refine your financial goals and save money.',
    color: 'from-teal-500 to-cyan-600',
    glow: 'shadow-[0_0_30px_rgba(20,184,166,0.3)]',
  },
];

const stats = [
  { value: '500M+', label: 'Expenses Tracked' },
  { value: '98%', label: 'User Satisfaction' },
  { value: '₹50K+', label: 'Avg. Yearly Savings' },
  { value: '150+', label: 'Countries' },
];

export default function Home() {
  const { dark } = useTheme();

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/15 blur-[100px] float-anim" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] float-anim" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/5 blur-[120px]" />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-violet-500/10 border border-violet-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-semibold text-violet-400 tracking-wide uppercase">AI Personal Finance Coach</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}
            >
              Take Control of Your{' '}
              <span className="gradient-text">Money</span>
              {' '}with{' '}
              <span className={dark ? 'text-slate-200' : 'text-slate-700'}>AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-lg leading-relaxed mb-10 ${dark ? 'text-slate-400' : 'text-slate-600'}`}
            >
              Track expenses, analyze spending, and get AI-powered financial advice. Just enter your transactions or ask questions — we'll handle the rest.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                to="/signup"
                id="hero-cta"
                className="group flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-base hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:scale-105 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className={`flex items-center gap-2 px-7 py-4 rounded-2xl border font-semibold text-base hover:scale-105 transition-all duration-300 ${
                  dark ? 'border-white/20 text-white hover:bg-white/5' : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                See How It Works
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-4 gap-4"
            >
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold gradient-text">{value}</div>
                  <div className={`text-xs mt-0.5 ${dark ? 'text-slate-500' : 'text-slate-500'}`}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Chat Preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 to-cyan-500/10 rounded-3xl blur-2xl" />
            <div className="relative">
              <ChatPreview dark={dark} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <Zap className="w-3 h-3" />
              POWERFUL FEATURES
            </span>
            <h2 className={`font-display text-4xl sm:text-5xl font-bold mb-5 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Everything you need to{' '}
              <span className="gradient-text">manage your finances</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              Our suite of AI-powered tools makes financial planning accessible, intuitive, and highly effective.
            </p>
          </FadeIn>

          <StaggerChildren className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {features.map(({ image, title, desc, glow }) => (
              <StaggerItem key={title}>
                <div
                  className={`relative group p-4 pb-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:${glow} ${
                    dark ? 'bg-[#12121a] border-white/8 hover:border-violet-500/30' : 'bg-white border-slate-200 hover:border-violet-300 shadow-sm hover:shadow-lg'
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                    <img 
                      src={image} 
                      alt={title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121a]/60 to-transparent pointer-events-none" />
                  </div>
                  <div className="px-4">
                    <h3 className={`font-display text-2xl font-bold mb-3 ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
                    <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{desc}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How It Works - Visual Step-by-Step */}
      <section className={`py-24 relative overflow-hidden ${dark ? 'bg-[#0d0d16]' : 'bg-slate-50'}`}>
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-20">
            <h2 className={`font-display text-4xl sm:text-6xl font-bold mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
              <span className="gradient-text">Three steps</span> to financial freedom
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              We've refined our process to be as fluid and intuitive as checking your wallet.
            </p>
          </FadeIn>

          <div className="space-y-40">
            {/* Step 1 */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <FadeIn direction="left">
                <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-br from-violet-500/20 to-transparent">
                  <div className="relative rounded-[2.3rem] overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                      src={step1Img} 
                      alt="Add Transactions" 
                      className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-10 left-10">
                      <div className="font-display text-8xl font-black text-white/5 leading-none select-none">01</div>
                    </div>
                  </div>
                  {/* Glowing Accent */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-600/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </FadeIn>
              <FadeIn direction="right" className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold text-sm uppercase tracking-widest">
                  <Star className="w-4 h-4 fill-violet-400" /> The Beginning
                </div>
                <h3 className={`font-display text-5xl font-black leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
                  Add Your <span className="gradient-text">Transactions</span>
                </h3>
                <p className={`text-xl leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Simply describe what you spent money on in plain English. No rigid forms or complex spreadsheets—our AI understands natural language perfectly. Just talk to us.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center"><Zap className="w-4 h-4 text-violet-400" /></div>
                      Natural Language
                    </div>
                    <p className={`text-sm ${dark ? 'text-slate-500' : 'text-slate-500'}`}>Talk as you would to a friend about your daily expenses.</p>
                  </div>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center"><Brain className="w-4 h-4 text-violet-400" /></div>
                      Multi-Currency
                    </div>
                    <p className={`text-sm ${dark ? 'text-slate-500' : 'text-slate-500'}`}>We handle international currencies and conversions with ease.</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Step 2 */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <FadeIn direction="right" className="lg:order-2">
                <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-bl from-cyan-500/20 to-transparent">
                  <div className="relative rounded-[2.3rem] overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200" 
                      alt="Mathematical Analysis" 
                      className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-10 left-10">
                      <div className="font-display text-8xl font-black text-white/5 leading-none select-none">02</div>
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-600/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </FadeIn>
              <FadeIn direction="left" className="lg:order-1 space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-sm uppercase tracking-widest">
                  <Brain className="w-4 h-4 fill-cyan-400" /> Neural Processing
                </div>
                <h3 className={`font-display text-5xl font-black leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
                  AI Asks & <span className="gradient-text">Refines</span>
                </h3>
                <p className={`text-xl leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Our neural engines analyze your spending patterns in real-time. The AI engages in a thoughtful dialogue, identifying hidden costs and suggesting instant improvements to your budget.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center"><MessageCircle className="w-4 h-4 text-cyan-400" /></div>
                      Interactive Coach
                    </div>
                    <p className={`text-sm ${dark ? 'text-slate-500' : 'text-slate-500'}`}>The AI asks clarifying questions to ensure 100% accuracy.</p>
                  </div>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center"><Zap className="w-4 h-4 text-cyan-400" /></div>
                      Instant Mapping
                    </div>
                    <p className={`text-sm ${dark ? 'text-slate-500' : 'text-slate-500'}`}>Every transaction is automatically categorized into 20+ buckets.</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Step 3 */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <FadeIn direction="left">
                <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-tr from-pink-500/20 to-transparent">
                  <div className="relative rounded-[2.3rem] overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1200" 
                      alt="Financial Growth" 
                      className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-10 left-10">
                      <div className="font-display text-8xl font-black text-white/5 leading-none select-none">03</div>
                    </div>
                  </div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </FadeIn>
              <FadeIn direction="right" className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 font-bold text-sm uppercase tracking-widest">
                  <Palette className="w-4 h-4 fill-pink-400" /> Visualization
                </div>
                <h3 className={`font-display text-5xl font-black leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
                  Watch Your <span className="gradient-text">Wealth Grow</span>
                </h3>
                <p className={`text-xl leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                  The final reveal is pure financial magic. Watch as your budget transforms into breathtaking visual charts and actionable insights. Take control of your future with confidence.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>
                      <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center"><Star className="w-4 h-4 text-pink-400" /></div>
                      4K Visuals
                    </div>
                    <p className={`text-sm ${dark ? 'text-slate-500' : 'text-slate-500'}`}>High-fidelity charts that make financial data beautiful.</p>
                  </div>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>
                      <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center"><ChevronRight className="w-4 h-4 text-pink-400" /></div>
                      Daily Updates
                    </div>
                    <p className={`text-sm ${dark ? 'text-slate-500' : 'text-slate-500'}`}>Real-time notifications and balance alerts sent to your phone.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.4} className="mt-24 text-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-105 transition-all duration-300"
            >
              Start Your Financial Journey <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>


      {/* Unique Dream Portal CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="relative group rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.2)]">
              {/* Background Portal Image */}
              <div className="absolute inset-0">
                <img 
                  src={ctaPortalImg} 
                  alt="Finance Portal" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${dark ? 'from-[#0a0a0f] via-[#0a0a0f]/40' : 'from-slate-900 via-slate-900/40'} to-transparent`} />
              </div>

              {/* Glowing Accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-[100px] -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 blur-[100px] -ml-32 -mb-32" />

              {/* Content */}
              <div className="relative px-8 py-20 sm:p-20 text-center flex flex-col items-center">
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="mb-8"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center p-2">
                    <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </motion.div>

                <h2 className="font-display text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                  Ready to transform <br className="hidden sm:block" /> 
                  your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">finances?</span>
                </h2>
                
                <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                  Take control of your budget and track your spending with ease. 
                  Your financial freedom is waiting to be realized.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <Link
                    to="/signup"
                    className="group relative px-10 py-5 rounded-2xl bg-white text-violet-800 font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  
                  <span className="text-white/40 text-sm font-medium">Joined by 10,000+ users today</span>
                </div>

                {/* Glassmorphic border */}
                <div className="absolute inset-px rounded-[2.5rem] border border-white/10 pointer-events-none" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </PublicLayout>
  );
}
