import React, { useState } from 'react';
import { COMPANY_INFO, ARTICLES } from '../data/content';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  ExternalLink,
  Cookie,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenArticle: (id: string) => void;
  onOpenCookieSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenArticle,
  onOpenCookieSettings,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 relative overflow-hidden">
      {/* Newsletter Strip */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-800/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Globe2 className="w-3.5 h-3.5" />
              Stay Connected
            </span>
            <h4 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Subscrive Our Newsletter To Get More Updates
            </h4>
            <p className="mt-2 text-emerald-200/80 text-sm">
              Receive updates on seasonal coconut yields, export shipping schedules, and new eco-friendly substrate developments directly from Sri Lanka.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-800/50 border border-emerald-600/50 text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                <p className="text-sm font-medium">
                  Thank you for subscribing! You will receive our latest updates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                <div className="relative grow">
                  <Mail className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter email"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-stone-950/70 border border-emerald-700/50 text-white placeholder-stone-400 text-sm focus:outline-hidden focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-md active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
            {error && <p className="text-red-400 text-xs mt-2 text-center lg:text-left">{error}</p>}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-900 flex items-center justify-center p-1.5 border border-emerald-700/50">
                <img
                  src={COMPANY_INFO.logoUrl}
                  alt={COMPANY_INFO.name}
                  className="w-full h-full object-contain"
                  onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                />
              </div>
              <div>
                <h5 className="font-display font-bold text-white text-base leading-tight">
                  CEYLON NEYANSA
                </h5>
                <p className="text-xs text-emerald-400 font-medium">COCO PRODUCTS (PVT) LTD</p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed">
              {COMPANY_INFO.subtagline}
            </p>
            <p className="text-xs text-stone-500 leading-relaxed">
              We bring the natural goodness of Sri Lankan coconuts to global markets. Committed to delivering quality, freshness, and authentic Ceylon excellence.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <img
                src={COMPANY_INFO.certificationBadge}
                alt="Certified Quality"
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity rounded-sm bg-white/5 p-1"
                onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
              />
              <div className="text-[11px] text-stone-400 leading-snug">
                <span className="font-semibold text-stone-200 block">100% Organic Ceylon</span>
                International Export Compliance
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'blog', label: 'Blog & Articles' },
                { id: 'shop', label: 'Online Store (Soon)' },
                { id: 'contact', label: 'Contact us' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-700 group-hover:bg-emerald-400 transition-colors"></span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Recent News */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5">
              Recent News
            </h5>
            <div className="space-y-3.5">
              {ARTICLES.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onOpenArticle(art.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer"
                >
                  <p className="text-xs text-emerald-400 font-medium mb-0.5">{art.date}</p>
                  <h6 className="text-sm font-medium text-stone-300 group-hover:text-white transition-colors line-clamp-2">
                    {art.title}
                  </h6>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5">
              Contact Us
            </h5>
            <ul className="space-y-3.5 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-stone-500 block">Location:</span>
                  <span className="text-stone-300 font-medium">{COMPANY_INFO.location}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-stone-500 block">Email us:</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-stone-300 hover:text-emerald-400 font-medium transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-stone-500 block">Phone:</span>
                  <a
                    href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                    className="text-stone-300 hover:text-emerald-400 font-medium transition-colors block"
                  >
                    {COMPANY_INFO.phonePrimary}
                  </a>
                  <span className="text-xs text-stone-500 mt-1 block">Mobile (International / EU):</span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                    className="text-stone-300 hover:text-emerald-400 font-medium transition-colors"
                  >
                    {COMPANY_INFO.phoneSecondary}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{COMPANY_INFO.copyright}</p>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            <button
              onClick={onOpenCookieSettings}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-200 transition-colors"
            >
              <Cookie className="w-3.5 h-3.5 text-amber-500" />
              <span>Cookie Preferences</span>
            </button>
            <span className="hidden sm:inline">•</span>
            <span>Sri Lankan Origin • Premium Quality • Global Export</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <img
                src={COMPANY_INFO.paymentBadge}
                alt="Supported Logistics & Payment"
                className="h-5 w-auto object-contain opacity-70"
                onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
