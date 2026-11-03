import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Search,
  Scale,
  Menu,
  X,
  ChevronRight,
  Leaf,
  Globe,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenCompare: () => void;
  comparedCount: number;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  onOpenCompare,
  comparedCount,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'shop', label: 'Shop', badge: 'Soon' },
    { id: 'contact', label: 'Contact us' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      {/* Top Announcement & Quick Contact Bar */}
      <div className="bg-emerald-950 text-stone-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-1.5 font-medium text-emerald-400"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.subtagline}</span>
            </motion.span>
            <span className="hidden sm:inline text-stone-600">•</span>
            <a
              href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{COMPANY_INFO.phonePrimary}</span>
            </a>
            <span className="hidden sm:inline text-stone-600">•</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-3 h-3 text-emerald-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 text-stone-300">
            <span className="inline-flex items-center gap-1 text-[11px] text-stone-400">
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>{COMPANY_INFO.location}</span>
            </span>
            <span className="hidden lg:inline text-stone-700">|</span>
            <span className="hidden lg:inline text-[11px] text-stone-400">
              Mobile (EU): <span className="text-stone-200">{COMPANY_INFO.phoneSecondary}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Title */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-hidden group"
          >
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center p-2 shadow-sm border border-emerald-700/30 overflow-hidden group-hover:shadow-md transition-shadow">
              <img
                src={COMPANY_INFO.logoUrl}
                alt={COMPANY_INFO.logoAlt}
                className="w-full h-full object-contain filter drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <Leaf className="w-6 h-6 text-emerald-400 absolute" />
            </div>
            <div>
              <div className="font-display font-extrabold text-stone-900 text-lg leading-tight tracking-tight uppercase group-hover:text-emerald-800 transition-colors">
                Ceylon Neyansa
              </div>
              <div className="text-[11px] font-semibold text-emerald-700 tracking-wider uppercase flex items-center gap-1">
                <span>Coco Products (Pvt) Ltd</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse"></span>
              </div>
            </div>
          </motion.button>

          {/* Desktop Navigation Links with animated sliding underline */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 relative">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-900'
                      : 'text-stone-600 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {link.badge && (
                    <span className="relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-emerald-50 rounded-lg shadow-xs"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    >
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-700 rounded-full" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onOpenSearch}
              aria-label="Search"
              className="p-2.5 rounded-xl text-stone-600 hover:text-emerald-800 hover:bg-emerald-50/60 transition-colors border border-transparent hover:border-emerald-100"
              title="Search anything..."
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Compare Tool Trigger */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onOpenCompare}
              aria-label="Compare Products"
              className="relative p-2.5 rounded-xl text-stone-600 hover:text-emerald-800 hover:bg-emerald-50/60 transition-colors border border-transparent hover:border-emerald-100"
              title="Product Comparison"
            >
              <Scale className="w-5 h-5" />
              {comparedCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-sm"
                >
                  {comparedCount}
                </motion.span>
              )}
            </motion.button>

            {/* Inquire CTA Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenInquiry}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-300 group-hover:rotate-12 transition-transform" />
              <span>Let's Talk</span>
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-stone-200 bg-white/98 backdrop-blur-lg px-4 pt-3 pb-6 shadow-xl overflow-hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-left transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-900 font-bold'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-stone-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-800 text-white font-semibold text-sm shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Request Quote / Let's Talk</span>
              </button>

              <div className="text-xs text-stone-500 space-y-1 px-2 pt-2">
                <p>Email: {COMPANY_INFO.email}</p>
                <p>Phone: {COMPANY_INFO.phonePrimary}</p>
                <p>Mobile: {COMPANY_INFO.phoneSecondary}</p>
                <p>Location: {COMPANY_INFO.location}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
