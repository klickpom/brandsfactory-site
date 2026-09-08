/* ============================================================
   لوحة التحكم — مواعيد بكرة، المرضى، القوالب، التقارير
   ============================================================ */

(function () {
  const D = CLINIC_DATA;
  const root = () => document.getElementById('panel-root');
  const live = () => document.getElementById('live-region');

  let activeTab = 'tomorrow';   // tomorrow | patients | templates | reports
  let activeDoctor = 'all';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function announce(msg) { live().textContent = msg; }

  /* ============================================================
     بوابة القفل (باقة عيادة)
     ============================================================ */
  function renderGate() {
    document.getElementById('role-zone').innerHTML = '';
    root().innerHTML = `
      <div class="gate">
        <div class="gate-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <h2>لوحة التحكم متاحة من باقة عيادة+</h2>
        <p>اللي شايفه قدامك ده موقع العيادة بس. الباقة الأعلى بتضيف لوحة تحكم كاملة: مواعيد، تذكير واتساب، مرضى، وقوالب رسايل.</p>
        <button class="btn btn-primary" id="gate-try">جرّبها دلوقتي</button>
      </div>`;
    document.getElementById('gate-try').addEventListener('click', () => BF.setMode('plus'));
  }

  /* ============================================================
     تسجيل الدخول التجريبي
     ============================================================ */
  function renderLogin() {
    root().innerHTML = `
      <div class="card login-card">
        <h2 style="margin-block-end:6px">دخول العيادة</h2>
        <p class="section-sub">منطقة خاصة بإدارة العيادة.</p>
        <div class="login-hint">
          <b>دخول تجريبي:</b> اضغط دخول مباشرة، مش محتاج بيانات.
        </div>
        <form id="login-form">
          <div class="field">
            <label for="lg-user">اسم المستخدم</label>
            <input type="text" id="lg-user" autocomplete="username" placeholder="اختياري في الديمو">
          </div>
          <div class="field">
            <label for="lg-pass">كلمة السر</label>
            <input type="password" id="lg-pass" autocomplete="current-password" placeholder="اختياري في الديمو">
          </div>
          <button type="submit" class="btn btn-primary btn-block">دخول</button>
        </form>
      </div>`;
    document.getElementById('login-form').addEventListener('submit', e => {
      e.preventDefault();
      BF.store.set('auth', true);
      window.renderPage();
    });
  }

  /* ============================================================
     اللوحة الرئيسية
     ============================================================ */
  function renderDashboard() {
    renderRoleZone();

    const isManager = BF.getRole() === 'manager';
    const canReports = BF.canUse('center') && isManager;
    if (activeTab === 'reports' && !canReports && BF.canUse('center')) activeTab = 'tomorrow';

    const unsent = D.appointments.filter(a => !BF.isReminded(a)).length;

    root().innerHTML = `
      <div class="summary-strip" aria-label="ملخص المواعيد">
        <div class="summary-item"><b>${D.todayCount}</b><span>مواعيد النهاردة</span></div>
        <div class="summary-item"><b>${D.appointments.length}</b><span>مواعيد بكرة</span></div>
        <div class="summary-item"><b id="sum-unsent">${unsent}</b><span>محتاجين تذكير</span></div>
      </div>

      <div class="tabs" role="tablist" aria-label="أقسام لوحة التحكم">
        <button class="tab" role="tab" data-tab="tomorrow" aria-selected="${activeTab === 'tomorrow'}">مواعيد بكرة</button>
        <button class="tab" role="tab" data-tab="patients" aria-selected="${activeTab === 'patients'}">قائمة المرضى</button>
        <button class="tab" role="tab" data-tab="templates" aria-selected="${activeTab === 'templates'}">قوالب الرسايل</button>
        ${BF.canUse('center')
          ? (isManager
              ? `<button class="tab" role="tab" data-tab="reports" aria-selected="${activeTab === 'reports'}">التقارير</button>`
              : '')
          : `<button class="tab" role="tab" data-tab="reports-locked" aria-selected="false" data-feature="reports"><span class="tab-lock">${BF.LOCK_ICON}</span> التقارير</button>`}
      </div>

      <div id="tab-content"></div>`;

    root().querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        if (tab.dataset.tab === 'reports-locked') { BF.showLock('reports'); return; }
        activeTab = tab.dataset.tab;
        root().querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', String(t === tab)));
        renderTabContent();
      });
    });

    renderTabContent();
  }

  function updateSummary() {
    const el = document.getElementById('sum-unsent');
    if (el) el.textContent = D.appointments.filter(a => !BF.isReminded(a)).length;
  }

  function renderTabContent() {
    if (activeTab === 'tomorrow') renderTomorrow();
    else if (activeTab === 'patients') renderPatients();
    else if (activeTab === 'templates') renderTemplates();
    else if (activeTab === 'reports') renderReports();
  }

  /* ============================================================
     مواعيد بكرة — شاشة البطل
     ============================================================ */
  function renderTomorrow() {
    const host = document.getElementById('tab-content');
    const isCenter = BF.canUse('center');

    host.innerHTML = `
      <div class="remind-all-bar">
        <div>
          <h2 style="font-size:20px">${D.tomorrow.day} ${D.tomorrow.date}</h2>
          <p class="section-sub" style="margin-block-end:0">${D.appointments.length} مواعيد</p>
        </div>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <button type="button" class="btn btn-primary btn-sm" id="remind-all">تذكير الكل</button>
          <button type="button" class="reset-link" id="reset-reminders">إعادة تعيين</button>
        </div>
      </div>
      <div id="doctor-zone"></div>
      <ul class="appt-list" id="appt-list"></ul>`;

    renderDoctorZone();
    renderApptRows();

    document.getElementById('remind-all').addEventListener('click', remindAll);
    document.getElementById('reset-reminders').addEventListener('click', () => {
      BF.resetReminders();
      renderTomorrow();
      updateSummary();
      announce('اتعاد تعيين كل التذكيرات');
    });
  }

  function renderDoctorZone() {
    const zone = document.getElementById('doctor-zone');
    if (BF.canUse('center')) {
      zone.innerHTML = `
        <div class="doctor-tabs" role="group" aria-label="فلترة حسب الدكتور">
          <button class="doctor-tab" data-doc="all" aria-pressed="${activeDoctor === 'all'}">الكل</button>
          ${D.doctors.map(d => `
            <button class="doctor-tab" data-doc="${d.id}" aria-pressed="${activeDoctor === d.id}">${d.name}</button>`).join('')}
        </div>`;
      zone.querySelectorAll('.doctor-tab').forEach(btn =>
        btn.addEventListener('click', () => {
          activeDoctor = btn.dataset.doc;
          zone.querySelectorAll('.doctor-tab').forEach(b =>
            b.setAttribute('aria-pressed', String(b === btn)));
          renderApptRows();
        }));
    } else {
      zone.innerHTML = `
        <div class="lock-strip" style="margin-block-end:14px">
          <button type="button" class="lock-chip" data-feature="doctors" id="doctors-lock">
            ${BF.LOCK_ICON} تعدد الأطباء — 3 دكاترة في المركز
          </button>
        </div>`;
      zone.querySelector('#doctors-lock').addEventListener('click', () => BF.showLock('doctors'));
    }
  }

  function visibleAppointments() {
    return D.appointments.filter(a => activeDoctor === 'all' || a.doctor === activeDoctor);
  }

  const CHECK_SVG = '<svg class="check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>';

  function rowHtml(a) {
    const sentAt = BF.isReminded(a);
    const doctorName = BF.canUse('center') && activeDoctor === 'all'
      ? ` · ${D.doctors.find(d => d.id === a.doctor).name.replace('د. ', 'د. ')}` : '';
    return `
      <li class="appt-row ${sentAt ? 'sent' : ''}" data-id="${a.id}">
        <span class="appt-time">${a.time}</span>
        <div class="appt-info">
          <div class="appt-name">${a.patient}</div>
          <div class="appt-meta">
            <span>${a.service}</span>
            <span class="visit-pill ${a.type === 'كشف أول' ? 'first' : ''}">${a.type}</span>
          </div>
        </div>
        ${sentAt
          ? `<button type="button" class="remind-btn sent" disabled aria-label="اتبعت تذكير لـ ${a.patient} الساعة ${sentAt}">
               <span>${CHECK_SVG} تم التذكير</span><small>اتبعت ${sentAt}</small>
             </button>`
          : `<button type="button" class="remind-btn" data-remind="${a.id}" aria-label="ابعت تذكير واتساب لـ ${a.patient}">تذكير</button>`}
      </li>`;
  }

  function renderApptRows() {
    const list = document.getElementById('appt-list');
    const rows = visibleAppointments();
    list.innerHTML = rows.length
      ? rows.map(rowHtml).join('')
      : '<li class="empty-note">مفيش مواعيد للدكتور ده بكرة</li>';
    list.querySelectorAll('[data-remind]').forEach(btn =>
      btn.addEventListener('click', () => sendReminder(btn)));
  }

  function markRowSent(id, time, animate) {
    const row = document.querySelector(`.appt-row[data-id="${id}"]`);
    if (!row) return;
    const a = D.appointments.find(x => x.id === id);
    const btn = row.querySelector('.remind-btn');
    btn.classList.add('sent');
    if (animate) btn.classList.add('just-sent');
    btn.disabled = true;
    btn.setAttribute('aria-label', `اتبعت تذكير لـ ${a.patient} الساعة ${time}`);
    btn.innerHTML = `<span>${CHECK_SVG} تم التذكير</span><small>اتبعت ${time}</small>`;
    row.classList.add('sent');
    updateSummary();
  }

  /* تذكير فردي — بيفتح واتساب بالرسالة الجاهزة */
  function sendReminder(btn) {
    const id = btn.dataset.remind;
    const a = D.appointments.find(x => x.id === id);
    const msg = BF.fillTemplate(BF.getTemplates().reminder, {
      name: a.patient, day: D.tomorrow.day, date: D.tomorrow.date,
      time: a.time, service: a.service,
    });
    window.open(BF.waLink(a.phone, msg), '_blank', 'noopener');
    BF.markReminded(id);
    markRowSent(id, BF.getReminders()[id], true);
    announce(`اتبعت تذكير لـ ${a.patient}`);
  }

  /* تذكير الكل — أنيميشن متتابع 400ms بين كل صف */
  function remindAll() {
    const rows = visibleAppointments().filter(a => !BF.isReminded(a));
    if (!rows.length) return;
    const btn = document.getElementById('remind-all');
    btn.disabled = true;

    const step = reducedMotion.matches ? 0 : 400;
    rows.forEach((a, i) => {
      setTimeout(() => {
        BF.markReminded(a.id);
        markRowSent(a.id, BF.getReminders()[a.id], !reducedMotion.matches);
        if (i === rows.length - 1) {
          announce(`اتبعت تذكير لـ ${rows.length} مرضى`);
          btn.disabled = false;
        }
      }, i * step);
    });
  }

  /* ============================================================
     قائمة المرضى
     ============================================================ */
  function renderPatients() {
    const host = document.getElementById('tab-content');
    host.innerHTML = `
      <h2 style="font-size:20px;margin-block-end:4px">قائمة المرضى</h2>
      <p class="section-sub">${D.patients.length} مريض مسجّل</p>
      <div class="search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
        <input type="search" id="patient-search" placeholder="دوّر بالاسم أو رقم الموبايل…" aria-label="بحث في المرضى">
      </div>
      <div class="card" style="padding:6px 10px">
        <table class="patients-table">
          <thead>
            <tr><th>الاسم</th><th>الموبايل</th><th>آخر زيارة</th><th>المعاد الجاي</th></tr>
          </thead>
          <tbody id="patients-body"></tbody>
        </table>
        <p class="empty-note" id="patients-empty" hidden>مفيش نتائج مطابقة</p>
      </div>`;

    const body = document.getElementById('patients-body');
    const empty = document.getElementById('patients-empty');

    function draw(filter = '') {
      const q = filter.trim();
      const rows = D.patients.filter(p =>
        !q || p.name.includes(q) || p.phone.replace(/\s/g, '').includes(q.replace(/\s/g, '')));
      body.innerHTML = rows.map(p => `
        <tr>
          <td>${p.name}</td>
          <td class="num" dir="ltr" style="text-align:end">${p.phone}</td>
          <td class="num">${p.lastVisit}</td>
          <td class="num">${p.next}</td>
        </tr>`).join('');
      empty.hidden = rows.length > 0;
    }

    draw();
    document.getElementById('patient-search').addEventListener('input', e => draw(e.target.value));
  }

  /* ============================================================
     قوالب الرسايل
     ============================================================ */
  function renderTemplates() {
    const host = document.getElementById('tab-content');
    const tpls = BF.getTemplates();
    const sample = D.appointments[0];

    host.innerHTML = `
      <h2 style="font-size:20px;margin-block-end:4px">قوالب الرسايل</h2>
      <p class="section-sub">أي تعديل هنا بيغيّر الرسالة اللي بتتبعت فوراً. جرّب تعدّل وبعدين ابعت تذكير من مواعيد بكرة.</p>
      ${Object.keys(D.templateNames).map(key => `
        <div class="card" style="margin-block-end:16px">
          <h3 style="font-size:16px;margin-block-end:12px">${D.templateNames[key]}</h3>
          <div class="tpl-grid">
            <div class="field" style="margin-block-end:0">
              <label for="tpl-${key}">نص الرسالة</label>
              <textarea id="tpl-${key}" data-tpl="${key}">${tpls[key]}</textarea>
            </div>
            <div>
              <p class="tpl-label">معاينة حية (ببيانات ${sample.patient})</p>
              <div class="tpl-preview" id="preview-${key}"></div>
            </div>
          </div>
        </div>`).join('')}`;

    function preview(key) {
      const text = document.getElementById(`tpl-${key}`).value;
      document.getElementById(`preview-${key}`).textContent = BF.fillTemplate(text, {
        name: sample.patient, phone: sample.phone,
        day: D.tomorrow.day, date: D.tomorrow.date,
        time: sample.time, service: sample.service,
      });
    }

    Object.keys(D.templateNames).forEach(key => {
      preview(key);
      document.getElementById(`tpl-${key}`).addEventListener('input', e => {
        BF.saveTemplate(key, e.target.value);
        preview(key);
      });
    });
  }

  /* ============================================================
     التقارير — باقة مركز
     ============================================================ */
  function renderReports() {
    const host = document.getElementById('tab-content');
    const R = D.reports;
    const max = Math.max(...R.weekly.map(w => w.value));

    // رسم بياني SVG مرسوم باليد — 4 أسابيع
    const W = 320, H = 170, PAD_B = 28, PAD_T = 20;
    const barW = 44, gap = (W - barW * R.weekly.length) / (R.weekly.length + 1);
    const bars = R.weekly.map((w, i) => {
      const h = Math.round((w.value / max) * (H - PAD_B - PAD_T));
      const x = gap + i * (barW + gap);
      const y = H - PAD_B - h;
      return `
        <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="6" fill="var(--accent)" opacity="${i === R.weekly.length - 1 ? 1 : 0.4}"/>
        <text x="${x + barW / 2}" y="${y - 6}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">${w.value}</text>
        <text x="${x + barW / 2}" y="${H - 8}" text-anchor="middle" font-size="12" fill="var(--ink-soft)">${w.label}</text>`;
    }).join('');

    const peak = Math.max(...R.busiestHours.map(h => h.value));

    host.innerHTML = `
      <h2 style="font-size:20px;margin-block-end:4px">التقارير</h2>
      <p class="section-sub">3 حقائق واضحة عن شغل العيادة — من غير دوشة أرقام.</p>

      <div class="report-block card">
        <h3>المواعيد في آخر 4 أسابيع</h3>
        <p class="report-sub">آخر أسبوع هو الأعلى — 27 معاد</p>
        <svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="رسم بياني: المواعيد الأسبوعية، 18 ثم 24 ثم 21 ثم 27">
          ${bars}
        </svg>
      </div>

      <div class="report-block card">
        <h3>نسبة اللي ميجوش في ميعادهم</h3>
        <p class="report-sub">قبل وبعد تفعيل تذكير الواتساب</p>
        <div class="noshow">
          <div class="ns before"><b>${R.noShow.before}%</b><span>قبل التذكير</span></div>
          <div class="ns after"><b>${R.noShow.after}%</b><span>بعد التذكير</span></div>
        </div>
      </div>

      <div class="report-block card">
        <h3>أكثر الساعات زحمة</h3>
        <p class="report-sub">ذروة الحجوزات من 6 لـ 9 مساءً</p>
        <div class="hours-strip" role="img" aria-label="أكثر الساعات زحمة: من 6 لـ 9 مساءً">
          ${R.busiestHours.map(h => `
            <div class="hb ${h.value === peak ? 'peak' : ''}">
              <i style="height:${Math.round(h.value / peak * 100)}%"></i>
              <span>${h.hour}</span>
            </div>`).join('')}
        </div>
      </div>`;
  }

  /* ============================================================
     مبدّل الصلاحيات — باقة مركز
     ============================================================ */
  function renderRoleZone() {
    const zone = document.getElementById('role-zone');
    if (!BF.canUse('center')) { zone.innerHTML = ''; return; }
    const role = BF.getRole();
    zone.innerHTML = `
      <span class="role-switch" role="group" aria-label="الصلاحيات">
        <button type="button" data-role="manager" aria-pressed="${role === 'manager'}">مدير</button>
        <button type="button" data-role="secretary" aria-pressed="${role === 'secretary'}">سكرتارية</button>
      </span>`;
    zone.querySelectorAll('[data-role]').forEach(btn =>
      btn.addEventListener('click', () => {
        BF.setRole(btn.dataset.role);
        if (btn.dataset.role === 'secretary' && activeTab === 'reports') activeTab = 'tomorrow';
        window.renderPage();
        announce(btn.dataset.role === 'secretary'
          ? 'وضع السكرتارية: التقارير والأرقام المالية مخفية'
          : 'وضع المدير: كل الصلاحيات متاحة');
      }));
  }

  /* ============================================================
     الرسم الرئيسي
     ============================================================ */
  window.renderPage = function () {
    BF.closeSheet();
    if (!BF.canUse('plus')) { renderGate(); return; }
    if (!BF.store.get('auth', false)) { renderLogin(); return; }
    renderDashboard();
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('back-home').addEventListener('click', e => {
      e.preventDefault();
      location.href = 'index.html' + location.hash;
    });
    document.getElementById('reset-data').addEventListener('click', BF.resetAll);
    window.renderPage();
  });
})();
