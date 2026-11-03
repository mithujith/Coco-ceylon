import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Globe2,
  Building,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

interface ContactViewProps {
  initialSubject?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Globe2 className="w-3.5 h-3.5" />
          Direct Exporter Communications
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
          Contact Us for Premium Coconut Products
        </h1>
        <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base">
          Get in touch with our Sri Lanka headquarters and international export representatives for orders, samples, and technical specifications.
        </p>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
              <h3 className="font-display font-bold text-xl text-stone-900 border-l-3 border-emerald-600 pl-3">
                Headquarters & Export Desk
              </h3>

              <div className="space-y-6 text-sm">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">
                      Location
                    </span>
                    <span className="text-stone-900 font-bold text-base block mt-0.5">
                      {COMPANY_INFO.location}
                    </span>
                    <span className="text-xs text-stone-500 mt-1 block">
                      North Western Province, Sri Lanka (Coconut Triangle Hub)
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">
                      Email us
                    </span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-stone-900 hover:text-emerald-700 font-bold text-base block mt-0.5 transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <span className="text-xs text-stone-500 mt-1 block">
                      Direct inquiries answered within 12 business hours
                    </span>
                  </div>
                </div>

                {/* Phone Primary */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">
                      Primary Phone
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                      className="text-stone-900 hover:text-emerald-700 font-bold text-base block mt-0.5 transition-colors"
                    >
                      {COMPANY_INFO.phonePrimary}
                    </a>
                    <span className="text-xs text-stone-500 mt-1 block">
                      Sri Lanka Operational Desk (WhatsApp Available)
                    </span>
                  </div>
                </div>

                {/* Mobile / International */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-800 shrink-0 mt-0.5">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">
                      Mobile / International Line
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                      className="text-stone-900 hover:text-emerald-700 font-bold text-base block mt-0.5 transition-colors"
                    >
                      {COMPANY_INFO.phoneSecondary}
                    </a>
                    <span className="text-xs text-stone-500 mt-1 block">
                      European Coordination Desk (Italy)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sourcing & Logistics Guarantee Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-950 text-white space-y-4">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Export Assured</span>
              </div>
              <h4 className="text-lg font-bold font-display text-white">
                FCL & LCL Maritime Logistics
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                We handle FOB Colombo, CIF destination port, phytosanitary fumigation certification, palletizing, and custom moisture-barrier shrink wrapping for maximum substrate integrity.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-8 sm:p-12 space-y-6">
              <div>
                <h3 className="font-display font-bold text-2xl text-stone-900">
                  Send Us an Inquiry
                </h3>
                <p className="text-stone-500 text-sm mt-1">
                  Fill in your requirements below and our commercial export manager will reach out with technical datasheets and pricing.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-emerald-900">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-emerald-800 max-w-md mx-auto">
                    Thank you, <span className="font-semibold">{formData.name}</span>. We have received your message regarding{' '}
                    <span className="font-semibold">{formData.subject || 'Ceylon Coconut Products'}</span>. Our export specialist will contact you at {formData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1.5">
                        Enter name / Your name*
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter name"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1.5">
                        Enter email / Your email*
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1.5">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone number"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1.5">
                        Product of Interest / Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. 5kg Coco Peat Blocks / Whole Coconuts"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">
                      Write a message...*
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write a message... Mention target volumes, destination port (CIF), or requested specifications."
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Export Inquiry</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your contact details are used exclusively for official business quotes.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
