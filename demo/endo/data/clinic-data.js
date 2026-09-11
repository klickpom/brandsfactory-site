/* ============================================================
   ديمو استشاري السكر والغدد — نسخة منفصلة عن ديمو الأسنان
   الاسم والصورة يتظبطوا لما الدكتور يبعتهم
   ============================================================ */

const CLINIC_DATA = {

  clinic: {
    name: 'عيادة استشاري السكر والغدد',
    shortName: 'عيادة استشاري السكر والغدد',
    address: '٣ فروع في القاهرة: التجمع الخامس · رمسيس · مصر الجديدة',
    hours: 'السبت – الخميس، 5:00 م – 9:00 م',
    friday: 'الجمعة إجازة',
    phoneDisplay: '0109 262 9424',
    phoneIntl: '201092629424',
    lat: 30.0204,
    lng: 31.4412,
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0204,31.4412&hl=ar',
    mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0204,31.4412+(عيادة+استشاري+السكر)&hl=ar&z=16&output=embed',
  },

  branches: [
    {
      id: 'tagamoa',
      name: 'التجمع الخامس',
      short: 'التجمع',
      address: 'التجمع الخامس، القاهرة الجديدة',
      lat: 30.0204,
      lng: 31.4412,
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0204,31.4412&hl=ar',
      mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0204,31.4412+(فرع+التجمع)&hl=ar&z=16&output=embed',
    },
    {
      id: 'ramses',
      name: 'رمسيس',
      short: 'رمسيس',
      address: 'رمسيس، وسط البلد، القاهرة',
      lat: 30.0626,
      lng: 31.2470,
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0626,31.2470&hl=ar',
      mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0626,31.2470+(فرع+رمسيس)&hl=ar&z=16&output=embed',
    },
    {
      id: 'heliopolis',
      name: 'مصر الجديدة',
      short: 'مصر الجديدة',
      address: 'مصر الجديدة، القاهرة',
      lat: 30.0911,
      lng: 31.3244,
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.0911,31.3244&hl=ar',
      mapsEmbedUrl: 'https://maps.google.com/maps?q=30.0911,31.3244+(فرع+مصر+الجديدة)&hl=ar&z=16&output=embed',
    },
  ],

  doctor: {
    name: 'الاستشاري',
    title: 'استشاري السكر والسمنة والغدد والقدم السكري والتغذية العلاجية',
    initials: 'س',
    photo: '',
    photoAlt: 'استشاري السكر والغدد',
    bio: 'متابعة السكر والسمنة والغدد والقدم السكري والتغذية العلاجية من أول الكشف لحد ضبط الخطة. الحجز من التليفون أو واتساب أو الموقع، على ٣ فروع في القاهرة.',
    credentials: [
      'سكر ومتابعة',
      'سمنة ونقص الوزن',
      'غدد صماء',
      'قدم سكري',
      'تغذية علاجية',
    ],
  },

  stats: [
    { to: 3, suffix: '', label: 'فروع في القاهرة' },
    { to: 3, suffix: '', label: 'طرق حجز: تليفون · واتساب · موقع' },
    { to: 1, suffix: '', label: 'استشاري يتابع الحالة' },
  ],

  services: [
    { name: 'كشف سكر ومتابعة',     price: 'من 500 جنيه' },
    { name: 'سمنة ونقص الوزن',      price: 'من 600 جنيه' },
    { name: 'غدد صماء',             price: 'من 500 جنيه' },
    { name: 'قدم سكري',             price: 'من 500 جنيه' },
    { name: 'تغذية علاجية',         price: 'من 400 جنيه' },
    { name: 'متابعة سكر تراكمي',    price: 'من 400 جنيه' },
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
الخدمة: {الخدمة}
الفرع: {الفرع}
الميعاد: {اليوم} — {الوقت}`,
    reminder:
`أهلاً أ. {الاسم} 👋
تذكير بموعدك في عيادة استشاري السكر والغدد
📅 {اليوم} الساعة {الوقت}
📍 فرع {الفرع}
🩺 {الخدمة}

لو محتاج تأجيل أو إلغاء، ردّ على الرسالة دي وهنظبطلك ميعاد تاني.`,
    accept:
`أهلاً أ. {الاسم}
تم تأكيد موعدك في عيادة استشاري السكر والغدد
📅 {اليوم} الساعة {الوقت}
📍 فرع {الفرع}
🩺 {الخدمة}
رقم الحجز: {الرقم}

في انتظارك. لو حصل ظرف رد علينا هنا وهنظبطلك ميعاد تاني.`,
    followup:
`أهلاً أ. {الاسم} 👋
إزيك بعد كشف {الخدمة}؟ نطمئن على المتابعة.
لو محتاج تعديل في الخطة أو تحليل، ردّ علينا هنا أو كلمنا على 0109 262 9424.`,
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
    const br = (id) => branches.find(x => x.id === id) || pick(branches);

    const bookings = [];
    let counter = 1000;
    const mk = (date, slotH, status, opts = {}) => {
      const d = new Date(date);
      counter += 1 + Math.floor(rnd() * 3);
      const slot = CLINIC_DATA.slots.find(x => x.h === slotH) || CLINIC_DATA.slots[0];
      const branch = br(opts.branchId);
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
      { h: 17, status: nowH >= 18 ? 'done' : 'confirmed', branchId: 'tagamoa' },
      { h: 18, status: nowH >= 19 ? 'done' : 'new', branchId: 'ramses', createdAt: iso(today) + 'T10:15:00' },
      { h: 20, status: nowH >= 21 ? 'done' : 'confirmed', branchId: 'heliopolis', reminded: nowH < 21 },
      { h: 21, status: nowH >= 22 ? 'done' : 'confirmed', branchId: 'tagamoa' },
    ];
    todayBoard.forEach(row => bookings.push(mk(today, row.h, row.status, row)));

    const t1 = workingAhead[0];
    bookings.push(mk(t1, 17, 'new',       { branchId: 'tagamoa', createdAt: iso(today) + 'T09:20:00' }));
    bookings.push(mk(t1, 18, 'confirmed', { branchId: 'ramses', reminded: true }));
    bookings.push(mk(t1, 19, 'confirmed', { branchId: 'heliopolis' }));
    bookings.push(mk(t1, 20, 'new',       { branchId: 'ramses', createdAt: iso(today) + 'T11:45:00' }));
    bookings.push(mk(t1, 21, 'confirmed', { branchId: 'tagamoa' }));

    const t2 = workingAhead[1];
    bookings.push(mk(t2, 17, 'confirmed', { branchId: 'heliopolis' }));
    bookings.push(mk(t2, 19, 'confirmed', { branchId: 'tagamoa' }));
    bookings.push(mk(t2, 20, 'confirmed', { branchId: 'ramses' }));

    const t3 = workingAhead[2];
    bookings.push(mk(t3, 18, 'confirmed', { branchId: 'tagamoa' }));
    bookings.push(mk(t3, 19, 'new', { branchId: 'heliopolis', createdAt: iso(today) + 'T13:05:00' }));
    bookings.push(mk(t3, 21, 'confirmed', { branchId: 'ramses' }));

    [4, 5, 7, 9].forEach(i => {
      if (workingAhead[i]) bookings.push(mk(workingAhead[i], pick([17, 19, 20]), 'confirmed', { branchId: pick(branches).id }));
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
