import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface CookieBannerProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytical: true,
    advertisement: false,
    unclassified: false,
  });

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cookieadmin_consent');
    if (!saved) {
      setShowBanner(true);
    } else {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveAndClose = (prefs: typeof preferences) => {
    localStorage.setItem('cookieadmin_consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    saveAndClose({
      necessary: true,
      functional: true,
      analytical: true,
      advertisement: true,
      unclassified: true,
    });
  };

  const handleRejectAll = () => {
    saveAndClose({
      necessary: true,
      functional: false,
      analytical: false,
      advertisement: false,
      unclassified: false,
    });
  };

  const handleSavePreferences = () => {
    saveAndClose(preferences);
  };

  return (
    <>
      {/* Floating Bottom Consent Banner (if first visit) */}
      {showBanner && !isModalOpen && (
        <aside
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-lg z-50 p-6 rounded-3xl bg-stone-900/95 text-white backdrop-blur-md border border-stone-700 shadow-2xl animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 shrink-0">
              <Cookie className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold font-display text-base text-white">
                Cookie Preferences
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                We use cookies to maintain essential site operations, analyze international buyer visits, and personalize your experience. Powered by CookieAdmin.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 flex-wrap">
            <button
              onClick={handleAcceptAll}
              className="grow px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectAll}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-2.5 rounded-xl text-stone-400 hover:text-white text-xs underline"
            >
              Customize
            </button>
          </div>
        </aside>
      )}

      {/* Detailed Customization Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2.5">
                <Cookie className="w-5 h-5 text-amber-600" />
                <h3 className="font-display font-bold text-lg text-stone-900">
                  Cookie Preferences Manager
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Original Cookie Categories */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-600">
              <p className="text-stone-500 leading-relaxed">
                Customize your cookie preferences below. Essential cookies are required for fundamental navigation and security.
              </p>

              {/* 1. Necessary Cookies */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">Necessary Cookies</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Always Active
                    </span>
                  </div>
                  <input type="checkbox" checked disabled className="rounded-sm text-emerald-600" />
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Necessary cookies enable essential site features like secure log-ins and consent preference adjustments. They do not store personal data.
                </p>
              </div>

              {/* 2. Functional Cookies */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm">Functional Cookies</span>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) =>
                      setPreferences({ ...preferences, functional: e.target.checked })
                    }
                    className="rounded-sm text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Functional cookies support features like content sharing on social media, collecting feedback, and enabling third-party tools.
                </p>
              </div>

              {/* 3. Analytical Cookies */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm">Analytical Cookies</span>
                  <input
                    type="checkbox"
                    checked={preferences.analytical}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytical: e.target.checked })
                    }
                    className="rounded-sm text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Analytical cookies track visitor interactions, providing insights on metrics like visitor count, bounce rate, and traffic sources.
                </p>
              </div>

              {/* 4. Advertisement Cookies */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm">Advertisement Cookies</span>
                  <input
                    type="checkbox"
                    checked={preferences.advertisement}
                    onChange={(e) =>
                      setPreferences({ ...preferences, advertisement: e.target.checked })
                    }
                    className="rounded-sm text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Advertisement cookies deliver personalized ads based on your previous visits and analyze the effectiveness of ad campaigns.
                </p>
              </div>

              {/* 5. Unclassified Cookies */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm">Unclassified Cookies</span>
                  <input
                    type="checkbox"
                    checked={preferences.unclassified}
                    onChange={(e) =>
                      setPreferences({ ...preferences, unclassified: e.target.checked })
                    }
                    className="rounded-sm text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Unclassified cookies are cookies that we are in the process of classifying, together with the providers of individual cookies.
                </p>
              </div>

              <div className="text-[11px] text-stone-400 text-center pt-2">
                Powered by CookieAdmin • Ceylon Neyansa Coco Products (Pvt) Ltd
              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-2">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition-colors"
              >
                Reject All
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition-colors"
                >
                  Save My Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
