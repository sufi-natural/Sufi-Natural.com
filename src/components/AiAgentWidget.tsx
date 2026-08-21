import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Bot, Send, X, PhoneCall, Sparkles, Check, 
  Copy, RefreshCw, Zap, ShieldCheck, Languages, ExternalLink,
  ShoppingBag, ArrowRight, CheckCircle2, User, MapPin, Phone
} from 'lucide-react';
import { SoapVariant } from '../data/soaps';
import { MiracleProduct } from '../data/shMiracleProducts';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
  extractedOrder?: {
    name?: string;
    phone?: string;
    address?: string;
    items?: string[];
    totalPkr?: number;
  };
}

interface AiAgentWidgetProps {
  soaps: SoapVariant[];
  miracleProducts: MiracleProduct[];
  langMode: 'ur' | 'en' | 'bi';
  shopNumber: string;
  onUpdateShopNumber?: (num: string) => void;
  onAddToCart?: (item: any) => void;
}

export const AiAgentWidget: React.FC<AiAgentWidgetProps> = ({
  soaps,
  miracleProducts,
  langMode,
  shopNumber = '03301285975',
  onUpdateShopNumber,
  onAddToCart
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'whatsapp' | 'setup'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPromptBanner, setShowPromptBanner] = useState(true);

  // Customer order fields collected during conversation
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    items: '',
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      text: 'السلام علیکم! 🌸 میں سوفی نیچرلز اور SH میرکل کا ہائپر ریئلٹیک AI سیلز ایجنٹ ہوں۔ میں آپ کو فوری جواب دینے کے لیے حاضر ہوں۔ آپ کسی بھی زبان (Urdu, English, Roman Urdu, Pashto, Punjabi) میں سوال پوچھ سکتے ہیں یا ڈائریکٹ آرڈر دے سکتے ہیں۔ آپ کی جلد یا بالوں کا کیا مسئلہ ہے؟',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Quick Prompt Options
  const quickPrompts = [
    'کونسا صابن چھائیوں اور داغ دھبوں کے لیے بہترین ہے؟',
    'Coffee Rice soap & Aloe Vera price check',
    'AOA! Hair fall ke liye SH Miracle shampoo & oil mangwana hai',
    'مجھے آرڈر بک کروانا ہے (Place an Order)',
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsTyping(true);

    try {
      // Call backend AI Agent proxy route
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ sender: m.sender, text: m.text })),
          shopNumber
        })
      });

      const data = await response.json();
      
      // Check if response contains extracted order JSON block
      let rawReply = data.reply || '';
      let extractedData: any = null;

      const jsonMatch = rawReply.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        try {
          extractedData = JSON.parse(jsonMatch[1]);
          rawReply = rawReply.replace(/```json\s*([\s\S]*?)\s*```/, '').trim();
          if (extractedData.customerName) setOrderDetails(prev => ({ ...prev, name: extractedData.customerName }));
          if (extractedData.phone) setOrderDetails(prev => ({ ...prev, phone: extractedData.phone }));
          if (extractedData.address) setOrderDetails(prev => ({ ...prev, address: extractedData.address }));
        } catch (e) {
          console.error('JSON parse error from AI agent', e);
        }
      }

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: rawReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        extractedOrder: extractedData
      };

      setMessages(prev => [...prev, agentMsg]);
    } catch (err) {
      console.error(err);
      // Smart Fallback if server error
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: 'جی بالکل محترم! آپ کا پیغام موصول ہو گیا۔ آپ ہماری پروڈکٹس ڈائریکٹ واٹس ایپ پر بھی آرڈر کر سکتے ہیں۔ نیچے دیئے گئے بٹن پر کلک کر کے واٹس ایپ پر پیغام بھیجیں۔',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Build clean WhatsApp message link
  const cleanPhone = (shopNumber || '03301285975').replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : (cleanPhone || '923301285975');

  const generateWhatsAppLink = (customText?: string) => {
    let msg = customText;
    if (!msg) {
      msg = `*سوفی نیچرلز - نیا کسٹمر آرڈر / انکوائری*\n----------------------------------\n`;
      if (orderDetails.name) msg += `👤 *نام:* ${orderDetails.name}\n`;
      if (orderDetails.phone) msg += `📞 *فون:* ${orderDetails.phone}\n`;
      if (orderDetails.address) msg += `📍 *پتہ:* ${orderDetails.address}\n`;
      if (orderDetails.items) msg += `🛒 *آرڈر کی تفصیل:* ${orderDetails.items}\n`;
      msg += `----------------------------------\nسلام! مجھے مزید معلومات اور آرڈر کنفرمیشن چاہیے۔`;
    }
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* Floating Widget Trigger Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        
        {/* Welcome Proactive Tooltip */}
        {showPromptBanner && !isOpen && (
          <div className="bg-stone-900/95 text-amber-100 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-amber-400/40 text-xs max-w-xs font-urdu animate-bounce flex items-start gap-2 relative">
            <span className="text-xl">💬</span>
            <div>
              <p className="font-bold text-amber-300">24/7 AI سیلز ایجنٹ آن لائن!</p>
              <p className="text-[11px] text-stone-300 leading-tight mt-0.5">
                کسی بھی زبان (Urdu, English, Roman Urdu) میں سوال پوچھیں یا فوری آرڈر دیں۔
              </p>
            </div>
            <button 
              onClick={() => setShowPromptBanner(false)}
              className="text-stone-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Floating Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowPromptBanner(false);
          }}
          className="relative group bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-amber-200 p-3.5 sm:p-4 rounded-full shadow-2xl border-2 border-amber-400 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {/* Online Pulse Dot */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
          </span>

          <Bot className="w-6 h-6 text-amber-300 animate-pulse" />
          <span className="hidden sm:inline font-bold font-urdu text-sm pr-1">
            AI سیلز ایجنٹ
          </span>
        </button>
      </div>

      {/* AI Agent Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
          <div className="bg-white w-full sm:w-[480px] h-[92vh] sm:h-[650px] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0d3324] via-[#154734] to-[#0d3324] text-white p-4 border-b border-amber-500/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
                  <Bot className="w-6 h-6" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-950 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold font-urdu text-base text-amber-200">
                      سوفی AI سیلز ایجنٹ
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 font-mono border border-emerald-400/40">
                      Gemini 3.6 AI
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 font-urdu">
                    ⚡ 24/7 آن لائن - جس زبان میں چاہیں بات کریں
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sub-Header Tabs */}
            <div className="bg-stone-100 p-2 border-b border-stone-200 grid grid-cols-3 gap-1 shrink-0 text-xs font-urdu font-bold">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'chat'
                    ? 'bg-emerald-900 text-amber-200 shadow-sm border border-amber-400/30'
                    : 'text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI چاٹ (Live)</span>
              </button>

              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'whatsapp'
                    ? 'bg-emerald-900 text-amber-200 shadow-sm border border-amber-400/30'
                    : 'text-stone-600 hover:bg-stone-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>واٹس ایپ آرڈر</span>
              </button>

              <button
                onClick={() => setActiveTab('setup')}
                className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'setup'
                    ? 'bg-emerald-900 text-amber-200 shadow-sm border border-amber-400/30'
                    : 'text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>ایجنٹ سیٹنگز</span>
              </button>
            </div>

            {/* TAB 1: AI Chat & Instant Support */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden bg-stone-50">
                
                {/* Chat Messages Scrollable */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  
                  {/* Language Notice */}
                  <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-center text-[11px] font-urdu text-amber-900 flex items-center justify-center gap-1.5 shadow-xs">
                    <Languages className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      آپ **اردو، انگلش، رومن اردو، یا پښتو** میں میسج بھیجیں - AI آپ کو اسی زبان میں جواب دے گا!
                    </span>
                  </div>

                  {/* Messages List */}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs font-urdu text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-emerald-800 text-amber-100 rounded-br-none border border-emerald-700'
                            : 'bg-white text-stone-800 rounded-bl-none border border-stone-200/90 shadow-md'
                        }`}
                      >
                        {msg.sender === 'agent' && (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 mb-1 pb-1 border-b border-emerald-100">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>سوفی AI ایجنٹ</span>
                          </div>
                        )}

                        <p className="whitespace-pre-line">{msg.text}</p>

                        {/* Extracted Order Box if ready */}
                        {msg.extractedOrder && msg.extractedOrder.customerName && (
                          <div className="mt-3 bg-emerald-50 p-2.5 rounded-xl border border-emerald-300 text-xs text-emerald-950 font-urdu space-y-1">
                            <p className="font-bold flex items-center gap-1 text-emerald-900">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>آرڈر کی معلومات موصول ہو گئیں:</span>
                            </p>
                            <p>👤 نام: {msg.extractedOrder.customerName}</p>
                            <p>📞 فون: {msg.extractedOrder.phone}</p>
                            <p>📍 پتہ: {msg.extractedOrder.address}</p>
                            <a
                              href={generateWhatsAppLink()}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 block w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold rounded-lg shadow-sm"
                            >
                              📲 واٹس ایپ پر آرڈر کنفرم کریں
                            </a>
                          </div>
                        )}

                        <span className="block text-[9px] text-stone-400 text-right mt-1 font-mono">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-stone-500 text-xs font-urdu bg-white p-3 rounded-2xl border border-stone-200 max-w-[140px]">
                      <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
                      <span>جواب لکھا جا رہا ہے...</span>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Quick Prompts Carousel */}
                <div className="p-2 bg-stone-100 border-t border-stone-200 overflow-x-auto flex gap-1.5 text-xs font-urdu no-scrollbar shrink-0">
                  {quickPrompts.map((qp, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(qp)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-300 hover:border-emerald-400 text-[11px] transition-all shadow-2xs"
                    >
                      {qp}
                    </button>
                  ))}
                </div>

                {/* Input Controls */}
                <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="یہاں میسج لکھیں (اردو یا English)..."
                    className="flex-1 py-2.5 px-3.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-xs sm:text-sm font-urdu outline-none"
                  />

                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-amber-200 disabled:opacity-50 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: WhatsApp Direct Order Form */}
            {activeTab === 'whatsapp' && (
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-stone-50 font-urdu text-xs sm:text-sm text-stone-800">
                <div className="bg-emerald-900 text-amber-200 p-4 rounded-2xl border border-amber-400/40 shadow-md">
                  <div className="flex items-center gap-2 text-base font-bold text-amber-300">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <span>براہِ راست واٹس ایپ آرڈر فارم</span>
                  </div>
                  <p className="text-xs text-emerald-100/90 mt-1">
                    یہ فارم پر کریں اور ایک کلک سے اپنا مکمل آرڈر ہمارے آفیشل واٹس ایپ نمبر ({formattedPhone}) پر بھیجیں۔
                  </p>
                </div>

                {/* Order Details Input Fields */}
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-emerald-700" />
                      <span>آپ کا نام (Full Name):</span>
                    </label>
                    <input
                      type="text"
                      value={orderDetails.name}
                      onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                      placeholder="مثال: محمد علی"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>فون / واٹس ایپ نمبر (Phone Number):</span>
                    </label>
                    <input
                      type="text"
                      value={orderDetails.phone}
                      onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                      placeholder="03001234567"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span>ڈلیوری کا مکمل پتہ اور شہر (Complete Address & City):</span>
                    </label>
                    <input
                      type="text"
                      value={orderDetails.address}
                      onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                      placeholder="مکان نمبر، گلی نمبر، محلہ/ایریا، شہر"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1 flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
                      <span>مطلوبہ صابن یا مصنوعات (Selected Products & Quantity):</span>
                    </label>
                    <textarea
                      rows={3}
                      value={orderDetails.items}
                      onChange={(e) => setOrderDetails({ ...orderDetails, items: e.target.value })}
                      placeholder="مثال: 2x کافی رائس صابن، 1x SH میرکل شیمپو"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white font-bold font-urdu flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all text-sm"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-300" />
                  <span>📲 واٹس ایپ پر آرڈر بھیجیں (Send Order to WhatsApp)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* TAB 3: Agent Setup & WhatsApp Number Admin */}
            {activeTab === 'setup' && (
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-stone-50 font-urdu text-xs sm:text-sm text-stone-800">
                <div className="bg-amber-100 text-amber-950 p-4 rounded-2xl border border-amber-300">
                  <h4 className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>دکان کا واٹس ایپ نمبر سیٹ کریں</span>
                  </h4>
                  <p className="text-xs text-amber-800 mt-1">
                    یہاں وہ واٹس ایپ نمبر درج کریں جس پر آپ کسٹمرز کے تمام آرڈرز اور پیغامات موصول کرنا چاہتے ہیں۔
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3">
                  <label className="block font-bold text-stone-800">
                    آفیشل واٹس ایپ نمبر (Shop WhatsApp Number):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={shopNumber}
                      onChange={(e) => onUpdateShopNumber && onUpdateShopNumber(e.target.value)}
                      placeholder="03301285975"
                      className="flex-1 p-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 font-mono text-sm outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    موجودہ نمبر: <strong className="font-mono text-emerald-800">+{formattedPhone}</strong>
                  </p>
                </div>

                {/* AI Features Guide */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                  <h5 className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>AI ایجنٹ کی خصوصیات:</span>
                  </h5>
                  <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                    <li>ہر زبان (Urdu, English, Roman Urdu, Pashto) کا خود بخود جواب۔</li>
                    <li>تمام صابن اور پروڈکٹس کی قیمتوں اور فوائد کا مکمل علم۔</li>
                    <li>کسٹمر کا نام، پتہ اور آرڈر معلومات خود بخود الگ کر کے واٹس ایپ لنک بنانا۔</li>
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
