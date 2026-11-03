import React, { useState } from 'react';
import { ARTICLES } from '../data/content';
import { Article } from '../types';
import {
  Calendar,
  FolderOpen,
  Search,
  ArrowRight,
  Tag,
  Share2,
  MessageSquare,
  ChevronRight,
  Leaf,
  Clock,
  Sparkles,
} from 'lucide-react';

interface BlogViewProps {
  onOpenArticle: (id: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onOpenArticle,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCat = !selectedCategory || art.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5" />
          Industry Insights & Plantation News
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
          Blog & Articles
        </h1>
        <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base">
          Read our latest publications about Sri Lankan coconut cultivation, global export standards, and sustainable coir substrates.
        </p>
      </section>

      {/* Main Layout: Articles + Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Stream */}
          <div className="lg:col-span-8 space-y-10">
            {filteredArticles.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white border border-stone-200 space-y-3">
                <Search className="w-8 h-8 text-stone-400 mx-auto" />
                <h3 className="font-bold text-stone-800 text-lg">No articles found</h3>
                <p className="text-sm text-stone-500">
                  Try adjusting your search query or clear category filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => onOpenArticle(art.id)}
                  className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col md:flex-row hover:-translate-y-1"
                >
                  <div className="md:w-5/12 relative h-64 md:h-auto bg-stone-100 overflow-hidden shrink-0">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-lg bg-emerald-900/90 text-white backdrop-blur-xs">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-8 md:w-7/12 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-stone-400">
                        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-800">
                          <Calendar className="w-3.5 h-3.5" />
                          {art.date}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-stone-500">
                          <Clock className="w-3.5 h-3.5" />
                          3 min read
                        </span>
                      </div>

                      <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                        {art.title}
                      </h2>

                      <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        <span>Read Full Story</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>

                      <div className="flex gap-1.5">
                        {art.tags.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-600"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Search Box */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-base text-stone-900 border-l-2 border-emerald-600 pl-2.5">
                Search here
              </h3>
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search here..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-base text-stone-900 border-l-2 border-emerald-600 pl-2.5">
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                    selectedCategory === null
                      ? 'bg-emerald-50 text-emerald-900 font-bold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-xs bg-stone-200/60 px-2 py-0.5 rounded-full font-mono">
                    03
                  </span>
                </button>

                <button
                  onClick={() => setSelectedCategory('Agricultural')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                    selectedCategory === 'Agricultural'
                      ? 'bg-emerald-50 text-emerald-900 font-bold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>Agricultural</span>
                  <span className="text-xs bg-stone-200/60 px-2 py-0.5 rounded-full font-mono">
                    (02)
                  </span>
                </button>

                <button
                  onClick={() => setSelectedCategory('Blog')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                    selectedCategory === 'Blog'
                      ? 'bg-emerald-50 text-emerald-900 font-bold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>Blog</span>
                  <span className="text-xs bg-stone-200/60 px-2 py-0.5 rounded-full font-mono">
                    (01)
                  </span>
                </button>
              </div>
            </div>

            {/* Recent News */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-base text-stone-900 border-l-2 border-emerald-600 pl-2.5">
                Recent News
              </h3>
              <div className="space-y-4">
                {ARTICLES.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onOpenArticle(art.id)}
                    className="flex gap-3 group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-xl bg-stone-100 overflow-hidden shrink-0">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-emerald-700 block">
                        {art.date}
                      </span>
                      <h5 className="font-medium text-xs text-stone-800 group-hover:text-emerald-800 transition-colors line-clamp-2">
                        {art.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
