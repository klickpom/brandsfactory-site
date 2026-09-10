/* ============================================================
   لوحة التحكم — إدارة حقيقية كاملة للحجوزات والمرضى والرسايل
   كل حاجة شغالة: تأكيد، إلغاء، تذكير واتساب، بحث، تقارير حية
   ============================================================ */

(function () {
  const D = CLINIC_DATA;
  const root = () => document.getElementById('panel-root');
  const live = () => document.getElementById('live-region');

  let activeTab = 'bookings';   // bookings | patients | templates | reports
  let activeFilter = 'new';     // all | new | today | tomorrow | upcoming | cancelled
  let apptQuery = '';
  let filterPicked = false;

  function announce(msg) { live().textContent = msg; }

  /* ---------- توست ---------- */
  let toastTimer = null;
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
  }

  /* ---------- تقسيم الحجوزات ---------- */
  function splitBookings() {
    const all = BF.getBookings();
    const todayIso = BF.iso(new Date());
    const tomorrowWorking = BF.nextWorkingDays(2).map(BF.iso)[1] || null;
    // بكرة = أول يوم شغال بعد النهاردة
    const nextDay = BF.nextWorkingDays(3).map(BF.iso).find(d => d > todayIso) || null;
    return {
      all,
      newOnes: all.filter(b => b.status === 'new'),
      today: all.filter(b => b.date === todayIso && b.status !== 'cancelled'),
      tomorrow: all.filter(b => b.date === nextDay && b.status !== 'cancelled'),
      upcoming: all.filter(b => b.date >= todayIso && b.status !== 'cancelled'),
      cancelled: all.filter(b => b.status === 'cancelled'),
      todayIso, nextDay,
    };
  }

  /* ============================================================
     الرسم الرئيسي
     ============================================================ */
  function renderDashboard() {
    const s = splitBookings();
    if (!filterPicked) {
      activeFilter = s.newOnes.length ? 'new' : 'today';
      filterPicked = true;
    }
    const patients = buildPatients();

    root().innerHTML = `
      <div class="summary-strip" aria-label="ملخص العيادة">
        <button type="button" class="summary-item ${s.newOnes.length ? 'hot' : ''}" data-jump="new"><b id="sum-new">${s.newOnes.length}</b><span>حجز جديد محتاج تأكيد</span></button>
        <button type="button" class="summary-item" data-jump="today"><b>${s.today.length}</b><span>مواعيد النهاردة</span></button>
        <button type="button" class="summary-item" data-jump="tomorrow"><b>${s.tomorrow.length}</b><span>مواعيد بكرة</span></button>
        <button type="button" class="summary-item" data-jump="patients"><b>${patients.length}</b><span>مريض مسجّل</span></button>
      </div>

      <div class="tabs" role="tablist" aria-label="أقسام لوحة التحكم">
        <button class="tab" role="tab" data-tab="bookings" aria-selected="${activeTab === 'bookings'}">الحجوزات${s.newOnes.length ? ` <span class="tab-badge">${s.newOnes.length}</span>` : ''}</button>
        <button class="tab" role="tab" data-tab="patients" aria-selected="${activeTab === 'patients'}">المرضى</button>
        <button class="tab" role="tab" data-tab="templates" aria-selected="${activeTab === 'templates'}">قوالب الرسايل</button>
        <button class="tab" role="tab" data-tab="reports" aria-selected="${activeTab === 'reports'}">التقارير</button>
      </div>

      <div id="tab-content"></div>`;

    root().querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab;
        root().querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', String(t === tab)));
        renderTabContent();
      });
    });

    root().querySelectorAll('.summary-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const jump = btn.dataset.jump;
        filterPicked = true;
        if (jump === 'patients') {
          activeTab = 'patients';
        } else {
          activeTab = 'bookings';
          activeFilter = jump;
        }
        renderDashboard();
      });
    });

    renderTabContent();
  }

  function renderTabContent() {
    if (activeTab === 'bookings') renderBookings();
    else if (activeTab === 'patients') renderPatients();
    else if (activeTab === 'templates') renderTemplates();
    else if (activeTab === 'reports') renderReports();
  }

  /* ============================================================
     الحجوزات — شاشة البطل
     ============================================================ */
  const FILTERS = [
    ['all', 'الكل'], ['new', 'جديدة'], ['today', 'النهاردة'],
    ['tomorrow', 'بكرة'], ['upcoming', 'القادمة'], ['cancelled', 'الملغية'],
  ];

  function renderBookings() {
    const host = document.getElementById('tab-content');
    const s = splitBookings();

    host.innerHTML = `
      <div class="filter-pills" role="group" aria-label="فلترة الحجوزات">
        ${FILTERS.map(([k, label]) => {
          const count = k === 'all' ? s.all.length
            : k === 'new' ? s.newOnes.length
            : k === 'today' ? s.today.length
            : k === 'tomorrow' ? s.tomorrow.length
            : k === 'upcoming' ? s.upcoming.length
            : s.cancelled.length;
          return `<button class="filter-pill" data-filter="${k}" aria-pressed="${activeFilter === k}">${label} <small>${count}</small></button>`;
        }).join('')}
      </div>
      <div class="search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
        <input type="search" id="appt-search" placeholder="دوّر بالاسم أو الموبايل أو رقم الحجز…" aria-label="بحث في الحجوزات">
      </div>
      <ul class="appt-list" id="appt-list"></ul>`;

    host.querySelectorAll('.filter-pill').forEach(btn =>
      btn.addEventListener('click', () => {
        filterPicked = true;
        activeFilter = btn.dataset.filter;
        host.querySelectorAll('.filter-pill').forEach(b =>
          b.setAttribute('aria-pressed', String(b === btn)));
        renderApptRows();
      }));

    const search = document.getElementById('appt-search');
    search.value = apptQuery;
    search.addEventListener('input', () => {
      apptQuery = search.value;
      renderApptRows();
    });

    renderApptRows();
  }

  function createdStamp(b) {
    return Date.parse(b.createdAt || '') || 0;
  }

  function ago(iso) {
    const t = Date.parse(iso || '');
    if (!t) return '';
    const min = Math.max(0, Math.round((Date.now() - t) / 60000));
    if (min < 1) return 'وصل دلوقتي';
    if (min < 60) return `وصل من ${min} د`;
    const h = Math.floor(min / 60);
    if (h < 24) return `وصل من ${h} س`;
    return `وصل من ${Math.floor(h / 24)} يوم`;
  }

  function slotKey(b) {
    return b.date + String(b.hour ?? 0).padStart(2, '0');
  }

  function sortInbox(arr) {
    const todayIso = BF.iso(new Date());
    return [...arr].sort((a, b) => {
      const aNew = a.status === 'new' ? 0 : 1;
      const bNew = b.status === 'new' ? 0 : 1;
      if (aNew !== bNew) return aNew - bNew;
      if (a.status === 'new' && b.status === 'new') return createdStamp(b) - createdStamp(a);
      const aPast = a.date < todayIso ? 1 : 0;
      const bPast = b.date < todayIso ? 1 : 0;
      if (aPast !== bPast) return aPast - bPast;
      const bySlot = slotKey(a).localeCompare(slotKey(b));
      return aPast ? -bySlot : bySlot;
    });
  }

  function filteredBookings() {
    const s = splitBookings();
    let arr;
    if (activeFilter === 'new') arr = s.newOnes;
    else if (activeFilter === 'today') arr = s.today;
    else if (activeFilter === 'tomorrow') arr = s.tomorrow;
    else if (activeFilter === 'upcoming') arr = s.upcoming;
    else if (activeFilter === 'cancelled') arr = s.cancelled;
    else arr = s.all;
    arr = sortInbox(arr);
    const q = apptQuery.trim();
    if (q) {
      arr = arr.filter(b =>
        b.name.includes(q) || b.phone.includes(q) || (b.ref || '').includes(q) || b.service.includes(q));
    }
    return arr;
  }

  const CHECK_SVG = '<svg class="check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>';
  const WA_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.3z"/></svg>';
  const TEL_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></svg>';

  function statusBadge(b) {
    const st = BF.STATUS[b.status] || BF.STATUS.new;
    return `<span class="status-badge ${st.cls}">${st.label}</span>`;
  }

  function rowHtml(b) {
    const isNew = b.status === 'new';
    const canConfirm = b.status === 'new';
    const canDone = b.status === 'confirmed';
    const canCancel = b.status === 'new' || b.status === 'confirmed';
    const canRemind = b.status === 'confirmed' || b.status === 'new';
    return `
      <li class="appt-row ${isNew ? 'is-new' : ''}" data-id="${b.id}">
        <div class="appt-when">
          <span class="appt-time">${b.time}</span>
          <span class="appt-date">${b.dayLabel}</span>
        </div>
        <div class="appt-info">
          <div class="appt-name">${b.name} ${statusBadge(b)}</div>
          <div class="appt-meta">
            <span>${b.service}</span>
            <span class="num" dir="ltr">${b.phone}</span>
            <span class="appt-ref">${b.ref}</span>
            ${isNew && b.createdAt ? `<span class="fresh-tag">${ago(b.createdAt)}</span>` : ''}
            ${b.remindedAt ? `<span class="reminded-tag">اتذكّر ${b.remindedAt}</span>` : ''}
          </div>
        </div>
        <div class="row-actions">
          ${canConfirm ? `<button type="button" class="act act-confirm" data-act="confirm" data-id="${b.id}">${CHECK_SVG} تأكيد</button>` : ''}
          ${canRemind ? `<button type="button" class="act act-wa" data-act="remind" data-id="${b.id}">${WA_SVG} تذكير</button>` : ''}
          ${canDone ? `<button type="button" class="act act-done" data-act="done" data-id="${b.id}">حضر</button>` : ''}
          <a class="act act-call" href="${BF.telLink(b.phone)}" aria-label="اتصل بـ ${b.name}">${TEL_SVG}</a>
          ${canCancel ? `<button type="button" class="act act-cancel" data-act="cancel" data-id="${b.id}">إلغاء</button>` : ''}
        </div>
      </li>`;
  }

  function renderApptRows() {
    const list = document.getElementById('appt-list');
    const rows = filteredBookings();
    if (!rows.length) {
      list.innerHTML = `<li class="empty-note">${apptQuery.trim() ? 'مفيش نتيجة للبحث ده' : 'مفيش حجوزات في الفلتر ده'}</li>`;
      return;
    }
    const news = rows.filter(b => b.status === 'new');
    const rest = rows.filter(b => b.status !== 'new');
    const showGroups = activeFilter === 'all' && news.length && rest.length;
    list.innerHTML = showGroups
      ? `<li class="list-label">جديدة محتاجة تأكيد</li>${news.map(rowHtml).join('')}
         <li class="list-label">باقي الحجوزات</li>${rest.map(rowHtml).join('')}`
      : rows.map(rowHtml).join('');
    list.querySelectorAll('[data-act]').forEach(btn =>
      btn.addEventListener('click', () => handleAction(btn.dataset.act, btn.dataset.id)));
  }

  function handleAction(act, id) {
    const b = BF.getBooking(id);
    if (!b) return;

    if (act === 'confirm') {
      BF.patchBooking(id, { status: 'confirmed' });
      toast(`تم تأكيد حجز ${b.name}`);
      announce(`تم تأكيد حجز ${b.name}`);
    } else if (act === 'remind') {
      const msg = BF.fillTemplate(BF.getTemplates().reminder, {
        name: b.name, day: b.dayLabel, date: b.dayLabel,
        time: b.time, service: b.service,
      });
      window.open(BF.waLink(b.phone, msg), '_blank', 'noopener');
      BF.patchBooking(id, { remindedAt: BF.nowEgyptian() });
      toast(`اتفتح واتساب برسالة تذكير لـ ${b.name}`);
      announce(`اتبعت تذكير لـ ${b.name}`);
    } else if (act === 'done') {
      BF.patchBooking(id, { status: 'done' });
      toast(`اتسجّل حضور ${b.name}`);
    } else if (act === 'cancel') {
      BF.patchBooking(id, { status: 'cancelled' });
      toast(`اتلغى حجز ${b.name} — المعاد بقى متاح تاني على الموقع`);
      announce(`اتلغى حجز ${b.name}`);
    }
    renderDashboard(); // يحدّث الملخص والأرقام كلها
  }

  /* ============================================================
     المرضى — بتتبنى تلقائياً من الحجوزات الحقيقية
     ============================================================ */
  function buildPatients() {
    const map = new Map();
    const todayIso = BF.iso(new Date());
    for (const b of BF.getBookings()) {
      if (b.status === 'cancelled') continue;
      if (!map.has(b.phone)) {
        map.set(b.phone, { name: b.name, phone: b.phone, visits: 0, last: null, next: null });
      }
      const p = map.get(b.phone);
      if (b.date <= todayIso) {
        p.visits += 1;
        if (!p.last || b.date > p.last.date) p.last = b;
      } else if (!p.next || b.date < p.next.date) {
        p.next = b;
      }
    }
    return [...map.values()].sort((a, b2) => (b2.last?.date || '').localeCompare(a.last?.date || ''));
  }

  function renderPatients() {
    const host = document.getElementById('tab-content');
    const patients = buildPatients();

    host.innerHTML = `
      <h2 style="font-size:20px;margin-block-end:4px">قائمة المرضى</h2>
      <p class="section-sub">${patients.length} مريض — بتتجمّع تلقائياً من كل حجز بيحصل</p>
      <div class="search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
        <input type="search" id="patient-search" placeholder="دوّر بالاسم أو رقم الموبايل…" aria-label="بحث في المرضى">
      </div>
      <div class="card" style="padding:6px 10px;overflow-x:auto">
        <table class="patients-table">
          <thead>
            <tr><th>الاسم</th><th>الموبايل</th><th>الزيارات</th><th>آخر زيارة</th><th>المعاد الجاي</th></tr>
          </thead>
          <tbody id="patients-body"></tbody>
        </table>
        <p class="empty-note" id="patients-empty" hidden>مفيش نتائج مطابقة</p>
      </div>`;

    const body = document.getElementById('patients-body');
    const empty = document.getElementById('patients-empty');

    function draw(filter = '') {
      const q = filter.trim();
      const rows = patients.filter(p =>
        !q || p.name.includes(q) || p.phone.includes(q.replace(/\s/g, '')));
      body.innerHTML = rows.map(p => `
        <tr>
          <td>${p.name}</td>
          <td class="num" dir="ltr" style="text-align:end">${p.phone}</td>
          <td class="num">${p.visits}</td>
          <td class="num">${p.last ? p.last.dayLabel : '—'}</td>
          <td class="num">${p.next ? `${p.next.dayLabel} ${p.next.time}` : '—'}</td>
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
    const sample = BF.getBookings().find(b => b.status === 'confirmed') || BF.getBookings()[0];

    host.innerHTML = `
      <h2 style="font-size:20px;margin-block-end:4px">قوالب الرسايل</h2>
      <p class="section-sub">أي تعديل هنا بيغيّر الرسالة اللي بتتبعت فوراً. المتغيرات المتاحة: {الاسم} {الرقم} {الخدمة} {اليوم} {الوقت} {الموبايل}</p>
      ${Object.keys(D.templateNames).map(key => `
        <div class="card" style="margin-block-end:16px">
          <h3 style="font-size:16px;margin-block-end:12px">${D.templateNames[key]}</h3>
          <div class="tpl-grid">
            <div class="field" style="margin-block-end:0">
              <label for="tpl-${key}">نص الرسالة</label>
              <textarea id="tpl-${key}" data-tpl="${key}">${tpls[key]}</textarea>
            </div>
            <div>
              <p class="tpl-label">معاينة حية (ببيانات ${sample.name})</p>
              <div class="tpl-preview" id="preview-${key}"></div>
            </div>
          </div>
        </div>`).join('')}`;

    function preview(key) {
      const text = document.getElementById(`tpl-${key}`).value;
      document.getElementById(`preview-${key}`).textContent = BF.fillTemplate(text, {
        name: sample.name, phone: sample.phone, ref: sample.ref,
        day: sample.dayLabel, date: sample.dayLabel,
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
     التقارير — بتتحسب من الحجوزات الحقيقية
     ============================================================ */
  function renderReports() {
    const host = document.getElementById('tab-content');
    const all = BF.getBookings();
    const todayIso = BF.iso(new Date());

    // حجوزات آخر ٧ أيام (بتاريخ الميعاد)
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = BF.addDays(new Date(), -i);
      const dIso = BF.iso(d);
      last7.push({
        label: BF.DAYS[d.getDay()],
        value: all.filter(b => b.date === dIso && b.status !== 'cancelled').length,
      });
    }
    const max7 = Math.max(...last7.map(x => x.value), 1);

    const W = 320, H = 170, PAD_B = 28, PAD_T = 20;
    const barW = 30, gap = (W - barW * 7) / 8;
    const bars = last7.map((w, i) => {
      const h = Math.round((w.value / max7) * (H - PAD_B - PAD_T));
      const x = gap + i * (barW + gap);
      const y = H - PAD_B - h;
      return `
        <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="6" fill="var(--accent)" opacity="${i === 6 ? 1 : 0.4}"/>
        <text x="${x + barW / 2}" y="${y - 6}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">${w.value}</text>
        <text x="${x + barW / 2}" y="${H - 8}" text-anchor="middle" font-size="11" fill="var(--ink-soft)">${w.label}</text>`;
    }).join('');

    // توزيع الحالات
    const statusCounts = Object.keys(BF.STATUS).map(k => ({
      ...BF.STATUS[k],
      count: all.filter(b => b.status === k).length,
    }));

    // أكثر الخدمات
    const svcCounts = {};
    all.forEach(b => { if (b.status !== 'cancelled') svcCounts[b.service] = (svcCounts[b.service] || 0) + 1; });
    const topSvc = Object.entries(svcCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const maxSvc = topSvc.length ? topSvc[0][1] : 1;

    // أكثر الأوقات زحمة
    const hourCounts = {};
    all.forEach(b => { if (b.status !== 'cancelled') hourCounts[b.time] = (hourCounts[b.time] || 0) + 1; });
    const hours = D.slots.map(s => ({ hour: s.label.replace(':00', ''), value: hourCounts[s.label] || 0 }));
    const peak = Math.max(...hours.map(h => h.value), 1);

    // نسبة الغياب الحقيقية
    const past = all.filter(b => b.date < todayIso);
    const noShows = past.filter(b => b.status === 'noshow').length;
    const noShowRate = past.length ? Math.round(noShows / past.length * 100) : 0;

    host.innerHTML = `
      <h2 style="font-size:20px;margin-block-end:4px">التقارير</h2>
      <p class="section-sub">كل الأرقام دي محسوبة من الحجوزات الفعلية — جرّب تحجز أو تلغي وارجع شوفها بتتغير.</p>

      <div class="report-block card">
        <h3>المواعيد آخر ٧ أيام</h3>
        <p class="report-sub">النهاردة آخر عمود</p>
        <svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="رسم بياني للمواعيد في آخر سبعة أيام">
          ${bars}
        </svg>
      </div>

      <div class="report-block card">
        <h3>توزيع الحجوزات حسب الحالة</h3>
        <p class="report-sub">إجمالي ${all.length} حجز</p>
        <div class="status-dist">
          ${statusCounts.map(s => `
            <div class="sd-item"><span class="status-badge ${s.cls}">${s.label}</span><b>${s.count}</b></div>`).join('')}
        </div>
        <p class="report-sub" style="margin-block-start:10px">نسبة الغياب الفعلية في المواعيد اللي فاتت: <b>${noShowRate}%</b> (${noShows} من ${past.length})</p>
      </div>

      <div class="report-block card">
        <h3>أكثر الخدمات طلباً</h3>
        ${topSvc.map(([name, n]) => `
          <div class="svc-bar">
            <span class="svc-name">${name}</span>
            <span class="svc-track"><i style="width:${Math.round(n / maxSvc * 100)}%"></i></span>
            <b class="num">${n}</b>
          </div>`).join('')}
      </div>

      <div class="report-block card">
        <h3>أكثر الأوقات زحمة</h3>
        <div class="hours-strip" role="img" aria-label="أكثر الأوقات زحمة">
          ${hours.map(h => `
            <div class="hb ${h.value === peak && peak > 0 ? 'peak' : ''}">
              <i style="height:${Math.round(h.value / peak * 100)}%"></i>
              <span>${h.hour}</span>
            </div>`).join('')}
        </div>
      </div>`;
  }

  /* ============================================================
     التحديث اللحظي — لو حجز جديد وصل واللوحة مفتوحة
     ============================================================ */
  let knownIds = new Set(BF.getBookings().map(b => b.id));

  function watchChanges() {
    BF.onChange(() => {
      const now = BF.getBookings();
      const fresh = now.filter(b => !knownIds.has(b.id));
      knownIds = new Set(now.map(b => b.id));
      if (fresh.length) {
        activeTab = 'bookings';
        activeFilter = 'new';
        filterPicked = true;
        toast(`حجز جديد وصل دلوقتي: ${fresh[0].name} ${fresh[0].dayLabel} الساعة ${fresh[0].time}`);
        announce('وصل حجز جديد');
      }
      renderDashboard();
    });
  }

  /* ============================================================
     تشغيل
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('panel-date').textContent = BF.labelFor(new Date());
    document.getElementById('reset-data').addEventListener('click', BF.resetAll);
    renderDashboard();
    watchChanges();
  });
})();
