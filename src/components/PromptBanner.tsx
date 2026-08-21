import React from 'react';
import { SOAP_VARIANTS, SoapVariant } from '../data/soaps';
import { Sparkles, CheckCircle2, ArrowRightLeft } from 'lucide-react';

interface PromptBannerProps {
  onSelectSoap: (soap: SoapVariant) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const PromptBanner: React.FC<PromptBannerProps> = ({
  onSelectSoap,
  activeFilter,
  setActiveFilter,
}) => {
  const promptSoaps = SOAP_VARIANTS.filter((s) => s.featuredInPrompt);

  return (
    <div className="bg-gradient-to-b from-[#f4f0ea] to-[#faf8f5] border-b border-amber-200/80 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-800 border border-amber-300/50">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-urdu text-stone-900 flex items-center gap-2">
                <span>ہر صابن کے خاص فوائد (سفارش کردہ لسٹ)</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-sans px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                  9 Main Herbal Soaps
                </span>
              </h2>
              <p className="text-xs text-stone-600 font-urdu">
                آپ کی بھیجی گئی فہرست کے مطابق ہر ارگینک صابن کا بنیادی فائدہ اور خصوصیت
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter(activeFilter === 'prompt_featured' ? 'all' : 'prompt_featured')}
              className={`text-xs font-urdu px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                activeFilter === 'prompt_featured'
                  ? 'bg-[#154734] text-amber-200 border-emerald-900 shadow-sm font-bold'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {activeFilter === 'prompt_featured' ? 'تمام 20 صابن دیکھیں' : 'صرف 9 فوائد دکھائیں'}
              </span>
            </button>
          </div>
        </div>

        {/* Horizontal Quick Benefit Cards Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {promptSoaps.map((soap) => (
            <div
              key={soap.id}
              onClick={() => onSelectSoap(soap)}
              className="bg-white rounded-xl p-3.5 border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-start gap-3 relative overflow-hidden"
            >
              {/* Corner Badge */}
              <div className="w-10 h-10 rounded-xl bg-amber-50 shrink-0 flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                {soap.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h3 className="text-sm font-bold font-urdu text-stone-900 group-hover:text-emerald-800 transition-colors truncate">
                    {soap.nameUrdu}
                  </h3>
                  <span className="text-[10px] font-sans font-medium text-stone-500 shrink-0 bg-stone-100 px-1.5 py-0.5 rounded">
                    {soap.nameEnglish.split(' ')[0]}
                  </span>
                </div>

                <div className="flex items-start gap-1.5 text-xs font-urdu text-emerald-900 font-medium bg-emerald-50/70 p-1.5 rounded-lg border border-emerald-100/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{soap.shortBenefitUrdu}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
