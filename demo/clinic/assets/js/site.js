/* ============================================================
   منطق الصفحة العامة — موقع العيادة + محرك الحجز الحقيقي
   ============================================================ */

(function () {
  const D = CLINIC_DATA;

  /* ---------- تعبئة المحتوى الثابت ---------- */
  function fillStatic() {
    document.getElementById('hero-hours').textContent = D.clinic.hours + ' · ' + D.clinic.friday;
    document.getElementById('footer-hours').innerHTML = D.clinic.hours + '<br>' + D.clinic.friday;
    document.getElementById('clinic-address').textContent = D.clinic.address;
    document.getElementById('footer-address').textContent = D.clinic.address;

    const phoneLink = document.getElementById('footer-phone');
    phoneLink.textContent = D.clinic.phoneDisplay;
    phoneLink.href = 'tel:+2' + D.clinic.phoneIntl.slice(2);

    document.getElementById('footer-wa').href =
      BF.waLink(D.clinic.phoneIntl, 'أهلاً، عايز أستفسر عن موعد في العيادة');

    document.getElementById('map-link').href = D.clinic.mapsUrl;

    // الخدمات
    document.getElementById('services-list').innerHTML = D.services
      .map(s => `<li><span>${s.name}</span><span class="price">${s.price}</span></li>`)
      .join('');

    // الدكتور
    document.getElementById('doctor-name').textContent = D.doctor.name;
    document.getElementById('doctor-title').textContent = D.doctor.title;
    document.getElementById('doctor-bio').textContent = D.doctor.bio;
    document.getElementById('doctor-creds').innerHTML = D.doctor.credentials
      .map(c => `<li>${c}</li>`).join('');

    // شريط الأرقام
    document.getElementById('stats-strip').innerHTML = D.stats.map(s => `
      <div class="proof-item"><b><span class="counter" data-to="${s.to}">0</span>${s.suffix}</b><span>${s.label}</span></div>
    `).join('');

    // الخدمة في الفورم
    document.getElementById('bk-service').innerHTML =
      '<option value="" disabled selected>اختار الخدمة</option>' +
      D.services.map(s => `<option>${s.name}</option>`).join('');

    // الأيام المتاحة — تواريخ حقيقية
    document.getElementById('bk-day').innerHTML =
      '<option value="" disabled selected>اختار اليوم</option>' +
      BF.nextWorkingDays(D.bookingWindowDays).map(d => {
        const dIso = BF.iso(d);
        const today = dIso === BF.iso(new Date());
        return `<option value="${dIso}">${BF.labelFor(d)}${today ? ' — النهاردة' : ''}</option>`;
      }).join('');
  }

  /* ---------- شبكة الأوقات — بتتقفل لحظياً حسب الحجوزات ---------- */
  let selectedSlot = null;

  function renderSlots() {
    const grid = document.getElementById('slot-grid');
    const dayVal = document.getElementById('bk-day').value;
    if (!dayVal) {
      grid.innerHTML = '<p class="slot-hint">اختار اليوم الأول وهتظهرلك الأوقات المتاحة</p>';
      return;
    }
    const date = BF.fromIso(dayVal);
    const slots = BF.slotsForDate(date);
    const anyFree = slots.some(s => !s.taken && !s.passed);

    grid.innerHTML = anyFree
      ? slots.map(s => {
          const off = s.taken || s.passed;
          return `<button type="button" class="slot-chip ${off ? 'taken' : ''}" data-slot="${s.label}"
                    ${off ? 'disabled' : ''}
                    title="${s.taken ? 'محجوز' : (s.passed ? 'فات' : 'متاح')}"
                    aria-pressed="${selectedSlot === s.label}">${s.label}</button>`;
        }).join('')
      : '<p class="slot-hint">اليوم ده مكتمل الحجز — جرّب يوم تاني</p>';

    if (selectedSlot && !slots.some(s => s.label === selectedSlot && !s.taken && !s.passed)) {
      selectedSlot = null; // المعاد اللي كان مختار بقى محجوز
    }

    grid.querySelectorAll('.slot-chip:not(.taken)').forEach(btn =>
      btn.addEventListener('click', () => {
        selectedSlot = btn.dataset.slot;
        grid.querySelectorAll('.slot-chip').forEach(b =>
          b.setAttribute('aria-pressed', String(b === btn)));
        hideErr('err-time');
      }));
  }

  /* ---------- أقرب المواعيد المتاحة — ويدجت حية ---------- */
  function renderLiveSlots() {
    const host = document.getElementById('live-slots');
    if (!host) return;
    const free = BF.nextFreeSlots(4);
    host.innerHTML = free.length
      ? free.map(s => `
          <div class="pm-row live">
            <span class="pm-day">${s.label}</span>
            <span class="pm-time">${s.time}</span>
            <button type="button" class="pm-btn pm-book" data-date="${s.dateIso}" data-time="${s.time}">احجز</button>
          </div>`).join('')
      : '<p class="slot-hint" style="padding:14px">كل المواعيد محجوزة الفترة الجاية — كلمنا على واتساب</p>';

    host.querySelectorAll('.pm-book').forEach(btn =>
      btn.addEventListener('click', () => prefillBooking(btn.dataset.date, btn.dataset.time)));

    const todayEl = document.getElementById('pm-today');
    if (todayEl) todayEl.textContent = BF.labelFor(new Date());
  }

  function prefillBooking(dateIso, timeLabel) {
    const daySel = document.getElementById('bk-day');
    daySel.value = dateIso;
    selectedSlot = timeLabel;
    renderSlots();
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
    const card = document.getElementById('booking-form');
    card.classList.add('flash');
    setTimeout(() => card.classList.remove('flash'), 1200);
  }

  /* ---------- التحقق ---------- */
  function showErr(id) { document.getElementById(id).hidden = false; }
  function hideErr(id) { document.getElementById(id).hidden = true; }
  const PHONE_RE = /^01[0125]\d{8}$/;

  /* ---------- إرسال الحجز ---------- */
  function bindForm() {
    document.getElementById('bk-day').addEventListener('change', () => {
      selectedSlot = null;
      renderSlots();
    });

    ['bk-name', 'bk-phone'].forEach(id =>
      document.getElementById(id).addEventListener('input', () => {
        hideErr(id === 'bk-name' ? 'err-name' : 'err-phone');
      }));

    document.getElementById('booking-form').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      const name = f.name.value.trim();
      const phone = f.phone.value.replace(/\D/g, '');
      const service = f.service.value;
      const dayIso = f.day.value;

      let ok = true;
      if (name.length < 3) { showErr('err-name'); ok = false; }
      if (!PHONE_RE.test(phone)) { showErr('err-phone'); ok = false; }
      if (!selectedSlot) { showErr('err-time'); ok = false; }
      if (!ok) return;

      // تأكيد إن المعاد لسه فاضي لحظة الحجز
      if (BF.isSlotTaken(dayIso, selectedSlot)) {
        selectedSlot = null;
        renderSlots();
        showErr('err-time');
        document.getElementById('err-time').textContent = 'المعاد ده اتحجز للتو — اختار وقت تاني';
        return;
      }

      const slot = D.slots.find(s => s.label === selectedSlot);
      const booking = BF.addBooking({
        id: 'b' + Date.now().toString(36),
        ref: BF.nextRef(),
        name, phone, service,
        date: dayIso,
        dayLabel: BF.labelFor(BF.fromIso(dayIso)),
        time: selectedSlot,
        hour: slot ? slot.h : 16,
        status: 'new',
        remindedAt: null,
        createdAt: new Date().toISOString(),
      });

      showSuccess(booking);
    });
  }

  /* ---------- شاشة النجاح ---------- */
  function showSuccess(b) {
    document.getElementById('booking-form').hidden = true;
    const card = document.getElementById('booking-success');
    card.hidden = false;

    document.getElementById('bs-ref').textContent = b.ref;
    document.getElementById('bs-summary').innerHTML = `
      <div><dt>الاسم</dt><dd>${b.name}</dd></div>
      <div><dt>الخدمة</dt><dd>${b.service}</dd></div>
      <div><dt>الميعاد</dt><dd>${b.dayLabel} — ${b.time}</dd></div>
      <div><dt>الموبايل</dt><dd dir="ltr">${b.phone}</dd></div>`;

    const msg = BF.fillTemplate(BF.getTemplates().confirm, {
      ref: b.ref, name: b.name, phone: b.phone,
      service: b.service, day: b.dayLabel, time: b.time,
    });
    document.getElementById('bs-wa').href = BF.waLink(D.clinic.phoneIntl, msg);

    document.getElementById('bs-ics').onclick = () => downloadICS(b);
    document.getElementById('bs-again').onclick = () => {
      card.hidden = true;
      const f = document.getElementById('booking-form');
      f.hidden = false;
      f.reset();
      selectedSlot = null;
      renderSlots();
    };

    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- ملف تقويم ICS حقيقي ---------- */
  function downloadICS(b) {
    const dt = b.date.replace(/-/g, '');
    const h = String(b.hour).padStart(2, '0');
    const hEnd = String(Math.min(b.hour + 1, 23)).padStart(2, '0');
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ClinicDemo//AR',
      'BEGIN:VEVENT',
      `UID:${b.id}@clinic-demo`,
      `DTSTART:${dt}T${h}0000`,
      `DTEND:${dt}T${hEnd}0000`,
      `SUMMARY:موعد في ${D.clinic.shortName} — ${b.service}`,
      `DESCRIPTION:رقم الحجز ${b.ref}`,
      `LOCATION:${D.clinic.address}`,
      'BEGIN:VALARM', 'TRIGGER:-PT2H', 'ACTION:DISPLAY', 'DESCRIPTION:تذكير بموعد العيادة', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `mo3ad-${b.ref}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  /* ---------- أنيميشن الدخول ---------- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  /* ---------- العدّادات ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const to = Number(e.target.dataset.to);
        if (reduced) { e.target.textContent = to.toLocaleString('en'); return; }
        const t0 = performance.now();
        const dur = 900;
        (function tick(t) {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          e.target.textContent = Math.round(to * eased).toLocaleString('en');
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------- تحديث لحظي لو حجز حصل في تاب تاني ---------- */
  function watchChanges() {
    BF.onChange(() => {
      renderLiveSlots();
      if (!document.getElementById('booking-form').hidden) renderSlots();
    });
  }

  function bindReset() {
    document.getElementById('reset-data').addEventListener('click', BF.resetAll);
  }

  document.addEventListener('DOMContentLoaded', () => {
    fillStatic();
    renderSlots();
    renderLiveSlots();
    bindForm();
    bindReset();
    initReveal();
    initCounters();
    watchChanges();
  });
})();
