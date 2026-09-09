/* ============================================================
   منطق الصفحة العامة — الموقع العام للعيادة
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
    phoneLink.textContent = D.clinic.phone;
    phoneLink.href = 'tel:' + D.clinic.phone.replace(/\s/g, '');

    document.getElementById('footer-wa').href =
      BF.waLink(D.clinic.phone, 'أهلاً، عايز أستفسر عن موعد في العيادة');

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

    // قوائم الحجز
    document.getElementById('bk-service').innerHTML =
      '<option value="" disabled selected>اختار الخدمة</option>' +
      D.services.map(s => `<option>${s.name}</option>`).join('');
    document.getElementById('bk-day').innerHTML =
      '<option value="" disabled selected>اختار اليوم</option>' +
      D.bookingDays.map(d => `<option>${d}</option>`).join('');
    document.getElementById('bk-time').innerHTML =
      '<option value="" disabled selected>اختار الوقت</option>' +
      D.bookingTimes.map(t => `<option>${t}</option>`).join('');
  }

  /* ---------- المزايا المقفولة على الصفحة العامة ---------- */
  function renderPublicLocks() {
    const host = document.getElementById('public-locks');
    const chips = [];
    if (!BF.canUse('plus')) {
      chips.push(['panel', 'لوحة التحكم'], ['reminder', 'تذكير الواتساب']);
    }
    if (!BF.canUse('center')) {
      chips.push(['reports', 'التقارير']);
    }
    host.innerHTML = chips.map(([key, label]) => `
      <button type="button" class="lock-chip" data-lock="${key}" data-feature="${key}">
        ${BF.LOCK_ICON} ${label}
      </button>`).join('');
    host.querySelectorAll('[data-lock]').forEach(btn =>
      btn.addEventListener('click', () => BF.showLock(btn.dataset.lock)));
  }

  /* ---------- زر دخول العيادة ---------- */
  function renderPanelEntry() {
    const btn = document.getElementById('nav-panel');
    if (BF.canUse('plus')) {
      btn.onclick = () => { location.href = 'panel.html' + location.hash; };
      btn.classList.remove('locked');
      btn.innerHTML = 'دخول العيادة';
    } else {
      btn.onclick = () => BF.showLock('panel');
      btn.innerHTML = 'دخول العيادة';
    }
  }

  /* ---------- الدفع أونلاين (محاكاة — باقة مركز) ---------- */
  function renderPayZone() {
    const zone = document.getElementById('pay-zone');
    if (BF.canUse('center')) {
      zone.innerHTML = `
        <div class="field">
          <label style="display:flex;align-items:center;gap:10px;min-height:44px;cursor:pointer">
            <input type="checkbox" id="bk-pay" style="width:22px;height:22px;accent-color:var(--accent)">
            <span>عايز أدفع أونلاين</span>
          </label>
        </div>
        <div class="pay-sim" id="pay-sim" hidden>
          <span class="sim-tag">محاكاة — مش دفع حقيقي</span>
          <p style="font-size:14px;color:var(--ink-soft);margin-block-end:10px">
            في النسخة الحقيقية هنا بيظهر للمريض ملخص الدفع (عربون أو الكشف كامل) ويكمل من موبايله.
          </p>
          <div class="field" style="margin-block-end:10px">
            <label for="pay-amount">المبلغ</label>
            <select id="pay-amount">
              <option>عربون 200 جنيه</option>
              <option>الكشف كامل 400 جنيه</option>
            </select>
          </div>
        </div>`;
      zone.querySelector('#bk-pay').addEventListener('change', e => {
        zone.querySelector('#pay-sim').hidden = !e.target.checked;
      });
    } else {
      zone.innerHTML = `
        <div class="lock-strip" style="margin-block:4px 16px">
          <button type="button" class="lock-chip" id="pay-lock" data-feature="payment">
            ${BF.LOCK_ICON} الدفع أونلاين
          </button>
        </div>`;
      zone.querySelector('#pay-lock').addEventListener('click', () => BF.showLock('payment'));
    }
  }

  /* ---------- إرسال الحجز ---------- */
  function bindForm() {
    document.getElementById('booking-form').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      const payOn = f.querySelector('#bk-pay');
      let msg = BF.fillTemplate(BF.getTemplates().confirm, {
        name: f.name.value.trim(),
        phone: f.phone.value.trim(),
        service: f.service.value,
        day: f.day.value,
        time: f.time.value,
      });
      if (payOn && payOn.checked) {
        const amount = f.querySelector('#pay-amount').value;
        msg += `\nالدفع أونلاين: نعم — ${amount} (محاكاة)`;
      }
      window.open(BF.waLink(D.clinic.phone, msg), '_blank', 'noopener');
    });
  }

  /* ---------- إعادة تعيين ---------- */
  function bindReset() {
    document.getElementById('reset-data').addEventListener('click', BF.resetAll);
  }

  /* ---------- كروت الباقات — مزامنة مع الوضع الحالي ---------- */
  function renderTierCards() {
    const mode = BF.getMode();
    document.querySelectorAll('.tier-card').forEach(card => {
      const isCurrent = card.dataset.tier === mode;
      card.classList.toggle('current', isCurrent);
      const badge = card.querySelector('.tier-current');
      if (badge) badge.hidden = !isCurrent;
      const btn = card.querySelector('.tier-btn');
      if (btn) {
        btn.disabled = isCurrent;
        btn.textContent = isCurrent ? 'دي الباقة اللي بتتفرج عليها' : 'شوف الديمو بالباقة دي';
      }
    });
  }

  function bindTierCards() {
    document.querySelectorAll('.tier-btn').forEach(btn =>
      btn.addEventListener('click', () => {
        BF.setMode(btn.dataset.go);
        document.getElementById('pricing').scrollIntoView({ block: 'start' });
      }));
  }

  /* ---------- إعادة الرسم عند تغيير الباقة ---------- */
  window.renderPage = function () {
    renderPublicLocks();
    renderPanelEntry();
    renderPayZone();
    renderTierCards();
  };

  document.addEventListener('DOMContentLoaded', () => {
    fillStatic();
    bindForm();
    bindReset();
    bindTierCards();
    window.renderPage();
  });
})();
