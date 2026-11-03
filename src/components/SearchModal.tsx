import React, { useState, useEffect, useRef } from 'react';
import { ARTICLES, PRODUCTS_CATALOG, GALLERY_ITEMS, COMPANY_INFO } from '../data/content';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, FileText, Package, Image as ImageIcon, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  onOpenArticle: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const cleanQuery = query.toLowerCase().trim();

  const matchingProducts = cleanQuery
    ? PRODUCTS_CATALOG.filter(
        (p) =>
          p.title.toLowerCase().includes(cleanQuery) ||
          p.tagline.toLowerCase().includes(cleanQuery) ||
          p.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingArticles = cleanQuery
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(cleanQuery) ||
          a.excerpt.toLowerCase().includes(cleanQuery) ||
          a.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchingGallery = cleanQuery
    ? GALLERY_ITEMS.filter(
        (g) =>
          g.title.toLowerCase().includes(cleanQuery) ||
          g.category.toLowerCase().includes(cleanQuery) ||
          g.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const totalResults = matchingProducts.length + matchingArticles.length + matchingGallery.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
        >
          <motion.div
            initial={{ scale: 0.95, y: -10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -10, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="relative border-b border-stone-200 p-4 sm:p-5 flex items-center gap-3">
              <Search className="w-5 h-5 text-emerald-700 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything... (e.g. coco peat, orchid, husk, organic, export)"
                className="w-full text-base sm:text-lg text-stone-900 placeholder-stone-400 focus:outline-hidden"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 cursor-pointer"
              >
                Esc
              </button>
            </div>

            {/* Results Container */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              {!cleanQuery ? (
                <div className="text-center py-10 space-y-3">
                  <Sparkles className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-semibold text-stone-700">
                    Type keywords to explore products, articles, and gallery
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {['Coco Peat', 'Husk Chips', 'Briquettes', 'Whole Coconuts', 'Sustainability'].map(
                      (suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setQuery(suggestion)}
                          className="px-3 py-1 rounded-lg text-xs bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 transition-colors border border-stone-200 cursor-pointer"
                        >
                          {suggestion}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : totalResults === 0 ? (
                <div className="text-center py-12 space-y-2 text-stone-500">
                  <p className="text-sm font-medium">No results found for "{query}".</p>
                  <p className="text-xs">Try searching for generic terms like "coconut", "peat", or "export".</p>
                </div>
              ) : (
                <>
                  {/* Products */}
                  {matchingProducts.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Products ({matchingProducts.length})</span>
                      </h4>
                      <div className="space-y-2">
                        {matchingProducts.map((p) => (
                          <motion.div
                            key={p.id}
                            whileHover={{ x: 4 }}
                            onClick={() => {
                              onClose();
                              onNavigate('shop');
                            }}
                            className="p-3 rounded-2xl border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/50 flex items-center justify-between gap-3 cursor-pointer group transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.title}
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                              <div>
                                <span className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors block">
                                  {p.title}
                                </span>
                                <span className="text-xs text-stone-500 line-clamp-1">{p.tagline}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-emerald-700 transition-all shrink-0" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Articles */}
                  {matchingArticles.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Articles & News ({matchingArticles.length})</span>
                      </h4>
                      <div className="space-y-2">
                        {matchingArticles.map((a) => (
                          <motion.div
                            key={a.id}
                            whileHover={{ x: 4 }}
                            onClick={() => {
                              onClose();
                              onOpenArticle(a.id);
                            }}
                            className="p-3 rounded-2xl border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/50 flex items-center justify-between gap-3 cursor-pointer group transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={a.image}
                                alt={a.title}
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                              <div>
                                <span className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors block">
                                  {a.title}
                                </span>
                                <span className="text-xs text-stone-500 line-clamp-1">{a.subtitle}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-emerald-700 transition-all shrink-0" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gallery Items */}
                  {matchingGallery.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Gallery Photos ({matchingGallery.length})</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {matchingGallery.map((g) => (
                          <motion.div
                            key={g.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              onClose();
                              onNavigate('gallery');
                            }}
                            className="p-2 rounded-xl border border-stone-100 hover:border-emerald-200 flex items-center gap-2.5 cursor-pointer group"
                          >
                            <img
                              src={g.image}
                              alt={g.alt}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div className="overflow-hidden">
                              <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 block truncate">
                                {g.title}
                              </span>
                              <span className="text-[10px] text-stone-400 block">{g.category}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
