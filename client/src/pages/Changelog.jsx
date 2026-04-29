import { CheckCircle2, TrendingUp, ShieldCheck, Wrench, Clock, User } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { FadeIn, StaggerChildren, StaggerItem } from '../components/AnimationWrappers';
import PublicLayout from '../layouts/PublicLayout';

const releases = [
  {
    version: 'v2.4.0',
    date: 'April 28, 2026',
    label: 'Latest',
    labelColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    changes: [
      { type: 'feature', icon: CheckCircle2, text: 'Real-time Bank Sync — Connect your accounts securely for instant tracking.' },
      { type: 'feature', icon: CheckCircle2, text: 'AI Budget Forecasting — 12-month projections based on your spending habits.' },
      { type: 'improvement', icon: TrendingUp, text: 'Optimized dashboard loading time by 60% with smart data fetching.' },
      { type: 'fix', icon: Wrench, text: 'Resolved a bug where manual transactions were occasionally duplicated.' },
    ],
  },
  {
    version: 'v2.3.0',
    date: 'March 15, 2026',
    label: null,
    changes: [
      { type: 'feature', icon: CheckCircle2, text: 'Premium Wealth Advisor — Get 24/7 dedicated AI coaching for complex goals.' },
      { type: 'feature', icon: CheckCircle2, text: 'PDF Reports — Export professional financial summaries for taxes or planning.' },
      { type: 'improvement', icon: TrendingUp, text: 'Enhanced AI categorization accuracy for international transactions.' },
      { type: 'security', icon: ShieldCheck, text: 'Implemented Multi-Factor Authentication (MFA) for all premium accounts.' },
    ],
  },
  {
    version: 'v2.1.0',
    date: 'February 10, 2026',
    label: null,
    changes: [
      { type: 'feature', icon: CheckCircle2, text: 'Global Currency Support — Track expenses in over 150 different currencies.' },
      { type: 'improvement', icon: TrendingUp, text: 'Complete redesign of the transaction table for better mobile visibility.' },
      { type: 'fix', icon: Wrench, text: 'Fixed incorrect balance calculations for users with negative income types.' },
    ],
  },
  {
    version: 'v2.0.0',
    date: 'January 5, 2026',
    label: 'Major',
    labelColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    changes: [
      { type: 'feature', icon: CheckCircle2, text: 'Project Rebrand — WealthWise: From a simple tracker to a full AI coach.' },
      { type: 'feature', icon: CheckCircle2, text: 'Introduced Tiered Pricing — Free, Pro, and Enterprise plans now live.' },
      { type: 'improvement', icon: TrendingUp, text: 'Migrated to Llama 3.3 70B for faster and smarter AI responses.' },
      { type: 'security', icon: ShieldCheck, text: 'Achieved SOC2 Compliance for enterprise-grade data security.' },
    ],
  },
];

const typeStyles = {
  feature: 'text-violet-400 bg-violet-500/10',
  improvement: 'text-cyan-400 bg-cyan-500/10',
  fix: 'text-red-400 bg-red-500/10',
  security: 'text-emerald-400 bg-emerald-500/10',
};

export default function Changelog() {
  const { dark } = useTheme();

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
              Changelog
            </span>
            <h1 className={`font-display text-5xl sm:text-6xl font-bold mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
              What's <span className="gradient-text">new</span>
            </h1>
            <p className={`text-xl leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              Every update, improvement, and fix — documented with care. We ship fast and ship quality.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="space-y-10" staggerDelay={0.12}>
            {releases.map(({ version, date, label, labelColor, changes }) => (
              <StaggerItem key={version}>
                <div className={`relative rounded-3xl border p-8 ${dark ? 'bg-[#12121a] border-white/8' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{version}</span>
                    {label && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${labelColor}`}>{label}</span>
                    )}
                    <span className={`ml-auto text-sm ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{date}</span>
                  </div>
                  <ul className="space-y-4">
                    {changes.map(({ type, icon: Icon, text }) => (
                      <li key={text} className="flex items-start gap-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold flex-shrink-0 mt-0.5 ${typeStyles[type]}`}>
                          <Icon className="w-3 h-3" />
                          {type}
                        </span>
                        <span className={`text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </PublicLayout>
  );
}
