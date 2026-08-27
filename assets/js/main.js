/**
 * Brands Factory & Ali Mohmed - Premium 2026 Interactive Engine
 * Verified Real Clients, Responsive Device Preview Frames, Precision ROAS Calculator & Multilingual Engine
 */

// ==========================================
// 1. Verified Real Clients Database (100% Accurate)
// ==========================================
const realClientsData = {
  hebayoussef: {
    name_ar: "صالون هبة يوسف للتجميل | Heba Youssef",
    name_en: "Heba Youssef Beauty Salon",
    category: "beauty_salon",
    industry_ar: "بيوتي سنتر وصالون تجميل فاخر 💇‍♀️",
    industry_en: "Luxury Beauty Salon & Bridal Center",
    url: "https://hebayoussef.store/",
    display_url: "hebayoussef.store",
    badge_ar: "صالون تجميل وعرائس بالإسكندرية ✨",
    badge_en: "Alexandria Luxury Salon & Spa ✨",
    description_ar: "إدارة وتوسيع حملات الحجز الأونلاين لـ 3 فروع راقية في جليم وسموحة، مع استهداف دقيق لخدمات فرد الشعر بالبروتين، الهايدرافيشل، وباقات العرائس الملكية.",
    description_en: "Engineered high-converting online booking funnels for 3 flagship branches in Alexandria (Gleem & Smouha), driving consistent bookings for bridal packages and hair therapy.",
    stats: [
      { label_ar: "العائد الإعلاني", label_en: "Campaign ROAS", val: "5.8x" },
      { label_ar: "الحجوزات الشهرية", label_en: "Monthly Bookings", val: "+2,400 حجز" },
      { label_ar: "عدد الفروع", label_en: "Active Branches", val: "3 فروع راقية" }
    ]
  },
  familyseafood: {
    name_ar: "فسخاني العيلة | The Family Seafood",
    name_en: "The Family Seafood & Deli",
    category: "gourmet_food",
    industry_ar: "مأكولات وبطارخ وأسماك فاخرة 🐟",
    industry_en: "Gourmet Seafood & Egyptian Deli",
    url: "https://thefamilyseafood.shop/",
    display_url: "thefamilyseafood.shop",
    badge_ar: "مأكولات بحرية وتوصيل سريع 🦞",
    badge_en: "Premium Seafood Delivery 🦞",
    description_ar: "إطلاق وإدارة حملات المبيعات الموسمية والفورية على تيك توك وفيسبوك لمنتجات الفسيخ والرنجة والبطارخ الفاخرة، مع ربط البكسل وخفض تكلفة الاستحواذ (CPA).",
    description_en: "High-volume seasonal scaling across Meta & TikTok for premium seafood and deli products, maximizing direct delivery conversions with minimized CPA.",
    stats: [
      { label_ar: "العائد الإعلاني", label_en: "Campaign ROAS", val: "5.1x" },
      { label_ar: "أوردرات التوصيل", label_en: "Orders Delivered", val: "+6,200 أوردر" },
      { label_ar: "خفض تكلفة الطلب", label_en: "CPA Reduction", val: "-52%" }
    ]
  },
  donutstime: {
    name_ar: "دونتس تايم | Donuts Time",
    name_en: "Donuts Time",
    category: "fnb",
    industry_ar: "سلاسل حلويات ومطاعم F&B 🍩",
    industry_en: "Bakery, Sweets & F&B Chain",
    url: "https://donutstime.shop/",
    display_url: "donutstime.shop",
    badge_ar: "قطاع الأغذية والحلويات 🍩",
    badge_en: "F&B & Sweets Sector 🍩",
    description_ar: "حملات إعلانية واسعة الانتشار (Viral Content Testing) لزيادة الطلبات اليومية وتوسيع قاعدة زبائن الفروع وخدمة التوصيل، مع استهداف محلي عالي التحويل.",
    description_en: "High-velocity creative ad testing driving hyper-local foot traffic and daily online delivery orders across multiple branches.",
    stats: [
      { label_ar: "العائد الإعلاني", label_en: "Campaign ROAS", val: "4.9x" },
      { label_ar: "الطلبات الشهرية", label_en: "Monthly Orders", val: "+8,400 طلب" },
      { label_ar: "نمو الإيرادات", label_en: "Revenue Growth", val: "+38%" }
    ]
  },
  hycosmetics: {
    name_ar: "ماسة لمستحضرات التجميل | HY Cosmetics MASSA",
    name_en: "HY Cosmetics MASSA",
    category: "b2b_beauty",
    industry_ar: "منتجات معالجة شعر احترافية للصالونات B2B 🧪",
    industry_en: "Pro Hair Care & Salon Supplies (B2B)",
    url: "https://www.hycosmeticsmassa.store/",
    display_url: "hycosmeticsmassa.store",
    badge_ar: "توريد جملة لصالونات التجميل 🧪",
    badge_en: "B2B Salon Wholesale 🧪",
    description_ar: "استهداف متخصص لأصحاب ومصففي الصالونات ومراكز التجميل في مصر، لبناء شبكة عملاء جملة وتوزيع لمنتجات البروتين والبوتكس والفيلر عبر واتساب المباشر.",
    description_en: "Targeted B2B lead generation targeting professional beauty salons and stylists across Egypt for bulk wholesale distribution pipelines.",
    stats: [
      { label_ar: "العائد الإعلاني", label_en: "Campaign ROAS", val: "5.6x" },
      { label_ar: "صالونات متعاقدة", label_en: "Contracted Salons", val: "+1,800 صالون" },
      { label_ar: "طلبات متكررة", label_en: "Repeat Order Rate", val: "68%" }
    ]
  },
  turbocool: {
    name_ar: "تربو كوول للتكييف والتبريد | Turbo Cool Egypt",
    name_en: "Turbo Cool Egypt",
    category: "hvac",
    industry_ar: "تكييفات وأجهزة منزلية وتبريد ❄️",
    industry_en: "HVAC & Home Cooling Systems",
    url: "https://turbocool-egypt.shop/",
    display_url: "turbocool-egypt.shop",
    badge_ar: "موزع معتمد لأكبر ماركات التكييف ❄️",
    badge_en: "Certified HVAC & Air Conditioning ❄️",
    description_ar: "بناء مسار شراء ذكي لحملات مبيعات وصيانة التكييفات (شارب، كاريير، ميديا)، مع تتبع CAPI وخفض تكلفة المبيعات ومضاعفة الإيرادات الموسمية.",
    description_en: "Conversion-rate optimized sales funnels for top AC brands (Carrier, Sharp, Midea), backed by Server-Side CAPI tracking.",
    stats: [
      { label_ar: "العائد الإعلاني", label_en: "Campaign ROAS", val: "5.2x" },
      { label_ar: "الأجهزة المباعة", label_en: "Units Sold", val: "+3,600 جهاز" },
      { label_ar: "معدل التحويل", label_en: "Conversion Rate", val: "4.8%" }
    ]
  }
};

// ==========================================
// 2. Multilingual Dictionary
// ==========================================
const translations = {
  ar: {
    // Nav
    nav_home: "الرئيسية",
    nav_about: "عن المؤسس",
    nav_services: "الخدمات والأنظمة",
    nav_calculator: "حاسبة العائد",
    nav_portfolio: "عملاؤنا وسابقة الأعمال",
    nav_process: "منهجية العمل",
    btn_book_call: "احجز استشارة نمو ⚡",

    // Hero
    hero_badge: "منظومة نمو معتمدة بالذكاء الاصطناعي ⚡ AI-Driven Growth Engine",
    hero_title_1: "نضاعف مبيعات وتوسع علامتك التجارية بـ",
    hero_title_highlight: "الميديا باينج الذكي وأنظمة الـ AI",
    hero_subtitle: "في Brands Factory ندمج بين وكلاء الذكاء الاصطناعي (AI Agents) وإدارة الحملات الإعلانية فائقة الدقة لتحويل ميزانياتك الإعلانية إلى نمو هائل وعائد استثمار مضاعف (ROAS).",
    hero_cta_primary: "احجز استشارة استراتيجية مجانية 🚀",
    hero_cta_secondary: "استكشف عملاءنا الحقيقيين 📊",
    hero_trust: "مُعتمد وموثوق من كبرى المتاجر والشركات والعلامات التجارية الرائدة",

    // Stats
    stat_1_val: "$2.5M+",
    stat_1_lbl: "ميزانيات إعلانية مُدارة",
    stat_2_val: "5.2x",
    stat_2_lbl: "متوسط العائد الإعلاني (ROAS)",
    stat_3_val: "+180K",
    stat_3_lbl: "عميل محتمل ومبيعات ناجحة",
    stat_4_val: "98%",
    stat_4_lbl: "نسبة رضا ونمو مستمر للعملاء",

    // Founder
    founder_tag: "مؤسس Brands Factory",
    founder_name: "علي محمد | Ali Mohmed",
    founder_title: "Growth Strategist & AI-Driven Media Buyer",
    founder_bio_1: "رائد أعمال وخبير نمو رقمي متخصص في توسيع نطاق العلامات التجارية والشركات عبر دمج الذكاء الاصطناعي في عمليات الـ Media Buying والـ Content Automation والـ Vibe Coding.",
    founder_bio_2: "قدت بنجاح حملات إعلانية بملايين الجنيهات لمتاجر إلكترونية وصالونات كبرى وشركات في مصر والخليج، وحققنا أرقاماً قياسية في الـ ROAS عبر استراتيجيات تسويق موجهة بالبيانات والتحليلات التنبؤية.",
    founder_badge_1: "خبير استهداف خوارزمي (Meta / TikTok / Google)",
    founder_badge_2: "هندسة أتمتة المحتوى والـ AI Agents",
    founder_badge_3: "Vibe Coding وبناء مسارات البيع (Funnels)",
    founder_btn_linkedin: "تواصل عبر LinkedIn",
    founder_btn_facebook: "تابع صفحة فيسبوك",

    // Services
    services_tag: "حلولنا المبتكرة",
    services_title: "منظومة نمو متكاملة مدفوعة بالذكاء الاصطناعي",
    services_desc: "لا نعتمد على التخمين، بل نستخدم خوارزميات الذكاء الاصطناعي المتطورة لتحليل كل خطوة في مسار العميل ومضاعفة معدلات التحويل.",
    srv_1_title: "إدارة الإعلانات الذكية (AI Media Buying)",
    srv_1_desc: "استراتيجيات تحجيم وتوسيع الميزانيات على Meta، TikTok و Google باستخدام النمذجة التنبؤية واختبار الزوايا الإعلانية للوصول لأعلى ROAS ممكن.",
    srv_1_tag: "Meta & TikTok & Google",
    srv_2_title: "هندسة مسارات البيع والنمو (Funnel Optimization)",
    srv_2_desc: "بناء وتطوير صفحات هبوط فائقة الإقناع وتصميم تجربة مستخدم تضاعف معدل التحويل (CR) وتقلل تكلفة الاستحواذ على العميل (CAC).",
    srv_2_tag: "Conversion Rate Booster",
    srv_3_title: "استوديو المحتوى المؤتمت (AI Creative Studio)",
    srv_3_desc: "صناعة وتوليد عشرات الخطافات الإعلانية (Hooks) وسكربتات الـ UGC والفيديوهات الإبداعية الموجهة للبيع باستخدام أدوات الذكاء الاصطناعي.",
    srv_3_tag: "High-Converting Creatives",
    srv_4_title: "تحليل السوق بالوكلاء الأذكياء (Market Intelligence)",
    srv_4_desc: "نشر وكلاء ذكاء اصطناعي لمراقبة المنافسين وتحليل رغبات الجمهور بدقة واستخراج الثغرات والفرص غير المستغلة في السوق فورياً.",
    srv_4_tag: "AI Market Spying",
    srv_5_title: "الأتمتة والـ Vibe Coding المخصص",
    srv_5_desc: "ربط أنظمة إدارة العملاء (CRM) وبرمجة بوتات واتساب الذكية لتأهيل العملاء المحتملين ومتابعتهم آلياً دون أي تدخل بشري.",
    srv_5_tag: "Workflows & Automations",
    srv_6_title: "استشارات التوسع للشركات (Brand Scaling Consultations)",
    srv_6_desc: "جلسات استشارية واستراتيجيات مخصصة للشركات والمتاجر التي ترغب في الانتقال من مرحلة الاستقرار إلى مضاعفة المبيعات بأمان.",
    srv_6_tag: "1-on-1 Growth Consulting",

    // Calculator
    calc_tag: "أداة تفاعلية",
    calc_title: "احسب العائد المتوقع على إعلاناتك مع الذكاء الاصطناعي",
    calc_desc: "حرك المؤشر لاختيار ميزانيتك الإعلانية الشهرية وشاهد كيف ترفع منظومة Brands Factory أرباحك وعائد الـ ROAS.",
    calc_spend_label: "ميزانيتك الإعلانية الشهرية المتوقعة:",
    calc_industry_label: "نوع نشاطك التجاري:",
    calc_ind_ecom: "تجارة إلكترونية ومتاجر (E-Commerce)",
    calc_ind_b2b: "خدمات وشركات وصالونات (Services & B2B)",
    calc_ind_realestate: "عقارات وأجهزة كبرى (High-Ticket & HVAC)",
    calc_ind_coaching: "استشارات ودورات تدريبية (Info & Coaching)",
    calc_res_roas: "العائد الإعلاني المتوقع (ROAS)",
    calc_res_revenue: "المبيعات الشهرية المقدرة",
    calc_res_leads: "العملاء / الطلبات المتوقعة",
    calc_res_profit: "صافي الزيادة المتوقعة في الأرباح",
    calc_btn_apply: "طبق هذا النموذج الإعلاني على مشروعي 🚀",

    // Portfolio
    port_tag: "عملاؤنا ونتائج حقيقية",
    port_title: "متاجر وعلامات تجارية نعتز بنموها معنا",
    port_desc: "استكشف نماذج حية لمتاجر وبراندات حقيقية ندير حملاتها التسويقية ونضاعف أرقام مبيعاتها.",
    tab_all: "جميع العملاء",
    tab_beauty: "صالونات وتجميل",
    tab_fnb: "أغذية ومطاعم",
    tab_ecom: "تكييفات وتجارة إلكترونية",
    btn_preview_store: "معاينة تفاعلية للشاشات 💻",
    btn_visit_store: "الموقع المباشر ↗",

    // Modal
    modal_device_laptop: "كمبيوتر 💻",
    modal_device_tablet: "تابلت 📱",
    modal_device_mobile: "هاتف 📱",
    modal_visit_live: "فتح المتجر الرسمي",

    // 4-Step Process
    proc_tag: "طريقك للقمة",
    proc_title: "منهجية العمل المكونة من 4 مراحل",
    proc_desc: "نظام علمي دقيق ومثبت يضمن لك تحقيق أقصى استفادة من كل ميزانية تُنفق في الإعلانات.",
    step_1_num: "01",
    step_1_title: "التدقيق والتحليل الذكي (AI Audit)",
    step_1_desc: "فحص شامل لحساباتك الإعلانية ومسار البيع والمنافسين لاكتشاف نقاط التسريب وأكبر فرص النمو المتاحة.",
    step_2_num: "02",
    step_2_title: "هندسة الزوايا والمحتوى الإعلاني",
    step_2_desc: "تجهيز مصفوفة إعلانية كاملة وتوليد زوايا إبداعية واختبارها على نطاق ضيق لتحديد الرسائل الفائزة.",
    step_3_num: "03",
    step_3_title: "التوسع ومضاعفة الميزانيات (Scaling)",
    step_3_desc: "ضخ الميزانيات في الحملات والإعلانات الرابحة فقط مع المراقبة اللحظية لمنع تراجع الـ ROAS وضمان استقرار الأرباح.",
    step_4_num: "04",
    step_4_title: "الأتمتة وبناء منظومة مستدامة",
    step_4_desc: "أتمتة خدمة العملاء وإعادة الاستهداف (Retargeting) وربط كل العمليات ليعمل براندك كآلة مبيعات تعمل 24/7.",

    // Testimonials
    test_tag: "ماذا يقول شركاؤنا",
    test_title: "ثقة العملاء هي سر نجاحنا",
    test_1_quote: "العمل مع علي وفريق Brands Factory نقل مبيعاتنا لمستوى استثنائي. تتبع الـ CAPI واستهداف التكييفات في الموسم حقق لنا أعلى نسبة مبيعات في تاريخ الشركة.",
    test_1_author: "أحمد كمال",
    test_1_role: "إدارة تربو كوول مصر للتكييفات",
    test_2_quote: "إدارة الحملات واستهداف العرائس وحجوزات فروع جليم وسموحة أحدث طفرة في مواعيد الصالون، نتائج دقيقة ومحترفة جداً.",
    test_2_author: "إدارة صالون هبة يوسف",
    test_2_role: "أرقى بيوتي صالون بالإسكندرية",
    test_3_quote: "الأتمتة التي برمجها لنا في واتساب خفضت تكلفة الأوردر وسرعت توصيل الطلبات في فروع دونتس تايم بصورة مذهلة.",
    test_3_author: "إدارة دونتس تايم (Donuts Time)",
    test_3_role: "سلاسل الأغذية والحلويات",

    // Form
    form_tag: "جاهز للتوسع؟",
    form_title: "احجز استشارتك المجانية لمضاعفة مبيعاتك",
    form_desc: "املأ البيانات أدناه وسيتواصل معك علي محمد مباشرة لمراجعة خطتك الإعلانية وتحديد استراتيجية النمو الأنسب لعلامتك.",
    form_name_lbl: "الاسم بالكامل: *",
    form_name_ph: "مثال: أحمد محمود",
    form_phone_lbl: "رقم الواتساب: *",
    form_phone_ph: "+20 1X XXXX XXXX",
    form_brand_lbl: "اسم البراند / رابط الموقع أو الصفحة:",
    form_brand_ph: "brandsfactory.site أو صفحتك",
    form_budget_lbl: "الميزانية الإعلانية الشهرية المتوقعة:",
    form_budget_opt1: "أقل من $1,000 (تأسيس واختبار)",
    form_budget_opt2: "$1,000 - $3,000 (نمو واختبار زوايا)",
    form_budget_opt3: "$3,000 - $10,000 (توسع ومضاعفة مبيعات)",
    form_budget_opt4: "أكثر من $10,000 (تحجيم قوي ومؤسسي)",
    form_goal_lbl: "الخدمة أو الهدف الأساسي المطلوب:",
    form_goal_opt1: "إدارة إعلانات ممولة وميديا باينج متكامل",
    form_goal_opt2: "بناء مسار بيع وتحسين معدل التحويل (Funnel & CRO)",
    form_goal_opt3: "صناعة محتوى إعلاني وأتمتة الـ AI",
    form_goal_opt4: "استشارة نمو وتدقيق شامل لخطتي الحالية",
    form_notes_lbl: "ملاحظات أو تفاصيل إضافية:",
    form_notes_ph: "أخبرنا عن التحدي الأكبر الذي يواجه مشروعك حالياً...",
    form_btn_submit: "إرسال وحجز الاستشارة فوراً ⚡",
    form_or_whatsapp: "أو تواصل فوراً عبر واتساب بنقرة واحدة",
    form_whatsapp_btn: "محادثة مباشرة مع علي محمد (WhatsApp)",

    // FAQ
    faq_tag: "الأسئلة الأكثر شيوعاً",
    faq_title: "إجابات على استفساراتك",
    faq_1_q: "كيف يختلف أسلوب Brands Factory عن وكالات التسويق التقليدية؟",
    faq_1_a: "نحن لا نعتمد على القوالب الجاهزة أو التخمين. ندمج بين وكلاء الذكاء الاصطناعي لتحليل البيانات واختبار العشرات من الزوايا الإعلانية أسبوعياً، مع خبرة عملية في الميديا باينج لضمان أقصى عائد استثماري (ROAS) ممكن.",
    faq_2_q: "ما هي المنصات الإعلانية التي تديرونها؟",
    faq_2_a: "ندير ونقيس الحملات بدقة عبر منصات Meta (Facebook & Instagram Ads), TikTok Ads, Google Ads & YouTube Ads، مع بناء أنظمة تتبع متقدمة (CAPI & Server-Side Tracking).",
    faq_3_q: "متى يمكنني البدء في رؤية نتائج ملموسة لحملاتي؟",
    faq_3_a: "تبدأ مرحلة التدقيق واختبار الزوايا الإبداعية في الأسبوع الأول، وتبدأ النتائج الإيجابية وتحسين الـ ROAS في الظهور خلال أول 14 إلى 21 يوماً من إطلاق المنظومة.",
    faq_4_q: "هل تناسب خدماتكم المتاجر الناشئة والشركات الكبيرة معاً؟",
    faq_4_a: "نعم، نقدم حلولاً متدرجة؛ بدءاً من تدقيق الحسابات والاستشارات المركزة، وصولاً إلى الإدارة الكاملة لميزانيات الإعلانات الضخمة والأتمتة المتكاملة.",

    // Footer
    footer_desc: "وكالة نمو معتمدة بالذكاء الاصطناعي متخصصة في مضاعفة أرباح المتاجر والعلامات التجارية عبر الـ Media Buying والـ Content Automation.",
    footer_quick_links: "روابط سريعة",
    footer_services: "خدماتنا",
    footer_contact_info: "معلومات التواصل",
    footer_rights: "جميع الحقوق محفوظة © 2026 Brands Factory | أسسها علي محمد (Ali Mohmed).",
    footer_location: "القاهرة، جمهورية مصر العربية 🇪🇬",
    footer_domain: "Domain: brandsfactory.site"
  },

  en: {
    // Nav
    nav_home: "Home",
    nav_about: "Founder",
    nav_services: "AI Services",
    nav_calculator: "ROAS Calculator",
    nav_portfolio: "Our Clients & Work",
    nav_process: "Our Framework",
    btn_book_call: "Book Strategy Call ⚡",

    // Hero
    hero_badge: "AI-Driven Growth Engine ⚡ Verified Scaling Partner",
    hero_title_1: "Scale Your Brand Revenue with",
    hero_title_highlight: "AI-Driven Media Buying & Growth Systems",
    hero_subtitle: "At Brands Factory, we bridge autonomous AI agents with precision media buying architectures to convert your ad spend into predictable, high-ROAS hyper-growth.",
    hero_cta_primary: "Book a Free Strategy Call 🚀",
    hero_cta_secondary: "Explore Our Real Clients 📊",
    hero_trust: "Trusted by top e-commerce founders, luxury beauty salons, and high-growth brands",

    // Stats
    stat_1_val: "$2.5M+",
    stat_1_lbl: "Ad Spend Managed",
    stat_2_val: "5.2x",
    stat_2_lbl: "Average Campaign ROAS",
    stat_3_val: "+180K",
    stat_3_lbl: "Leads & Conversions Generated",
    stat_4_val: "98%",
    stat_4_lbl: "Client Retention & Growth Rate",

    // Founder
    founder_tag: "Founder & Lead Strategist",
    founder_name: "Ali Mohmed",
    founder_title: "Growth Strategist & AI-Driven Media Buyer",
    founder_bio_1: "Digital growth architect specialized in scaling brands and businesses through algorithmic media buying, AI creative pipelines, and custom vibe coding automations.",
    founder_bio_2: "Managed multi-million ad budgets for top e-commerce brands, flagship beauty centers, and retail businesses across Egypt and the Gulf, engineered around data-driven customer acquisition.",
    founder_badge_1: "Algorithmic Media Buying Expert (Meta / TikTok / Google)",
    founder_badge_2: "AI Agents & Creative Content Pipelines",
    founder_badge_3: "Vibe Coding & High-Conversion Funnels",
    founder_btn_linkedin: "Connect on LinkedIn",
    founder_btn_facebook: "Visit Facebook Page",

    // Services
    services_tag: "Innovative Solutions",
    services_title: "End-to-End AI-Powered Growth Ecosystem",
    services_desc: "We eliminate guesswork with autonomous AI agents that analyze market dynamics, refine ad angles, and hyper-optimize conversion rates.",
    srv_1_title: "AI-Driven Media Buying",
    srv_1_desc: "Precision scaling across Meta, TikTok, and Google Ads powered by predictive modeling, creative matrix testing, and real-time ROAS optimization.",
    srv_1_tag: "Meta & TikTok & Google",
    srv_2_title: "Growth & Funnel Optimization",
    srv_2_desc: "Building high-converting landing pages and customer journeys that double conversion rates (CR) and slash customer acquisition costs (CAC).",
    srv_2_tag: "Conversion Rate Booster",
    srv_3_title: "AI Creative Studio & Automation",
    srv_3_desc: "High-velocity production of viral video hooks, high-converting UGC scripts, and static creatives generated to win against ad fatigue.",
    srv_3_tag: "High-Converting Creatives",
    srv_4_title: "Market Intelligence & AI Agent Analytics",
    srv_4_desc: "Deploying autonomous AI agents to monitor competitor strategies, uncover hidden market angles, and capitalize on trending demand.",
    srv_4_tag: "AI Market Spying",
    srv_5_title: "Custom Automations & Vibe Coding",
    srv_5_desc: "Seamless CRM integrations, automated lead qualification pipelines, and intelligent WhatsApp bots operating 24/7.",
    srv_5_tag: "Workflows & Automations",
    srv_6_title: "Brand Scaling & Growth Consulting",
    srv_6_desc: "1-on-1 strategic roadmap sessions designed for scaling brands ready to unlock their next 7-8 figure revenue milestone safely.",
    srv_6_tag: "1-on-1 Growth Consulting",

    // Calculator
    calc_tag: "Interactive Tool",
    calc_title: "Calculate Your Projected ROAS with AI Scaling",
    calc_desc: "Drag the slider to choose your monthly ad spend and discover how Brands Factory's AI systems can scale your bottom line.",
    calc_spend_label: "Monthly Ad Budget:",
    calc_industry_label: "Industry / Business Model:",
    calc_ind_ecom: "E-Commerce / Direct-to-Consumer (D2C)",
    calc_ind_b2b: "Beauty Salons, Clinics & B2B Services",
    calc_ind_realestate: "HVAC & High-Ticket Appliances",
    calc_ind_coaching: "Info Products & Coaching Consultancies",
    calc_res_roas: "Projected ROAS Multiplier",
    calc_res_revenue: "Estimated Monthly Revenue",
    calc_res_leads: "Estimated Sales / Bookings",
    calc_res_profit: "Estimated Net Profit Delta",
    calc_btn_apply: "Apply This Blueprint To My Business 🚀",

    // Portfolio
    port_tag: "Verified Results",
    port_title: "Live Stores & Brands We Proudly Scale",
    port_desc: "Explore live stores and real clients whose paid growth pipelines and ROAS are managed by Brands Factory.",
    tab_all: "All Clients",
    tab_beauty: "Beauty & Salons",
    tab_fnb: "Food & Dining",
    tab_ecom: "HVAC & E-Commerce",
    btn_preview_store: "Interactive Device Preview 💻",
    btn_visit_store: "Official Store ↗",

    // Modal
    modal_device_laptop: "Desktop 💻",
    modal_device_tablet: "Tablet 📱",
    modal_device_mobile: "Mobile 📱",
    modal_visit_live: "Open Official Store",

    // 4-Step Process
    proc_tag: "Roadmap to Scale",
    proc_title: "Our Proven 4-Step Scaling Architecture",
    proc_desc: "A battle-tested methodology engineered to extract maximum returns from every dollar spent on paid traffic.",
    step_1_num: "01",
    step_1_title: "AI Audit & Opportunity Mapping",
    step_1_desc: "Deep-dive diagnostic into past ad data, conversion bottlenecks, and competitor positioning to locate immediate ROI levers.",
    step_2_num: "02",
    step_2_title: "Creative Matrix & Funnel Engineering",
    step_2_desc: "Producing dozens of AI-assisted angles and testing them with surgical micro-budgets to pinpoint clear winners.",
    step_3_num: "03",
    step_3_title: "Aggressive Budget Scaling",
    step_3_desc: "Scaling winning ad sets vertically and horizontally while maintaining algorithmic bid stability and high ROAS.",
    step_4_num: "04",
    step_4_title: "Ecosystem Automation & Retention",
    step_4_desc: "Automating retention, retargeting, and CRM flows so your brand functions as a self-sustaining revenue engine 24/7.",

    // Testimonials
    test_tag: "Client Endorsements",
    test_title: "Trusted by Industry Leaders",
    test_1_quote: "Working with Ali and Brands Factory transformed our sales. CAPI setup and seasonal AC scaling generated our highest revenue quarter in company history.",
    test_1_author: "Ahmed Kamal",
    test_1_role: "Executive Team, Turbo Cool Egypt",
    test_2_quote: "Targeted bridal campaigns and online booking funnels for our Gleem & Smouha branches resulted in fully booked schedules. Flawless execution.",
    test_2_author: "Heba Youssef Salon Management",
    test_2_role: "Alexandria's Leading Beauty Center",
    test_3_quote: "The WhatsApp automation bot cut order acquisition costs and streamlined deliveries across Donuts Time branches remarkably.",
    test_3_author: "Management Team, Donuts Time",
    test_3_role: "Bakery & Sweets Chain",

    // Form
    form_tag: "Ready to Scale?",
    form_title: "Book Your Free 1-on-1 Growth Session",
    form_desc: "Fill in the details below and Ali Mohmed will personally analyze your current paid traffic strategy and growth levers.",
    form_name_lbl: "Full Name: *",
    form_name_ph: "e.g. John Doe",
    form_phone_lbl: "WhatsApp Phone Number: *",
    form_phone_ph: "+20 1X XXXX XXXX or international",
    form_brand_lbl: "Brand Name / Website URL:",
    form_brand_ph: "brandsfactory.site or your URL",
    form_budget_lbl: "Monthly Ad Budget:",
    form_budget_opt1: "Under $1,000 (Testing & Setup)",
    form_budget_opt2: "$1,000 - $3,000 (Growth Phase)",
    form_budget_opt3: "$3,000 - $10,000 (Aggressive Scale)",
    form_budget_opt4: "$10,000+ (Enterprise & Dominance)",
    form_goal_lbl: "Primary Goal / Required Service:",
    form_goal_opt1: "Full-Funnel AI Media Buying & Scaling",
    form_goal_opt2: "Funnel Engineering & CRO Optimization",
    form_goal_opt3: "AI Creative Studio & Content Automation",
    form_goal_opt4: "1-on-1 Strategy & Account Audit",
    form_notes_lbl: "Additional Details & Current Bottlenecks:",
    form_notes_ph: "Tell us about your biggest growth hurdle right now...",
    form_btn_submit: "Submit & Confirm Consultation ⚡",
    form_or_whatsapp: "Or connect immediately via WhatsApp",
    form_whatsapp_btn: "Instant WhatsApp Direct with Ali Mohmed",

    // FAQ
    faq_tag: "Frequently Asked Questions",
    faq_title: "Everything You Need to Know",
    faq_1_q: "How does Brands Factory differ from standard marketing agencies?",
    faq_1_a: "We avoid generic cookie-cutter templates. We integrate specialized AI agents to test 50+ creative angles weekly and employ algorithmic bid scaling, ensuring maximum cash flow and high ROAS.",
    faq_2_q: "Which ad platforms do you actively manage?",
    faq_2_a: "We specialize in Meta Ads (Facebook & Instagram), TikTok Ads, and Google / YouTube Ads, backed by Server-Side Conversions API (CAPI) and full data integrity setups.",
    faq_3_q: "How quickly will we see measurable results?",
    faq_3_a: "Account diagnostics and creative matrix deployment begin in week one. Measurable ROAS lift and conversion stabilization typically occur within the first 14 to 21 days.",
    faq_4_q: "Do you work with emerging brands as well as established enterprises?",
    faq_4_a: "Yes. We offer custom scaling tiers ranging from focused 1-on-1 growth consulting to full enterprise media buying and AI automation management.",

    // Footer
    footer_desc: "AI-Powered Growth Agency specializing in scaling brands and enterprise revenue through algorithmic media buying, vibe coding, and creative automation.",
    footer_quick_links: "Quick Navigation",
    footer_services: "Core Capabilities",
    footer_contact_info: "Direct Contact",
    footer_rights: "All Rights Reserved © 2026 Brands Factory | Founded by Ali Mohmed.",
    footer_location: "Cairo, Egypt 🇪🇬",
    footer_domain: "Domain: brandsfactory.site"
  }
};

let currentLang = 'ar';

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('bf_lang') || 'ar';
  setLanguage(savedLang);

  initCalculator();
  initCounters();
  initPortfolioTabs();
  initPreviewModal();
  initFAQ();
  initForm();
  initMobileMenu();
  initNavScroll();
});

// ==========================================
// 3. Language Switcher
// ==========================================
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('bf_lang', lang);

  const html = document.documentElement;
  const isRTL = lang === 'ar';

  html.setAttribute('lang', lang);
  html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  const langToggleBtn = document.getElementById('langToggleText');
  if (langToggleBtn) {
    langToggleBtn.innerText = lang === 'ar' ? 'English' : 'العربية';
  }

  if (typeof updateCalculatorUI === 'function') {
    updateCalculatorUI();
  }
}

window.toggleLanguage = function() {
  const nextLang = currentLang === 'ar' ? 'en' : 'ar';
  setLanguage(nextLang);
};

// ==========================================
// 4. Luxury Device Preview Modal
// ==========================================
function initPreviewModal() {
  const modal = document.getElementById('previewModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const overlay = document.getElementById('modalOverlay');
  const deviceBtns = document.querySelectorAll('.device-btn');
  const frameContainer = document.getElementById('deviceFrameContainer');

  deviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      deviceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-device');
      
      // Reset classes
      frameContainer.className = 'transition-all duration-300 relative mx-auto overflow-hidden';
      
      if (mode === 'desktop') {
        frameContainer.classList.add('device-desktop-frame');
      } else if (mode === 'tablet') {
        frameContainer.classList.add('device-tablet-frame');
      } else if (mode === 'mobile') {
        frameContainer.classList.add('device-mobile-frame');
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closePreviewModal);
  if (overlay) overlay.addEventListener('click', closePreviewModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closePreviewModal();
    }
  });
}

window.openClientPreview = function(clientKey) {
  const modal = document.getElementById('previewModal');
  const data = realClientsData[clientKey];
  if (!modal || !data) return;

  const titleEl = document.getElementById('modalClientTitle');
  const urlEl = document.getElementById('modalClientUrl');
  const liveLinkBtn = document.getElementById('modalLiveLinkBtn');
  const iframe = document.getElementById('previewIframe');
  const badgeEl = document.getElementById('modalClientBadge');

  if (titleEl) titleEl.innerText = currentLang === 'ar' ? data.name_ar : data.name_en;
  if (urlEl) urlEl.innerText = data.display_url;
  if (liveLinkBtn) liveLinkBtn.href = data.url;
  if (badgeEl) badgeEl.innerText = currentLang === 'ar' ? data.badge_ar : data.badge_en;

  if (iframe) {
    iframe.src = data.url;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closePreviewModal = function() {
  const modal = document.getElementById('previewModal');
  const iframe = document.getElementById('previewIframe');
  if (modal) modal.classList.remove('active');
  if (iframe) iframe.src = 'about:blank';
  document.body.style.overflow = '';
};

// ==========================================
// 5. Interactive ROAS Calculator
// ==========================================
const industryMultipliers = {
  ecom: { baseROAS: 5.2, leadCost: 4.5, profitMargin: 0.35 },
  b2b: { baseROAS: 5.8, leadCost: 14.0, profitMargin: 0.55 },
  realestate: { baseROAS: 6.2, leadCost: 28.0, profitMargin: 0.40 },
  coaching: { baseROAS: 5.4, leadCost: 10.0, profitMargin: 0.65 }
};

function initCalculator() {
  const spendSlider = document.getElementById('spendSlider');
  const industrySelect = document.getElementById('industrySelect');

  if (spendSlider && industrySelect) {
    spendSlider.addEventListener('input', updateCalculatorUI);
    industrySelect.addEventListener('change', updateCalculatorUI);
    updateCalculatorUI();
  }

  const applyBtn = document.getElementById('applyCalcBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const budgetVal = document.getElementById('spendSlider').value;
      const budgetSelect = document.getElementById('formBudget');
      if (budgetSelect) {
        if (budgetVal < 1000) budgetSelect.selectedIndex = 0;
        else if (budgetVal <= 3000) budgetSelect.selectedIndex = 1;
        else if (budgetVal <= 10000) budgetSelect.selectedIndex = 2;
        else budgetSelect.selectedIndex = 3;
      }
      
      const formSection = document.getElementById('contact');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('formName');
        if (nameInput) nameInput.focus();
      }
    });
  }
}

function updateCalculatorUI() {
  const spendSlider = document.getElementById('spendSlider');
  const industrySelect = document.getElementById('industrySelect');
  const spendDisplay = document.getElementById('spendDisplay');
  const roasDisplay = document.getElementById('calcROAS');
  const revDisplay = document.getElementById('calcRevenue');
  const leadsDisplay = document.getElementById('calcLeads');
  const profitDisplay = document.getElementById('calcProfit');

  if (!spendSlider || !industrySelect) return;

  const spend = parseFloat(spendSlider.value);
  const indKey = industrySelect.value;
  const config = industryMultipliers[indKey] || industryMultipliers.ecom;

  const spendK = spend / 1000;
  const calcROASVal = (config.baseROAS - (spendK * 0.02)).toFixed(1);
  const safeROAS = Math.max(3.6, parseFloat(calcROASVal));
  
  const estimatedRevenue = Math.round(spend * safeROAS);
  const estimatedLeads = Math.round(spend / config.leadCost);
  const estimatedProfit = Math.round((estimatedRevenue * config.profitMargin) - spend);

  if (spendDisplay) spendDisplay.innerText = `$${spend.toLocaleString()}`;
  if (roasDisplay) roasDisplay.innerText = `${safeROAS}x`;
  if (revDisplay) revDisplay.innerText = `$${estimatedRevenue.toLocaleString()}`;
  if (leadsDisplay) leadsDisplay.innerText = `+${estimatedLeads.toLocaleString()}`;
  if (profitDisplay) profitDisplay.innerText = `$${estimatedProfit.toLocaleString()}`;
}

// ==========================================
// 6. Animated Number Counters
// ==========================================
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(el => {
          const targetText = el.getAttribute('data-target');
          animateValue(el, targetText);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

function animateValue(el, targetStr) {
  const numMatch = targetStr.match(/[\d.]+/);
  if (!numMatch) return;

  const targetNum = parseFloat(numMatch[0]);
  const prefix = targetStr.startsWith('+') || targetStr.startsWith('$') ? targetStr.charAt(0) : (targetStr.startsWith('+$') ? '+$' : '');
  const suffix = targetStr.replace(/^[+$]+/, '').replace(/[\d.]+/, '');

  let start = 0;
  const duration = 1600;
  const startTime = performance.now();

  function step(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = (start + (targetNum - start) * easeOut);
    
    const formatted = targetNum % 1 !== 0 ? current.toFixed(1) : Math.floor(current).toString();
    el.innerText = `${prefix}${formatted}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.innerText = targetStr;
    }
  }

  requestAnimationFrame(step);
}

// ==========================================
// 7. Portfolio Tabs
// ==========================================
function initPortfolioTabs() {
  const tabs = document.querySelectorAll('.portfolio-tab');
  const items = document.querySelectorAll('.portfolio-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'flex';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = '1';
          }, 30);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================
// 8. FAQ Accordion
// ==========================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(other => {
        other.classList.remove('open');
        const content = other.querySelector('.faq-content');
        const icon = other.querySelector('.faq-icon');
        if (content) content.style.maxHeight = null;
        if (icon) icon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        item.classList.add('open');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// ==========================================
// 9. Lead Form & WhatsApp Direct
// ==========================================
function initForm() {
  const form = document.getElementById('consultationForm');
  const directWABtn = document.getElementById('directWhatsAppBtn');

  if (directWABtn) {
    directWABtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsAppMessage();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const brand = document.getElementById('formBrand').value.trim();
      const budget = document.getElementById('formBudget').value;
      const goal = document.getElementById('formGoal').value;
      const notes = document.getElementById('formNotes').value.trim();

      if (!name || !phone) {
        showToast(currentLang === 'ar' ? 'يرجى إدخال الاسم ورقم الواتساب' : 'Please enter your name and WhatsApp number', 'error');
        return;
      }

      const msg = `*طلب استشارة نمو جديدة من موقع Brands Factory 🚀*
----------------------------------
👤 *الاسم:* ${name}
📱 *رقم الواتساب:* ${phone}
🏢 *البراند / الموقع:* ${brand || 'غير محدد'}
💰 *الميزانية الشهرية:* ${budget}
🎯 *الهدف الأساسي:* ${goal}
📝 *ملاحظات:* ${notes || 'لا توجد'}
----------------------------------
🌐 مرسل عبر: brandsfactory.site`;

      const encodedMsg = encodeURIComponent(msg);
      const waURL = `https://wa.me/201015632296?text=${encodedMsg}`;

      showToast(
        currentLang === 'ar' ? 'تم استلام بياناتك بنجاح! جاري تحويلك إلى واتساب...' : 'Received! Redirecting to WhatsApp...',
        'success'
      );

      setTimeout(() => {
        window.open(waURL, '_blank');
      }, 700);

      form.reset();
    });
  }
}

function openWhatsAppMessage() {
  const defaultText = currentLang === 'ar' 
    ? 'مرحباً علي، أنا مهتم بخدمات Brands Factory وأرغب في حجز استشارة نمو لإعلاناتي ومشروعي.'
    : 'Hello Ali, I am interested in Brands Factory services and would like to schedule a growth strategy consultation for my brand.';
  
  const waURL = `https://wa.me/201015632296?text=${encodeURIComponent(defaultText)}`;
  window.open(waURL, '_blank');
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('bf-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'bf-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-20 opacity-0 flex items-center gap-3 font-semibold';
    document.body.appendChild(toast);
  }

  if (type === 'success') {
    toast.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    toast.style.color = '#FFFFFF';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-xl"></i> <span>${message}</span>`;
  } else {
    toast.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
    toast.style.color = '#FFFFFF';
    toast.innerHTML = `<i class="fa-solid fa-circle-exclamation text-xl"></i> <span>${message}</span>`;
  }

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 4000);
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

function initNavScroll() {
  const nav = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('shadow-2xl', 'bg-slate-950/95');
    } else {
      nav.classList.remove('shadow-2xl', 'bg-slate-950/95');
    }
  });
}
