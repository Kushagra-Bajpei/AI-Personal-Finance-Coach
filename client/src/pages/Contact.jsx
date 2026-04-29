import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader, MessageSquare, ShieldCheck, LifeBuoy } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { FadeIn, StaggerChildren, StaggerItem } from '../components/AnimationWrappers';
import PublicLayout from '../layouts/PublicLayout';
import { API_BASE_URL } from '../config';

const contactInfo = [
  { icon: Mail, label: 'Support Email', value: 'support@wealthwise.ai', href: 'mailto:support@wealthwise.ai' },
  { icon: MapPin, label: 'Headquarters', value: 'Financial District, Mumbai, MH 400051' },
  { icon: Phone, label: 'Member Support', value: '+91 800-WEALTH-AI', href: 'tel:+918009325842' },
];

const supportCategories = [
  { icon: ShieldCheck, title: 'Security', desc: 'Queries about encryption and data privacy.' },
  { icon: MessageSquare, title: 'Coaching', desc: 'Need help with AI advice or budget plans.' },
  { icon: LifeBuoy, title: 'Technical', desc: 'Issues with account linking or app features.' },
];

export default function Contact() {
  const { dark } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    
    setStatus('loading');
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
      } else {
        setErrors({ submit: data.message || 'Something went wrong' });
        setStatus('error');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to connect to the server' });
      setStatus('error');
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 ${
      dark
        ? `bg-white/5 border text-white placeholder-slate-500 focus:ring-2 focus:ring-violet-500 ${errors[field] ? 'border-red-500' : 'border-white/10 focus:border-violet-500'}`
        : `bg-slate-50 border text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-violet-200 ${errors[field] ? 'border-red-400' : 'border-slate-200 focus:border-violet-400'}`
    }`;

  return (
    <PublicLayout>
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
              Contact Support
            </span>
            <h1 className={`font-display text-5xl sm:text-6xl font-bold mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Let's build your <span className="gradient-text">wealth</span>
            </h1>
            <p className={`text-xl leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              Have a question about your budget, account security, or our AI coaching plans? Our financial experts and support team are here to help you 24/7.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left Column: Info & Categories */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn direction="right">
                <div className={`rounded-2xl border p-8 ${dark ? 'bg-[#12121a] border-white/8' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h2 className={`font-display text-2xl font-bold mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>Contact Details</h2>
                  <div className="space-y-5">
                    {contactInfo.map(({ icon: Icon, label, value, href }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</div>
                          {href ? (
                            <a href={href} className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium">{value}</a>
                          ) : (
                            <div className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Support Categories */}
              <FadeIn direction="right" delay={0.15}>
                <div className="grid grid-cols-1 gap-4">
                  {supportCategories.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className={`p-6 rounded-2xl border flex items-center gap-4 transition-all duration-300 hover:shadow-lg ${
                      dark ? 'bg-[#12121a] border-white/8 hover:border-violet-500/20' : 'bg-white border-slate-200'
                    }`}>
                      <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
                        <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-3">
              <FadeIn direction="left">
                <div className={`rounded-2xl border p-8 ${dark ? 'bg-[#12121a] border-white/8' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                          <CheckCircle className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h3 className={`font-display text-2xl font-bold mb-3 ${dark ? 'text-white' : 'text-slate-900'}`}>Message Received</h3>
                        <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Our financial support team has received your message. We'll be in touch within 2 business hours.
                        </p>
                        <button
                          onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
                          className="mt-6 px-6 py-2.5 rounded-xl bg-violet-500/10 text-violet-400 text-sm font-semibold hover:bg-violet-500/20 transition-colors"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        <h2 className={`font-display text-2xl font-bold mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>Financial Inquiry Form</h2>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className={`block text-xs font-semibold mb-2 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>Full Name *</label>
                            <input
                              type="text"
                              name="name"
                              id="contact-name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Kushagra Bajpei"
                              className={inputClass('name')}
                            />
                            {errors.name && (
                              <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                                <AlertCircle className="w-3 h-3" />{errors.name}
                              </div>
                            )}
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold mb-2 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>Work Email *</label>
                            <input
                              type="email"
                              name="email"
                              id="contact-email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="kush@example.com"
                              className={inputClass('email')}
                            />
                            {errors.email && (
                              <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                                <AlertCircle className="w-3 h-3" />{errors.email}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className={`block text-xs font-semibold mb-2 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>Inquiry Subject</label>
                          <input
                            type="text"
                            name="subject"
                            id="contact-subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="e.g., Account Linking, Budgeting Advice"
                            className={inputClass('subject')}
                          />
                        </div>

                        <div>
                          <label className={`block text-xs font-semibold mb-2 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>How can we help? *</label>
                          <textarea
                            name="message"
                            id="contact-message"
                            rows={6}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Describe your financial goals or questions in detail..."
                            className={`${inputClass('message')} resize-none`}
                          />
                          {errors.message && (
                            <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                              <AlertCircle className="w-3 h-3" />{errors.message}
                            </div>
                          )}
                        </div>

                        <motion.button
                          type="submit"
                          id="contact-submit"
                          disabled={status === 'loading'}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-base hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300 disabled:opacity-60"
                        >
                          {status === 'loading' ? (
                            <><Loader className="w-4 h-4 animate-spin" />Processing...</>
                          ) : (
                            <><Send className="w-4 h-4" />Send Inquiry</>
                          )}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
