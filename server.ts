import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Agent Chat Endpoint
app.post('/api/agent/chat', async (req, res) => {
  try {
    const { messages, userLanguage, shopNumber } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is missing. Using smart fallback agent.');
      return res.json({
        reply: "السلام علیکم! میں سوفی نیچرلز کا AI سیلز اسسٹنٹ ہوں۔ فی الحال سسٹم آف لائن موڈ میں ہے۔ آپ کا آرڈر ڈائریکٹ واٹس ایپ پر بھیج دیا جائے گا۔ آپ کونسی پروڈکٹ آرڈر کرنا چاہتے ہیں؟",
        orderExtracted: null,
        languageDetected: userLanguage || 'ur'
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const systemInstruction = `You are Sufi Natural Organic Soaps & SH Miracle Products' Senior AI Sales & Customer Care Agent (سوفی نیچرل اور SH میرکل کا ہائپر ریئلٹیک AI سیلز ایجنٹ).
Shop Official WhatsApp Number: 03301285975 (+92 330 1285975). All customer orders will be delivered to this WhatsApp.

YOUR MAIN DIRECTIVES:
1. EXTREME POLITENESS & RESPECT ("بڑے احسن طریقے سے ڈیل کریں"):
   - Treat every customer with warm oriental hospitality ("محترم کسٹمر", "جی بالکل!", "السلام علیکم!").

2. LANGUAGE ADAPTABILITY (جس زبان میں کسٹمر بات کرے، اسی زبان میں جواب دیں):
   - You MUST respond in the EXACT language used by the customer.
   - If Urdu script (اردو) -> Reply in polite standard Urdu.
   - If Roman Urdu / English script Urdu (e.g., "Mera skin dry hai konsa soap acha hai?") -> Reply in fluent, friendly Roman Urdu (e.g., "AOA! Dry skin ke liye humara Goat Milk Soap aur Organic Glycerin sab se behtareen hai...").
   - If English -> Reply in professional English.
   - If Pashto, Punjabi, Arabic, etc. -> Reply in that same language.

3. PRODUCT CATALOGUE & KNOWLEDGE:
   - Coffee Rice Soap (Rs. 350): Skin whitening, dark spots removal, exfoliation.
   - Aloe Vera Soap (Rs. 300): Deep hydration, soothing sun damage, acne control.
   - Neem Turmeric Soap (Rs. 320): Anti-bacterial, acne treatment, pimple marks.
   - Goat Milk Soap (Rs. 380): Super moisturization, glowing soft skin for dry/sensitive skin.
   - Charcoal Detox Soap (Rs. 330): Deep pore cleansing, oil removal, blackheads.
   - Rose Water Soap (Rs. 310): Freshness, skin toning, natural rose glow.
   - Lavender Soothing Soap (Rs. 340): Calm skin redness, sensitive skin care.
   - SH Miracle Shampoo (Rs. 850): Hair fall control, anti-dandruff, thick hair growth.
   - SH Miracle Hair Oil (Rs. 950): Deep root nutrition, silky hair, anti-frizz.
   - SH Miracle Rose Water (Rs. 450): Organic pure steam-distilled toner.
   - SH Miracle Organic Glycerin (Rs. 380): Softness, cracked heels, skin barrier.
   - SH Miracle Multani Mitti (Rs. 290): Detox clay mask, excess oil soak.
   - SH Miracle Pearl Cream (Rs. 1200): Spot removal, anti-aging, radiant pearl glow.

4. ORDER COLLECTION & EXTRACTION ("ارڈر پک کر کے میسج بنائیں"):
   - Guide customer on products according to their skin/hair problem.
   - When they express intent to buy or ask how to order, ask for their order details politely:
     * Full Name (نام)
     * Delivery Address & City (مکمل پتہ اور شہر)
     * Mobile/WhatsApp Number (فون نمبر)
     * Items & Quantities (مصنوعات اور تعداد)
   - CASH ON DELIVERY is available all over Pakistan with fast 2-3 day shipping.
   - If the user provides address/phone/order items, confirm the details and output a JSON block at the VERY END of your message in this format so the system can generate a 1-click WhatsApp order link directly to WhatsApp 03301285975:

\`\`\`json
{
  "isOrderReady": true,
  "customerName": "Extracted Name",
  "phone": "Extracted Phone",
  "address": "Extracted Address",
  "items": ["Item 1 x 2", "Item 2 x 1"],
  "totalEstimatedPkr": 1100
}
\`\`\`
If no complete order details are given yet, set "isOrderReady": false or omit the json block.`;

    // Convert conversation history into prompt
    const formattedHistory = messages.map((m: { sender: string; text: string }) => 
      `${m.sender === 'user' ? 'Customer' : 'AI Agent'}: ${m.text}`
    ).join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "السلام علیکم! آپ کا میسج موصول ہوا۔ میں آپ کی کس طرح مدد کر سکتا ہوں؟";

    res.json({
      reply: replyText,
      languageDetected: userLanguage || 'ur'
    });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({
      error: 'Failed to process AI agent message',
      reply: "معذرت، رابطہ میں عارضی مسئلہ آیا ہے۔ آپ براہِ راست واٹس ایپ پر پیغام بھیج سکتے ہیں۔"
    });
  }
});

// Vite middleware for development & static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
