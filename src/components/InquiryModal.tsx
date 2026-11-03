import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { X, Send, CheckCircle2, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  productTitle = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: productTitle ? `Inquiry regarding: ${productTitle}` : '',
  });

  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-emerald-950 to-emerald-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Request Export Quotation
                  </h3>
                  <p className="text-xs text-emerald-300">
                    Ceylon Neyansa Coco Products (Pvt) Ltd
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close inquiry window"
                className="p-1 rounded-full text-emerald-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-stone-900">
                    Inquiry Received!
                  </h4>
                  <p className="text-sm text-stone-600 max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-stone-900">{formData.name}</span>. Our export desk in Sri Lanka will prepare pricing and specifications and email {formData.email}.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Full Name / Company Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name / Commercial Organization"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Destination Country / Port
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. Germany, USA, Japan"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+Country Code Phone Number"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Estimated Requirement / Message*
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Volume requirements, packaging specs, or target shipping timeline..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Quotation Request</span>
                    </motion.button>
                  </div>

                  <div className="pt-2 text-center text-[11px] text-stone-500">
                    Direct export support: {COMPANY_INFO.phonePrimary} | {COMPANY_INFO.email}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
