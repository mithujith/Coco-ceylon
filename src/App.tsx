/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { GalleryView } from './components/GalleryView';
import { BlogView } from './components/BlogView';
import { BlogPostView } from './components/BlogPostView';
import { ShopView } from './components/ShopView';
import { ContactView } from './components/ContactView';
import { SearchModal } from './components/SearchModal';
import { CompareModal } from './components/CompareModal';
import { CookieBanner } from './components/CookieBanner';
import { InquiryModal } from './components/InquiryModal';
import { ProductItem } from './types';
import { PRODUCTS_CATALOG, COMPANY_INFO } from './data/content';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeArticleId, setActiveArticleId] = useState<string>('post-1');
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string | null>(null);

  // Modals state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryProductTitle, setInquiryProductTitle] = useState<string>('');

  // Product Comparison state
  const [comparedProducts, setComparedProducts] = useState<ProductItem[]>([
    PRODUCTS_CATALOG[0],
    PRODUCTS_CATALOG[1],
  ]);

  const toggleCompare = (product: ProductItem) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare a maximum of 4 products simultaneously.');
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  const isCompared = (productId: string) => {
    return comparedProducts.some((p) => p.id === productId);
  };

  const handleOpenArticle = (id: string) => {
    setActiveArticleId(id);
    setCurrentTab('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (productTitle?: string) => {
    setInquiryProductTitle(productTitle || '');
    setInquiryModalOpen(true);
  };

  // Keyboard shortcut: CMD+K or Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-700 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab === 'blog-post' ? 'blog' : currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenCompare={() => setCompareModalOpen(true)}
        comparedCount={comparedProducts.length}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Main Content Area with Animated Page Transition */}
      <main className="grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab + (currentTab === 'blog-post' ? activeArticleId : '')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {currentTab === 'home' && (
              <HomeView
                onNavigate={(tab) => {
                  setCurrentTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenArticle={handleOpenArticle}
                onToggleCompare={toggleCompare}
                isCompared={isCompared}
                onOpenInquiry={handleOpenInquiry}
              />
            )}

            {currentTab === 'about' && (
              <AboutView
                onNavigate={(tab) => {
                  setCurrentTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenInquiry={() => handleOpenInquiry()}
              />
            )}

            {currentTab === 'gallery' && <GalleryView />}

            {currentTab === 'blog' && (
              <BlogView
                onOpenArticle={handleOpenArticle}
                selectedCategory={selectedBlogCategory}
                setSelectedCategory={setSelectedBlogCategory}
              />
            )}

            {currentTab === 'blog-post' && (
              <BlogPostView
                articleId={activeArticleId}
                onBack={() => {
                  setCurrentTab('blog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenArticle={handleOpenArticle}
              />
            )}

            {currentTab === 'shop' && (
              <ShopView
                onToggleCompare={toggleCompare}
                isCompared={isCompared}
                onOpenInquiry={handleOpenInquiry}
                onOpenCompare={() => setCompareModalOpen(true)}
                comparedCount={comparedProducts.length}
              />
            )}

            {currentTab === 'contact' && <ContactView initialSubject={inquiryProductTitle} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Fast Inquiry Trigger Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-30"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => handleOpenInquiry()}
          aria-label="Quick Export Inquiry"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white shadow-xl hover:shadow-2xl border border-emerald-600/50 transition-colors cursor-pointer group"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
          <Sparkles className="w-4 h-4 text-emerald-300 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-wide">Quick Inquiry</span>
        </motion.button>
      </motion.div>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenArticle={handleOpenArticle}
        onOpenCookieSettings={() => setCookieModalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenArticle={handleOpenArticle}
      />

      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        comparedProducts={comparedProducts}
        onRemove={(id) => setComparedProducts((prev) => prev.filter((p) => p.id !== id))}
        onClear={() => setComparedProducts([])}
        onAddProduct={(p) => setComparedProducts((prev) => [...prev, p])}
        onOpenInquiry={handleOpenInquiry}
      />

      <CookieBanner
        isModalOpen={cookieModalOpen}
        setIsModalOpen={setCookieModalOpen}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        productTitle={inquiryProductTitle}
      />
    </div>
  );
}
