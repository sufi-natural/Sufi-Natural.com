import React, { useState } from 'react';
import { SoapVariant } from '../data/soaps';
import { X, ShoppingBag, Plus, Minus, Trash2, PhoneCall, Send, Copy, Check, ShieldCheck } from 'lucide-react';

export interface CartItem {
  soap: SoapVariant;
  quantity: number;
}

interface CartOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (soapId: number, qty: number) => void;
  onRemoveItem: (soapId: number) => void;
  onClearCart: () => void;
  shopNumber?: string;
}

export const CartOrderModal: React.FC<CartOrderModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  shopNumber = '03301285975',
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.soap.pricePkr * item.quantity, 0);

  // Clean phone number format for WhatsApp (defaults to 923301285975)
  const cleanPhone = (shopNumber || '03301285975').replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : (cleanPhone || '923301285975');

  // Generate WhatsApp message string
  const generateMessageText = () => {
    let msg = `*Sufi Natural Organic Soaps & SH Miracle - نیا آرڈر*\n----------------------------------\n`;
    if (customerName) msg += `👤 *گاہک کا نام:* ${customerName}\n`;
    if (customerPhone) msg += `📞 *فون نمبر:* ${customerPhone}\n`;
    if (customerAddress) msg += `📍 *ڈلیوری پتہ اور شہر:* ${customerAddress}\n`;
    msg += `----------------------------------\n*منتخب کردہ مصنوعات (Items Ordered):*\n`;
    cartItems.forEach((item, index) => {
      msg += `${index + 1}. ${item.soap.nameUrdu} (${item.soap.nameEnglish})\n   ↳ تعداد: ${item.quantity} عدد | قیمت: Rs. ${item.soap.pricePkr} x ${item.quantity} = Rs. ${item.soap.pricePkr * item.quantity}\n`;
    });

    msg += `----------------------------------\n`;
    msg += `💰 *کل رقم (Total Amount): Rs. ${totalAmount}*\n`;
    msg += `🚚 *ادائیگی کا طریقہ:* کیش آن ڈیلیوری (Cash On Delivery)\n`;
    msg += `----------------------------------\n`;
    msg += `السلام علیکم! برائے مہربانی میرا یہ آرڈر بک اور کنفرم فرما دیں۔ شکریہ!`;
    return msg;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateMessageText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppOrder = () => {
    const encoded = encodeURIComponent(generateMessageText());
    window.open(`https://wa.me/${formattedPhone}?text=${encoded}`, '_blank');
    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 relative text-stone-800"
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#154734] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-urdu text-stone-900">
                منتخب صابن کی آرڈر فہرست
              </h3>
              <p className="text-xs text-stone-500 font-urdu">
                اپنے من پسند صابن کا آرڈر دیں یا واٹس ایپ پر آرڈر بھیجیں
              </p>
            </div>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs text-rose-600 hover:text-rose-800 font-urdu flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>فہرست صاف کریں</span>
            </button>
          )}
        </div>

        {orderSent ? (
          <div className="text-center py-10 space-y-4 font-urdu">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h4 className="text-2xl font-bold text-stone-900">آرڈر کی درخواست بھیج دی گئی!</h4>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              آپ کے منتخب کردہ ارگینک صابن کی تفصیلات واٹس ایپ پر موصول ہو گئی ہیں۔ ہماری ٹیم جلد آپ سے رابطہ کرے گی۔
            </p>
            <button
              onClick={() => {
                setOrderSent(false);
                onClearCart();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#154734] text-amber-100 font-bold text-sm"
            >
              ٹھیک ہے
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12 text-stone-500 font-urdu space-y-3">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
            <p>آپ کی آرڈر فہرست میں ابھی کوئی صابن شامل نہیں ہے۔</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#154734] text-amber-100 font-bold rounded-xl text-xs"
            >
              صابن منتخب کریں
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Cart Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map(({ soap, quantity }) => (
                <div
                  key={soap.id}
                  className="bg-stone-50 rounded-2xl p-3 border border-stone-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl p-2 bg-white rounded-xl shadow-2xs border border-stone-100 shrink-0">
                      {soap.emoji}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-bold font-urdu text-sm text-stone-900 truncate">
                        {soap.nameUrdu}
                      </h4>
                      <p className="text-xs text-emerald-800 font-urdu font-medium truncate">
                        {soap.shortBenefitUrdu}
                      </p>
                      <span className="text-xs text-stone-500 font-sans">
                        Rs. {soap.pricePkr} × {quantity} = <strong className="text-stone-800">Rs. {soap.pricePkr * quantity}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center bg-white rounded-lg border border-stone-300 p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(soap.id, quantity - 1)}
                        className="p-1 hover:bg-stone-100 text-stone-700 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 font-bold text-xs">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(soap.id, quantity + 1)}
                        className="p-1 hover:bg-stone-100 text-stone-700 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(soap.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount Summary */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-center justify-between font-urdu">
              <span className="text-sm font-bold text-stone-800">کل رقم (Total Amount):</span>
              <span className="text-2xl font-bold font-sans text-[#154734]">
                Rs. {totalAmount}
              </span>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <h4 className="text-xs font-bold font-urdu text-stone-900">
                ڈیلیوری کی معلومات (Customer Details):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="آپ کا نام (Full Name)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-urdu bg-stone-50 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <input
                  type="text"
                  placeholder="فون یا واٹس ایپ نمبر"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-urdu bg-stone-50 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <input
                type="text"
                placeholder="مکمل پتہ / شہر (Delivery Address & City)"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-urdu bg-stone-50 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* Final Actions */}
            <div className="pt-2 space-y-2">
              <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl p-2.5 text-center text-xs font-urdu font-bold flex items-center justify-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-700 animate-pulse" />
                <span>یہ آرڈر خود بخود آپ کے واٹس ایپ نمبر (<strong className="font-mono text-emerald-800 dir-ltr">+{formattedPhone}</strong>) پر ارسال ہوگا۔</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleCopySummary}
                  className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold font-urdu text-xs flex items-center justify-center gap-2 border border-stone-300"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'تفصیلات کاپی ہو گئیں!' : 'تفصیلات کاپی کریں'}</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="py-3 px-4 rounded-xl bg-[#154734] hover:bg-[#0d3425] text-amber-100 font-bold font-urdu text-xs flex items-center justify-center gap-2 shadow-md transition-all transform hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>📲 واٹس ایپ پر آرڈر بھیجیں (Send Order)</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
