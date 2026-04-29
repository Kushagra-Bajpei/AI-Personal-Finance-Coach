import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, MessageCircle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { FadeIn } from '../components/AnimationWrappers';
import PublicLayout from '../layouts/PublicLayout';

// In a real app, this would come from an API or CMS
const posts = [
  {
    id: 'autonomous-finance',
    category: 'AI & Future',
    title: 'The Rise of Autonomous Finance: How AI Will Manage Your Money by 2030',
    content: `
      The financial world is on the brink of its most significant transformation since the invention of the credit card. We are entering the era of "Autonomous Finance"—a state where software handles your entire financial life with minimal human intervention.
      
      Imagine waking up to a notification that your AI coach has automatically moved ₹5,000 from your checking account to a high-yield savings account because it predicted a lower spending week ahead. By mid-morning, it has rebalanced your investment portfolio to capitalize on a slight market dip, and by evening, it has negotiated a lower rate on your insurance premium.
      
      This isn't science fiction. With the integration of LLMs (Large Language Models) and real-time banking APIs, the infrastructure for this future is being built today. WealthWise is at the forefront of this movement, creating the neural engine that understands not just your balance, but your financial aspirations.
    `,
    author: 'Dr. Sarah Chen',
    date: 'April 25, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'dynamic-budgeting',
    category: 'Budgeting',
    title: 'Beyond the 50/30/20 Rule: Dynamic Budgeting for the Modern Era',
    content: `
      For decades, the 50/30/20 rule (50% needs, 30% wants, 20% savings) has been the gold standard. But in an era of fluctuating gig income and hyper-inflation, these rigid percentages often fail.
      
      Dynamic Budgeting is the alternative. It uses real-time data to adjust your spending limits based on your current cash flow, upcoming obligations, and long-term goals. Instead of a fixed monthly budget, your spending power is recalculated daily.
      
      Our latest AI engine tracks over 200 data points to give you a "Safe to Spend" number every morning. This eliminates "budget anxiety" and gives you the freedom to enjoy your money without checking a spreadsheet.
    `,
    author: 'Marcus J. Miller',
    date: 'April 20, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'doom-spending',
    category: 'Psychology',
    title: 'The "Doom Spending" Trap: Why We Buy When We Are Stressed',
    content: `
      "Doom spending" is the act of spending money to cope with economic or existential anxiety. When the future feels uncertain, the brain prioritizes immediate dopamine hits over long-term security.
      
      We analyzed anonymized transaction data and found a direct correlation between high stress periods and impulse shopping in the "Luxury" and "Dining" categories. 
      
      WealthWise helps you break this cycle by identifying your personal "anxiety spending" patterns. Our AI can nudge you with a supportive message when it detects a high-stress purchase pattern, helping you pause and reflect before you click "Checkout."
    `,
    author: 'Elena Rodriguez',
    date: 'April 14, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'passive-income',
    category: 'Investing',
    title: 'Passive Income Strategies for the Tech-Savvy Professional',
    content: `
      Passive income is often misunderstood as "free money." In reality, it's about front-loading effort or capital to create a recurring return. For tech professionals, the opportunities are vast.
      
      From creating fractional real estate portfolios to setting up automated index fund ladders, the key is diversification. We explore five specific strategies that leverage modern fintech platforms to build wealth while you sleep.
    `,
    author: 'David Vance',
    date: 'April 10, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'compound-effect',
    category: 'Wealth Building',
    title: 'The Compound Effect: Turning ₹1,000 into a Retirement Fund',
    content: `
      Compound interest is the eighth wonder of the world. Even small amounts, when invested consistently over time, explode in value due to exponential growth.
      
      We break down the math of how a single ₹1,000 monthly investment can grow into a significant nest egg over 30 years. The secret isn't the amount—it's the time. We'll show you how to start today, regardless of your current income level.
    `,
    author: 'Aria Thompson',
    date: 'April 02, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'cyber-resilience',
    category: 'Security',
    title: 'Cyber-Resilience: Keeping Your Digital Assets Safe in 2026',
    content: `
      As your wealth becomes entirely digital, your security must become proactive. Cyber-resilience is more than just a strong password; it's a multi-layered approach to protecting your digital identity.
      
      We discuss the shift from reactive security to proactive resilience, including hardware keys, biometric authentication, and how WealthWise protects your data with bank-grade encryption and zero-knowledge protocols.
    `,
    author: 'WealthWise AI Team',
    date: 'March 25, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
  }
];

export default function BlogPost() {
  const { id } = useParams();
  const { dark } = useTheme();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <PublicLayout>
        <div className="pt-40 pb-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="text-violet-400">Back to blog</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="pt-32 pb-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-4 relative">
          <FadeIn>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>
            
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-violet-500/20 text-violet-400 bg-violet-500/5 mb-6">
              {post.category}
            </span>
            
            <h1 className={`font-display text-4xl sm:text-5xl font-bold mb-8 leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 mb-12 py-6 border-y border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>{post.author}</div>
                  <div className="text-xs text-slate-500">{post.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm ml-auto">
                <Clock className="w-4 h-4" /> {post.readTime}
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden mb-12 aspect-[16/9]">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className={`prose prose-lg max-w-none ${dark ? 'prose-invert text-slate-300' : 'text-slate-600'}`}>
              {post.content.split('\\n\\n').map((paragraph, i) => (
                <p key={i} className="mb-6 leading-relaxed whitespace-pre-line text-lg">
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors">
                  <MessageCircle className="w-4 h-4" /> 12 Comments
                </button>
              </div>
              <Link to="/contact" className="text-sm font-medium text-violet-400 hover:underline">
                Ask a question about this article
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </PublicLayout>
  );
}
