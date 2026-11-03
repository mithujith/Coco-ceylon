import React from 'react';
import { ABOUT_CONTENT, COMPANY_INFO } from '../data/content';
import {
  Award,
  Globe2,
  ShieldCheck,
  CheckCircle2,
  TreePine,
  Sparkles,
  ArrowRight,
  MapPin,
  HeartHandshake,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (tab: string) => void;
  onOpenInquiry: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenInquiry }) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{ABOUT_CONTENT.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
            About Us
          </h1>

          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <blockquote className="text-base sm:text-xl italic text-emerald-100 font-serif leading-relaxed">
              "{ABOUT_CONTENT.quote}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Main Story & Heritage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Why Choose Us
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 tracking-tight leading-tight">
              {ABOUT_CONTENT.heading}
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>{ABOUT_CONTENT.paragraph1}</p>
              <p>{ABOUT_CONTENT.paragraph2}</p>
              <p className="p-4 rounded-xl bg-stone-50 border-l-4 border-emerald-600 font-medium text-stone-800">
                {ABOUT_CONTENT.paragraph3}
              </p>
            </div>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {ABOUT_CONTENT.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    {idx === 0 ? <Globe2 className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">{feat.title}</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenInquiry}
                className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Let's Talk With Us</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-all"
              >
                Contact Details
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
              <img
                src={ABOUT_CONTENT.heroImage}
                alt="Ceylon Coconut Processing"
                className="w-full h-80 sm:h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-900/80 backdrop-blur-md text-white border border-white/10 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block text-sm">Serukale & Kottamaduwa Facilities</span>
                  Direct Origin Packaging, Moisture Control & Quality Assurance
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm h-48">
                <img
                  src={ABOUT_CONTENT.sideImage}
                  alt="Packaging and Logistics"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm h-48">
                <img
                  src={ABOUT_CONTENT.stillLifeImage}
                  alt="Ceylon Coconuts"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery of our Products Preview inside About Us */}
      <section className="bg-stone-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-white px-3 py-1 rounded-full border border-stone-200">
              Our Gallery Image
            </span>
            <h3 className="text-3xl font-extrabold font-display text-stone-900 tracking-tight">
              Gallery of our Products
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {ABOUT_CONTENT.galleryIntro1}
              </p>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">Tropical Climate & Soil</span>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                >
                  View Plantations <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {ABOUT_CONTENT.galleryIntro2}
              </p>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">Selected For Quality & Freshness</span>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                >
                  View Coconut Gallery <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
