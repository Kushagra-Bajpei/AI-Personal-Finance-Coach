import { motion } from 'framer-motion';
import { MessageSquare, Cpu, BarChart3, ChevronRight, Clock, Shield, Zap, Info, Sparkles, CheckCircle2, Wallet, TrendingUp, PieChart } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { FadeIn, StaggerChildren, StaggerItem } from '../components/AnimationWrappers';
import PublicLayout from '../layouts/PublicLayout';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    icon: Wallet,
    title: 'Connect & Track',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200',
    description:
      'Securely link your accounts or manually input your daily expenses. WealthWise organizes your financial footprint into intuitive categories, giving you an immediate bird\'s-eye view of your money.',
    tips: ['Bank-grade secure connection', 'Auto-categorization of 20+ buckets', 'Real-time transaction syncing', 'Manual entry for cash expenses'],
    color: 'from-violet-500 to-purple-600',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI Analysis',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    description:
      'Our state-of-the-art neural engine analyzes your spending patterns, identifying hidden costs, recurring leaks, and opportunities for optimization that the human eye might miss.',
    tips: ['Pattern recognition technology', 'Budget health scoring', 'Anomaly detection', 'Personalized saving targets'],
    color: 'from-cyan-500 to-blue-600',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Wealth Coaching',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200',
    description:
      'Receive actionable growth plans tailored to your goals. Whether it\'s saving for a home, retiring early, or just building an emergency fund, WealthWise guides every step with data-driven advice.',
    tips: ['Custom goal setting', 'Daily financial coaching tips', 'Long-term wealth projection', 'Dynamic budget adjustments'],
    color: 'from-pink-500 to-rose-600',
  },
];

const faqs = [
  { q: 'Is my financial data secure?', a: 'Absolutely. We use bank-grade 256-bit encryption and never sell your personal financial data. Your security is our top priority.' },
  { q: 'How often does the AI update?', a: 'WealthWise processes your data in real-time. As soon as a transaction is logged, your coaching advice and budget status update instantly.' },
  { q: 'Can I set multiple financial goals?', a: 'Yes! You can track multiple goals simultaneously — from short-term vacations to long-term retirement planning.' },
  { q: 'Do I need a finance degree to use it?', a: 'Not at all. WealthWise is designed to talk like a human. We turn complex financial math into simple, actionable steps.' },
];

export default function HowItWorks() {
  const { dark } = useTheme();

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[130px] rounded-full" />
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-8 backdrop-blur-md uppercase tracking-widest">
                Our Methodology
              </div>
              <h1 className={`font-display text-5xl sm:text-7xl font-black mb-6 leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
                Mastering your <br />
                <span className="gradient-text">Personal Economy</span>
              </h1>
              <p className={`text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                We've combined deep-seated behavioral economics with state-of-the-art AI to create a coaching experience that actually changes your financial future. By understanding your psychological triggers and spending patterns, WealthWise doesn't just track your money—it actively helps you rewire your financial habits for long-term prosperity. Our system works silently in the background, analyzing thousands of data points to ensure you're always on the fastest path to wealth.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Steps Walkthrough */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40">
          {steps.map(({ number, icon: Icon, title, image, description, tips, color }, idx) => (
            <div key={number} className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image Column */}
              <FadeIn className="w-full lg:w-1/2" direction={idx % 2 === 0 ? 'left' : 'right'}>
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-gradient-to-br ${color} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-700 pointer-events-none rounded-3xl`} />
                  <div className={`relative rounded-[2.5rem] overflow-hidden border ${dark ? 'border-white/10 shadow-2xl shadow-black/50' : 'border-slate-200 shadow-xl'}`}>
                    <img 
                      src={image} 
                      alt={title} 
                      className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 flex items-center gap-4 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20">
                        <span className="font-display text-2xl font-black text-white">{number}</span>
                        <div className="w-px h-6 bg-white/20" />
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Content Column */}
              <FadeIn className="w-full lg:w-1/2 space-y-8" direction={idx % 2 === 0 ? 'right' : 'left'}>
                <div className="space-y-4">
                  <h2 className={`font-display text-4xl sm:text-5xl font-black leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
                    {title}
                  </h2>
                  <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${color}`} />
                </div>
                
                <p className={`text-lg leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {tips.map(tip => (
                    <div key={tip} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-sm opacity-20`} />
                      <span className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-800'}`}>{tip}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Performance */}
      <section className={`py-40 relative overflow-hidden ${dark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${dark ? 'rgba(124,58,237,0.05)' : 'rgba(124,58,237,0.02)'} 0%, transparent 70%)`
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-20">
            <h2 className={`font-display text-5xl font-black mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Beyond <span className="gradient-text">Tracking</span>
            </h2>
            <p className={`text-lg ${dark ? 'text-slate-400' : 'text-slate-600'}`}>Engineering excellence meets intelligent wealth management.</p>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-3 gap-10" staggerDelay={0.15}>
            {[
              { icon: Shield, stat: 'Bank-Grade Security', value: 'AES-256', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800', desc: 'Your data is encrypted and protected with industry-leading security protocols.' },
              { icon: Clock, stat: 'Real-time Tracking', value: 'Instant', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', desc: 'Transactions are processed and analyzed the second they occur.' },
              { icon: Zap, stat: 'Smart Predictions', value: '98%', image: 'https://images.unsplash.com/photo-1518186239751-a7113f0d9313?q=80&w=800', desc: 'Our AI predicts your monthly outcome with startling precision.' },
            ].map(({ icon: Icon, stat, value, image, desc }) => (
              <StaggerItem key={stat}>
                <div className={`group relative p-10 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-4 overflow-hidden ${
                  dark ? 'bg-[#12121a] border-white/5 hover:border-violet-500/20' : 'bg-white border-slate-200 shadow-xl'
                }`}>
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none">
                    <img src={image} className="w-full h-full object-cover" alt="" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${dark ? 'from-[#12121a]' : 'from-white'} via-transparent to-transparent`} />
                  </div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-violet-400" />
                    </div>
                    <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{stat}</div>
                    <div className="font-display text-4xl font-black text-white mb-4 gradient-text">{value}</div>
                    <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-40 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-24">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-2xl backdrop-blur-md">
                  <Sparkles className="w-10 h-10 text-violet-400 animate-pulse" />
              </div>
            <h2 className={`font-display text-5xl sm:text-6xl font-black mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Financial <span className="gradient-text">Intelligence</span>
            </h2>
            <p className={`text-xl ${dark ? 'text-slate-400' : 'text-slate-600'}`}>Everything you need to know about the AI behind your wealth.</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                q: 'Is my financial data secure?', 
                a: 'Absolutely. We use bank-grade 256-bit encryption and never sell your personal financial data. Your security is our top priority.',
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400',
                color: 'from-violet-500/10'
              },
              { 
                q: 'How often does the AI update?', 
                a: 'WealthWise processes your data in real-time. As soon as a transaction is logged, your coaching advice and budget status update instantly.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400',
                color: 'from-cyan-500/10'
              },
              { 
                q: 'Can I track multiple goals?', 
                a: 'Yes! You can track multiple goals simultaneously — from short-term vacations to long-term retirement planning.',
                image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400',
                color: 'from-pink-500/10'
              },
              { 
                q: 'Do I need a finance degree?', 
                a: 'Not at all. WealthWise is designed to talk like a human. We turn complex financial math into simple, actionable steps.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400',
                color: 'from-amber-500/10'
              },
            ].map(({ q, a, image, color }, idx) => (
              <FadeIn key={q} delay={idx * 0.1}>
                <div className={`group relative p-8 rounded-[2rem] border overflow-hidden transition-all duration-300 hover:border-violet-500/30 backdrop-blur-md h-full ${
                  dark ? 'bg-[#12121a]/80 border-white/5' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${color} blur-3xl rounded-full opacity-50`} />
                  
                  <div className="flex gap-6 items-start relative z-10">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <img src={image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-3 ${dark ? 'text-white' : 'text-slate-900'}`}>{q}</h3>
                      <p className={`text-base leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{a}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5} className="mt-24 text-center">
            <Link
              to="/signup"
              className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-black text-lg hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:scale-105 transition-all duration-500"
            >
              Start Your Journey <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </PublicLayout>
  );
}
