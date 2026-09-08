/* ============================================================
   النواة المشتركة — إدارة الباقات، القفل، واتساب، شريط العميل
   كل الحالة في localStorage بنطاق bf_clinic_demo_*
   ============================================================ */

const BF = (() => {
  const NS = 'bf_clinic_demo_';
  const MODES = ['basic', 'plus', 'center'];
  const TIER_ORDER = { basic: 0, plus: 1, center: 2 };

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

  /* ---------- الباقة الحالية ---------- */
  function modeFromHash() {
    const h = location.hash.replace('#', '').trim();
    return MODES.includes(h) ? h : null;
  }

  function getMode() {
    return modeFromHash() || store.get('mode', 'basic');
  }

  function setMode(mode) {
    if (!MODES.includes(mode)) return;
    store.set('mode', mode);
    history.replaceState(null, '', '#' + mode);
    renderSwitcher();
    renderLeadBar();
    if (typeof window.renderPage === 'function') window.renderPage();
  }

  function canUse(tier) {
    return TIER_ORDER[getMode()] >= TIER_ORDER[tier];
  }

  /* ---------- واتساب ---------- */
  function waLink(phone, message) {
    const digits = phone.replace(/\D/g, '').replace(/^0/, '20'); // 0100... ← 20100...
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  }

  /* ---------- الوقت بصيغة مصرية ---------- */
  function nowEgyptian() {
    const d = new Date();
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const suffix = h >= 12 ? 'م' : 'ص';
    h = h % 12 || 12;
    return `${h}:${m} ${suffix}`;
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
    return tpl.replace(/\{([^{}]+)\}/g, (_, k) =>
      ({ 'الاسم': vars.name, 'اليوم': vars.day, 'التاريخ': vars.date,
         'الوقت': vars.time, 'الخدمة': vars.service, 'الموبايل': vars.phone }[k.trim()] ?? `{${k}}`));
  }

  /* ---------- التذكيرات ---------- */
  function getReminders() { return store.get('reminders', {}); }
  function markReminded(id) {
    const r = getReminders();
    r[id] = nowEgyptian();
    store.set('reminders', r);
  }
  function isReminded(appt) {
    const r = getReminders();
    if (appt.id in r) return r[appt.id];
    // الصفوف اللي بتبدأ متذكَّرة من ملف البيانات
    return appt.reminded ? '4:10 م' : null;
  }
  function resetReminders() { store.set('reminders', {}); }

  /* ---------- الصلاحيات ---------- */
  function getRole() { return store.get('role', 'manager'); }
  function setRole(role) { store.set('role', role); }

  /* ---------- شارة القفل ---------- */
  const LOCK_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

  /* ---------- شيت المزية المقفولة ---------- */
  const LOCK_COPY = {
    panel:    { tier: 'plus',   title: 'لوحة التحكم',        desc: 'لوحة كاملة تدير بيها مواعيدك ومرضاك ورسايلك من مكان واحد.' },
    reminder: { tier: 'plus',   title: 'تذكير الواتساب',      desc: 'تذكير المريض بضغطة واحدة من رقم عيادتك.' },
    patients: { tier: 'plus',   title: 'قائمة المرضى',        desc: 'كل مرضاك بأرقامهم ومواعيدهم، وبحث فوري أثناء الكتابة.' },
    templates:{ tier: 'plus',   title: 'قوالب الرسايل',       desc: 'قوالب جاهزة للتذكير والتأكيد والمتابعة، تعدّلها زي ما تحب.' },
    doctors:  { tier: 'center', title: 'تعدد الأطباء',        desc: 'كل دكتور في المركز له جدوله، وفلترة فورية بينهم.' },
    reports:  { tier: 'center', title: 'التقارير',            desc: 'أرقام واضحة: المواعيد الأسبوعية، نسبة الغياب، وأكثر الساعات زحمة.' },
    roles:    { tier: 'center', title: 'الصلاحيات',           desc: 'مدير يشوف كل حاجة، وسكرتارية تشوف المواعيد بس من غير أرقام.' },
    payment:  { tier: 'center', title: 'الدفع أونلاين',       desc: 'المريض يدفع عربون أو الكشف كله وهو بيحجز من موبايله.' },
  };

  function ensureSheet() {
    if (document.getElementById('bf-sheet')) return;
    const overlay = document.createElement('div');
    overlay.className = 'sheet-overlay';
    overlay.id = 'bf-sheet-overlay';
    const sheet = document.createElement('div');
    sheet.className = 'sheet';
    sheet.id = 'bf-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    document.body.append(overlay, sheet);
    overlay.addEventListener('click', closeSheet);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
  }

  function showLock(featureKey) {
    const copy = LOCK_COPY[featureKey];
    if (!copy) return;
    if (canUse(copy.tier)) return; // المزية متاحة أصلاً
    ensureSheet();
    const tierLabel = CLINIC_DATA.tiers[copy.tier].label;
    const sheet = document.getElementById('bf-sheet');
    sheet.innerHTML = `
      <div class="grabber" aria-hidden="true"></div>
      <h3>المزية دي في باقة ${tierLabel}</h3>
      <p>${copy.title} — ${copy.desc}</p>
      <div class="sheet-actions">
        <button class="btn btn-primary btn-block" id="bf-sheet-try">جرّبها دلوقتي</button>
        <button class="sheet-close" id="bf-sheet-close">لأ، كمّل في الباقة الحالية</button>
      </div>`;
    document.getElementById('bf-sheet-overlay').classList.add('open');
    sheet.classList.add('open');
    document.getElementById('bf-sheet-try').addEventListener('click', () => {
      setMode(copy.tier);
      closeSheet();
      // إعادة فتح نفس الشاشة بعد تغيير الباقة
      const target = document.querySelector(`[data-feature="${featureKey}"]`);
      if (target) target.scrollIntoView({ block: 'center' });
    });
    document.getElementById('bf-sheet-close').addEventListener('click', closeSheet);
    document.getElementById('bf-sheet-try').focus();
  }

  function closeSheet() {
    const o = document.getElementById('bf-sheet-overlay');
    const s = document.getElementById('bf-sheet');
    if (o) o.classList.remove('open');
    if (s) s.classList.remove('open');
  }

  /* ---------- مبدّل الباقات ---------- */
  function renderSwitcher() {
    const host = document.getElementById('bf-switcher');
    if (!host) return;
    const mode = getMode();
    host.innerHTML = `
      <span class="demo-badge">نموذج تجريبي</span>
      <div class="switcher-pills" role="group" aria-label="اختيار الباقة">
        ${MODES.map(m => `
          <button class="switcher-pill" data-mode="${m}" aria-pressed="${m === mode}">
            ${CLINIC_DATA.tiers[m].label}
            <small>${CLINIC_DATA.tiers[m].price}</small>
          </button>`).join('')}
      </div>`;
    host.querySelectorAll('.switcher-pill').forEach(btn =>
      btn.addEventListener('click', () => setMode(btn.dataset.mode)));
  }

  /* ---------- شريط العميل ---------- */
  function renderLeadBar() {
    const host = document.getElementById('bf-leadbar');
    if (!host) return;
    const label = CLINIC_DATA.tiers[getMode()].label;
    const msg = `مهتم بباقة ${label} للعيادة بتاعتي`;
    host.innerHTML = `
      <span><b>عاجبك؟</b> اعمل واحد زي ده لعيادتك</span>
      <a class="lead-cta" href="${waLink(CLINIC_DATA.OWNER_WHATSAPP, msg)}" target="_blank" rel="noopener">كلّمني على واتساب</a>`;
  }

  /* ---------- إعادة تعيين ---------- */
  function resetAll() {
    store.clearAll();
    location.hash = '';
    location.reload();
  }

  /* ---------- تشغيل ---------- */
  function boot() {
    const mode = modeFromHash();
    if (mode) store.set('mode', mode); // لو جاي برابط فيه باقة محددة
    else history.replaceState(null, '', '#' + getMode());
    renderSwitcher();
    renderLeadBar();
  }

  return {
    MODES, TIER_ORDER, store,
    getMode, setMode, canUse,
    waLink, nowEgyptian,
    getTemplates, saveTemplate, fillTemplate,
    getReminders, markReminded, isReminded, resetReminders,
    getRole, setRole,
    showLock, closeSheet, LOCK_ICON,
    renderSwitcher, renderLeadBar,
    resetAll, boot,
  };
})();

document.addEventListener('DOMContentLoaded', BF.boot);
