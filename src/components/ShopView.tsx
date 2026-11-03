import React, { useState } from 'react';
import { PRODUCTS_CATALOG, COMPANY_INFO } from '../data/content';
import { ProductItem } from '../types';
import {
  ShoppingBag,
  Bell,
  Scale,
  Sparkles,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  Send,
  Leaf,
  FileSpreadsheet,
} from 'lucide-react';

interface ShopViewProps {
  onToggleCompare: (product: ProductItem) => void;
  isCompared: (productId: string) => boolean;
  onOpenInquiry: (productTitle?: string) => void;
  onOpenCompare: () => void;
  comparedCount: number;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onToggleCompare,
  isCompared,
  onOpenInquiry,
  onOpenCompare,
  comparedCount,
}) => {
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail && notifyEmail.includes('@')) {
      setNotified(true);
    }
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <ShoppingBag className="w-3.5 h-3.5" />
          Direct Exporter Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
          Shop
        </h1>
        <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base">
          Wholesale containers and custom substrate export products directly from Sri Lanka.
        </p>
      </section>

      {/* "Great things are on the horizon" Launch Announcement Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-stone-100 border-2 border-dashed border-emerald-600/30 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center mx-auto shadow-md">
            <Bell className="w-8 h-8 text-amber-300 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-stone-900">
              Great things are on the horizon
            </h2>
            <p className="text-stone-600 text-base max-w-xl mx-auto font-medium">
              Something big is brewing! Our store is in the works and will be launching soon!
            </p>
            <p className="text-xs text-stone-500 max-w-lg mx-auto">
              In the meantime, our B2B commercial export division is fully operational for full-container loads (FCL), bulk pallets, and customized coco coir substrates.
            </p>
          </div>

          {notified ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-100 text-emerald-900 text-sm font-semibold border border-emerald-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>You're on the VIP list! We will notify you the moment the digital store goes live.</span>
            </div>
          ) : (
            <form
              onSubmit={handleNotifySubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="Enter email for store launch notice"
                className="grow px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-emerald-600"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition-all shadow-sm active:scale-95 shrink-0"
              >
                Notify Me
              </button>
            </form>
          )}

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-stone-500">
            <span>• Empty Cart Status: Ready for Online Checkout</span>
            <span>• Bulk Container Sourcing Available Now</span>
          </div>
        </div>
      </section>

      {/* Export Product Matrix & Specification Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <h3 className="text-2xl font-bold font-display text-stone-900">
              Export Product Specifications
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Select products to compare side-by-side or request a sample packet and official pro-forma invoice.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCompare}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-emerald-800 text-xs font-semibold shadow-xs hover:border-emerald-300 transition-colors"
            >
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>Compare Products ({comparedCount})</span>
            </button>
            <button
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold shadow-xs hover:bg-emerald-900 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Bulk Order Inquiries</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS_CATALOG.map((p) => {
            const compared = isCompared(p.id);
            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-44 h-44 rounded-2xl bg-stone-100 overflow-hidden shrink-0 relative">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-900/80 text-white">
                        {p.category}
                      </span>
                    </div>

                    <div className="space-y-2 grow">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-stone-400 font-bold">{p.sku}</span>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {p.availability}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-xl text-stone-900 leading-snug">
                        {p.title}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium">{p.tagline}</p>
                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  {/* Specification Table */}
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/70 space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2 pb-2 border-b border-stone-200/60">
                      <div>
                        <span className="text-stone-400 block text-[11px]">Content / Composition:</span>
                        <span className="font-semibold text-stone-800">{p.content}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Unit Weight:</span>
                        <span className="font-semibold text-stone-800">{p.weight}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-stone-400 block text-[11px]">Dimensions:</span>
                        <span className="font-semibold text-stone-800">{p.dimensions}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Export Packaging:</span>
                        <span className="font-semibold text-stone-800">
                          {p.specifications['Packaging'] || p.specifications['MasterCarton'] || 'Standard Export Pallet'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onOpenInquiry(p.title)}
                    className="grow py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Request Spec Sheet & FOB Quote</span>
                  </button>

                  <button
                    onClick={() => onToggleCompare(p)}
                    className={`py-3 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 border ${
                      compared
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    <Scale className="w-4 h-4" />
                    <span>{compared ? 'Compared' : 'Compare'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
