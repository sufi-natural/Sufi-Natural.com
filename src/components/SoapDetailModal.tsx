import React, { useState } from 'react';
import { SoapVariant } from '../data/soaps';
import { X, Sparkles, ShieldCheck, Check, Plus, Minus, ShoppingBag, Leaf, Droplets, HeartHandshake } from 'lucide-react';

interface SoapDetailModalProps {
  soap: SoapVariant | null;
  onClose: () => void;
  onAddToCart: (soap: SoapVariant, qty: number) => void;
  isInCart: boolean;
}

export const SoapDetailModal: React.FC<SoapDetailModalProps> = ({
  soap,
  onClose,
  onAddToCart,
  isInCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!soap) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 shadow-md flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className={`p-6 sm:p-8 bg-gradient-to-br ${soap.bgGradient} border-b border-stone-100 relative overflow-hidden`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-white shadow-md border border-stone-100 flex items-center justify-center text-5xl shrink-0">
              {soap.emoji}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-urdu font-bold px-3 py-1 rounded-full bg-[#154734] text-amber-200">
                  {soap.badgeUrdu}
                </span>
                <span className="text-xs font-sans text-stone-600 bg-white/80 px-2.5 py-0.5 rounded-full border border-stone-200 font-medium">
                  {soap.badge}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-urdu text-stone-900 pt-1">
                {soap.nameUrdu}
              </h2>
              <p className="text-sm font-sans text-stone-600">
                {soap.nameEnglish}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main Urdu Benefit Highlight */}
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-950 font-bold font-urdu text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>طبی فوائد اور خصوصیات (Skin Benefits):</span>
            </div>
            
            <p className="text-base sm:text-lg font-urdu font-semibold text-emerald-900 leading-relaxed">
              « {soap.shortBenefitUrdu} »
            </p>

            <p className="text-sm font-urdu text-emerald-950/90 leading-relaxed pt-2 border-t border-emerald-200/60">
              {soap.fullBenefitUrdu}
            </p>

            <p className="text-xs font-sans text-emerald-800/80 pt-2 border-t border-emerald-200/40">
              {soap.fullBenefitEnglish}
            </p>
          </div>

          {/* Skin Suitability & Key Ingredients Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Skin Suitability */}
            <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/60 space-y-2">
              <h4 className="text-xs font-bold font-urdu text-amber-950 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-700" />
                <span>کس جلد کے لیے مفید ہے؟</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {soap.skinTypesUrdu.map((st, i) => (
                  <span
                    key={i}
                    className="text-xs font-urdu bg-white text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200 font-medium"
                  >
                    ✓ {st}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold font-urdu text-stone-900 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>اہم قدرتی اجزاء (Key Ingredients):</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {soap.keyIngredientsUrdu.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs font-urdu bg-white text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200"
                  >
                    🌿 {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* How to use */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
            <h4 className="text-xs font-bold font-urdu text-stone-900 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-emerald-600" />
              <span>طریقہ استعمال (How to Use):</span>
            </h4>
            <p className="text-xs sm:text-sm font-urdu text-stone-700 leading-relaxed">
              {soap.howToUseUrdu}
            </p>
            <p className="text-xs font-sans text-stone-500 pt-1 border-t border-stone-200">
              {soap.howToUseEnglish}
            </p>
          </div>

          {/* Purchase Actions */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-xs text-stone-500 font-urdu block">قیمت:</span>
                <span className="text-2xl font-bold font-sans text-[#154734]">
                  Rs. {soap.pricePkr * quantity}
                </span>
                <span className="text-xs text-stone-400 font-sans block">
                  ({soap.weightGrams}g bar)
                </span>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 rounded-lg hover:bg-white text-stone-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 font-bold font-sans text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 rounded-lg hover:bg-white text-stone-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(soap, quantity);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#154734] hover:bg-[#0d3425] text-amber-100 font-bold font-urdu text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <span>آرڈر لسٹ میں شامل کریں</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
