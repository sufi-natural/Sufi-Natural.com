import React from 'react';
import { Search, Sparkles, ShoppingBag, Scale, SlidersHorizontal, Leaf, Heart, Edit3 } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  langMode: 'ur' | 'en' | 'bi';
  setLangMode: (mode: 'ur' | 'en' | 'bi') => void;
  openQuiz: () => void;
  openAdmin: () => void;
  cartCount: number;
  openCart: () => void;
  compareCount: number;
  openCompare: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  shopNumber?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  langMode,
  setLangMode,
  openQuiz,
  openAdmin,
  cartCount,
  openCart,
  compareCount,
  openCompare,
  shopNumber = '03301285975',
}) => {
  const cleanPhone = (shopNumber || '03301285975').replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : (cleanPhone || '923301285975');

  return (
    <header className="sticky top-0 z-40 bg-[#154734] text-amber-50 shadow-md border-b border-amber-600/30">
      {/* Top Banner Notice with Direct WhatsApp Link */}
      <div className="bg-[#0b2b1f] text-amber-200 text-xs py-1.5 px-4 text-center font-urdu flex flex-wrap justify-between items-center gap-2 border-b border-emerald-900/50">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>100% ارگینک اور ہربل صابن — پورے پاکستان میں کیش آن ڈیلیوری دستیاب ہے</span>
        </div>
        <a
          href={`https://wa.me/${formattedPhone}?text=${encodeURIComponent('السلام علیکم! مجھے سوفی نیچرلز ارگینک صابن اور پروڈکٹس آرڈر کرنی ہیں۔')}`}
          target="_blank"
          rel="noreferrer"
          className="mx-auto sm:mx-0 inline-flex items-center gap-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 px-2.5 py-0.5 rounded-full border border-emerald-600/50 transition-all font-mono text-[11px]"
        >
          <span>📲 واٹس ایپ آرڈر:</span>
          <span className="font-bold text-amber-200" dir="ltr">0330 1285975</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-inner flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#0d3828] flex flex-col items-center justify-center text-amber-300 border border-amber-400/40">
                  <span className="font-serif font-bold text-xs tracking-tighter leading-none text-amber-200">SH</span>
                  <span className="font-nastaliq text-[10px] leading-none text-amber-400">صوفی</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-amber-100 flex items-center gap-2 tracking-wide">
                  <span>Sufi Natural</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-sans border border-amber-500/30 font-medium">
                    Herbal Organic
                  </span>
                </h1>
                <p className="text-xs text-emerald-200/90 font-urdu flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-emerald-400 inline" />
                  <span>ہربل اور ارگینک صابن اور ان کے حیرت انگیز فوائد</span>
                </p>
              </div>
            </div>

            {/* Quick Mobile Tools */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={openAdmin}
                className="p-2 rounded-lg bg-amber-500/30 text-amber-200 text-xs flex items-center gap-1 border border-amber-400/50"
                title="ایڈمن پینل - قیمتیں تبدیل کریں"
              >
                <Edit3 className="w-4 h-4 text-amber-300" />
              </button>
              <button
                onClick={openQuiz}
                className="p-2 rounded-lg bg-amber-500/20 text-amber-300 text-xs flex items-center gap-1 border border-amber-500/30"
                title="جلد کا ٹیسٹ"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
              </button>
              <button
                onClick={openCart}
                className="relative p-2 rounded-lg bg-amber-500/20 text-amber-300 text-xs flex items-center gap-1 border border-amber-500/30"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-[#0d3828] font-bold rounded-full text-[10px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar & Actions */}
          <div className="flex flex-1 max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="صابن تلاش کریں... (مثلاً کافی، ایلو ویرا، داغ دھبے، ایکنی)"
                className="w-full pr-10 pl-4 py-2 text-sm bg-[#0a2e21] text-amber-50 placeholder-emerald-300/60 rounded-xl border border-emerald-700/60 focus:outline-none focus:ring-2 focus:ring-amber-400 font-urdu"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Language Selector */}
            <div className="hidden sm:flex items-center bg-[#0a2e21] p-1 rounded-xl border border-emerald-800 text-xs font-urdu">
              <button
                onClick={() => setLangMode('ur')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  langMode === 'ur' ? 'bg-amber-500 text-[#0d3828] font-bold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                اردو
              </button>
              <button
                onClick={() => setLangMode('bi')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  langMode === 'bi' ? 'bg-amber-500 text-[#0d3828] font-bold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                دو زبانیں
              </button>
              <button
                onClick={() => setLangMode('en')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  langMode === 'en' ? 'bg-amber-500 text-[#0d3828] font-bold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                Eng
              </button>
            </div>
          </div>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openAdmin}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold text-xs font-urdu flex items-center gap-1.5 transition-all shadow-sm"
              title="قیمتیں اور تصویریں تبدیل کریں"
            >
              <Edit3 className="w-4 h-4 text-amber-400" />
              <span>ایڈمن پینل (Admin)</span>
            </button>

            <button
              onClick={openQuiz}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0b2b1f] font-bold text-xs font-urdu flex items-center gap-1.5 shadow-sm transition-all transform hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 fill-amber-900/30" />
              <span>جلد کا ٹیسٹ</span>
            </button>

            {compareCount > 0 && (
              <button
                onClick={openCompare}
                className="px-3 py-2 rounded-xl bg-[#0a2e21] text-amber-300 hover:bg-[#082419] border border-amber-500/40 text-xs font-urdu flex items-center gap-1.5"
              >
                <Scale className="w-4 h-4 text-amber-400" />
                <span>موازنہ ({compareCount})</span>
              </button>
            )}

            <button
              onClick={openCart}
              className="relative px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-100 border border-emerald-600/50 text-xs font-urdu flex items-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>آرڈر کی فہرست</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-amber-400 text-[#0d3828] font-bold rounded-full text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
