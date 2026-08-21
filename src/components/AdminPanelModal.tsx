import React, { useState } from 'react';
import { SoapVariant } from '../data/soaps';
import { MiracleProduct } from '../data/shMiracleProducts';
import { X, Edit3, DollarSign, Image, Save, RotateCcw, Plus, Check, ShieldCheck, Tag, Sparkles, Lock, Eye } from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  soaps: SoapVariant[];
  miracleProducts: MiracleProduct[];
  onUpdateSoap: (updatedSoap: SoapVariant) => void;
  onUpdateMiracleProduct: (updatedMiracle: MiracleProduct) => void;
  onResetDefaults: () => void;
  onAddNewProduct: (newProd: SoapVariant) => void;
  shopNumber?: string;
  onUpdateShopNumber?: (num: string) => void;
  shopEmail?: string;
  onUpdateShopEmail?: (email: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  soaps,
  miracleProducts,
  onUpdateSoap,
  onUpdateMiracleProduct,
  onResetDefaults,
  onAddNewProduct,
  shopNumber = '03301285975',
  onUpdateShopNumber,
  shopEmail = 'sufinatural1@gmail.com',
  onUpdateShopEmail,
}) => {
  const [activeTab, setActiveTab] = useState<'soaps' | 'miracle' | 'add'>('soaps');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  // Draft state for inline editing
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editImageUrl, setEditImageUrl] = useState<string>('');

  // New product state
  const [newProdNameUrdu, setNewProdNameUrdu] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdPrice, setNewProdPrice] = useState<number>(250);
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'brightening' | 'acne' | 'moisture' | 'detox' | 'soothing'>('brightening');
  const [newProdBenefit, setNewProdBenefit] = useState('');

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSavedSuccessMsg(msg);
    setTimeout(() => setSavedSuccessMsg(''), 2500);
  };

  const handleStartEditSoap = (soap: SoapVariant) => {
    setEditingId(soap.id);
    setEditPrice(soap.pricePkr);
    setEditImageUrl(soap.imageUrl || '');
  };

  const handleSaveSoap = (soap: SoapVariant) => {
    const updated: SoapVariant = {
      ...soap,
      pricePkr: Number(editPrice) || soap.pricePkr,
      imageUrl: editImageUrl.trim() || undefined,
    };
    onUpdateSoap(updated);
    setEditingId(null);
    showToast(`${soap.nameUrdu} کی قیمت اور تصویر محفوظ ہو گئی!`);
  };

  const handleStartEditMiracle = (item: MiracleProduct) => {
    setEditingId(item.id);
    setEditPrice(item.pricePkr);
    setEditImageUrl(item.imageUrl || '');
  };

  const handleSaveMiracle = (item: MiracleProduct) => {
    const updated: MiracleProduct = {
      ...item,
      pricePkr: Number(editPrice) || item.pricePkr,
      imageUrl: editImageUrl.trim() || undefined,
    };
    onUpdateMiracleProduct(updated);
    setEditingId(null);
    showToast(`${item.nameUrdu} کی معلومات اپڈیٹ ہو گئی!`);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdNameUrdu.trim()) return;

    const created: SoapVariant = {
      id: Date.now(),
      slug: `custom-${Date.now()}`,
      nameUrdu: newProdNameUrdu,
      nameEnglish: newProdNameEn || newProdNameUrdu,
      shortBenefitUrdu: newProdBenefit || 'خالص ارگینک فارمولا',
      shortBenefitEnglish: 'Pure Organic Formula',
      fullBenefitUrdu: 'خالص قدرتی اجزاء سے تیار کردہ۔',
      fullBenefitEnglish: 'Handcrafted with natural ingredients.',
      emoji: '🍃',
      badge: 'New Arrival',
      badgeUrdu: 'نیا پروڈکٹ',
      skinTypesUrdu: ['تمام اقسام کی جلد'],
      skinTypesEnglish: ['All Skin Types'],
      keyIngredientsUrdu: ['خالص جڑی بوٹیاں'],
      keyIngredientsEnglish: ['Pure Herbs'],
      category: newProdCategory,
      accentColor: '#15803d',
      bgGradient: 'from-emerald-900/10 via-amber-800/5 to-transparent',
      pricePkr: Number(newProdPrice) || 250,
      weightGrams: 100,
      howToUseUrdu: 'روزانہ استعمال کریں۔',
      howToUseEnglish: 'Use daily.',
      imageUrl: newProdImage.trim() || undefined,
    };

    onAddNewProduct(created);
    setNewProdNameUrdu('');
    setNewProdNameEn('');
    setNewProdPrice(250);
    setNewProdImage('');
    setNewProdBenefit('');
    setActiveTab('soaps');
    showToast('نیا پروڈکٹ کامیابی سے شامل کر دیا گیا!');
  };

  const filteredSoaps = soaps.filter(
    s => s.nameUrdu.includes(searchQuery) || s.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMiracles = miracleProducts.filter(
    m => m.nameUrdu.includes(searchQuery) || m.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-urdu">
      <div className="bg-white rounded-3xl shadow-2xl border border-amber-500/30 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-amber-50 p-4 sm:p-6 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-200">
                  اسٹور ایڈمن مینیجر (Admin Control Panel)
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold">
                  مالک کا کنٹرول
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                یہاں سے آپ مصنوعات کی قیمتیں (Prices) اور تصویروں کے لنکس (Image URLs) خود تبدیل کر سکتے ہیں
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-amber-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Toast */}
        {savedSuccessMsg && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in slide-in-from-top">
            <Check className="w-4 h-4" />
            <span>{savedSuccessMsg}</span>
          </div>
        )}

        {/* Contact Details (WhatsApp & Gmail) Control Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-3 text-xs text-amber-950 font-urdu">
          <div className="flex items-center gap-2">
            <span className="text-lg">📲</span>
            <div>
              <span className="font-bold">آفیشل رابطہ ترتیبات (Contact Settings):</span>
              <p className="text-[11px] text-amber-800">تمام آرڈرز اور ای میل رابطہ ان نمبرز پر سیٹ ہیں:</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[11px] font-bold shrink-0">✉️ ای میل:</span>
              <input
                type="email"
                value={shopEmail}
                onChange={(e) => onUpdateShopEmail && onUpdateShopEmail(e.target.value)}
                placeholder="sufinatural1@gmail.com"
                className="bg-white border border-amber-300 rounded-xl px-2.5 py-1 font-mono text-xs outline-none focus:border-amber-600 w-full sm:w-52"
              />
            </div>
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[11px] font-bold shrink-0">📱 واٹس ایپ:</span>
              <input
                type="text"
                value={shopNumber}
                onChange={(e) => onUpdateShopNumber && onUpdateShopNumber(e.target.value)}
                placeholder="03301285975"
                className="bg-white border border-amber-300 rounded-xl px-2.5 py-1 font-mono text-xs font-bold outline-none focus:border-amber-600 w-full sm:w-36"
              />
              <span className="text-emerald-700 font-bold text-[11px] shrink-0">🟢 فعال</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation & Search bar */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('soaps')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'soaps'
                  ? 'bg-emerald-800 text-amber-200 shadow-sm'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              صوفی نیچرل صابن ({soaps.length})
            </button>
            <button
              onClick={() => setActiveTab('miracle')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'miracle'
                  ? 'bg-emerald-800 text-amber-200 shadow-sm'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              ایس ایچ ميركل پروڈکٹس ({miracleProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                activeTab === 'add'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>نیا پروڈکٹ</span>
            </button>
          </div>

          {/* Search Field */}
          {activeTab !== 'add' && (
            <input
              type="text"
              placeholder="پروڈکٹ تلاش کریں..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
            />
          )}
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: SOAPS EDITOR */}
          {activeTab === 'soaps' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-500">
                کسی بھی صابن کی قیمت یا تصویر بدلنے کے لیے **"تبدیل کریں"** بٹن دبائیں:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSoaps.map((soap) => {
                  const isEditing = editingId === soap.id;
                  return (
                    <div
                      key={soap.id}
                      className="p-3.5 rounded-2xl border border-stone-200 bg-white shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3">
                        {/* Image preview / Emoji */}
                        <div className="w-16 h-16 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 overflow-hidden relative">
                          {soap.imageUrl ? (
                            <img src={soap.imageUrl} alt={soap.nameUrdu} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-3xl">{soap.emoji}</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-stone-900 truncate">
                            {soap.nameUrdu}
                          </h4>
                          <p className="text-[11px] text-stone-500 truncate">{soap.nameEnglish}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs text-stone-500">موجودہ قیمت:</span>
                            <span className="text-sm font-bold text-emerald-800 font-sans">
                              Rs. {soap.pricePkr}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Editing panel if active */}
                      {isEditing ? (
                        <div className="mt-3 pt-3 border-t border-stone-100 space-y-2 bg-stone-50 p-2.5 rounded-xl">
                          <div>
                            <label className="text-[11px] font-bold text-stone-700 block mb-1">
                              نئی قیمت (Price in PKR):
                            </label>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-stone-500 font-sans">Rs.</span>
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-full px-2.5 py-1 text-xs font-sans font-bold border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 bg-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-stone-700 block mb-1">
                              تصویر کا لنک (Image URL):
                            </label>
                            <input
                              type="url"
                              placeholder="https://example.com/image.jpg"
                              value={editImageUrl}
                              onChange={(e) => setEditImageUrl(e.target.value)}
                              className="w-full px-2.5 py-1 text-xs font-sans border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 bg-white"
                            />
                            <p className="text-[10px] text-stone-400 mt-0.5">
                              کسی بھی آن لائن تصویر کا لنک یا اپلوڈڈ امیج URL پیسٹ کریں۔
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 text-xs text-stone-600 hover:text-stone-900"
                            >
                              منسوخ
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveSoap(soap)}
                              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>محفوظ کریں</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => handleStartEditSoap(soap)}
                            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                            <span>قیمت / تصویر تبدیل کریں</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: MIRACLE PRODUCTS EDITOR */}
          {activeTab === 'miracle' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-500">
                ایس ایچ ميركل کی تمام مصنوعات کی قیمتیں اور تصاویر یہاں سے ایڈٹ کی جا سکتی ہیں:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredMiracles.map((item) => {
                  const isEditing = editingId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-stone-200 bg-white shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 overflow-hidden">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.nameUrdu} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-3xl">{item.emoji}</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-stone-900 truncate">
                            {item.nameUrdu}
                          </h4>
                          <p className="text-[11px] text-stone-500 truncate">{item.nameEnglish}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs text-stone-500">موجودہ قیمت:</span>
                            <span className="text-sm font-bold text-emerald-800 font-sans">
                              Rs. {item.pricePkr}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="mt-3 pt-3 border-t border-stone-100 space-y-2 bg-stone-50 p-2.5 rounded-xl">
                          <div>
                            <label className="text-[11px] font-bold text-stone-700 block mb-1">
                              نئی قیمت (Price in PKR):
                            </label>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-stone-500 font-sans">Rs.</span>
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-full px-2.5 py-1 text-xs font-sans font-bold border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 bg-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-stone-700 block mb-1">
                              تصویر کا لنک (Image URL):
                            </label>
                            <input
                              type="url"
                              placeholder="https://example.com/image.jpg"
                              value={editImageUrl}
                              onChange={(e) => setEditImageUrl(e.target.value)}
                              className="w-full px-2.5 py-1 text-xs font-sans border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 bg-white"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 text-xs text-stone-600 hover:text-stone-900"
                            >
                              منسوخ
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveMiracle(item)}
                              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>محفوظ کریں</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => handleStartEditMiracle(item)}
                            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                            <span>قیمت / تصویر تبدیل کریں</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ADD NEW PRODUCT FORM */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProduct} className="bg-stone-50 p-4 sm:p-6 rounded-2xl border border-stone-200 space-y-4">
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-700" />
                <span>نیا پروڈکٹ اسٹور میں شامل کریں</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    پروڈکٹ کا نام (اردو): *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: صوفی ارگینک زعفران صابن"
                    value={newProdNameUrdu}
                    onChange={(e) => setNewProdNameUrdu(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    نام (انگلش):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sufi Organic Saffron Soap"
                    value={newProdNameEn}
                    onChange={(e) => setNewProdNameEn(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    قیمت (PKR): *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-bold border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    کیٹیگری:
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    <option value="brightening">جلد کا نکھار (Brightening)</option>
                    <option value="acne">ایکنی اور دانوں کا علاج (Acne)</option>
                    <option value="moisture">گہری نمی (Moisture)</option>
                    <option value="detox">صفائی اور ڈیٹاکس (Detox)</option>
                    <option value="soothing">ٹھنڈک اور سکون (Soothing)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    پروڈکٹ کی تصویر کا لنک (Image URL):
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    بنیادی فائدہ (Short Benefit):
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً: چہرے کے ضدی داغ دھبے ختم کر کے گلو دے"
                    value={newProdBenefit}
                    onChange={(e) => setNewProdBenefit(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-200 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>پروڈکٹ شائع کریں</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Modal Footer with Reset Button */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('کیا آپ تمام قیمتیں اور تصاویر اصل حالت (Factory Defaults) پر ری سیٹ کرنا چاہتے ہیں؟')) {
                onResetDefaults();
                showToast('تمام ریٹس اور تصاویر ری سیٹ ہو گئیں!');
              }
            }}
            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>اصل قیمتیں بحال کریں (Reset Defaults)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-900 text-stone-100 rounded-xl text-xs font-bold"
          >
            بند کریں
          </button>
        </div>

      </div>
    </div>
  );
};
