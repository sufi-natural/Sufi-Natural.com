import React, { useState, useMemo, useEffect } from 'react';
import { SOAP_VARIANTS, CATEGORIES, SoapVariant } from './data/soaps';
import { SH_MIRACLE_PRODUCTS, MiracleProduct } from './data/shMiracleProducts';
import { Navbar } from './components/Navbar';
import { PromptBanner } from './components/PromptBanner';
import { BrandStory } from './components/BrandStory';
import { SoapCard } from './components/SoapCard';
import { SoapDetailModal } from './components/SoapDetailModal';
import { SkinQuizModal } from './components/SkinQuizModal';
import { CompareDrawer } from './components/CompareDrawer';
import { CartOrderModal, CartItem } from './components/CartOrderModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AiAgentWidget } from './components/AiAgentWidget';
import { Footer } from './components/Footer';
import { Sparkles, Edit3 } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [langMode, setLangMode] = useState<'ur' | 'en' | 'bi'>('ur');

  // Dynamic Product State with LocalStorage Persistence
  const [soapsList, setSoapsList] = useState<SoapVariant[]>(() => {
    const saved = localStorage.getItem('sufi_soaps_custom');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return SOAP_VARIANTS;
  });

  const [miracleList, setMiracleList] = useState<MiracleProduct[]>(() => {
    const saved = localStorage.getItem('sh_miracle_custom');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return SH_MIRACLE_PRODUCTS;
  });

  // Save to LocalStorage whenever products update
  useEffect(() => {
    localStorage.setItem('sufi_soaps_custom', JSON.stringify(soapsList));
  }, [soapsList]);

  useEffect(() => {
    localStorage.setItem('sh_miracle_custom', JSON.stringify(miracleList));
  }, [miracleList]);

  // Shop WhatsApp Number State (Default set to 03301285975)
  const [shopNumber, setShopNumber] = useState<string>(() => {
    const saved = localStorage.getItem('sufi_shop_whatsapp');
    if (!saved || saved === '03237894220' || saved === '923000000000') {
      return '03301285975';
    }
    return saved;
  });

  useEffect(() => {
    localStorage.setItem('sufi_shop_whatsapp', shopNumber);
  }, [shopNumber]);

  // Shop Email State (Default set to sufinatural1@gmail.com)
  const [shopEmail, setShopEmail] = useState<string>(() => {
    const saved = localStorage.getItem('sufi_shop_email');
    if (!saved || saved === 'info@sufinaturalsoaps.com' || saved === 'swfyswfyyqwb@gmail.com') {
      return 'sufinatural1@gmail.com';
    }
    return saved;
  });

  useEffect(() => {
    localStorage.setItem('sufi_shop_email', shopEmail);
  }, [shopEmail]);

  // Modals & Drawers
  const [selectedSoap, setSelectedSoap] = useState<SoapVariant | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Compare State
  const [comparedSoapIds, setComparedSoapIds] = useState<number[]>([]);

  // Product Admin Actions
  const handleUpdateSoap = (updatedSoap: SoapVariant) => {
    setSoapsList(prev => prev.map(s => (s.id === updatedSoap.id ? updatedSoap : s)));
  };

  const handleUpdateMiracleProduct = (updatedMiracle: MiracleProduct) => {
    setMiracleList(prev => prev.map(m => (m.id === updatedMiracle.id ? updatedMiracle : m)));
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('sufi_soaps_custom');
    localStorage.removeItem('sh_miracle_custom');
    setSoapsList(SOAP_VARIANTS);
    setMiracleList(SH_MIRACLE_PRODUCTS);
  };

  const handleAddNewProduct = (newProd: SoapVariant) => {
    setSoapsList(prev => [newProd, ...prev]);
  };

  // Filter Logic
  const filteredSoaps = useMemo(() => {
    return soapsList.filter((soap) => {
      // Category filter
      let matchesCategory = true;
      if (activeCategory === 'prompt_featured') {
        matchesCategory = Boolean(soap.featuredInPrompt);
      } else if (activeCategory !== 'all') {
        matchesCategory = soap.category === activeCategory;
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch =
          soap.nameUrdu.toLowerCase().includes(q) ||
          soap.nameEnglish.toLowerCase().includes(q) ||
          soap.shortBenefitUrdu.toLowerCase().includes(q) ||
          soap.shortBenefitEnglish.toLowerCase().includes(q) ||
          soap.fullBenefitUrdu.toLowerCase().includes(q) ||
          soap.keyIngredientsUrdu.some((ing) => ing.toLowerCase().includes(q)) ||
          soap.skinTypesUrdu.some((st) => st.toLowerCase().includes(q));
      }

      return matchesCategory && matchesSearch;
    });
  }, [soapsList, activeCategory, searchQuery]);

  // Cart Actions
  const handleAddToCart = (soap: SoapVariant, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.soap.id === soap.id);
      if (existing) {
        return prev.map((item) =>
          item.soap.id === soap.id ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        return [...prev, { soap, quantity: qty }];
      }
    });
  };

  const handleUpdateQuantity = (soapId: number, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(soapId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.soap.id === soapId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromCart = (soapId: number) => {
    setCartItems((prev) => prev.filter((item) => item.soap.id !== soapId));
  };

  // Compare Actions
  const handleToggleCompare = (soap: SoapVariant) => {
    setComparedSoapIds((prev) => {
      if (prev.includes(soap.id)) {
        return prev.filter((id) => id !== soap.id);
      } else {
        if (prev.length >= 3) {
          alert('آپ ایک وقت میں زیادہ سے زیادہ 3 صابن کا موازنہ کر سکتے ہیں۔');
          return prev;
        }
        return [...prev, soap.id];
      }
    });
  };

  const comparedSoaps = useMemo(() => {
    return soapsList.filter((s) => comparedSoapIds.includes(s.id));
  }, [soapsList, comparedSoapIds]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Miracle Product Cart Handler
  const handleAddMiracleProductToCart = (item: { id: string; nameUrdu: string; nameEnglish: string; pricePkr: number; emoji: string }) => {
    const numericId = Math.abs(item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) + 500;
    const convertedSoap: SoapVariant = {
      id: numericId,
      slug: item.id,
      nameUrdu: item.nameUrdu,
      nameEnglish: item.nameEnglish,
      shortBenefitUrdu: 'SH Miracle 100% ارگینک ہربل پروڈکٹ',
      shortBenefitEnglish: 'SH Miracle 100% Organic Herbal Product',
      fullBenefitUrdu: `${item.nameUrdu} - قدرت کی طاقت اور خالص ہربل اجزاء کا اعتماد۔`,
      fullBenefitEnglish: `${item.nameEnglish} - Handcrafted with pure herbs and cold-pressed natural oils.`,
      emoji: item.emoji,
      badge: 'SH Miracle Range',
      badgeUrdu: 'ایس ایچ ميركل',
      skinTypesUrdu: ['تمام اقسام کی جلد اور بال'],
      skinTypesEnglish: ['All Skin & Hair Types'],
      keyIngredientsUrdu: ['خالص ارگینک جڑی بوٹیاں'],
      keyIngredientsEnglish: ['Pure Organic Native Herbs'],
      category: 'brightening',
      accentColor: '#15803d',
      bgGradient: 'from-emerald-900/10 via-amber-800/5 to-transparent',
      pricePkr: item.pricePkr,
      weightGrams: 100,
      howToUseUrdu: 'روزانہ ضرورت کے مطابق استعمال کریں۔',
      howToUseEnglish: 'Apply daily as directed.'
    };
    handleAddToCart(convertedSoap, 1);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col font-urdu selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        langMode={langMode}
        setLangMode={setLangMode}
        openQuiz={() => setIsQuizOpen(true)}
        openAdmin={() => setIsAdminOpen(true)}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        compareCount={comparedSoapIds.length}
        openCompare={() => setIsCompareOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        shopNumber={shopNumber}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Banner with prompt requested items */}
        <PromptBanner
          onSelectSoap={(soap) => setSelectedSoap(soap)}
          activeFilter={activeCategory}
          setActiveFilter={setActiveCategory}
        />

        {/* SH Miracle Brand Story & Voiceover Interactive Studio */}
        <BrandStory
          langMode={langMode}
          onAddToCart={handleAddMiracleProductToCart}
          openCart={() => setIsCartOpen(true)}
          miracleProducts={miracleList}
        />

        {/* Section Header & Category Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-urdu text-stone-900 flex items-center gap-2">
                <span>تمام ارگینک صابن اور ان کے فوائد</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-sans px-3 py-1 rounded-full border border-emerald-200 font-semibold">
                  {filteredSoaps.length} Variants
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-urdu pt-1">
                Sufi Natural کی جانب سے قدرتی جڑی بوٹیوں سے تیار کردہ صابن، جو آپ کی جلد کو دے مستقل شادابی اور نکھار
              </p>
            </div>

            {/* Quick Skin Quiz Banner CTA */}
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-800 to-[#154734] text-amber-200 hover:text-amber-100 text-xs font-bold font-urdu flex items-center gap-2 shadow-xs hover:shadow-md transition-all self-start md:self-auto border border-emerald-700/50"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>پتہ نہیں کون سا صابن بہتر ہے؟ (جلد کا ٹیسٹ کریں)</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-urdu whitespace-nowrap transition-all border shrink-0 ${
                    isActive
                      ? 'bg-[#154734] text-amber-200 border-emerald-900 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                  }`}
                >
                  {langMode === 'en' ? cat.labelEnglish : cat.labelUrdu}
                </button>
              );
            })}
          </div>

          {/* Search Result Feedback */}
          {searchQuery && (
            <div className="flex items-center justify-between bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
              <span>
                تلاش کے نتائج: <strong>« {searchQuery} »</strong> ({filteredSoaps.length} صابن ملے)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-amber-800 hover:underline font-bold"
              >
                تلاش ختم کریں ✕
              </button>
            </div>
          )}

          {/* Soaps Grid */}
          {filteredSoaps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSoaps.map((soap) => (
                <SoapCard
                  key={soap.id}
                  soap={soap}
                  langMode={langMode}
                  onSelect={(s) => setSelectedSoap(s)}
                  onAddToCart={(s) => handleAddToCart(s, 1)}
                  isInCart={cartItems.some((item) => item.soap.id === soap.id)}
                  onToggleCompare={(s) => handleToggleCompare(s)}
                  isCompared={comparedSoapIds.includes(soap.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-3">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-3xl mx-auto">
                🔍
              </div>
              <h3 className="text-lg font-bold font-urdu text-stone-800">
                کوئی صابن نہیں ملا!
              </h3>
              <p className="text-xs font-urdu text-stone-500">
                برائے مہربانی اپنے سرچ الفاظ تبدیل کریں یا تمام صابن کی لسٹ دیکھیں۔
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 bg-[#154734] text-amber-100 font-bold rounded-xl text-xs font-urdu"
              >
                تمام صابن دکھائیں
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer
        shopPhone={shopNumber}
        shopEmail={shopEmail}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals and Drawers */}
      <SoapDetailModal
        soap={selectedSoap}
        onClose={() => setSelectedSoap(null)}
        onAddToCart={(s, qty) => handleAddToCart(s, qty)}
        isInCart={selectedSoap ? cartItems.some((i) => i.soap.id === selectedSoap.id) : false}
      />

      <SkinQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectSoap={(soap) => setSelectedSoap(soap)}
      />

      <CompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedSoaps={comparedSoaps}
        onRemove={(id) => setComparedSoapIds((prev) => prev.filter((i) => i !== id))}
        onClear={() => setComparedSoapIds([])}
        onSelectSoap={(soap) => setSelectedSoap(soap)}
      />

      <CartOrderModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
        shopNumber={shopNumber}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        soaps={soapsList}
        miracleProducts={miracleList}
        onUpdateSoap={handleUpdateSoap}
        onUpdateMiracleProduct={handleUpdateMiracleProduct}
        onResetDefaults={handleResetDefaults}
        onAddNewProduct={handleAddNewProduct}
        shopNumber={shopNumber}
        onUpdateShopNumber={(num) => setShopNumber(num)}
        shopEmail={shopEmail}
        onUpdateShopEmail={(email) => setShopEmail(email)}
      />

      {/* 24/7 AI Sales Agent & WhatsApp Order Assistant */}
      <AiAgentWidget
        soaps={soapsList}
        miracleProducts={miracleList}
        langMode={langMode}
        shopNumber={shopNumber}
        onUpdateShopNumber={(num) => setShopNumber(num)}
      />

    </div>
  );
}
