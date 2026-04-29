import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { FadeIn, StaggerChildren, StaggerItem } from '../components/AnimationWrappers';
import PublicLayout from '../layouts/PublicLayout';

const posts = [
  {
    slug: '#',
    category: 'AI & Future',
    categoryColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    title: 'The Rise of Autonomous Finance: How AI Will Manage Your Money by 2030',
    excerpt: 'Imagine a world where your bills pay themselves, your investments rebalance daily, and your savings grow without you lifting a finger. This is the future of autonomous finance.',
    author: 'Dr. Sarah Chen',
    date: 'April 25, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200',
  },
  {
    slug: '#',
    category: 'Budgeting',
    categoryColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    title: 'Beyond the 50/30/20 Rule: Dynamic Budgeting for the Modern Era',
    excerpt: 'Traditional budgeting rules are too rigid for today\'s gig economy and rising inflation. Learn how dynamic budgeting adapts to your life in real-time.',
    author: 'Marcus J. Miller',
    date: 'April 20, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
  },
  {
    slug: '#',
    category: 'Psychology',
    categoryColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    title: 'The "Doom Spending" Trap: Why We Buy When We Are Stressed',
    excerpt: 'Understanding the neurological link between economic anxiety and impulse shopping, and how to use AI nudges to protect your future self.',
    author: 'Elena Rodriguez',
    date: 'April 14, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1512428559083-a4979b2b51ff?auto=format&fit=crop&q=80&w=1200',
  },
  {
    slug: '#',
    category: 'Investing',
    categoryColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    title: 'Passive Income Strategies for the Tech-Savvy Professional',
    excerpt: 'From automated dividend reinvestment to fractional real estate, explore high-yield strategies that require minimal maintenance.',
    author: 'David Vance',
    date: 'April 10, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200',
  },
  {
    slug: '#',
    category: 'Wealth Building',
    categoryColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    title: 'The Compound Effect: Turning ₹1,000 into a Retirement Fund',
    excerpt: 'Small, consistent actions lead to massive results. We break down the math of compound interest and how to start with any budget.',
    author: 'Aria Thompson',
    date: 'April 02, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1200',
  },
  {
    slug: '#',
    category: 'Security',
    categoryColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    title: 'Cyber-Resilience: Keeping Your Digital Assets Safe in 2026',
    excerpt: 'As hackers get smarter, your security must evolve. Learn the essential steps to protect your crypto, bank accounts, and digital identity.',
    author: 'WealthWise AI Team',
    date: 'March 25, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
  },
];

export default function Blog() {
  const { dark } = useTheme();
  const [featured, ...rest] = posts;

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
              WealthWise Insights
            </span>
            <h1 className={`font-display text-5xl sm:text-6xl font-bold mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Master your <span className="gradient-text">financial world</span>
            </h1>
            <p className={`text-xl leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              Expert advice on AI-driven wealth management, smart budgeting, and financial psychology.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link to={featured.slug} className={`group relative flex flex-col lg:flex-row gap-0 rounded-3xl border overflow-hidden transition-all duration-500 hover:border-violet-500/40 hover:shadow-[0_0_60px_rgba(124,58,237,0.15)] ${dark ? 'bg-[#12121a] border-white/8' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden">
                <img 
                  src={featured.image} 
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center lg:w-3/5">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border mb-4 w-fit ${featured.categoryColor}`}>
                  {featured.category}
                </span>
                <h2 className={`font-display text-2xl lg:text-3xl font-bold mb-4 group-hover:text-violet-400 transition-colors ${dark ? 'text-white' : 'text-slate-900'}`}>
                  {featured.title}
                </h2>
                <p className={`text-base leading-relaxed mb-6 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{featured.excerpt}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{featured.author}</span>
                  </div>
                  <span className={`text-sm flex items-center gap-1.5 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                    <Clock className="w-3.5 h-3.5" />{featured.readTime}
                  </span>
                  <span className={`text-sm ml-auto flex items-center gap-1 text-violet-400 font-medium`}>
                    Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {rest.map(({ slug, category, categoryColor, title, excerpt, author, readTime, image }) => (
              <StaggerItem key={title}>
                <Link to={slug} className={`group flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-lg ${dark ? 'bg-[#12121a] border-white/8' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={image} 
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border mb-3 w-fit ${categoryColor}`}>
                      {category}
                    </span>
                    <h3 className={`font-display text-lg font-bold mb-3 group-hover:text-violet-400 transition-colors flex-1 ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
                    <p className={`text-sm leading-relaxed mb-5 ${dark ? 'text-slate-400' : 'text-slate-600'} line-clamp-2`}>{excerpt}</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <span className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{author}</span>
                      <span className={`text-xs ml-auto flex items-center gap-1 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Clock className="w-3 h-3" />{readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </PublicLayout>
  );
}
