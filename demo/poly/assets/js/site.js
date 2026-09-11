/* ============================================================
   منطق الصفحة العامة — موقع العيادة + محرك الحجز الحقيقي
   ============================================================ */

(function () {
  const D = CLINIC_DATA;
  const PHONE_RE = /^01[0125]\d{8}$/;

  const book = {
    step: 1,
    branchId: '',
    service: '',
    dayIso: '',
    slot: null,
  };

  function currentBranch() {
    if (!book.branchId) return null;
    return BF.branchById(book.branchId);
  }

  function showErr(id) { document.getElementById(id).hidden = false; }
  function hideErr(id) { document.getElementById(id).hidden = true; }

  function dayParts(d) {
    const todayIso = BF.iso(new Date());
    const tomIso = BF.iso(BF.addDays(new Date(), 1));
    const dIso = BF.iso(d);
    let name = BF.DAYS[d.getDay()];
    if (dIso === todayIso) name = 'النهاردة';
    else if (dIso === tomIso) name = 'بكرة';
    return { name, num: d.getDate(), month: BF.MONTHS[d.getMonth()] };
  }

  function workingDays() {
    return BF.nextWorkingDays(D.bookingWindowDays);
  }

  /* ---------- تعبئة المحتوى الثابت ---------- */
  function fillStatic() {
    document.getElementById('hero-hours').textContent = D.clinic.hours + ' · ' + D.clinic.friday;
    document.getElementById('footer-hours').innerHTML = D.clinic.hours + '<br>' + D.clinic.friday;
    document.getElementById('clinic-address').textContent = D.clinic.address;
    document.getElementById('footer-address').textContent = D.clinic.address;
    document.getElementById('ticket-clinic').textContent = D.clinic.shortName;

    const phoneLink = document.getElementById('footer-phone');
    phoneLink.textContent = D.clinic.phoneDisplay;
    phoneLink.href = BF.telLink(D.clinic.phoneIntl);

    document.getElementById('footer-wa').href =
      BF.waLink(D.clinic.phoneIntl, 'أهلاً، عايز أستفسر عن موعد في العيادة');

    const firstBr = D.branches[0];
    document.getElementById('map-directions').href = firstBr.mapsUrl;
    document.getElementById('map-address').textContent = firstBr.address;
    document.getElementById('map-hours').textContent = D.clinic.hours + ' · ' + D.clinic.friday;
    document.getElementById('map-wa').href =
      BF.waLink(D.clinic.phoneIntl, 'أهلاً، عايز العنوان والاتجاهات للعيادة');
    const mapKicker = document.getElementById('map-kicker');
    const mapTitle = document.getElementById('map-title');
    if (mapKicker) mapKicker.textContent = 'بولي كلينك · القاهرة الجديدة';
    if (mapTitle) mapTitle.textContent = firstBr.name;

    const places = document.getElementById('branch-places');
    if (places) {
      places.innerHTML = D.branches.map(br => `
        <button type="button" class="branch-place" data-map-branch="${br.id}">
          <b>${br.name}</b>
          <span>${br.address}</span>
        </button>`).join('');
      places.querySelectorAll('[data-map-branch]').forEach(btn => {
        btn.addEventListener('click', () => selectMapBranch(btn.dataset.mapBranch));
      });
    }

    document.getElementById('services-list').innerHTML = D.services
      .map(s => `<li>
        <button type="button" class="svc-pick" data-service="${s.name}">
          <span>${s.name}</span>
          <span class="price">${s.price}</span>
        </button>
      </li>`)
      .join('');

    document.getElementById('doctor-name').textContent = D.doctor.name;
    document.getElementById('doctor-title').textContent = D.doctor.title;
    document.getElementById('doctor-bio').textContent = D.doctor.bio;
    const docPhoto = document.querySelector('#doctor .about-photo img');
    const docMark = document.querySelector('#doctor .about-photo .doc-initials');
    if (docPhoto && D.doctor.photo) {
      docPhoto.hidden = false;
      docPhoto.src = D.doctor.photo;
      docPhoto.alt = D.doctor.photoAlt || D.doctor.name;
      docPhoto.closest('.about-photo')?.classList.remove('photo-mark');
      if (docMark) docMark.hidden = true;
    } else if (docPhoto) {
      docPhoto.hidden = true;
      if (docMark) {
        docMark.hidden = false;
        docMark.textContent = D.doctor.initials || 'س';
      }
    }
    document.getElementById('doctor-creds').innerHTML = D.doctor.credentials
      .map(c => `<li>${c}</li>`).join('');

    document.getElementById('stats-strip').innerHTML = D.stats.map(s => `
      <div class="proof-item"><b><span class="counter" data-to="${s.to}">0</span>${s.suffix}</b><span>${s.label}</span></div>
    `).join('');
  }

  function syncHidden() {
    document.getElementById('bk-branch').value = book.branchId;
    document.getElementById('bk-service').value = book.service;
    document.getElementById('bk-day').value = book.dayIso;
    document.getElementById('bk-time').value = book.slot || '';
  }

  function renderTicket() {
    const br = currentBranch();
    document.getElementById('ticket-branch').textContent = br ? br.name : 'اختار التخصص';
    document.getElementById('ticket-service').textContent = book.service || 'لسه ما اخترتش';
    document.getElementById('ticket-day').textContent = book.dayIso
      ? BF.labelFor(BF.fromIso(book.dayIso))
      : 'اختار يوم';
    document.getElementById('ticket-time').textContent = book.slot || 'اختار وقت';

    const foot = document.getElementById('ticket-foot');
    if (book.service && book.dayIso && book.slot) {
      foot.textContent = 'جاهز للتأكيد. المعاد يتقفل فور الحجز ويتبعت على واتساب العيادة.';
    } else if (book.dayIso && !book.slot) {
      foot.textContent = 'اختار وقت من المواعيد المتاحة.';
    } else if (book.service) {
      foot.textContent = 'اختار يوم ووقت من الخطوة التانية.';
    } else {
      foot.textContent = 'المعاد يتقفل فور التأكيد ويتبعت على واتساب العيادة.';
    }
    syncHidden();
  }

  function setStep(n) {
    book.step = n;
    document.querySelectorAll('.book-pane').forEach(pane => {
      pane.hidden = Number(pane.dataset.pane) !== n;
    });
    document.querySelectorAll('.book-step').forEach(el => {
      const s = Number(el.dataset.step);
      el.classList.toggle('is-done', s < n);
      if (s === n) el.setAttribute('aria-current', 'step');
      else el.removeAttribute('aria-current');
    });
    if (n === 2) {
      if (!book.branchId) book.branchId = D.branches[0].id;
      renderDates();
      renderSlots();
    }
    renderTicket();
  }

  function renderBranches() {
    const host = document.getElementById('branch-grid');
    if (!host) return;
    host.innerHTML = D.branches.map(br => {
      const on = book.branchId === br.id;
      return `<button type="button" class="branch-chip" role="radio"
                data-branch="${br.id}" aria-checked="${on}">
                <b>${br.name}</b>
                <small>${br.address}</small>
              </button>`;
    }).join('');
  }

  function renderServices() {
    const host = document.getElementById('svc-grid');
    host.innerHTML = D.services.map(s => {
      const on = book.service === s.name;
      return `<button type="button" class="svc-chip" role="radio"
                data-service="${s.name}"
                aria-checked="${on}">
                <b>${s.name}</b>
                <small>${s.price}</small>
              </button>`;
    }).join('');
  }

  function renderDates() {
    const host = document.getElementById('date-rail');
    const days = workingDays();
    if (book.dayIso) {
      const selected = days.find(d => BF.iso(d) === book.dayIso);
      if (!selected || BF.freeCountFor(selected, book.branchId) === 0) {
        const firstFree = days.find(d => BF.freeCountFor(d, book.branchId) > 0);
        if (firstFree) book.dayIso = BF.iso(firstFree);
      }
    } else {
      const firstFree = days.find(d => BF.freeCountFor(d, book.branchId) > 0) || days[0];
      if (firstFree) book.dayIso = BF.iso(firstFree);
    }

    const first = days[0];
    const last = days[days.length - 1];
    document.getElementById('date-range-label').textContent =
      `من ${dayParts(first).num} ${dayParts(first).month} لـ ${dayParts(last).num} ${dayParts(last).month}`;

    host.innerHTML = days.map(d => {
      const iso = BF.iso(d);
      const p = dayParts(d);
      const free = BF.freeCountFor(d, book.branchId);
      const on = book.dayIso === iso;
      const full = free === 0;
      return `<button type="button" class="date-chip${full ? ' is-full' : ''}" role="radio"
                data-date="${iso}" ${full ? 'disabled' : ''}
                aria-checked="${on}">
                <span class="date-name">${p.name}</span>
                <span class="date-num">${p.num}</span>
                <span class="date-free">${full ? 'مكتمل' : free + ' فاضي'}</span>
              </button>`;
    }).join('');
  }

  function renderSlots() {
    const grid = document.getElementById('slot-grid');
    const meta = document.getElementById('slot-meta');
    if (!book.dayIso) {
      grid.innerHTML = '<p class="slot-hint">اختار اليوم وهتظهر الأوقات المتاحة</p>';
      meta.textContent = '';
      return;
    }
    const date = BF.fromIso(book.dayIso);
    const slots = BF.slotsForDate(date, book.branchId);
    const free = slots.filter(s => !s.taken && !s.passed).length;

    if (book.slot && !slots.some(s => s.label === book.slot && !s.taken && !s.passed)) {
      book.slot = null;
    }

    meta.textContent = free
      ? BF.labelFor(date) + ': ' + free + ' مواعيد فاضية'
      : BF.labelFor(date) + ': اليوم ده مكتمل';

    grid.innerHTML = free
      ? slots.map(s => {
          const off = s.taken || s.passed;
          const why = s.taken ? 'محجوز' : (s.passed ? 'فات' : 'متاح');
          const on = book.slot === s.label && !off;
          return `<button type="button" class="book-slot${off ? ' is-off' : ''}"
                    data-slot="${s.label}" ${off ? 'disabled' : ''}
                    role="radio" aria-checked="${on}" title="${why}">
                    <b>${s.label}</b>
                    <small>${why}</small>
                  </button>`;
        }).join('')
      : '<p class="slot-hint">اليوم ده مكتمل الحجز. جرّب يوم تاني.</p>';
    renderTicket();
  }

  /* ---------- أقرب المواعيد المتاحة — ويدجت حية ---------- */
  function renderLiveSlots() {
    const host = document.getElementById('live-slots');
    if (!host) return;
    const free = BF.nextFreeSlots(4);
    host.innerHTML = free.length
      ? free.map(s => `
          <div class="pm-row live">
            <span class="pm-day">${s.branchName ? s.branchName + ' · ' : ''}${s.label}</span>
            <span class="pm-time">${s.time}</span>
            <button type="button" class="pm-btn pm-book" data-date="${s.dateIso}" data-time="${s.time}" data-branch="${s.branchId || ''}">احجز</button>
          </div>`).join('')
      : '<p class="slot-hint" style="padding:14px">كل المواعيد محجوزة الفترة الجاية. كلمنا على واتساب</p>';

    host.querySelectorAll('.pm-book').forEach(btn =>
      btn.addEventListener('click', () => prefillBooking(btn.dataset.date, btn.dataset.time, '', btn.dataset.branch)));

    const todayEl = document.getElementById('pm-today');
    if (todayEl) todayEl.textContent = BF.labelFor(new Date());
  }

  function flashBoard() {
    const board = document.getElementById('booking-form');
    board.classList.add('flash');
    setTimeout(() => board.classList.remove('flash'), 1200);
  }

  function prefillBooking(dateIso, timeLabel, service, branchId) {
    if (service) book.service = service;
    if (branchId) book.branchId = branchId;
    book.dayIso = dateIso;
    book.slot = timeLabel;
    renderBranches();
    renderServices();
    setStep(book.service && book.branchId ? 2 : 1);
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
    flashBoard();
  }

  function pickBranch(id) {
    book.branchId = id;
    book.slot = null;
    hideErr('err-branch');
    renderBranches();
    renderTicket();
  }

  function pickService(name) {
    book.service = name;
    hideErr('err-service');
    renderServices();
    renderTicket();
  }

  /* ---------- إرسال الحجز ---------- */
  function bindForm() {
    document.getElementById('branch-grid').addEventListener('click', e => {
      const btn = e.target.closest('[data-branch]');
      if (!btn) return;
      pickBranch(btn.dataset.branch);
    });

    document.getElementById('svc-grid').addEventListener('click', e => {
      const btn = e.target.closest('[data-service]');
      if (!btn) return;
      pickService(btn.dataset.service);
    });

    document.getElementById('services-list').addEventListener('click', e => {
      const btn = e.target.closest('.svc-pick');
      if (!btn) return;
      pickService(btn.dataset.service);
      if (book.branchId) setStep(2);
      else setStep(1);
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
      flashBoard();
    });

    document.getElementById('date-rail').addEventListener('click', e => {
      const btn = e.target.closest('[data-date]');
      if (!btn || btn.disabled) return;
      book.dayIso = btn.dataset.date;
      book.slot = null;
      hideErr('err-time');
      renderDates();
      renderSlots();
    });

    document.getElementById('slot-grid').addEventListener('click', e => {
      const btn = e.target.closest('[data-slot]');
      if (!btn || btn.disabled) return;
      book.slot = btn.dataset.slot;
      hideErr('err-time');
      renderSlots();
    });

    document.getElementById('bk-next-1').addEventListener('click', () => {
      let ok = true;
      if (!book.branchId) { showErr('err-branch'); ok = false; }
      if (!book.service) { showErr('err-service'); ok = false; }
      if (!ok) return;
      setStep(book.slot ? 3 : 2);
    });
    document.getElementById('bk-back-2').addEventListener('click', () => setStep(1));
    document.getElementById('bk-next-2').addEventListener('click', () => {
      if (!book.slot) { showErr('err-time'); return; }
      setStep(3);
    });
    document.getElementById('bk-back-3').addEventListener('click', () => setStep(2));

    document.querySelectorAll('.book-step').forEach(el => {
      el.addEventListener('click', () => {
        const s = Number(el.dataset.step);
        if (s === 1) setStep(1);
        if (s === 2 && book.service && book.branchId) setStep(2);
        if (s === 3 && book.service && book.branchId && book.slot) setStep(3);
      });
    });

    ['bk-name', 'bk-phone'].forEach(id =>
      document.getElementById(id).addEventListener('input', () => {
        hideErr(id === 'bk-name' ? 'err-name' : 'err-phone');
      }));

    document.getElementById('booking-form').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      const name = f.name.value.trim();
      const phone = BF.digitsPhone(f.phone.value);
      const service = book.service;
      const dayIso = book.dayIso;

      let ok = true;
      if (!service) { setStep(1); showErr('err-service'); ok = false; }
      if (!book.branchId) { setStep(1); showErr('err-branch'); ok = false; }
      if (name.length < 3) { showErr('err-name'); ok = false; }
      if (!PHONE_RE.test(phone)) { showErr('err-phone'); ok = false; }
      if (!book.slot) { setStep(2); showErr('err-time'); ok = false; }
      if (!ok) return;

      if (BF.isSlotTaken(dayIso, book.slot, book.branchId)) {
        book.slot = null;
        setStep(2);
        showErr('err-time');
        document.getElementById('err-time').textContent = 'المعاد ده اتحجز للتو. اختار وقت تاني';
        return;
      }

      const slot = D.slots.find(s => s.label === book.slot);
      const br = currentBranch();
      const booking = BF.addBooking({
        id: 'b' + Date.now().toString(36),
        ref: BF.nextRef(),
        name, phone, service,
        date: dayIso,
        dayLabel: BF.labelFor(BF.fromIso(dayIso)),
        time: book.slot,
        hour: slot ? slot.h : 17,
        branchId: br.id,
        branchName: br.name,
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
      <div><dt>التخصص</dt><dd>${b.branchName || ''}</dd></div>
      <div><dt>الخدمة</dt><dd>${b.service}</dd></div>
      <div><dt>الميعاد</dt><dd>${b.dayLabel} الساعة ${b.time}</dd></div>
      <div><dt>الموبايل</dt><dd dir="ltr">${b.phone}</dd></div>`;

    const msg = BF.fillTemplate(BF.getTemplates().confirm, {
      ref: b.ref, name: b.name, phone: b.phone,
      service: b.service, day: b.dayLabel, time: b.time,
      branch: b.branchName || '',
    });
    document.getElementById('bs-wa').href = BF.waLink(D.clinic.phoneIntl, msg);
    document.getElementById('bs-gcal').href = BF.gcalUrl(b);

    document.getElementById('bs-ics').onclick = () => downloadICS(b);
    document.getElementById('bs-again').onclick = () => {
      card.hidden = true;
      const f = document.getElementById('booking-form');
      f.hidden = false;
      f.reset();
      book.step = 1;
      book.branchId = '';
      book.service = '';
      book.dayIso = '';
      book.slot = null;
      renderBranches();
      renderServices();
      setStep(1);
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
      `LOCATION:${(BF.branchById(b.branchId) || D.clinic).address}`,
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
      if (document.getElementById('booking-form').hidden) return;
      if (book.step >= 2) {
        renderDates();
        renderSlots();
      }
    });
  }

  function bindNav() {
    const menu = document.querySelector('.nav-menu');
    if (!menu) return;
    menu.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => { menu.removeAttribute('open'); });
    });
  }

  function bindReset() {
    document.getElementById('reset-data').addEventListener('click', BF.resetAll);
  }

  function googleFallback(el, branch) {
    const src = (branch && branch.mapsEmbedUrl) || D.clinic.mapsEmbedUrl;
    el.innerHTML = `<iframe title="موقع العيادة على خرائط جوجل" src="${src}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  }

  let mapRef = null;
  let markerRef = null;
  let mapBranchId = '';

  function selectMapBranch(id) {
    const br = BF.branchById(id) || D.branches[0];
    mapBranchId = br.id;
    document.querySelectorAll('[data-map-branch]').forEach(btn => {
      btn.classList.toggle('is-on', btn.dataset.mapBranch === br.id);
    });
    const kicker = document.getElementById('map-kicker');
    const title = document.getElementById('map-title');
    if (kicker) kicker.textContent = 'عيادة ' + br.name;
    if (title) title.textContent = br.name;
    document.getElementById('map-address').textContent = br.address;
    document.getElementById('map-directions').href = br.mapsUrl;

    const el = document.getElementById('clinic-map');
    if (!mapRef || typeof L === 'undefined') {
      if (el) googleFallback(el, br);
      return;
    }
    mapRef.setView([br.lat, br.lng], 16);
    markerRef.setLatLng([br.lat, br.lng]);
  }

  function initMap() {
    const el = document.getElementById('clinic-map');
    if (!el) return;
    const start = D.branches[0];
    mapBranchId = start.id;
    const lat = start.lat;
    const lng = start.lng;

    if (typeof L === 'undefined') {
      googleFallback(el, start);
      return;
    }

    const map = L.map(el, {
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
    }).setView([lat, lng], 16);
    mapRef = map;

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap · CARTO',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    tiles.on('tileerror', () => {
      if (el.dataset.tiles === 'osm') return;
      el.dataset.tiles = 'osm';
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);
    });

    const icon = L.divIcon({
      className: 'clinic-marker',
      html: '<span class="clinic-marker-pulse"></span><svg class="clinic-marker-svg" viewBox="0 0 32 40" width="32" height="40" aria-hidden="true"><path fill="#0F766E" d="M16 0C7.7 0 1 6.5 1 14.6 1 24 16 40 16 40s15-16 15-25.4C31 6.5 24.3 0 16 0z"/><circle cx="16" cy="14" r="5.5" fill="#ECFDF5"/></svg>',
      iconSize: [48, 56],
      iconAnchor: [24, 52],
    });
    markerRef = L.marker([lat, lng], { icon, keyboard: false }).addTo(map);

    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map);

    const refresh = () => {
      map.invalidateSize();
      const br = BF.branchById(mapBranchId) || start;
      map.setView([br.lat, br.lng], 16, { animate: false });
      if (window.innerWidth < 760) map.panBy([0, 78], { animate: false });
    };
    requestAnimationFrame(refresh);
    setTimeout(refresh, 400);
    window.addEventListener('resize', refresh);
    selectMapBranch(start.id);
  }

  document.addEventListener('DOMContentLoaded', () => {
    fillStatic();
    renderBranches();
    renderServices();
    renderTicket();
    setStep(1);
    renderLiveSlots();
    bindForm();
    bindNav();
    bindReset();
    initMap();
    initReveal();
    initCounters();
    watchChanges();
  });
})();
