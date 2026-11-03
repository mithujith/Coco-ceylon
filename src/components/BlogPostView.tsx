import React, { useState } from 'react';
import { ARTICLES, INITIAL_COMMENTS } from '../data/content';
import { Article, Comment } from '../types';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  MessageSquare,
  Check,
  Send,
  User,
  Mail,
  Globe,
  Search,
  Sparkles,
} from 'lucide-react';

interface BlogPostViewProps {
  articleId: string;
  onBack: () => void;
  onOpenArticle: (id: string) => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({
  articleId,
  onBack,
  onOpenArticle,
}) => {
  const article = ARTICLES.find((a) => a.id === articleId) || ARTICLES[0];
  const otherArticles = ARTICLES.filter((a) => a.id !== article.id);

  // Comments state
  const [comments, setComments] = useState<Comment[]>(() =>
    INITIAL_COMMENTS.filter((c) => c.postId === article.id)
  );

  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorWebsite, setAuthorWebsite] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [savePreferences, setSavePreferences] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentBody.trim() || !authorName.trim() || !authorEmail.trim()) return;

    const newComment: Comment = {
      id: 'c-' + Date.now(),
      postId: article.id,
      author: authorName.trim(),
      email: authorEmail.trim(),
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      content: commentBody.trim(),
    };

    setComments((prev) => [...prev, newComment]);
    setCommentBody('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Top Breadcrumb & Return */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content */}
          <main className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs p-6 sm:p-10 space-y-8">
              {/* Meta header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap text-xs text-stone-500">
                  <span className="font-bold text-emerald-800 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{article.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>3 min read</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black font-display text-stone-900 tracking-tight leading-tight">
                  {article.title}
                </h1>

                {article.subtitle && (
                  <p className="text-base sm:text-lg text-emerald-800 font-medium italic">
                    {article.subtitle}
                  </p>
                )}
              </div>

              {/* Featured Image */}
              <div className="rounded-2xl overflow-hidden bg-stone-100 max-h-[460px] shadow-sm">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
              </div>

              {/* Exact Article Paragraphs */}
              <div className="prose prose-stone max-w-none space-y-6 text-stone-700 text-base sm:text-lg leading-relaxed pt-2">
                {article.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Tag & Share strip */}
              <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h6 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tag:</span>
                  </h6>
                  {article.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <h6 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Share:</span>
                  </h6>
                  <button
                    onClick={handleShare}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-200"
                  >
                    {copiedShare ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied Link</span>
                      </>
                    ) : (
                      <span>Copy Link</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 sm:p-10 space-y-8">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-xl font-bold font-display text-stone-900">
                    Discussion ({comments.length})
                  </h3>
                </div>
              </div>

              {/* Existing Comments */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-xs text-stone-400 italic">
                    No comments yet. Be the first to start the discussion!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center">
                            {c.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-stone-900 block leading-tight">
                              {c.author}
                            </span>
                            <span className="text-[11px] text-stone-400">{c.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed pl-10">{c.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Write Your Comment Form */}
              <div className="pt-6 border-t border-stone-100 space-y-4">
                <h3 className="text-lg font-bold font-display text-stone-900">
                  Write your comment
                </h3>

                {commentSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Your comment has been posted successfully!</span>
                  </div>
                )}

                <form onSubmit={handlePostComment} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Enter Your Name*
                      </label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Enter Your Email*
                      </label>
                      <input
                        type="email"
                        required
                        value={authorEmail}
                        onChange={(e) => setAuthorEmail(e.target.value)}
                        placeholder="Your email"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Website (Optional)
                    </label>
                    <input
                      type="text"
                      value={authorWebsite}
                      onChange={(e) => setAuthorWebsite(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Write a message...*
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={commentBody}
                      onChange={(e) => setCommentBody(e.target.value)}
                      placeholder="Write your comment..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="save-preferences"
                      checked={savePreferences}
                      onChange={(e) => setSavePreferences(e.target.checked)}
                      className="rounded-sm border-stone-300 text-emerald-700 focus:ring-emerald-500"
                    />
                    <label htmlFor="save-preferences" className="text-xs text-stone-600">
                      Save my name, email, and website in this browser for the next time I comment.
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Post A Comment</span>
                    </button>
                    {commentBody && (
                      <button
                        type="button"
                        onClick={() => setCommentBody('')}
                        className="px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
                      >
                        Cancel Comment
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Recent News */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-base text-stone-900 border-l-2 border-emerald-600 pl-2.5">
                Recent News
              </h3>
              <div className="space-y-4">
                {otherArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onOpenArticle(art.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex gap-3 group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-xl bg-stone-100 overflow-hidden shrink-0">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
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

            {/* Quick Sourcing Badge */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-950 text-white space-y-3">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-base">Direct From Source</h4>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                Connect with our international export desk for phytosanitary certificates, container packing specs, and customized coir blends.
              </p>
              <button
                onClick={onBack}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors mt-2"
              >
                Explore More Articles
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
