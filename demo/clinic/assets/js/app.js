/* ============================================================
   النواة المشتركة — قاعدة بيانات الديمو (localStorage)
   الحجوزات بتتخزن فعلاً، وأي تغيير بيحدّث الصفحات التانية لحظياً
   ============================================================ */

const BF = (() => {
  const NS = 'bfc_';

  /* ---------- التخزين ---------- */
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(NS + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch {}
    },
    clearAll() {
      Object.keys(localStorage)
        .filter(k => k.startsWith(NS))
        .forEach(k => localStorage.removeItem(k));
    },
  };

  /* ---------- تواريخ عربية ---------- */
  const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  function iso(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function fromIso(s) {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  function addDays(d, n) {
    const x = new Date(d); x.setDate(x.getDate() + n); return x;
  }
  function labelFor(d) {
    return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
  }
  function isWorkingDay(d) {
    return !CLINIC_DATA.offDays.includes(d.getDay());
  }
  function slotLabel(h) {
    const s = CLINIC_DATA.slots.find(x => x.h === h);
    return s ? s.label : '';
  }

  function nowEgyptian() {
    const d = new Date();
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const suffix = h >= 12 ? 'م' : 'ص';
    h = h % 12 || 12;
    return `${h}:${m} ${suffix}`;
  }

  /* ---------- الحجوزات ---------- */
  function seedIfNeeded() {
    let b = store.get('bookings', null);
    if (!b) {
      b = CLINIC_DATA.generateSeed({ addDays, iso, labelFor, isWorkingDay, slotLabel });
      store.set('bookings', b);
    }
    return b;
  }

  function getBookings() { return seedIfNeeded(); }

  function saveBookings(arr) {
    store.set('bookings', arr);
    emit();
  }

  function addBooking(b) {
    const arr = getBookings();
    arr.push(b);
    saveBookings(arr);
    return b;
  }

  function patchBooking(id, patch) {
    const arr = getBookings();
    const i = arr.findIndex(x => x.id === id);
    if (i === -1) return null;
    Object.assign(arr[i], patch);
    saveBookings(arr);
    return arr[i];
  }

  function getBooking(id) {
    return getBookings().find(x => x.id === id) || null;
  }

  function nextRef() {
    const n = store.get('refCounter', 2000) + 1;
    store.set('refCounter', n);
    return 'B-' + n;
  }

  /* ---------- المواعيد المتاحة ---------- */
  function nextWorkingDays(count) {
    const out = [];
    for (let i = 0; out.length < count && i < count * 2 + 7; i++) {
      const d = addDays(new Date(), i);
      if (isWorkingDay(d)) out.push(d);
    }
    return out;
  }

  function isSlotTaken(dateIso, timeLabel) {
    return getBookings().some(b =>
      b.date === dateIso && b.time === timeLabel &&
      b.status !== 'cancelled' && b.status !== 'noshow');
  }

  function isSlotPassed(date, hour) {
    const now = new Date();
    if (iso(date) !== iso(now)) return false;
    return hour <= now.getHours();
  }

  function slotsForDate(date) {
    const dIso = iso(date);
    return CLINIC_DATA.slots.map(s => ({
      ...s,
      taken: isSlotTaken(dIso, s.label),
      passed: isSlotPassed(date, s.h),
    }));
  }

  function nextFreeSlots(limit) {
    const out = [];
    for (const d of nextWorkingDays(CLINIC_DATA.bookingWindowDays)) {
      for (const s of slotsForDate(d)) {
        if (s.taken || s.passed) continue;
        out.push({ dateIso: iso(d), label: labelFor(d), time: s.label, h: s.h });
        if (out.length >= limit) return out;
      }
    }
    return out;
  }

  /* ---------- واتساب ---------- */
  function waLink(phone, message) {
    let digits = String(phone).replace(/\D/g, '');
    if (digits.startsWith('0020')) digits = digits.slice(2);
    else if (digits.startsWith('0')) digits = '20' + digits.slice(1);
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  }

  /* ---------- القوالب ---------- */
  function getTemplates() {
    return Object.assign({}, CLINIC_DATA.templates, store.get('templates', {}));
  }
  function saveTemplate(key, value) {
    const t = store.get('templates', {});
    t[key] = value;
    store.set('templates', t);
  }
  function fillTemplate(tpl, vars) {
    return tpl.replace(/\{([^{}]+)\}/g, (_, k) => ({
      'الاسم': vars.name, 'اليوم': vars.day, 'التاريخ': vars.date,
      'الوقت': vars.time, 'الخدمة': vars.service, 'الموبايل': vars.phone,
      'الرقم': vars.ref,
    }[k.trim()] ?? `{${k}}`));
  }

  /* ---------- الأحداث — تحديث لحظي بين التبويبات ---------- */
  const listeners = new Set();
  function emit() { listeners.forEach(fn => { try { fn(); } catch {} }); }
  function onChange(fn) {
    listeners.add(fn);
  }
  window.addEventListener('storage', e => {
    if (e.key && e.key.startsWith(NS)) emit();
  });

  /* ---------- حالات الحجز ---------- */
  const STATUS = {
    new:       { label: 'جديد',      cls: 'st-new' },
    confirmed: { label: 'مؤكد',      cls: 'st-confirmed' },
    done:      { label: 'تم الحضور', cls: 'st-done' },
    cancelled: { label: 'ملغي',      cls: 'st-cancelled' },
    noshow:    { label: 'لم يحضر',   cls: 'st-noshow' },
  };

  /* ---------- إعادة تعيين ---------- */
  function resetAll() {
    store.clearAll();
    location.reload();
  }

  /* ---------- تشغيل ---------- */
  function boot() { seedIfNeeded(); }

  return {
    store,
    iso, fromIso, addDays, labelFor, isWorkingDay, slotLabel, nowEgyptian,
    DAYS, MONTHS,
    getBookings, addBooking, patchBooking, getBooking, nextRef,
    nextWorkingDays, slotsForDate, nextFreeSlots, isSlotTaken,
    waLink,
    getTemplates, saveTemplate, fillTemplate,
    onChange, emit,
    STATUS,
    resetAll, boot,
  };
})();

document.addEventListener('DOMContentLoaded', BF.boot);
