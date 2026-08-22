import React from 'react';
import { Leaf, Shield, Award, Heart, Sparkles, CheckCircle2, Phone, Mail, MessageSquare } from 'lucide-react';

interface FooterProps {
  shopPhone?: string;
  shopEmail?: string;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  shopPhone = '03301285975',
  shopEmail = 'sufinatural1@gmail.com',
  onOpenAdmin,
}) => {
  const cleanPhone = (shopPhone || '03301285975').replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : (cleanPhone || '923301285975');

  return (
    <footer className="bg-[#0b2b1f] text-emerald-100 border-t border-amber-600/30 pt-12 pb-8 px-4 sm:px-6 lg:px-8 font-urdu">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Quality Badges Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-emerald-900/80">
          <div className="bg-[#123e2e] p-4 rounded-2xl border border-emerald-800/60 flex items-center gap-3">
            <Leaf className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-amber-200 text-sm">100% ہربل اور ارگینک</h4>
              <p className="text-[11px] text-emerald-300/80">خالص جڑی بوٹیاں اور تیل</p>
            </div>
          </div>

          <div className="bg-[#123e2e] p-4 rounded-2xl border border-emerald-800/60 flex items-center gap-3">
            <Shield className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-amber-200 text-sm">کیمیکل اور پیرابین سے پاک</h4>
              <p className="text-[11px] text-emerald-300/80">محفوظ اور جلد کے لیے پرسکون</p>
            </div>
          </div>

          <div className="bg-[#123e2e] p-4 rounded-2xl border border-emerald-800/60 flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-amber-200 text-sm">قدرتی طریقہ تیاری</h4>
              <p className="text-[11px] text-emerald-300/80">ہاتھ سے تیار کردہ معیاری صابن</p>
            </div>
          </div>

          <div className="bg-[#123e2e] p-4 rounded-2xl border border-emerald-800/60 flex items-center gap-3">
            <Heart className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-amber-200 text-sm">تمام جلد کے لیے مفید</h4>
              <p className="text-[11px] text-emerald-300/80">خاص طور پر حساس جلد کے لیے</p>
            </div>
          </div>
        </div>

        {/* Brand Story & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#0d3828] flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
                  SH
                </div>
              </div>
              <h3 className="text-xl font-bold font-serif text-amber-200">SH Miracle Naturals</h3>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              ایس ایچ مریکل نیچرلز (shmiraclenaturals.com) ہربل ارگینک صابن اور بیوٹی کیئر قدیم حکمت اور جدید سکن کیئر سائنس کا نایاب مجموعہ ہے۔ ہر پراڈکٹ قدرتی جڑی بوٹیوں اور خالص تیلوں سے تیار ہے۔
            </p>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-xs text-amber-300/80 hover:text-amber-200 underline mt-2 block"
              >
                ⚙️ ایڈمن پینل لاگ ان
              </button>
            )}
          </div>

          <div>
            <h4 className="text-sm font-bold text-amber-300 mb-3 border-b border-emerald-900 pb-1">
              صابن کی اہم اقسام (Featured Soaps)
            </h4>
            <ul className="text-xs text-emerald-200/80 space-y-1.5">
              <li>• کافی اور چاول صابن (Coffee & Rice Brightening)</li>
              <li>• ایلو ویرا بیوٹی صابن (Aloe Vera Hydration)</li>
              <li>• نیم اور ہلدی اینٹی ایکنی صابن (Neem & Turmeric)</li>
              <li>• زعفران گلو اور نکھار صابن (Saffron Radiance)</li>
              <li>• چارکول ڈیٹاکس صابن (Charcoal Deep Detox)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-amber-300 mb-3 border-b border-emerald-900 pb-1">
              رابطہ و فوری واٹس ایپ آرڈر (Contact Us)
            </h4>
            <div className="text-xs text-emerald-200/80 space-y-2.5">
              <a
                href={`https://wa.me/${formattedPhone}?text=${encodeURIComponent('السلام علیکم! مجھے سوفی نیچرلز سے متعلق معلومات اور آرڈر کرنا ہے۔')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 text-amber-200 border border-emerald-700/50 transition-all font-mono"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-urdu">واٹس ایپ آرڈر:</span>
                <strong className="text-amber-300" dir="ltr">0330 1285975</strong>
              </a>

              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-urdu">ای میل:</span>
                <span className="font-mono text-amber-100" dir="ltr">{shopEmail}</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-urdu">ہیلپ لائن:</span>
                <span className="font-mono text-amber-100" dir="ltr">+{formattedPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-emerald-900/60 text-center text-xs text-emerald-400/70 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© SH Miracle Naturals (shmiraclenaturals.com) — Herbal Organic Care. All Rights Reserved.</span>
          <span className="text-amber-300/80">NATURAL • SAFE • EFFECTIVE</span>
        </div>

      </div>
    </footer>
  );
};
