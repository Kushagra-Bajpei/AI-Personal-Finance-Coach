import { Star, Quote } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { FadeIn } from '../components/AnimationWrappers';
import PublicLayout from '../layouts/PublicLayout';
import { Link } from 'react-router-dom';

const testimonials = [
    { id: 1, description: "WealthWise saved me ₹50,000 in just 3 months. The AI found overlapping subscriptions and wasteful spending patterns I didn't even know I had.", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", name: "Alex Turner", role: "Startup Founder" },
    { id: 2, description: "The level of precision in categorization is insane. It's the first finance app that actually understands my irregular income patterns as a consultant.", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", name: "Harry Peter", role: "Data Scientist" },
    { id: 3, description: "Between long shifts, I don't have time for spreadsheets. The daily AI coaching tips keep my spending in check without any manual effort.", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60", name: "Jason Kim", role: "Medical Resident" },
    { id: 4, description: "Finally, a finance app that doesn't look like a 90s bank portal. The insights are as beautiful as they are useful for my daily budgeting.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200", name: "Sofia Martinez", role: "UX Designer" },
    { id: 5, description: "The bank-grade encryption is what sold me. My financial data is mine alone, and WealthWise respects my privacy completely.", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60", name: "Alex Johnson", role: "Privacy Advocate" },
    { id: 6, description: "Managing taxes and irregular income used to be a nightmare. WealthWise makes it feel like I have a personal CFO in my pocket.", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", name: "Emily Karter", role: "Freelance Writer" },
    { id: 7, description: "I love the 'What-If' projections. It helped me realize that retiring 5 years earlier was actually possible with just a few small changes today.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200", name: "Levin Smith", role: "Financial Researcher" },
    { id: 8, description: "I've tried every budget app out there. WealthWise is the only one that actually changed my spending behavior, not just my spreadsheets.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200", name: "Sarah Connor", role: "Senior Journalist" },
    { id: 9, description: "The AI coaching is surprisingly human. It doesn't just judge my spending; it suggests better ways to achieve my long-term business goals.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200", name: "Marcus Roe", role: "Business Owner" }
];

const columns = [
    { start: 0, end: 3, className: "animate-scroll-up-1" },
    { start: 3, end: 6, className: "hidden md:flex flex-col animate-scroll-up-2" },
    { start: 6, end: 9, className: "hidden lg:flex flex-col animate-scroll-up-3" }
];

export default function Testimonials() {
  const { dark } = useTheme();

  const renderCard = (testimonial, index) => (
    <div key={`${testimonial.id}-${index}`} className={`border rounded-[2rem] p-8 mb-6 transition-all duration-500 hover:scale-[1.02] ${
        dark ? 'bg-[#12121a] border-white/5 shadow-2xl shadow-black/50' : 'bg-white border-slate-200 shadow-xl'
    }`}>
        <div className="mb-6">
            <Quote className="w-8 h-8 text-violet-500 opacity-50" />
        </div>
        <p className={`text-lg leading-relaxed mb-8 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            "{testimonial.description}"
        </p>
        <div className="flex items-center gap-4 pt-6 border-t border-white/5">
            <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-violet-500/20 shadow-lg" />
            <div>
                <p className={`font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{testimonial.name}</p>
                <p className="text-sm font-semibold gradient-text uppercase tracking-widest">{testimonial.role}</p>
            </div>
        </div>
    </div>
  );

  return (
    <PublicLayout>
        <style>
            {`
                @keyframes scroll-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                .animate-scroll-up-1 {
                    animation: scroll-up 40s linear infinite;
                }
                .animate-scroll-up-2 {
                    animation: scroll-up 50s linear infinite;
                }
                .animate-scroll-up-3 {
                    animation: scroll-up 35s linear infinite; 
                }
                .animate-scroll-up-1:hover, .animate-scroll-up-2:hover, .animate-scroll-up-3:hover {
                    animation-play-state: paused;
                }
            `}
        </style>

        <section className={`pt-32 pb-20 relative overflow-hidden min-h-screen ${dark ? 'bg-[#06060d]' : 'bg-slate-50'}`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-20">
                <FadeIn>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-8 uppercase tracking-widest">
                        <Star className="w-4 h-4 text-violet-500 fill-violet-500" /> Success Stories
                    </div>
                    <h1 className={`font-display text-6xl sm:text-7xl font-black mb-8 ${dark ? 'text-white' : 'text-slate-900'}`}>
                        People trust <span className="gradient-text">WealthWise</span>
                    </h1>
                    <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Join thousands of smart savers, investors, and business owners who have transformed their financial future with our AI coaching.
                    </p>
                </FadeIn>
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-4 overflow-hidden h-[800px]">
                {/* Edge Fades */}
                <div className={`absolute top-0 left-0 right-0 h-40 z-10 pointer-events-none ${dark ? 'bg-gradient-to-b from-[#06060d]' : 'bg-gradient-to-b from-slate-50'} to-transparent`} />
                <div className={`absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none ${dark ? 'bg-gradient-to-t from-[#06060d]' : 'bg-gradient-to-t from-slate-50'} to-transparent`} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden h-full">
                    {columns.map((col, colIndex) => (
                        <div key={colIndex} className={col.className}>
                            {[...testimonials.slice(col.start, col.end), ...testimonials.slice(col.start, col.end)].map((testimonial, index) =>
                                renderCard(testimonial, index)
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-4xl mx-auto px-4 text-center mt-32 relative z-10">
                <div className={`p-12 rounded-[3.5rem] border backdrop-blur-3xl shadow-2xl ${dark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                    <h2 className={`text-4xl font-black mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>Ready for financial freedom?</h2>
                    <p className={`mb-8 text-lg ${dark ? 'text-slate-400' : 'text-slate-600'}`}>Join the community of savvy individuals who are already mastering their personal economy.</p>
                    <Link to="/signup" className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-black text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-5px_rgba(139,92,246,0.5)]">
                        Get Started for Free
                    </Link>
                </div>
            </div>
        </section>
    </PublicLayout>
  );
}
