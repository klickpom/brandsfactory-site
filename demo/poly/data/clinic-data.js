/* ============================================================
   ديمو مركز أمير التخصصي — بولي كلينك بنظام واحد لكل التخصصات
   منفصل عن ديمو الأسنان وديمو السكر
   ============================================================ */

const CLINIC_DATA = {

  clinic: {
    name: 'مركز أمير التخصصي',
    shortName: 'مركز أمير التخصصي',
    address: 'القاهرة الجديدة — بولي كلينك: باطنة · أطفال · نساء · عظام · جلدية · أسنان',
    hours: 'السبت – الخميس، 4:00 م – 10:00 م',
    friday: 'الجمعة إجازة',
    phoneDisplay: '0109 262 9424',
    phoneIntl: '201092629424',
    lat: 30.0204,
    lng: 31.4412,
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0204,31.4412&hl=ar',
    mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0204,31.4412+(مركز+أمير+التخصصي)&hl=ar&z=16&output=embed',
  },

  branches: [
    { id: 'im', name: 'الباطنة', short: 'باطنة', address: 'عيادة الباطنة — الدور الأول', lat: 30.0204, lng: 31.4412, mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0204,31.4412&hl=ar', mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0204,31.4412+(مركز+أمير)&hl=ar&z=16&output=embed' },
    { id: 'ped', name: 'الأطفال', short: 'أطفال', address: 'عيادة الأطفال — الدور الأول', lat: 30.0204, lng: 31.4412, mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0204,31.4412&hl=ar', mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0204,31.4412+(مركز+أمير)&hl=ar&z=16&output=embed' },
    { id: 'obgyn', name: 'النساء والتوليد', short: 'نساء', address: 'عيادة النساء والتوليد — الدور الثاني', lat: 30.0204, lng: 31.4412, mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0204,31.4412&hl=ar', mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0204,31.4412+(مركز+أمير)&hl=ar&z=16&output=embed' },
    { id: 'ortho', name: 'العظام', short: 'عظام', address: 'عيادة العظام — الدور الثاني', lat: 30.0204, lng: 31.4412, mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0204,31.4412&hl=ar', mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0204,31.4412+(مركز+أمير)&hl=ar&z=16&output=embed' },
    { id: 'derma', name: 'الجلدية', short: 'جلدية', address: 'عيادة الجلدية — الدور الأرضي', lat: 30.0204, lng: 31.4412, mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0204,31.4412&hl=ar', mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0204,31.4412+(مركز+أمير)&hl=ar&z=16&output=embed' },
    { id: 'dent', name: 'الأسنان', short: 'أسنان', address: 'عيادة الأسنان — الدور الأرضي', lat: 30.0204, lng: 31.4412, mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0204,31.4412&hl=ar', mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0204,31.4412+(مركز+أمير)&hl=ar&z=16&output=embed' },
  ],

  doctor: {
    name: 'محمد أمير',
    title: 'مؤسس ومدير مركز أمير التخصصي',
    initials: 'م',
    photo: '',
    photoAlt: 'محمد أمير — مركز أمير التخصصي',
    bio: 'بولي كلينك بنظام واحد لكل التخصصات: حجز المريض من الموقع أو واتساب أو التليفون، وملف واحد في لوحة التحكم بدل نظام منفصل لكل عيادة.',
    credentials: [
      'باطنة وأطفال',
      'نساء وتوليد',
      'عظام وجلدية',
      'أسنان',
      'لوحة واحدة لكل المركز',
    ],
  },

  stats: [
    { to: 6, suffix: '', label: 'تخصصات في مركز واحد' },
    { to: 1, suffix: '', label: 'نظام شامل لكل العيادات' },
    { to: 3, suffix: '', label: 'طرق حجز: تليفون · واتساب · موقع' },
  ],

  services: [
    { name: 'كشف واستشارة',   price: 'من 400 جنيه' },
    { name: 'متابعة',          price: 'من 300 جنيه' },
    { name: 'كشف أطفال',      price: 'من 350 جنيه' },
    { name: 'كشف نساء',       price: 'من 450 جنيه' },
    { name: 'كشف عظام',       price: 'من 400 جنيه' },
    { name: 'كشف أسنان',      price: 'من 400 جنيه' },
  ],

  slots: [
    { label: '4:00 م', h: 16 },
    { label: '5:00 م', h: 17 },
    { label: '6:00 م', h: 18 },
    { label: '7:00 م', h: 19 },
    { label: '8:00 م', h: 20 },
    { label: '9:00 م', h: 21 },
  ],

  offDays: [5],
  bookingWindowDays: 14,

  templates: {
    confirm:
`حجز جديد من الموقع ✅
رقم الحجز: {الرقم}
الاسم: {الاسم}
الموبايل: {الموبايل}
التخصص: {التخصص}
الخدمة: {الخدمة}
الميعاد: {اليوم} — {الوقت}`,
    reminder:
`أهلاً أ. {الاسم} 👋
تذكير بموعدك في مركز أمير التخصصي
📅 {اليوم} الساعة {الوقت}
🏥 {التخصص} — {الخدمة}

لو محتاج تأجيل أو إلغاء، ردّ على الرسالة دي وهنظبطلك ميعاد تاني.`,
    accept:
`أهلاً أ. {الاسم}
تم تأكيد موعدك في مركز أمير التخصصي
📅 {اليوم} الساعة {الوقت}
🏥 {التخصص} — {الخدمة}
رقم الحجز: {الرقم}

في انتظارك. لو حصل ظرف رد علينا هنا وهنظبطلك ميعاد تاني.`,
    followup:
`أهلاً أ. {الاسم} 👋
إزيك بعد كشف {الخدمة} في {التخصص}؟
لو محتاج متابعة أو تحويل لتخصص تاني داخل المركز، ردّ علينا هنا أو كلمنا على 0109 262 9424.`,
  },

  templateNames: {
    confirm: 'رسالة الحجز (من المريض للعيادة)',
    accept: 'تأكيد الموعد (من المركز للمريض)',
    reminder: 'تذكير بموعد (من المركز للمريض)',
    followup: 'متابعة بعد الكشف',
  },

  generateSeed(helpers) {
    const { addDays, iso, labelFor, isWorkingDay } = helpers;
    const branches = CLINIC_DATA.branches;
    const seedNum = Number(iso(new Date()).replace(/-/g, ''));
    let s = seedNum + 7;
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
    const br = (id) => branches.find(x => x.id === id) || pick(branches);

    const bookings = [];
    let counter = 2000;
    const mk = (date, slotH, status, opts = {}) => {
      const d = new Date(date);
      counter += 1 + Math.floor(rnd() * 3);
      const slot = CLINIC_DATA.slots.find(x => x.h === slotH) || CLINIC_DATA.slots[0];
      const branch = br(opts.branchId);
      return {
        id: 'p' + counter.toString(36) + Math.floor(rnd() * 999).toString(36),
        ref: 'B-' + counter,
        name: nextName(),
        phone: nextPhone(),
        service: svc(),
        date: iso(d),
        dayLabel: labelFor(d),
        time: slot.label,
        hour: slotH,
        status,
        branchId: branch.id,
        branchName: branch.name,
        remindedAt: opts.reminded ? '4:10 م' : null,
        createdAt: opts.createdAt || iso(addDays(d, -1)) + 'T10:00:00',
      };
    };

    const workingAhead = [];
    for (let i = 1; workingAhead.length < 10 && i < 20; i++) {
      const d = addDays(new Date(), i);
      if (isWorkingDay(d)) workingAhead.push(d);
    }

    const today = new Date();
    const nowH = today.getHours();
    const todayBoard = [
      { h: 16, status: nowH >= 17 ? 'done' : 'confirmed', branchId: 'im' },
      { h: 17, status: nowH >= 18 ? 'done' : 'new', branchId: 'ped', createdAt: iso(today) + 'T10:15:00' },
      { h: 19, status: nowH >= 20 ? 'done' : 'confirmed', branchId: 'obgyn', reminded: nowH < 20 },
      { h: 20, status: nowH >= 21 ? 'done' : 'confirmed', branchId: 'dent' },
    ];
    todayBoard.forEach(row => bookings.push(mk(today, row.h, row.status, row)));

    const t1 = workingAhead[0];
    bookings.push(mk(t1, 16, 'new',       { branchId: 'ortho', createdAt: iso(today) + 'T09:20:00' }));
    bookings.push(mk(t1, 17, 'confirmed', { branchId: 'derma', reminded: true }));
    bookings.push(mk(t1, 18, 'confirmed', { branchId: 'im' }));
    bookings.push(mk(t1, 20, 'new',       { branchId: 'ped', createdAt: iso(today) + 'T11:45:00' }));
    bookings.push(mk(t1, 21, 'confirmed', { branchId: 'obgyn' }));

    const t2 = workingAhead[1];
    bookings.push(mk(t2, 16, 'confirmed', { branchId: 'dent' }));
    bookings.push(mk(t2, 18, 'confirmed', { branchId: 'ortho' }));
    bookings.push(mk(t2, 20, 'confirmed', { branchId: 'im' }));

    const t3 = workingAhead[2];
    bookings.push(mk(t3, 17, 'confirmed', { branchId: 'derma' }));
    bookings.push(mk(t3, 19, 'new', { branchId: 'dent', createdAt: iso(today) + 'T13:05:00' }));
    bookings.push(mk(t3, 21, 'confirmed', { branchId: 'ped' }));

    [4, 5, 7, 9].forEach(i => {
      if (workingAhead[i]) bookings.push(mk(workingAhead[i], pick([16, 18, 20]), 'confirmed', { branchId: pick(branches).id }));
    });

    for (let back = 1; back <= 28; back++) {
      const d = addDays(today, -back);
      if (!isWorkingDay(d)) continue;
      const n = 1 + Math.floor(rnd() * 3);
      for (let k = 0; k < n; k++) {
        const r = rnd();
        const status = r < 0.78 ? 'done' : (r < 0.9 ? 'cancelled' : 'noshow');
        bookings.push(mk(d, pick(CLINIC_DATA.slots).h, status, {
          branchId: pick(branches).id,
          createdAt: iso(addDays(d, -1)) + 'T12:00:00',
        }));
      }
    }

    return bookings;
  },
};
