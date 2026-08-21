export interface MiracleProduct {
  id: string;
  nameUrdu: string;
  nameEnglish: string;
  category: 'hair' | 'skincare' | 'soaps' | 'spray';
  badgeUrdu: string;
  badgeEnglish: string;
  pricePkr: number;
  size: string;
  descriptionUrdu: string;
  descriptionEnglish: string;
  keyIngredientsUrdu: string[];
  keyIngredientsEnglish: string[];
  featuresUrdu: string[];
  featuresEnglish: string[];
  emoji: string;
  accentColor: string;
  bgGradient: string;
  popular?: boolean;
  imageUrl?: string;
}

export const SH_MIRACLE_PRODUCTS: MiracleProduct[] = [
  {
    id: 'miracle-shampoo',
    nameUrdu: 'ایس ایچ ميركل ہربل شیمپو',
    nameEnglish: 'SH Miracle Herbal Shampoo',
    category: 'hair',
    badgeUrdu: '18 ہربل اجزاء',
    badgeEnglish: '18 Herbs Formula',
    pricePkr: 550,
    size: '250ml',
    descriptionUrdu: '18 خالص دیسی جڑی بوٹیوں سے تیار کردہ شیمپو جو بالوں کا گرنا فوراً روکتا ہے، خشکی اور سکری کا خاتمہ کرتا ہے اور بالوں کو گھنا، لمبا اور چمکدار بناتا ہے۔',
    descriptionEnglish: 'Enriched with 18 pure natural herbs. Free from harmful Sulphates, Parabens, and Silicones. Restores hair thickness, controls hair fall, and prevents dandruff.',
    keyIngredientsUrdu: ['آنولہ', 'ریٹھا', 'شیکاکائی', 'بالچھڑ', 'بھیسراج', 'ایلو ویرا عرق'],
    keyIngredientsEnglish: ['Amla', 'Reetha', 'Shikakai', 'Bhringraj', 'Aloe Vera Extract', 'Brahmi'],
    featuresUrdu: [
      'پیرا بین (Paraben) سے پاک',
      'سلفیٹ (Sulphate) فری',
      'سلیکون (Silicone) فری',
      'بالوں کے گرنے میں نمایاں کمی'
    ],
    featuresEnglish: [
      '100% Paraben Free',
      'Sulphate Free Formulation',
      'Silicone Free Natural Cleanse',
      'Controls Excessive Hair Fall'
    ],
    emoji: '🌿',
    accentColor: '#15803d',
    bgGradient: 'from-emerald-950/20 via-emerald-900/10 to-amber-950/10',
    popular: true
  },
  {
    id: 'miracle-hair-oil',
    nameUrdu: 'ایس ایچ ميركل ڈراپس ہیئر آئل',
    nameEnglish: 'SH Miracle Drops Hair Oil',
    category: 'hair',
    badgeUrdu: '18 جڑی بوٹیاں + 15 روغن',
    badgeEnglish: '18 Herbs + 15 Oils',
    pricePkr: 650,
    size: '120ml',
    descriptionUrdu: '18 قدرتی جڑی بوٹیوں اور 15 خالص قدرتی روغنیات (Natural Oils) کا کرشماتی امتزاج۔ بالوں کی جڑوں کو مضبوط بنائے، گنج پن دور کرے اور نئے بال اگانے میں مددگار۔',
    descriptionEnglish: 'A powerful miracle elixir combining 18 cold-pressed herbs and 15 vital natural carrier oils. Nourishes scalp, stimulates hair follicles, and combats premature greying.',
    keyIngredientsUrdu: ['روغن زیتون', 'روغن بادام', 'کلونجی تیل', 'روغن ناریل', 'آنولہ تیل', 'بید انجیر'],
    keyIngredientsEnglish: ['Olive Oil', 'Almond Oil', 'Black Seed Oil', 'Coconut Oil', 'Castor Oil', 'Amla Extract'],
    featuresUrdu: [
      '18 قدرتی جڑی بوٹیاں',
      '15 ارگینک آئلز',
      'بالوں کو گھنا اور لمبا کرے',
      'جڑوں کی گہری غذائیت'
    ],
    featuresEnglish: [
      '18 Organic Cold-Pressed Herbs',
      '15 Natural Plant Oils',
      'Promotes Hair Growth',
      'Deep Scalp Nourishment'
    ],
    emoji: '💧',
    accentColor: '#b45309',
    bgGradient: 'from-amber-950/20 via-amber-900/10 to-emerald-950/10',
    popular: true
  },
  {
    id: 'miracle-rose-water',
    nameUrdu: 'ایس ایچ ميركل خالص عرقِ گلاب اسپرے',
    nameEnglish: 'SH Miracle Pure Rose Water Spray',
    category: 'spray',
    badgeUrdu: '100% خالص بھاپ کشیدہ',
    badgeEnglish: '100% Pure Steam Distilled',
    pricePkr: 280,
    size: '120ml Spray',
    descriptionUrdu: 'تازہ گلاب کی پتیوں سے کشیدہ خالص عرقِ گلاب جو چہرے کو فوراً تروتازہ کرتا ہے، مساموں کو ٹائٹ کرتا ہے اور جلد کی رنگت نکھارتا ہے۔',
    descriptionEnglish: '100% Pure Steam Distilled Rose Water Spray. Instantly hydrates skin, minimizes pores, balances pH level, and serves as an ideal natural facial toner.',
    keyIngredientsUrdu: ['خالص دیسی گلاب کا عرق', 'ڈسٹل واٹر'],
    keyIngredientsEnglish: ['Pure Desi Rose Distillate', 'Purified Aqua'],
    featuresUrdu: [
      'قدرتی اسکن ٹونر',
      'چہرے کی فوري تروتازگی',
      'کھلے مساموں کا بند ہونا',
      'کیمیکل اور خوشبو سے پاک'
    ],
    featuresEnglish: [
      'Natural Skin Toner',
      'Instant Refreshment Spray',
      'Pore Tightening Action',
      'No Artificial Fragrance'
    ],
    emoji: '🌹',
    accentColor: '#be123c',
    bgGradient: 'from-rose-950/20 via-rose-900/10 to-amber-950/10',
    popular: true
  },
  {
    id: 'miracle-glycerin',
    nameUrdu: 'ایس ایچ ميركل خالص گلیسرین',
    nameEnglish: 'SH Miracle Pure Vegetable Glycerin',
    category: 'skincare',
    badgeUrdu: 'خالص نباتاتی نمی',
    badgeEnglish: '100% Vegetable Pure',
    pricePkr: 220,
    size: '100ml',
    descriptionUrdu: '100% خالص نباتاتی گلیسرین جو خشک جلد، پھٹی ایڑیوں اور ہونٹوں کے لیے جادوئی موئسچرائزر ہے۔ عرقِ گلاب یا لیموں کے ساتھ ملانے سے جلدی نکھار ڈبل ہو جاتا ہے۔',
    descriptionEnglish: 'Pure vegetable glycerin that deeply locks in atmospheric hydration. Perfect for dry skin, cracked heels, chapped lips, and DIY home remedies.',
    keyIngredientsUrdu: ['100% خالص ویجیٹیبل گلیسرین'],
    keyIngredientsEnglish: ['100% Pure Vegetable Glycerin'],
    featuresUrdu: [
      'جلد کی گہری نمی',
      'پھٹی ہوئی جلد اور ایڑیوں کی شفایابی',
      'عرقِ گلاب کے ساتھ بہترین جوڑ',
      'حساس جلد کے لیے محفوظ'
    ],
    featuresEnglish: [
      'Deep Moisture Lock',
      'Heals Cracked Heels & Lips',
      'Blends Perfectly with Rose Water',
      'Safe for All Skin Types'
    ],
    emoji: '🥛',
    accentColor: '#0369a1',
    bgGradient: 'from-sky-950/20 via-sky-900/10 to-emerald-950/10'
  },
  {
    id: 'miracle-multani-mitti',
    nameUrdu: 'ایس ایچ ميركل ارگینک ملتانی مٹی',
    nameEnglish: 'SH Miracle Organic Multani Mitti',
    category: 'skincare',
    badgeUrdu: 'قدرتی خوبصورتی کا راز',
    badgeEnglish: '100% Natural Fuller Earth',
    pricePkr: 180,
    size: '150g Jar',
    descriptionUrdu: 'قدرتی اور خالص ملتانی مٹی پاؤڈر ਜੋ مساموں سے داغ دھبے، کیمیائی اثرات اور اضافی تیل (Excess Oil) کو جذب کر کے چہرے کو شاداب اور شفاف بناتا ہے۔',
    descriptionEnglish: '100% Natural Fuller’s Earth clay powder. Pulls out deep-seated impurities, absorbs excess oils, prevents acne breakouts, and leaves skin smooth and refreshed.',
    keyIngredientsUrdu: ['100% ارگینک خالص ملتانی مٹی پاؤڈر'],
    keyIngredientsEnglish: ['100% Pure Organic Fuller Earth Clay'],
    featuresUrdu: [
      'اضافی تیل جذب کرے',
      'ایکنی اور دانوں سے بچاؤ',
      'چہرے کے ماسک کے لیے بہترین',
      '100% قدرتی مٹی'
    ],
    featuresEnglish: [
      'Absorbs Excess Facial Oil',
      'Prevents Pimple Outbreaks',
      'Ideal Natural Face Pack',
      '100% Chemical-Free Clay'
    ],
    emoji: '🪨',
    accentColor: '#854d0e',
    bgGradient: 'from-amber-950/20 via-stone-900/10 to-emerald-950/10'
  },
  {
    id: 'miracle-coffee-rice-soap',
    nameUrdu: 'ایس ایچ ميركل کافی اور چاول صابن',
    nameEnglish: 'SH Miracle Coffee & Rice Soap',
    category: 'soaps',
    badgeUrdu: 'نکھار اور ملائمت',
    badgeEnglish: 'Brightening Scrub Soap',
    pricePkr: 250,
    size: '100g Bar',
    descriptionUrdu: 'ارگینک کافی اور چاول کا یہ ہربل صابن جلد کی مردہ تہہ کو ملائمت سے دور کر کے چہرے اور جسم کی جلد کو نرم، شفاف اور تروتازہ بناتا ہے۔',
    descriptionEnglish: 'Enriched with coffee grounds and rice powder. Gently exfoliates dead cells, smooths rough texture, and imparts a healthy natural glow.',
    keyIngredientsUrdu: ['ارگینک کافی دانہ', 'چاول کا عرق', 'وٹامن E', 'ارگینک گلیسرین'],
    keyIngredientsEnglish: ['Organic Coffee Grounds', 'Rice Extract', 'Vitamin E', 'Organic Soap Base'],
    featuresUrdu: [
      'مردہ جلد کا نرمی سے خاتمہ',
      'جلد کی رنگت میں قدرتی نکھار',
      'روزانہ استعمال کے لیے موزوں',
      'ہربل اجزاء سے تیار کردہ'
    ],
    featuresEnglish: [
      'Gentle Exfoliator',
      'Evens Skin Tone',
      'Suitable for Daily Use',
      'Herbal Recipe'
    ],
    emoji: '☕',
    accentColor: '#78350f',
    bgGradient: 'from-amber-950/20 via-amber-900/10 to-emerald-950/10',
    popular: true
  },
  {
    id: 'miracle-skin-white-soap',
    nameUrdu: 'ایس ایچ ميركل اسکن وائٹ بیوٹی صابن',
    nameEnglish: 'SH Miracle Skin White Beauty Soap',
    category: 'soaps',
    badgeUrdu: 'شہد، بادام اور ایلو ویرا',
    badgeEnglish: 'Honey & Almond Formula',
    pricePkr: 260,
    size: '100g Bar',
    descriptionUrdu: 'شہد، بادام کے تیل اور ایلو ویرا کا قدرتی شاہکار جو خشک جلد کو موئسچرائز کرتا ہے اور چہرے کی قدرتی رنگت کو نکھار کر نرم و ملائم بناتا ہے۔',
    descriptionEnglish: 'Infused with natural Honey, Almond Oil, and Aloe Vera. Feeds the skin with vitamins, locks in essential hydration, and reveals soft, glowing skin.',
    keyIngredientsUrdu: ['خالص شہد', 'روغن بادام', 'ایلو ویرا جیل', 'جڑی بوٹیوں کا عرق'],
    keyIngredientsEnglish: ['Pure Honey', 'Almond Oil', 'Aloe Vera Gel', 'Herbal Extracts'],
    featuresUrdu: [
      'خشک جلد کے لیے بہترین موئسچرائزر',
      'قدرتی چمک اور گلو',
      'بادام اور شہد کی غذائیت',
      'نرم و ملائم جلد'
    ],
    featuresEnglish: [
      'Rich Moisture for Dry Skin',
      'Natural Radiant Glow',
      'Deep Almond & Honey Nutrition',
      'Soft Silky Touch'
    ],
    emoji: '🍯',
    accentColor: '#d97706',
    bgGradient: 'from-amber-950/20 via-amber-800/10 to-emerald-950/10'
  },
  {
    id: 'miracle-white-pearl-cream',
    nameUrdu: 'ایس ایچ ميركل وائٹ پرل ہربل بیوٹی کریم',
    nameEnglish: 'SH Miracle White Pearl Herbal Beauty Cream',
    category: 'skincare',
    badgeUrdu: 'قدرتی گلو اور شائن',
    badgeEnglish: 'Pearl Glow Formula',
    pricePkr: 450,
    size: '50g Jar',
    descriptionUrdu: 'قدرتی جڑی بوٹیوں، زعفران اور موتی کے عرق سے تیار کردہ بیوٹی کریم جو چہرے کے سیاہ دھبوں، چھائیوں اور بے رونقی کو ختم کر کے چہرے کو شاہانہ چمک دیتی ہے۔',
    descriptionEnglish: 'Formulated with herbal extracts, Saffron, and Pearl essence. Fades dark spots, evens out hyperpigmentation, and imparts a bright, luminous complexion without chemicals.',
    keyIngredientsUrdu: ['زعفران', 'پرل ایسنس', 'وٹامن B3', 'ایلو ویرا عرق', 'روغنِ بادام'],
    keyIngredientsEnglish: ['Saffron', 'Pearl Extract', 'Vitamin B3', 'Aloe Vera Extract', 'Almond Oil'],
    featuresUrdu: [
      'چھائیوں اور سیاہ دھبوں میں کمی',
      'قدرتی پرل گلو اور نکھار',
      'کیمیکلز اور اسٹیرائڈز سے پاک',
      'رات کے وقت استعمال کے لیے موزوں'
    ],
    featuresEnglish: [
      'Fades Blemishes & Dark Spots',
      'Luminous Natural Pearl Glow',
      '100% Free from Harmful Steroids',
      'Ideal Night Repair Cream'
    ],
    emoji: '🌸',
    accentColor: '#c026d3',
    bgGradient: 'from-fuchsia-950/20 via-pink-900/10 to-amber-950/10',
    popular: true
  }
];

export interface VoiceoverScript {
  part: number;
  visualUrdu: string;
  visualEnglish: string;
  audioUrdu: string;
  audioEnglish: string;
  speaker: string;
  highlightCategory?: string;
  badge: string;
}

export const MIRACLE_VOICEOVER_SCRIPT: VoiceoverScript[] = [
  {
    part: 1,
    visualUrdu: 'تازہ ہربل جڑی بوٹیاں، پھول، پتے، ایلو ویرا، نیم اور قدرتی اجزاء کے خوبصورت کلوز اَپ۔',
    visualEnglish: 'Beautiful close-ups of fresh herbal plants, flowers, leaves, Aloe Vera, Neem, and pure natural ingredients.',
    audioUrdu: 'کیا آپ نے کبھی سوچا ہے کہ ہماری ہر پروڈکٹ کے ساتھ نام میں Miracle کیوں لکھا ہے؟',
    audioEnglish: 'Have you ever wondered why the word "Miracle" is written with every single product of ours?',
    speaker: '🎙️ وائس اوور (Voiceover)',
    badge: 'سوال و تعارف'
  },
  {
    part: 2,
    visualUrdu: 'جڑی بوٹیوں سے تیار ہونے کا خوبصورت تصور، پھر SH Miracle کی مختلف مصنوعات (شیمپو، آئل، عرقِ گلاب، صابن) ایک ایک کر کے سامنے آتی جائیں۔',
    visualEnglish: 'Scenic concept of herbal formulation, followed by SH Miracle products appearing gracefully one by one.',
    audioUrdu: 'Miracle یعنی کرشماتی… ہم نے یہ نام صرف خوبصورت لگنے کی وجہ سے نہیں رکھا۔ اس کے پیچھے ہمارا ایک یقین ہے—قدرت کی طاقت اور خالص ہربل اجزاء پر یقین۔',
    audioEnglish: 'Miracle means miraculous... We did not choose this name just because it sounds pleasant. Behind it lies our unshakeable belief—faith in the power of Nature and 100% pure herbal ingredients.',
    speaker: '🎙️ وائس اوور (Voiceover)',
    highlightCategory: 'brand-philosophy',
    badge: 'برانڈ کا فلسفہ'
  },
  {
    part: 3,
    visualUrdu: 'ہر صابن، شیمپو، ڈراپس آئل اور عرقِ گلاب کا انفرادی فائدہ اور قدرتی نکھار کا منظر۔',
    visualEnglish: 'Showcase of individual soap benefits, shampoo 18-herbs power, and rose water hydration.',
    audioUrdu: 'ہمارا ہر صابن اور ہر پروڈکٹ قدرتی تیلوں اور دیسی جڑی بوٹیوں سے ہاتھوں سے تیار کیا جاتا ہے تاکہ آپ کی جلد اور بالوں کو ملے۔ مکمل تحفظ اور قدرتی نکھار!',
    audioEnglish: 'Every soap and product of ours is handcrafted with pure cold-pressed oils and native herbs to give your skin and hair complete protection and genuine natural radiance!',
    speaker: '🎙️ وائس اوور (Voiceover)',
    badge: 'قدرتی تحفظ'
  }
];
