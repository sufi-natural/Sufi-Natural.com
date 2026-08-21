import React, { useState } from 'react';
import { SOAP_VARIANTS, SoapVariant } from '../data/soaps';
import { X, Sparkles, CheckCircle, ArrowRight, RotateCcw, HeartHandshake } from 'lucide-react';

interface SkinQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSoap: (soap: SoapVariant) => void;
}

export const SkinQuizModal: React.FC<SkinQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectSoap,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSkinType, setSelectedSkinType] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setSelectedSkinType('');
    setSelectedGoal('');
  };

  // Filter recommendations based on quiz selections
  const getRecommendations = (): SoapVariant[] => {
    return SOAP_VARIANTS.filter((soap) => {
      let matchesSkin = true;
      let matchesGoal = true;

      if (selectedSkinType) {
        if (selectedSkinType === 'acne') matchesSkin = soap.category === 'acne' || soap.slug === 'charcoal' || soap.slug === 'multani-mitti';
        if (selectedSkinType === 'dry') matchesSkin = soap.category === 'moisture' || soap.slug === 'aloe-vera' || soap.slug === 'goat-milk';
        if (selectedSkinType === 'oily') matchesSkin = soap.category === 'detox' || soap.category === 'acne' || soap.slug === 'lemon-brightening';
        if (selectedSkinType === 'sensitive') matchesSkin = soap.category === 'soothing' || soap.slug === 'oatmeal-milk' || soap.slug === 'rice-milk';
      }

      if (selectedGoal) {
        if (selectedGoal === 'brightening') matchesGoal = soap.category === 'brightening';
        if (selectedGoal === 'acne') matchesGoal = soap.category === 'acne';
        if (selectedGoal === 'moisture') matchesGoal = soap.category === 'moisture';
        if (selectedGoal === 'detox') matchesGoal = soap.category === 'detox';
        if (selectedGoal === 'soothing') matchesGoal = soap.category === 'soothing';
      }

      return matchesSkin && matchesGoal;
    }).slice(0, 3);
  };

  const results = step === 3 ? getRecommendations() : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-amber-300/40 relative text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-200">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-300 flex items-center justify-center text-amber-700">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-urdu text-stone-900">
              جلد کا ٹیسٹ (Skin Care Quiz)
            </h3>
            <p className="text-xs text-stone-600 font-urdu">
              اپنی جلد کی ضرورت کے مطابق بہترین صابن کی فوری تجویز حاصل کریں
            </p>
          </div>
        </div>

        {/* Step 1: Skin Type */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-base font-bold font-urdu text-stone-900">
              1. آپ کی جلد کی قسم (Skin Type) کیا ہے؟
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'dry', title: 'خشک جلد (Dry Skin)', desc: 'جلد میں کھردرا پن اور جھریاں' },
                { id: 'oily', title: 'آئلی جلد (Oily Skin)', desc: 'چہرے پر اضافی تیل اور چکنائی' },
                { id: 'acne', title: 'ایکنی اور دانے (Acne-Prone)', desc: 'کیل مہاسے اور بلیک ہیڈز' },
                { id: 'sensitive', title: 'حساس جلد (Sensitive)', desc: 'سرخی، خارش یا جلن کی شکایت' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedSkinType(item.id);
                    setStep(2);
                  }}
                  className={`p-3.5 rounded-2xl border text-right font-urdu transition-all hover:border-amber-500 hover:bg-amber-50/50 ${
                    selectedSkinType === item.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-stone-200 bg-stone-50/60 text-stone-800'
                  }`}
                >
                  <div className="text-sm font-bold">{item.title}</div>
                  <div className="text-xs text-stone-500">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Goal */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold font-urdu text-stone-900">
                2. آپ بنیادی طور پر کیا حاصل کرنا چاہتے ہیں؟
              </h4>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-stone-500 hover:text-stone-800 font-urdu"
              >
                پچھلا سوال
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'brightening', title: '✨ نکھار اور قدرتی گلو (Glow)', icon: '✨' },
                { id: 'acne', title: '🌿 دانوں اور نشانات کا خاتمہ', icon: '🌿' },
                { id: 'moisture', title: '🥛 گہری موئسچرائزنگ اور نرمی', icon: '🥛' },
                { id: 'detox', title: '⚫ مساموں کی گہری صفائی', icon: '⚫' },
                { id: 'soothing', title: '🌹 سکون اور تازگی', icon: '🌹' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedGoal(item.id);
                    setStep(3);
                  }}
                  className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60 hover:border-amber-500 hover:bg-amber-50/50 text-right font-urdu transition-all"
                >
                  <div className="text-sm font-bold text-stone-900">{item.title}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h4 className="text-base font-bold font-urdu text-emerald-900 flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>آپ کی جلد کے مطابق تجویز کردہ صابن:</span>
              </h4>
              <button
                onClick={handleReset}
                className="text-xs text-stone-500 hover:text-stone-800 font-urdu flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>دوبارہ ٹیسٹ کریں</span>
              </button>
            </div>

            <div className="space-y-3">
              {results.length > 0 ? (
                results.map((soap) => (
                  <div
                    key={soap.id}
                    onClick={() => {
                      onSelectSoap(soap);
                      onClose();
                    }}
                    className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 hover:bg-amber-100/60 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 bg-white rounded-xl shadow-2xs border border-stone-100">
                        {soap.emoji}
                      </span>
                      <div>
                        <h5 className="font-bold font-urdu text-stone-900 text-sm group-hover:text-emerald-800">
                          {soap.nameUrdu}
                        </h5>
                        <p className="text-xs font-urdu text-emerald-900 font-medium">
                          {soap.shortBenefitUrdu}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-700 shrink-0" />
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-stone-500 font-urdu text-sm">
                  بہترین نتائج کے لیے ہمارے عام فوائد کی لسٹ دیکھیں۔
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
