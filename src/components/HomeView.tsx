import React, { useState, useEffect } from 'react';
import {
  COMPANY_INFO,
  CORE_STATS,
  CORE_PILLARS,
  HERO_SLIDES,
  WHY_CHOOSE_US,
  ARTICLES,
  PRODUCTS_CATALOG,
} from '../data/content';
import { ProductItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Globe,
  MapPin,
  Leaf,
  PackageCheck,
  Handshake,
  Award,
  Layers,
  Scale,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onOpenArticle: (id: string) => void;
  onToggleCompare: (product: ProductItem) => void;
  isCompared: (productId: string) => boolean;
  onOpenInquiry: (productTitle?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenArticle,
  onToggleCompare,
  isCompared,
  onOpenInquiry,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance hero slides smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6 text-emerald-600" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-emerald-600" />;
      case 'Handshake':
        return <Handshake className="w-6 h-6 text-emerald-600" />;
      case 'Leaf':
      default:
        return <Leaf className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
        {/* Animated background ambient glowing lights */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/30 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-300 text-xs font-semibold tracking-wide uppercase shadow-sm"
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>{COMPANY_INFO.tagline}</span>
                <span className="text-emerald-500">•</span>
                <span className="text-stone-300 font-normal">{COMPANY_INFO.subtagline}</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight"
              >
                {COMPANY_INFO.headline}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                {COMPANY_INFO.heroDescription}
              </motion.p>

              {/* 4 Pillars Badge Strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
              >
                {CORE_PILLARS.map((p, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="text-xs font-semibold text-white block leading-snug">
                      {p.title}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Group */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('shop')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all active:scale-95 group cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenInquiry()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base backdrop-blur-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Request Wholesale Quote</span>
                </motion.button>
              </motion.div>

              {/* Trust & Phone snippet */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start text-xs text-stone-400 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-black font-display text-amber-400">1999 +</div>
                  <div className="text-left leading-tight">
                    <span className="font-semibold text-white block">Trust By Clients</span>
                    Worldwide Importers & Growers
                  </div>
                </div>
                <div className="hidden sm:block h-8 w-px bg-white/10" />
                <a
                  href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-emerald-800/80 text-emerald-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[11px] text-stone-400 block">Phone:</span>
                    <span className="font-semibold text-white text-sm">{COMPANY_INFO.phonePrimary}</span>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right Hero Interactive Animated Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-white/15 shadow-2xl group">
                <div className="relative h-80 sm:h-96 md:h-[430px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      <img
                        src={HERO_SLIDES[activeSlide].image}
                        alt={HERO_SLIDES[activeSlide].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-left">
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="inline-block px-3 py-1 rounded-md bg-emerald-600/90 text-white text-xs font-semibold tracking-wider uppercase mb-2 shadow-sm"
                        >
                          {HERO_SLIDES[activeSlide].tag}
                        </motion.span>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-white text-base sm:text-lg font-bold leading-snug drop-shadow-sm"
                        >
                          {HERO_SLIDES[activeSlide].title}
                        </motion.p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Slider Controls */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-stone-950/60 backdrop-blur-md rounded-full p-1 border border-white/10">
                  <button
                    onClick={() =>
                      setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                    }
                    className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-medium text-stone-300 px-1">
                    {activeSlide + 1} / {HERO_SLIDES.length}
                  </span>
                  <button
                    onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                    className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Dots indicator */}
                <div className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeSlide ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/40'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid: "Our Premium Coconut Products" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Leaf className="w-3.5 h-3.5" />
            Export Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 tracking-tight">
            Our Premium Coconut Products
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            Discover the natural versatility of the Ceylon coconut.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS_CATALOG.map((product, index) => {
            const compared = isCompared(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group flex flex-col bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-56 bg-stone-100 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-900/90 text-white backdrop-blur-xs">
                    {product.category}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => onToggleCompare(product)}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm cursor-pointer ${
                      compared
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/80 text-stone-700 hover:bg-white hover:text-emerald-800'
                    }`}
                    title={compared ? 'Remove from comparison' : 'Add to comparison'}
                  >
                    <Scale className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-stone-400 block">{product.sku}</span>
                    <h3 className="font-display font-bold text-stone-900 text-lg group-hover:text-emerald-800 transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-xs text-emerald-800 font-medium">{product.tagline}</p>
                    <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Weight:</span>
                      <span className="font-medium text-stone-800">{product.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Dimensions:</span>
                      <span className="font-medium text-stone-800">{product.dimensions}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onOpenInquiry(product.title)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-800 text-emerald-800 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-emerald-200 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Inquire / Request Spec Sheet</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats Counter Section: 4 Core Counters with animated pop */}
      <section className="bg-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none"
        />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-stone-800">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center p-6 space-y-2"
            >
              <div className="text-4xl sm:text-5xl font-black font-display text-emerald-400 tracking-tight">
                6984 +
              </div>
              <p className="text-sm sm:text-base font-semibold text-stone-200">Agriculture Products</p>
              <p className="text-xs text-stone-500">Standardized & custom coir formulations</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 space-y-2"
            >
              <div className="text-4xl sm:text-5xl font-black font-display text-amber-400 tracking-tight">
                69 K+
              </div>
              <p className="text-sm sm:text-base font-semibold text-stone-200">Projects Completed</p>
              <p className="text-xs text-stone-500">Global agricultural & greenhouse applications</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 space-y-2"
            >
              <div className="text-4xl sm:text-5xl font-black font-display text-emerald-400 tracking-tight">
                98 %
              </div>
              <p className="text-sm sm:text-base font-semibold text-stone-200">Satisfied Clients</p>
              <p className="text-xs text-stone-500">Commercial buyer satisfaction & repeat contracts</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center p-6 space-y-2"
            >
              <div className="text-4xl sm:text-5xl font-black font-display text-amber-400 tracking-tight">
                34 +
              </div>
              <p className="text-sm sm:text-base font-semibold text-stone-200">Expert Farmers</p>
              <p className="text-xs text-stone-500">Rooted in generations of Ceylon agricultural heritage</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Neyansa Ceylon Coco? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Award className="w-3.5 h-3.5" />
            Our Strengths
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 tracking-tight">
            Why Choose Neyansa Ceylon Coco?
          </h3>
          <p className="text-stone-600 text-sm sm:text-base">
            Dedicated to genuine Sri Lankan agricultural integrity, strict processing, and reliable international partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 space-y-4 hover:border-emerald-300 group"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors"
              >
                {getIcon(item.iconName)}
              </motion.div>
              <h4 className="font-display font-bold text-lg text-stone-900 group-hover:text-emerald-800 transition-colors">
                {item.title}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual Heritage & Quality Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-emerald-950 text-white rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Mosaic */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="rounded-2xl overflow-hidden shadow-lg h-56"
                >
                  <img
                    src="https://ceylonneyansacocoproducts.org/wp-content/uploads/2026/08/fd86fbdf75b30daf6e21277c9e47596b.jpg"
                    alt="Artisanal Ceylon Coconut Dehusking"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center"
                >
                  <img
                    src={COMPANY_INFO.certificationBadge}
                    alt="Certification"
                    className="h-12 w-auto mx-auto mb-2 object-contain"
                    onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  />
                  <p className="text-xs font-semibold text-emerald-300">Certified Organic Quality</p>
                  <p className="text-[11px] text-stone-400">Strict Quality & Sourcing Audits</p>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl overflow-hidden shadow-lg h-[340px]"
              >
                <img
                  src="https://ceylonneyansacocoproducts.org/wp-content/uploads/2026/08/coconut-still-life_23-2151526754.avif"
                  alt="Authentic Ceylon Coconut Still Life"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </motion.div>
            </div>

            {/* Split Description */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-900/60 px-3.5 py-1.5 rounded-full border border-emerald-700/50">
                <Globe className="w-3.5 h-3.5" />
                Global Supply Direct from Island Source
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
                Bringing the Goodness of Ceylon Coconut to the World
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                From the tropical coconut lands of Sri Lanka to customers across international markets, our products carry the authentic spirit of Ceylon wherever they go.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-800 text-emerald-300 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Our Commitment to Quality</h4>
                    <p className="text-xs text-stone-300 leading-relaxed mt-0.5">
                      We understand that international buyers require consistency, reliability, and clear communication. That's why we strive to maintain appropriate quality practices throughout our supply chain.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-800 text-emerald-300 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">From Sri Lanka to the World</h4>
                    <p className="text-xs text-stone-300 leading-relaxed mt-0.5">
                      Our journey begins with the coconut-growing regions of Sri Lanka and extends to customers across the globe.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-xl bg-white text-emerald-950 font-bold text-sm hover:bg-stone-100 transition-colors shadow-sm cursor-pointer"
                >
                  Read Our Full Story
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('gallery')}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/20 cursor-pointer"
                >
                  View Product Gallery
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Latest News & Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Journal & Insights
            </span>
            <h2 className="text-3xl font-extrabold font-display text-stone-900 tracking-tight mt-2">
              Latest News & Articles
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-900 group cursor-pointer"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              onClick={() => onOpenArticle(article.id)}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="relative h-52 bg-stone-100 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-900/90 text-white backdrop-blur-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-stone-900 text-lg group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
