/* ============================================================
   ملف البيانات الرئيسي — كل محتوى الديمو في مكان واحد
   عدّل أي حاجة من هنا وهتتغير في الموقع كله
   ============================================================ */

const CLINIC_DATA = {

  clinic: {
    name: 'عيادة د. أحمد سليم لطب وتجميل الأسنان',
    shortName: 'عيادة د. أحمد سليم',
    address: '٦ ش التسعين الشمالي، التجمع الخامس، القاهرة الجديدة',
    hours: 'السبت – الخميس، 4:00 م – 11:00 م',
    friday: 'الجمعة إجازة',
    // رقم واتساب العيادة في الديمو = رقم الوكالة الحقيقي
    // عشان أي حجز تجريبي يوصلك فعلاً على واتساب وتحس بالتجربة كاملة
    phoneDisplay: '0109 262 9424',
    phoneIntl: '201092629424',
    lat: 30.0204,
    lng: 31.4412,
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0204,31.4412&hl=ar',
    mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0204,31.4412+(عيادة+د.+أحمد+سليم)&hl=ar&z=16&output=embed',
  },

  doctor: {
    name: 'د. أحمد سليم',
    title: 'استشاري طب وتجميل الأسنان',
    photo: 'assets/img/doctor.webp?v=21',
    photoAlt: 'د. أحمد سليم، استشاري طب وتجميل الأسنان',
    bio: 'بكالوريوس طب الفم والأسنان جامعة القاهرة، وماجستير التركيبات الثابتة. خبرة ١٤ سنة في علاج الجذور والتركيبات التجميلية، وبيمارس شغله بمبدأ واحد: المريض يفهم كل خطوة قبل ما تتعمل.',
    credentials: [
      'بكالوريوس طب الفم والأسنان — جامعة القاهرة',
      'ماجستير التركيبات الثابتة والتجميلية',
      'عضو الجمعية المصرية لطب الأسنان',
    ],
  },

  stats: [
    { to: 14,  suffix: '', label: 'سنة خبرة' },
    { to: 5200, suffix: '+', label: 'مريض تم علاجه' },
    { to: 98,  suffix: '%', label: 'نسبة رضا المرضى' },
  ],

  services: [
    { name: 'كشف واستشارة',        price: '400 جنيه' },
    { name: 'تنظيف وتلميع الأسنان', price: 'من 600 جنيه' },
    { name: 'حشو تجميلي',          price: 'من 900 جنيه' },
    { name: 'علاج عصب',            price: 'من 2,000 جنيه' },
    { name: 'تركيبات وزيركون',     price: 'من 3,500 جنيه' },
    { name: 'تقويم أسنان',         price: 'استشارة مجانية' },
    { name: 'خلع جراحي',           price: 'من 1,200 جنيه' },
    { name: 'ابتسامة هوليوود',     price: 'حسب الحالة' },
  ],

  // المواعيد المتاحة في اليوم — h هو الساعة بصيغة 24 عشان المقارنة
  slots: [
    { label: '4:00 م', h: 16 }, { label: '5:00 م', h: 17 },
    { label: '6:00 م', h: 18 }, { label: '7:00 م', h: 19 },
    { label: '8:00 م', h: 20 }, { label: '9:00 م', h: 21 },
    { label: '10:00 م', h: 22 },
  ],

  offDays: [5],           // الجمعة إجازة (5 = Friday في جافاسكربت)
  bookingWindowDays: 14,  // الحجز متاح لحد ١٤ يوم قدام

  // قوالب الرسايل — قابلة للتعديل من لوحة التحكم
  templates: {
    confirm:
`حجز جديد من الموقع ✅
رقم الحجز: {الرقم}
الاسم: {الاسم}
الموبايل: {الموبايل}
الخدمة: {الخدمة}
الميعاد: {اليوم} — {الوقت}`,
    reminder:
`أهلاً أ. {الاسم} 👋
تذكير بموعدك في عيادة د. أحمد سليم
📅 {اليوم} الساعة {الوقت}
🦷 {الخدمة}

لو محتاج تأجيل أو إلغاء، ردّ على الرسالة دي وهنظبطلك ميعاد تاني.`,
    accept:
`أهلاً أ. {الاسم}
تم تأكيد موعدك في عيادة د. أحمد سليم
📅 {اليوم} الساعة {الوقت}
🦷 {الخدمة}
رقم الحجز: {الرقم}

في انتظارك. لو حصل ظرف رد علينا هنا وهنظبطلك ميعاد تاني.`,
    followup:
`أهلاً أ. {الاسم} 👋
إزيك بعد جلسة {الخدمة}؟ نطمئن عليك.
لو حاسس بأي ألم أو تورم زيادة عن الطبيعي، ردّ علينا هنا أو كلمنا على 0109 262 9424.
مع تمنياتنا بالسلامة 🦷`,
  },

  templateNames: {
    confirm: 'رسالة الحجز (من المريض للعيادة)',
    accept: 'تأكيد الموعد (من العيادة للمريض)',
    reminder: 'تذكير بموعد (من العيادة للمريض)',
    followup: 'متابعة بعد الجلسة',
  },

  /* ============================================================
     توليد البيانات التجريبية — بتواريخ حقيقية نسبة لليوم الحالي
     بتتخزن أول مرة في المتصفح وتفضل ثابتة لحد ما تعمل إعادة تعيين
     ============================================================ */
  generateSeed(helpers) {
    const { addDays, iso, labelFor, isWorkingDay, slotLabel } = helpers;

    // مولّد أرقام شبه عشوائي ثابت لنفس اليوم — نفس البيانات على أي جهاز
    const seedNum = Number(iso(new Date()).replace(/-/g, ''));
    let s = seedNum;
    const rnd = () => { s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const pick = arr => arr[Math.floor(rnd() * arr.length)];

    const names = [
      'محمد سيد إبراهيم', 'أميرة حسن عبد الله', 'كريم مصطفى فؤاد', 'نورهان أحمد لطفي',
      'عمرو خالد الشناوي', 'سلمى وليد جاد', 'يوسف طارق منصور', 'هبة سامي رضوان',
      'مصطفى جمال الدين', 'دينا عصمت فخري', 'شريف عادل توفيق', 'مريم نبيل حنا',
      'طارق فؤاد رزق', 'سارة مجدي الألفي', 'حسام الدين عوض', 'رانيا سمير قطب',
      'باسم وجيه البنا', 'إيمان لطفي سرور', 'خالد رمزي شعبان', 'منى حازم الديب',
      'عبد الرحمن فتحي', 'حبيبة أشرف زكي', 'زياد وليد قنديل', 'ماجدة صلاح نور',
    ];
    const usedNames = new Set();
    const nextName = () => {
      let n = pick(names), guard = 0;
      while (usedNames.has(n) && guard++ < 50) n = pick(names);
      usedNames.add(n);
      return n;
    };
    const nextPhone = () => '01' + pick(['0', '1', '2', '5']) + String(10000000 + Math.floor(rnd() * 89999999));
    const svc = () => pick(CLINIC_DATA.services).name;

    const bookings = [];
    let counter = 1000;
    const mk = (date, slotH, status, opts = {}) => {
      const d = new Date(date);
      counter += 1 + Math.floor(rnd() * 3);
      const slot = CLINIC_DATA.slots.find(x => x.h === slotH) || CLINIC_DATA.slots[0];
      return {
        id: 'b' + counter.toString(36) + Math.floor(rnd() * 999).toString(36),
        ref: 'B-' + counter,
        name: nextName(),
        phone: nextPhone(),
        service: svc(),
        date: iso(d),
        dayLabel: labelFor(d),
        time: slot.label,
        hour: slotH,
        status,
        remindedAt: opts.reminded ? '4:10 م' : null,
        createdAt: opts.createdAt || iso(addDays(d, -1)) + 'T10:00:00',
      };
    };

    // أيام شغال قادمة
    const workingAhead = [];
    for (let i = 1; workingAhead.length < 10 && i < 20; i++) {
      const d = addDays(new Date(), i);
      if (isWorkingDay(d)) workingAhead.push(d);
    }

    // النهاردة دايماً في اللوحة — حتى لو الجمعة إجازة في الحجز العام
    // عشان الدكتور يفتح «جديدة» و«النهاردة» يلاقي يومه قدامه
    const today = new Date();
    const nowH = today.getHours();
    const todayBoard = [
      { h: 16, status: nowH >= 17 ? 'done' : 'confirmed' },
      { h: 17, status: nowH >= 18 ? 'done' : 'new', createdAt: iso(today) + 'T10:15:00' },
      { h: 20, status: nowH >= 21 ? 'done' : 'confirmed', reminded: nowH < 21 },
      { h: 21, status: nowH >= 22 ? 'done' : 'confirmed' },
    ];
    todayBoard.forEach(s => bookings.push(mk(today, s.h, s.status, {
      reminded: !!s.reminded,
      createdAt: s.createdAt,
    })));

    // بكرة (أول يوم شغال جاي): ٧ مواعيد — ٢ جداد من الموقع
    const t1 = workingAhead[0];
    bookings.push(mk(t1, 16, 'new',       { createdAt: iso(today) + 'T09:20:00' }));
    bookings.push(mk(t1, 17, 'confirmed', { reminded: true }));
    bookings.push(mk(t1, 18, 'confirmed'));
    bookings.push(mk(t1, 19, 'confirmed', { reminded: true }));
    bookings.push(mk(t1, 20, 'confirmed'));
    bookings.push(mk(t1, 21, 'new',       { createdAt: iso(today) + 'T11:45:00' }));
    bookings.push(mk(t1, 22, 'confirmed'));

    // بعد بكرة: ٤
    const t2 = workingAhead[1];
    [16, 18, 19, 21].forEach(h => bookings.push(mk(t2, h, 'confirmed')));

    // تالت يوم: ٣ (واحد جديد)
    const t3 = workingAhead[2];
    bookings.push(mk(t3, 17, 'confirmed'));
    bookings.push(mk(t3, 19, 'new', { createdAt: iso(today) + 'T13:05:00' }));
    bookings.push(mk(t3, 21, 'confirmed'));

    // مواعيد متفرقة الأسبوعين الجايين
    [4, 5, 7, 9].forEach(i => {
      if (workingAhead[i]) bookings.push(mk(workingAhead[i], pick([16, 18, 20]), 'confirmed'));
    });

    // تاريخ الشهر اللي فات — عشان التقارير والمرضى
    for (let back = 1; back <= 28; back++) {
      const d = addDays(today, -back);
      if (!isWorkingDay(d)) continue;
      const n = 1 + Math.floor(rnd() * 3);
      for (let k = 0; k < n; k++) {
        const r = rnd();
        const status = r < 0.78 ? 'done' : (r < 0.9 ? 'cancelled' : 'noshow');
        bookings.push(mk(d, pick(CLINIC_DATA.slots).h, status, { createdAt: iso(addDays(d, -1)) + 'T12:00:00' }));
      }
    }

    return bookings;
  },
};
