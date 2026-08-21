import React from 'react';
import { SoapVariant } from '../data/soaps';
import { Sparkles, Plus, Check, Info, Scale, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

interface SoapCardProps {
  soap: SoapVariant;
  langMode: 'ur' | 'en' | 'bi';
  onSelect: (soap: SoapVariant) => void;
  onAddToCart: (soap: SoapVariant) => void;
  isInCart: boolean;
  onToggleCompare: (soap: SoapVariant) => void;
  isCompared: boolean;
}

const DEFAULT_SOAP_IMAGES: Record<string, string> = {
  'coffee-rice': 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&auto=format&fit=crop&q=80',
  'aloe-vera': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
  'neem-turmeric': 'https://images.unsplash.com/photo-1608248597309-843864070a92?w=600&auto=format&fit=crop&q=80',
  'goat-milk': 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&auto=format&fit=crop&q=80',
  'charcoal-detox': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
  'rose-water': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
  'lavender-soothing': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
};

export const SoapCard: React.FC<SoapCardProps> = ({
  soap,
  langMode,
  onSelect,
  onAddToCart,
  isInCart,
  onToggleCompare,
  isCompared,
}) => {
  const displayImage = soap.imageUrl || DEFAULT_SOAP_IMAGES[soap.slug] || 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&auto=format&fit=crop&q=80';

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Product Image Header with "Buy Now / ابھی خریدیں" Overlay Button */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100 group">
        <img
          src={displayImage}
          alt={soap.nameUrdu}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
          onClick={() => onSelect(soap)}
        />

        {/* Gradient Overlay for Text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-urdu font-bold px-2.5 py-1 rounded-full bg-emerald-900/95 text-amber-200 shadow-md border border-amber-400/30 backdrop-blur-xs">
            {soap.badgeUrdu}
          </span>
          <div className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 flex items-center justify-center text-xl shadow-md">
            {soap.emoji}
          </div>
        </div>

        {/* "Buy Now / ابھی خریدیں" Button overlaid right on the image bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="text-white drop-shadow-md">
            <span className="text-[10px] text-amber-300 font-urdu block leading-tight">قیمت:</span>
            <span className="text-base font-bold font-serif text-white">
              Rs. {soap.pricePkr}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(soap);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-urdu font-bold flex items-center gap-1.5 shadow-lg transition-all transform hover:scale-105 active:scale-95 ${
              isInCart
                ? 'bg-emerald-500 text-emerald-950 border border-emerald-300'
                : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 border border-amber-300'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4 text-emerald-950" />
                <span>شامل ہو گیا</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-stone-950 fill-stone-950" />
                <span>ابھی خریدیں (Buy Now)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        {/* Title */}
        <div>
          <h3
            onClick={() => onSelect(soap)}
            className="text-lg font-bold font-urdu text-stone-900 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            {soap.nameUrdu}
          </h3>
          <p className="text-xs font-sans text-stone-500 font-medium">
            {soap.nameEnglish}
          </p>
        </div>

        {/* PROMPT BENEFIT BOX (Prominent Urdu Benefit) */}
        <div className="bg-emerald-50/90 rounded-xl p-3 border border-emerald-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 font-urdu">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>بنیادی فائدہ:</span>
          </div>
          <p className="text-xs sm:text-sm font-urdu font-semibold text-emerald-900 leading-relaxed">
            {soap.shortBenefitUrdu}
          </p>
        </div>

        {/* Key Ingredients & Skin Types */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {soap.skinTypesUrdu.slice(0, 3).map((st, i) => (
              <span
                key={i}
                className="text-[10px] font-urdu bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200/60"
              >
                • {st}
              </span>
            ))}
          </div>

          <div className="text-xs text-stone-600 font-urdu line-clamp-2">
            <span className="font-bold text-stone-800">اہم اجزا: </span>
            {soap.keyIngredientsUrdu.join('، ')}
          </div>
        </div>

        {/* Weight & Compare Footer */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-urdu">
          <span>وزن: {soap.weightGrams} گرام</span>

          <button
            onClick={() => onToggleCompare(soap)}
            className={`text-xs px-2 py-1 rounded-lg border transition-all flex items-center gap-1 ${
              isCompared
                ? 'bg-amber-100 border-amber-400 text-amber-800 font-bold'
                : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border-stone-200'
            }`}
            title="موازنہ کی فہرست میں شامل کریں"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isCompared ? 'موازنہ شامل ہے' : 'موازنہ کریں'}</span>
          </button>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-3 bg-stone-50 border-t border-stone-100 grid grid-cols-2 gap-2">
        <button
          onClick={() => onSelect(soap)}
          className="w-full py-2 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-bold font-urdu flex items-center justify-center gap-1 transition-all"
        >
          <Info className="w-3.5 h-3.5 text-stone-500" />
          <span>مکمل تفصیل</span>
        </button>

        <button
          onClick={() => onAddToCart(soap)}
          className={`w-full py-2 px-3 rounded-xl text-xs font-bold font-urdu flex items-center justify-center gap-1 transition-all shadow-xs ${
            isInCart
              ? 'bg-emerald-800 text-amber-200'
              : 'bg-[#154734] hover:bg-[#0e3526] text-amber-100'
          }`}
        >
          {isInCart ? (
            <>
              <Check className="w-3.5 h-3.5 text-amber-300" />
              <span>آرڈر میں شامل</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>آرڈر لسٹ میں ڈالیں</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
