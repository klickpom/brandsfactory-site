/* ============================================================
   ديمو عيادة الهرم للباطنة والأطفال — منفصل عن باقي الديموهات
   دكتورين زائرين · حجز واتساب فقط · الهرم، الجيزة
   ============================================================ */

const CLINIC_DATA = {

  clinic: {
    name: 'عيادة الهرم للباطنة والأطفال',
    shortName: 'عيادة الهرم',
    address: 'الهرم، الجيزة — باطنة عامة وأطفال',
    hours: 'السبت – الخميس حسب جدول الزيارة، 5:00 م – 9:00 م',
    friday: 'الجمعة إجازة',
    phoneDisplay: '0109 262 9424',
    phoneIntl: '201092629424',
    lat: 29.9972,
    lng: 31.1393,
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=29.9972,31.1393&hl=ar',
    mapsEmbedUrl: 'https://maps.google.com/maps?q=29.9972,31.1393+(عيادة+الهرم)&hl=ar&z=16&output=embed',
  },

  branches: [
    {
      id: 'im',
      name: 'باطنة عامة',
      short: 'باطنة',
      doctor: 'دكتور زائر',
      initials: 'ب',
      days: [6, 1, 3],
      daysLabel: 'السبت · الاثنين · الأربعاء',
      address: 'دكتور زائر — السبت · الاثنين · الأربعاء',
      lat: 29.9972,
      lng: 31.1393,
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=29.9972,31.1393&hl=ar',
      mapsEmbedUrl: 'https://maps.google.com/maps?q=29.9972,31.1393+(عيادة+الهرم)&hl=ar&z=16&output=embed',
    },
    {
      id: 'ped',
      name: 'الأطفال',
      short: 'أطفال',
      doctor: 'دكتور زائر',
      initials: 'ط',
      days: [0, 2, 4],
      daysLabel: 'الأحد · الثلاثاء · الخميس',
      address: 'دكتور زائر — الأحد · الثلاثاء · الخميس',
      lat: 29.9972,
      lng: 31.1393,
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=29.9972,31.1393&hl=ar',
      mapsEmbedUrl: 'https://maps.google.com/maps?q=29.9972,31.1393+(عيادة+الهرم)&hl=ar&z=16&output=embed',
    },
  ],

  doctor: {
    name: 'عيادة الهرم',
    title: 'باطنة عامة وأطفال — دكتورين زائرين',
    initials: 'ه',
    photo: '',
    photoAlt: 'عيادة الهرم للباطنة والأطفال',
    bio: 'عيادة في الهرم، الجيزة: باطنة عامة وأطفال، بدكتورين زائرين. المريض يحجز من الموقع أو واتساب — من غير مكالمة تليفون. الصفحة جاهزة لإعلان ممول.',
    credentials: [
      'باطنة عامة',
      'أطفال',
      'دكتورين زائرين',
      'حجز واتساب فقط',
    ],
  },

  stats: [
    { to: 2, suffix: '', label: 'دكاترة زائرين' },
    { to: 1, suffix: '', label: 'حجز واتساب — من غير تليفون' },
    { to: 1, suffix: '', label: 'موقع جاهز لإعلان ممول' },
  ],

  services: [
    { name: 'كشف باطنة عامة', price: 'من 400 جنيه' },
    { name: 'متابعة باطنة',   price: 'من 300 جنيه' },
    { name: 'كشف أطفال',     price: 'من 350 جنيه' },
    { name: 'متابعة أطفال',   price: 'من 250 جنيه' },
  ],

  slots: [
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
العيادة: {التخصص}
الخدمة: {الخدمة}
الميعاد: {اليوم} — {الوقت}`,
    reminder:
`أهلاً أ. {الاسم} 👋
تذكير بموعدك في عيادة الهرم
📅 {اليوم} الساعة {الوقت}
🏥 {التخصص} — {الخدمة}

لو محتاج تأجيل أو إلغاء، ردّ على الرسالة دي وهنظبطلك ميعاد تاني.`,
    accept:
`أهلاً أ. {الاسم}
تم تأكيد موعدك في عيادة الهرم — الهرم، الجيزة
📅 {اليوم} الساعة {الوقت}
🏥 {التخصص} — {الخدمة}
رقم الحجز: {الرقم}

في انتظارك. لو حصل ظرف رد علينا هنا على واتساب.`,
    followup:
`أهلاً أ. {الاسم} 👋
إزيك بعد كشف {الخدمة} في {التخصص}؟
لو محتاج متابعة، ردّ علينا هنا على واتساب.`,
  },

  templateNames: {
    confirm: 'رسالة الحجز (من المريض للعيادة)',
    accept: 'تأكيد الموعد (من العيادة للمريض)',
    reminder: 'تذكير بموعد (من العيادة للمريض)',
    followup: 'متابعة بعد الكشف',
  },

  generateSeed(helpers) {
    const { addDays, iso, labelFor, isWorkingDay } = helpers;
    const branches = CLINIC_DATA.branches;
    const seedNum = Number(iso(new Date()).replace(/-/g, ''));
    let s = seedNum + 11;
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
    const svcFor = (id) => id === 'ped'
      ? pick(['كشف أطفال', 'متابعة أطفال'])
      : pick(['كشف باطنة عامة', 'متابعة باطنة']);
    const br = (id) => branches.find(x => x.id === id) || pick(branches);

    const bookings = [];
    let counter = 2000;
    const mk = (date, slotH, status, opts = {}) => {
      const d = new Date(date);
      counter += 1 + Math.floor(rnd() * 3);
      const slot = CLINIC_DATA.slots.find(x => x.h === slotH) || CLINIC_DATA.slots[0];
      const branch = br(opts.branchId);
      return {
        id: 'h' + counter.toString(36) + Math.floor(rnd() * 999).toString(36),
        ref: 'B-' + counter,
        name: nextName(),
        phone: nextPhone(),
        service: svcFor(branch.id),
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

    const daysFor = (id, n) => {
      const out = [];
      for (let i = 0; out.length < n && i < 40; i++) {
        const d = addDays(new Date(), i);
        if (isWorkingDay(d, id)) out.push(d);
      }
      return out;
    };

    const today = new Date();
    const nowH = today.getHours();
    const todayId = isWorkingDay(today, 'im') ? 'im' : (isWorkingDay(today, 'ped') ? 'ped' : null);
    if (todayId) {
      [
        { h: 17, status: nowH >= 18 ? 'done' : 'confirmed' },
        { h: 18, status: nowH >= 19 ? 'done' : 'new', createdAt: iso(today) + 'T10:15:00' },
        { h: 20, status: nowH >= 21 ? 'done' : 'confirmed', reminded: nowH < 21 },
      ].forEach(row => bookings.push(mk(today, row.h, row.status, { branchId: todayId, ...row })));
    }

    const imAhead = daysFor('im', 4).filter(d => iso(d) !== iso(today));
    const pedAhead = daysFor('ped', 4).filter(d => iso(d) !== iso(today));
    if (imAhead[0]) {
      bookings.push(mk(imAhead[0], 17, 'new', { branchId: 'im', createdAt: iso(today) + 'T09:20:00' }));
      bookings.push(mk(imAhead[0], 19, 'confirmed', { branchId: 'im' }));
    }
    if (imAhead[1]) bookings.push(mk(imAhead[1], 18, 'confirmed', { branchId: 'im' }));
    if (pedAhead[0]) {
      bookings.push(mk(pedAhead[0], 17, 'new', { branchId: 'ped', createdAt: iso(today) + 'T11:45:00' }));
      bookings.push(mk(pedAhead[0], 20, 'confirmed', { branchId: 'ped' }));
    }
    if (pedAhead[1]) bookings.push(mk(pedAhead[1], 19, 'confirmed', { branchId: 'ped' }));
    if (pedAhead[2]) bookings.push(mk(pedAhead[2], 18, 'new', { branchId: 'ped', createdAt: iso(today) + 'T13:05:00' }));

    for (let back = 1; back <= 28; back++) {
      const d = addDays(today, -back);
      const id = isWorkingDay(d, 'im') ? 'im' : (isWorkingDay(d, 'ped') ? 'ped' : null);
      if (!id) continue;
      const n = 1 + Math.floor(rnd() * 2);
      for (let k = 0; k < n; k++) {
        const r = rnd();
        const status = r < 0.78 ? 'done' : (r < 0.9 ? 'cancelled' : 'noshow');
        bookings.push(mk(d, pick(CLINIC_DATA.slots).h, status, {
          branchId: id,
          createdAt: iso(addDays(d, -1)) + 'T12:00:00',
        }));
      }
    }

    return bookings;
  },
};
