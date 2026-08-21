import React, { useState } from 'react';
import { Play, Pause, Volume2, Sparkles, Leaf, ShieldCheck, Heart, ShoppingBag, Check, ChevronLeft, Award, Zap } from 'lucide-react';
import { SH_MIRACLE_PRODUCTS, MIRACLE_VOICEOVER_SCRIPT, MiracleProduct } from '../data/shMiracleProducts';

const DEFAULT_MIRACLE_IMAGES: Record<string, string> = {
  'miracle-shampoo': 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80',
  'miracle-hair-oil': 'https://images.unsplash.com/photo-1608248597309-843864070a92?w=600&auto=format&fit=crop&q=80',
  'miracle-rose-water': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
  'miracle-glycerin': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
  'miracle-multani-mitti': 'https://images.unsplash.com/photo-1567928257065-f14977977d31?w=600&auto=format&fit=crop&q=80',
  'miracle-coffee-rice-soap': 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&auto=format&fit=crop&q=80',
  'miracle-skin-white-soap': 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&auto=format&fit=crop&q=80',
  'miracle-white-pearl-cream': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
};

interface BrandStoryProps {
  langMode: 'ur' | 'en' | 'bi';
  onAddToCart: (item: { id: string; nameUrdu: string; nameEnglish: string; pricePkr: number; emoji: string }) => void;
  openCart: () => void;
  miracleProducts?: MiracleProduct[];
}

export const BrandStory: React.FC<BrandStoryProps> = ({ langMode, onAddToCart, openCart, miracleProducts }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeScriptIndex, setActiveScriptIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hair' | 'skincare' | 'soaps' | 'spray'>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const productsList = miracleProducts || SH_MIRACLE_PRODUCTS;

  // Web Speech API Narrator
  const handleToggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const textToSpeak = MIRACLE_VOICEOVER_SCRIPT.map(s => s.audioUrdu).join(' ');
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'ur-PK';
        utterance.rate = 0.9;
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        window.speechSynthesis.speak(utterance);

        // Cycle through script indices automatically
        let currentPart = 0;
        const interval = setInterval(() => {
          currentPart = (currentPart + 1) % MIRACLE_VOICEOVER_SCRIPT.length;
          setActiveScriptIndex(currentPart);
          if (currentPart === 0) {
            clearInterval(interval);
          }
        }, 5000);
      }
    } else {
      // Fallback toggling
      setIsPlaying(!isPlaying);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? productsList
    : productsList.filter(p => p.category === selectedCategory);

  const handleAddProduct = (product: MiracleProduct) => {
    onAddToCart({
      id: product.id,
      nameUrdu: product.nameUrdu,
      nameEnglish: product.nameEnglish,
      pricePkr: product.pricePkr,
      emoji: product.emoji
    });
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="miracle-story" className="py-12 bg-gradient-to-b from-[#082218] via-[#0d3828] to-[#0a2e21] text-amber-50 relative overflow-hidden border-t-2 border-b-2 border-amber-600/30">
      {/* Background Decorative Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-urdu mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>SH Miracle برانڈ کی خوبصورت کہانی</span>
            <span className="text-amber-200/60">• Brand Story •</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100 mb-3 tracking-wide flex items-center justify-center gap-2">
            <span>ہماری ہر پروڈکٹ کے ساتھ</span>
            <span className="text-amber-400 underline decoration-amber-500/50 decoration-wavy">"Miracle"</span>
            <span>کیوں لکھا ہے؟</span>
          </h2>

          <p className="text-emerald-200/90 text-sm sm:text-base font-urdu leading-relaxed">
            Miracle یعنی کرشماتی… ہم نے یہ نام صرف خوبصورت لگنے کی وجہ سے نہیں رکھا۔ اس کے پیچھے ہمارا ایک یقین ہے—قدرت کی طاقت اور خالص ہربل اجزاء پر پکا یقین!
          </p>
        </div>

        {/* Voiceover Interactive Audio Studio Card */}
        <div className="bg-[#0b2d20]/90 backdrop-blur-md rounded-2xl border border-amber-500/30 p-5 sm:p-8 shadow-2xl mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-emerald-800/60">
            
            {/* Audio Controller Info */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleToggleAudio}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-950 font-bold transition-all transform hover:scale-105 shadow-lg ${
                  isPlaying 
                    ? 'bg-amber-400 text-amber-950 shadow-amber-500/30 ring-4 ring-amber-400/20' 
                    : 'bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-emerald-950/50'
                }`}
                title="وائس اوور سنیں (Listen Voiceover)"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current animate-pulse" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-urdu">
                    🎙️ آفیشل وائس اوور (Voiceover)
                  </span>
                  {isPlaying && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-urdu animate-pulse">
                      <Volume2 className="w-3.5 h-3.5" /> آواز جاری ہے...
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold font-serif text-amber-100 mt-1">
                  SH Miracle برانڈ ڈیکلریشن وائس اوور
                </h3>
                <p className="text-xs text-emerald-300/80 font-urdu">
                  بسن کی بٹن پر کلک کر کے مکمل وائس اوور کا تصور اردو میں سنیں
                </p>
              </div>
            </div>

            {/* Simulated Animated Equalizer Bars */}
            <div className="flex items-center gap-1 h-8 px-4 py-2 bg-[#061d15] rounded-xl border border-emerald-800/80">
              {[40, 75, 30, 90, 60, 85, 45, 95, 50, 70, 35, 80, 55].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-amber-400 animate-pulse' 
                      : 'bg-emerald-700/60'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(20, (height * (i % 2 === 0 ? 1 : 0.7)))}%` : '20%'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Script Parts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {MIRACLE_VOICEOVER_SCRIPT.map((script, idx) => {
              const isActive = activeScriptIndex === idx;
              return (
                <div
                  key={script.part}
                  onClick={() => setActiveScriptIndex(idx)}
                  className={`cursor-pointer rounded-xl p-4 transition-all border ${
                    isActive
                      ? 'bg-[#134231] border-amber-400 shadow-md ring-2 ring-amber-400/20'
                      : 'bg-[#082218] border-emerald-800/50 hover:border-emerald-700/80 hover:bg-[#0c2e22]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-urdu">
                      {script.badge}
                    </span>
                    <span className="text-xs text-emerald-400/80 font-mono">
                      Part 0{script.part}
                    </span>
                  </div>

                  {/* Visual Concept */}
                  <div className="text-xs text-amber-200/90 font-urdu mb-2 flex items-start gap-1.5 bg-[#061a12] p-2 rounded-lg border border-emerald-900">
                    <span className="text-amber-400 shrink-0">🎥</span>
                    <p className="line-clamp-2">
                      {langMode === 'en' ? script.visualEnglish : script.visualUrdu}
                    </p>
                  </div>

                  {/* Voiceover Text */}
                  <div className="text-sm font-urdu font-medium text-amber-100 leading-relaxed bg-[#0b2d20] p-3 rounded-lg border border-amber-500/20">
                    <span className="text-amber-400 text-xs font-sans block mb-1">
                      {script.speaker}
                    </span>
                    <p className="text-amber-50 font-bold">
                      "{langMode === 'en' ? script.audioEnglish : script.audioUrdu}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closeups of Natural Herbal Ingredients */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-amber-100 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <span>تازہ جڑی بوٹیوں اور قدرتی اجزاء کے کلوز اَپ</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300/80 font-urdu">
                قدرت کا ہر جزو ایک شفا بخش تحفہ ہے — ایلو ویرا، نیم، زعفران، اور دیسی جڑی بوٹیاں
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { nameUrdu: 'ایلو ویرا', nameEn: 'Aloe Vera', emoji: '🌿', desc: 'گہری نمی اور سکون', bg: 'from-emerald-900/40 to-green-950/40' },
              { nameUrdu: 'نیم اور ہلدی', nameEn: 'Neem & Turmeric', emoji: '🍃', desc: 'دانوں اور ایکنی سے صفائی', bg: 'from-green-900/40 to-emerald-950/40' },
              { nameUrdu: 'عرقِ گلاب', nameEn: 'Rose Water', emoji: '🌹', desc: 'تروتازگی اور شادابی', bg: 'from-rose-900/40 to-pink-950/40' },
              { nameUrdu: 'کافی اور چاول', nameEn: 'Coffee & Rice', emoji: '☕', desc: 'مردہ جلد کا خاتمہ', bg: 'from-amber-900/40 to-amber-950/40' },
              { nameUrdu: '18 جڑی بوٹیاں', nameEn: '18 Native Herbs', emoji: '🌾', desc: 'آنولہ، ریٹھا، شیکاکائی', bg: 'from-emerald-900/40 to-amber-950/40' },
              { nameUrdu: 'خالص گلیسرین', nameEn: 'Pure Glycerin', emoji: '🥛', desc: 'جلد کا موئسچر لاک', bg: 'from-sky-900/40 to-blue-950/40' },
              { nameUrdu: 'ملتانی مٹی', nameEn: 'Fuller’s Earth', emoji: '🪨', desc: 'مساموں سے اضافی تیل کی صفائی', bg: 'from-stone-900/40 to-amber-950/40' },
            ].map((herb, index) => (
              <div
                key={index}
                className={`p-3.5 rounded-2xl bg-gradient-to-b ${herb.bg} border border-emerald-700/40 hover:border-amber-400/60 transition-all transform hover:-translate-y-1 text-center shadow-lg group`}
              >
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {herb.emoji}
                </div>
                <h4 className="font-bold font-serif text-xs text-amber-100">
                  {langMode === 'en' ? herb.nameEn : herb.nameUrdu}
                </h4>
                <p className="text-[10px] text-emerald-300/80 font-urdu mt-1 line-clamp-2">
                  {herb.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SH Miracle Full Range Products Showcase */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-2xl font-bold font-serif text-amber-100">
                  SH Miracle مکمل رینج (Complete Products Range)
                </h3>
              </div>
              <p className="text-xs text-emerald-300/80 font-urdu mt-1">
                ہمارے تمام 100% ہربل، کیمیکل فری اور ارگینک پروڈکٹس کو اپنی آرڈر لسٹ میں شامل کریں
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#061e16] p-1 rounded-xl border border-emerald-800/80 text-xs font-urdu">
              {[
                { id: 'all', nameUrdu: 'تمام پروڈکٹس', nameEn: 'All Products' },
                { id: 'hair', nameUrdu: 'بالوں کا علاج (Shampoo & Oil)', nameEn: 'Hair Care' },
                { id: 'skincare', nameUrdu: 'اسکن کیئر اور کریم', nameEn: 'Skin Care' },
                { id: 'soaps', nameUrdu: 'ہربل صابن', nameEn: 'Herbal Soaps' },
                { id: 'spray', nameUrdu: 'عرقِ گلاب اسپرے', nameEn: 'Rose Spray' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    selectedCategory === tab.id
                      ? 'bg-amber-500 text-[#0d3828] font-bold shadow-sm'
                      : 'text-emerald-200 hover:text-white hover:bg-emerald-900/50'
                  }`}
                >
                  {langMode === 'en' ? tab.nameEn : tab.nameUrdu}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const isAdded = addedIds[product.id];
              const displayImg = product.imageUrl || DEFAULT_MIRACLE_IMAGES[product.id] || 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80';

              return (
                <div
                  key={product.id}
                  className={`rounded-2xl bg-gradient-to-b ${product.bgGradient} border border-amber-500/30 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden group`}
                >
                  {/* Product Image Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-emerald-950">
                    <img
                      src={displayImg}
                      alt={product.nameUrdu}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e21] via-transparent to-black/40 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold font-urdu shadow-md">
                        {langMode === 'en' ? product.badgeEnglish : product.badgeUrdu}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 text-emerald-300 font-mono border border-emerald-500/30 backdrop-blur-xs">
                        {product.size}
                      </span>
                    </div>

                    {/* Overlaid "Buy Now" Button on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="text-sm font-bold font-serif text-amber-200 drop-shadow-md">
                        Rs. {product.pricePkr}
                      </span>

                      <button
                        onClick={() => handleAddProduct(product)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-urdu font-bold flex items-center gap-1 shadow-lg transition-all transform hover:scale-105 active:scale-95 ${
                          isAdded
                            ? 'bg-emerald-400 text-emerald-950'
                            : 'bg-amber-400 hover:bg-amber-300 text-stone-950'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>شامل ہو گیا</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5 text-stone-950 fill-stone-950" />
                            <span>ابھی خریدیں</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    {/* Icon & Title */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{product.emoji}</span>
                        <h4 className="text-base font-bold font-serif text-amber-100">
                          {langMode === 'en' ? product.nameEnglish : product.nameUrdu}
                        </h4>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-emerald-200/90 font-urdu leading-relaxed mb-3 line-clamp-3">
                      {langMode === 'en' ? product.descriptionEnglish : product.descriptionUrdu}
                    </p>

                    {/* Features List */}
                    <div className="bg-[#051a12]/80 p-2 rounded-xl border border-emerald-900/80 mb-3 space-y-1">
                      {product.featuresUrdu.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-urdu">
                          <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price & Add Button */}
                    <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between gap-2 mt-auto">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-urdu block">قیمت:</span>
                        <span className="text-sm font-bold font-serif text-amber-300">
                          Rs. {product.pricePkr}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddProduct(product)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-urdu font-bold flex items-center gap-1.5 transition-all shadow-md ${
                          isAdded
                            ? 'bg-emerald-500 text-emerald-950'
                            : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0b2b1f] hover:scale-105'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>شامل ہے</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>آرڈر لسٹ</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
