import React, { useState } from 'react';
import { ProductItem } from '../types';
import { PRODUCTS_CATALOG } from '../data/content';
import { Scale, X, Check, Trash2, Sparkles, Plus, EyeOff, Highlighter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: ProductItem[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  onAddProduct: (product: ProductItem) => void;
  onOpenInquiry: (productTitle?: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemove,
  onClear,
  onAddProduct,
  onOpenInquiry,
}) => {
  const [hideSimilarities, setHideSimilarities] = useState(false);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const availableToAdd = PRODUCTS_CATALOG.filter(
    (p) => !comparedProducts.some((cp) => cp.id === p.id)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
          >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-800 text-white shadow-xs">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-stone-900 leading-tight">
                Product Comparison Matrix
              </h3>
              <p className="text-xs text-stone-500">
                Compare Ceylon Neyansa export specifications and packing metrics
              </p>
            </div>
          </div>

          {/* Toolbar with Original WOOSC options */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <button
              onClick={() => setHideSimilarities(!hideSimilarities)}
              className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
                hideSimilarities
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Hide similarities</span>
            </button>

            <button
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
                highlightDifferences
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span>Highlight differences</span>
            </button>

            {comparedProducts.length > 0 && (
              <button
                onClick={onClear}
                className="px-3 py-1.5 rounded-lg text-rose-700 hover:bg-rose-50 border border-rose-200 font-semibold"
              >
                Clear all
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Close comparison"
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4 max-w-md mx-auto">
              <Scale className="w-12 h-12 text-stone-300 mx-auto" />
              <h4 className="font-bold text-stone-800 text-lg">No Products in Comparison Bar</h4>
              <p className="text-xs text-stone-500">
                Select products from our catalog to compare physical weights, expanding volumes, and export container capacities.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 justify-center">
                {availableToAdd.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAddProduct(p)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add {p.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[650px] text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="py-4 px-3 w-40 font-bold text-stone-400 uppercase text-[11px] tracking-wider">
                    Fields
                  </th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="py-4 px-3 w-60 align-top">
                      <div className="space-y-2">
                        <div className="relative h-28 w-28 rounded-xl bg-stone-100 overflow-hidden mx-auto">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => onRemove(p.id)}
                            className="absolute top-1 right-1 p-1 bg-stone-900/70 text-white rounded-full hover:bg-stone-950"
                            title="Remove product"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <h4 className="font-bold text-stone-900 text-center leading-snug">
                          {p.title}
                        </h4>
                        <button
                          onClick={() => {
                            onClose();
                            onOpenInquiry(p.title);
                          }}
                          className="w-full py-1.5 px-2 rounded-lg bg-emerald-800 text-white font-semibold text-xs hover:bg-emerald-900"
                        >
                          Request Quote
                        </button>
                      </div>
                    </th>
                  ))}
                  {availableToAdd.length > 0 && (
                    <th className="py-4 px-3 w-40 align-middle text-center">
                      <div className="p-4 rounded-xl border border-dashed border-stone-300 text-stone-400 space-y-2">
                        <Plus className="w-6 h-6 mx-auto text-stone-300" />
                        <span className="text-[11px] block font-medium">Add to Compare</span>
                        <select
                          onChange={(e) => {
                            const found = PRODUCTS_CATALOG.find((pr) => pr.id === e.target.value);
                            if (found) onAddProduct(found);
                          }}
                          defaultValue=""
                          className="w-full text-xs p-1.5 rounded-md border border-stone-200"
                        >
                          <option value="" disabled>
                            Select product...
                          </option>
                          {availableToAdd.map((ap) => (
                            <option key={ap.id} value={ap.id}>
                              {ap.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {/* SKU */}
                <tr className="hover:bg-stone-50/50">
                  <td className="py-3 px-3 font-semibold text-stone-500">SKU</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-3 font-mono text-stone-700">
                      {p.sku}
                    </td>
                  ))}
                  {availableToAdd.length > 0 && <td />}
                </tr>

                {/* Rating */}
                <tr className="hover:bg-stone-50/50">
                  <td className="py-3 px-3 font-semibold text-stone-500">Rating</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-3 text-amber-600 font-bold">
                      ★ {p.rating} / 5.0 (Certified Export)
                    </td>
                  ))}
                  {availableToAdd.length > 0 && <td />}
                </tr>

                {/* Stock & Availability */}
                <tr className="hover:bg-stone-50/50">
                  <td className="py-3 px-3 font-semibold text-stone-500">Availability</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-3 text-emerald-800 font-medium">
                      {p.availability}
                    </td>
                  ))}
                  {availableToAdd.length > 0 && <td />}
                </tr>

                {/* Content / Composition */}
                <tr
                  className={`hover:bg-stone-50/50 ${
                    highlightDifferences ? 'bg-amber-50/40' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-semibold text-stone-500">Content</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-3 text-stone-700">
                      {p.content}
                    </td>
                  ))}
                  {availableToAdd.length > 0 && <td />}
                </tr>

                {/* Weight */}
                <tr
                  className={`hover:bg-stone-50/50 ${
                    highlightDifferences ? 'bg-amber-50/40' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-semibold text-stone-500">Weight</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-3 text-stone-800 font-medium">
                      {p.weight}
                    </td>
                  ))}
                  {availableToAdd.length > 0 && <td />}
                </tr>

                {/* Dimensions */}
                <tr
                  className={`hover:bg-stone-50/50 ${
                    highlightDifferences ? 'bg-amber-50/40' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-semibold text-stone-500">Dimensions</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-3 text-stone-700">
                      {p.dimensions}
                    </td>
                  ))}
                  {availableToAdd.length > 0 && <td />}
                </tr>

                {/* Description */}
                <tr className="hover:bg-stone-50/50">
                  <td className="py-3 px-3 font-semibold text-stone-500">Description</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-3 text-stone-600 text-xs leading-relaxed">
                      {p.description}
                    </td>
                  ))}
                  {availableToAdd.length > 0 && <td />}
                </tr>

                {/* Additional Information */}
                <tr className="hover:bg-stone-50/50">
                  <td className="py-3 px-3 font-semibold text-stone-500">Additional information</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-3 text-xs text-stone-600">
                      <ul className="list-disc list-inside space-y-1">
                        {Object.entries(p.specifications).map(([k, v]) => (
                          <li key={k}>
                            <span className="font-semibold text-stone-700">{k}:</span> {v}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {availableToAdd.length > 0 && <td />}
                </tr>
              </tbody>
            </table>
          )}
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
