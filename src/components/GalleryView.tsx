import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Image as ImageIcon,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Leaf,
  Info,
} from 'lucide-react';

export const GalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Substrate', 'Plantation', 'Harvest', 'Processing', 'Quality'];

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const currentIndex = activeModalItem
    ? filteredItems.findIndex((item) => item.id === activeModalItem.id)
    : -1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setActiveModalItem(filteredItems[currentIndex - 1]);
    } else {
      setActiveModalItem(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < filteredItems.length - 1) {
      setActiveModalItem(filteredItems[currentIndex + 1]);
    } else {
      setActiveModalItem(filteredItems[0]);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider"
        >
          <Leaf className="w-3.5 h-3.5" />
          Authentic Photographic Documentation
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white"
        >
          Product & Plantation Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base"
        >
          From lush Sri Lankan coconut plantations to advanced processing, washing, sun-curing, and export packaging.
        </motion.p>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-sm scale-105'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveModalItem(item)}
                className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-64 bg-stone-100 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 rounded-full bg-white/90 text-emerald-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-900/80 text-white backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 bg-white grow flex flex-col justify-between">
                  <h3 className="font-display font-bold text-stone-900 text-sm group-hover:text-emerald-800 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-xs mt-1 line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal with spring physics */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalItem(null)}
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-stone-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-stone-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                aria-label="Close image preview"
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Nav Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative max-h-[70vh] bg-stone-950 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeModalItem.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    src={activeModalItem.image}
                    alt={activeModalItem.alt}
                    className="max-h-[70vh] w-auto max-w-full object-contain"
                  />
                </AnimatePresence>
              </div>

              {/* Caption & Metadata */}
              <div className="p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    {activeModalItem.category} • Ceylon Neyansa Coco Products
                  </span>
                  <h3 className="text-xl font-bold font-display text-white">{activeModalItem.title}</h3>
                  <p className="text-sm text-stone-300 mt-1 max-w-2xl">{activeModalItem.description}</p>
                </div>
                <span className="text-xs font-mono text-stone-500 shrink-0">
                  {currentIndex + 1} of {filteredItems.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
