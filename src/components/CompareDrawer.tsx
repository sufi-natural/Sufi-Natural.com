import React from 'react';
import { SoapVariant } from '../data/soaps';
import { X, Scale, Trash2, ShieldCheck, Check } from 'lucide-react';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comparedSoaps: SoapVariant[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onSelectSoap: (soap: SoapVariant) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  isOpen,
  onClose,
  comparedSoaps,
  onRemove,
  onClear,
  onSelectSoap,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 relative text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-700" />
            <h3 className="text-xl font-bold font-urdu text-stone-900">
              صابن کے فوائد کا تقابلی جائزہ (Soap Comparison)
            </h3>
          </div>

          {comparedSoaps.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-rose-600 hover:text-rose-800 font-urdu flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>فہرست صاف کریں</span>
            </button>
          )}
        </div>

        {comparedSoaps.length === 0 ? (
          <div className="text-center py-12 text-stone-500 font-urdu">
            تقابلی جائزہ لینے کے لیے کم از کم 2 یا 3 صابن پر "موازنہ کریں" کا بٹن دبائیں۔
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparedSoaps.map((soap) => (
              <div
                key={soap.id}
                className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col justify-between space-y-4 relative"
              >
                <button
                  onClick={() => onRemove(soap.id)}
                  className="absolute top-3 left-3 text-stone-400 hover:text-rose-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <div className="text-4xl text-center py-2 bg-white rounded-xl border border-stone-100 mb-2">
                    {soap.emoji}
                  </div>
                  <h4 className="font-bold font-urdu text-center text-stone-900 text-base">
                    {soap.nameUrdu}
                  </h4>
                  <p className="text-xs font-sans text-center text-stone-500 mb-3">
                    {soap.nameEnglish}
                  </p>

                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 space-y-1 mb-3">
                    <span className="text-[11px] font-bold font-urdu text-emerald-950 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>بنیادی فائدہ:</span>
                    </span>
                    <p className="text-xs font-bold font-urdu text-emerald-900">
                      {soap.shortBenefitUrdu}
                    </p>
                  </div>

                  <div className="text-xs font-urdu text-stone-700 space-y-1">
                    <span className="font-bold block text-stone-900">جلد کی قسم:</span>
                    <div className="flex flex-wrap gap-1">
                      {soap.skinTypesUrdu.map((st, i) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded border text-[10px]">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#154734] font-sans">
                    Rs. {soap.pricePkr}
                  </span>
                  <button
                    onClick={() => {
                      onSelectSoap(soap);
                      onClose();
                    }}
                    className="text-xs font-bold font-urdu bg-[#154734] text-amber-100 px-3 py-1.5 rounded-lg"
                  >
                    تفصیلات
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
