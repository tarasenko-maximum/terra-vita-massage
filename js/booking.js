/**
 * Terra Vita Massage & Spa — Booking Form Logic
 * Валидация, маска телефона, time slots, отправка формы
 */

document.addEventListener('DOMContentLoaded', function () {
  initPhoneMask();
  initTimeSlots();
  initFormValidation();
  initServicePrefill();
  initHoneypot();
});

/* ============================================
   1. Phone Mask (+381 / 06x)
   ============================================ */
function initPhoneMask() {
  var phoneInput = document.getElementById('phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', function () {
    var value = this.value.replace(/[^\d+]/g, '');

    if (value.startsWith('+381')) {
      // Format: +381 6X XXX XXXX
      var digits = value.replace('+381', '');
      if (digits.length > 0) {
        var formatted = '+381 ';
        if (digits.length <= 2) {
          formatted += digits;
        } else if (digits.length <= 5) {
          formatted += digits.slice(0, 2) + ' ' + digits.slice(2);
        } else {
          formatted += digits.slice(0, 2) + ' ' + digits.slice(2, 5) + ' ' + digits.slice(5, 9);
        }
        this.value = formatted;
      } else {
        this.value = '+381 ';
      }
    } else if (value.startsWith('0')) {
      // Format: 06x XXX XXXX
      var digits = value.slice(1);
      if (digits.length > 0) {
        var formatted = '0';
        if (digits.length <= 3) {
          formatted += digits;
        } else if (digits.length <= 6) {
          formatted += digits.slice(0, 3) + ' ' + digits.slice(3);
        } else {
          formatted += digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6, 10);
        }
        this.value = formatted;
      }
    }
  });

  // Set prefix if empty on focus
  phoneInput.addEventListener('focus', function () {
    if (!this.value) {
      this.value = '+381 ';
    }
  });
}

/* ============================================
   2. Time Slots Generator
   ============================================ */
function initTimeSlots() {
  var container = document.getElementById('time-slots');
  var dateInput = document.getElementById('date');
  if (!container || !dateInput) return;

  // Set min date to today
  var today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  function generateSlots() {
    container.innerHTML = '';
    container.className = 'time-slots';

    var slots = [
      '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
    ];

    var selectedDate = dateInput.value;
    var now = new Date();
    var isToday = selectedDate === today;

    slots.forEach(function (time) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'time-slot';
      btn.textContent = time;

      // Disable past times for today
      if (isToday) {
        var parts = time.split(':');
        var slotHour = parseInt(parts[0], 10);
        if (slotHour <= now.getHours()) {
          btn.classList.add('disabled');
          btn.disabled = true;
        }
      }

      btn.addEventListener('click', function () {
        if (this.disabled) return;
        container.querySelectorAll('.time-slot').forEach(function (s) {
          s.classList.remove('selected');
        });
        this.classList.add('selected');

        // Hidden input
        var hidden = document.getElementById('time-selected');
        if (!hidden) {
          hidden = document.createElement('input');
          hidden.type = 'hidden';
          hidden.id = 'time-selected';
          hidden.name = 'time';
          this.closest('form').appendChild(hidden);
        }
        hidden.value = this.textContent.trim();
      });

      container.appendChild(btn);
    });
  }

  generateSlots();

  dateInput.addEventListener('change', function () {
    container.querySelectorAll('.time-slot').forEach(function (s) {
      s.classList.remove('selected');
    });
    var hidden = document.getElementById('time-selected');
    if (hidden) hidden.value = '';
    generateSlots();
  });
}

/* ============================================
   3. Form Validation & Submission
   ============================================ */
function initFormValidation() {
  var form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var errors = [];
    var formData = new FormData(form);

    // Validate name
    var name = formData.get('name') || '';
    if (name.trim().length < 2) {
      errors.push('Укажите ваше имя (минимум 2 символа)');
    }

    // Validate phone
    var phone = formData.get('phone') || '';
    var phoneDigits = phone.replace(/[\s\-\+\(\)]/g, '');
    if (phoneDigits.length < 10) {
      errors.push('Укажите корректный номер телефона (минимум 10 цифр)');
    }

    // Validate service
    var service = formData.get('service') || '';
    if (!service) {
      errors.push('Выберите услугу');
    }

    // Validate master
    var master = formData.get('master') || '';
    if (!master) {
      errors.push('Выберите мастера');
    }

    // Validate date
    var date = formData.get('date') || '';
    if (!date) {
      errors.push('Выберите дату');
    }

    // Validate time
    var time = document.getElementById('time-selected');
    if (!time || !time.value) {
      errors.push('Выберите время');
    }

    // Show errors
    var errorContainer = document.getElementById('form-errors');
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.id = 'form-errors';
      errorContainer.className = 'mb-4';
      form.insertBefore(errorContainer, form.firstChild);
    }

    if (errors.length > 0) {
      errorContainer.innerHTML =
        '<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">' +
        '<ul class="list-disc list-inside">' +
        errors.map(function (e) { return '<li>' + e + '</li>'; }).join('') +
        '</ul></div>';
      errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Clear errors
    errorContainer.innerHTML = '';

    // Submit via Web3Forms / Formspree
    submitForm(form, formData);
  });
}

/* ============================================
   4. Submit Form (Web3Forms + Fallback)
   ============================================ */
function submitForm(form, formData) {
  var submitBtn = form.querySelector('button[type="submit"]');
  var originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка...';

  // Build data object
  var data = {};
  formData.forEach(function (value, key) {
    if (key === 'time') return; // handled separately
    data[key] = value;
  });
  // Add time from hidden input
  var timeInput = document.getElementById('time-selected');
  if (timeInput && timeInput.value) {
    data['time'] = timeInput.value;
  }

  // Use Web3Forms (configured in action attribute)
  // If action is set, let the browser handle it natively
  var action = form.getAttribute('action');
  if (action && action.includes('web3forms') || action && action.includes('formspree')) {
    // Use fetch API for AJAX submission
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.success || data.ok) {
        showSuccess(form);
      } else {
        throw new Error(data.message || 'Ошибка отправки');
      }
    })
    .catch(function (error) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      showToast('Ошибка: ' + error.message + '. Пожалуйста, попробуйте позже.', 'error');
    });
  } else {
    // No action configured — show success message (demo mode)
    setTimeout(function () {
      showSuccess(form);
    }, 1000);
  }
}

/* ============================================
   5. Success Handler
   ============================================ */
function showSuccess(form) {
  form.innerHTML =
    '<div class="text-center py-12 fade-in visible">' +
    '<div class="w-20 h-20 mx-auto mb-6 bg-[#2E4A3B] rounded-full flex items-center justify-center">' +
    '<i class="fas fa-check text-white text-3xl"></i>' +
    '</div>' +
    '<h2 class="font-heading text-2xl text-[#2E4A3B] mb-3">Спасибо за заявку!</h2>' +
    '<p class="text-gray-600 max-w-md mx-auto mb-6">' +
    'Мы свяжемся с вами в течение 15 минут для подтверждения записи.' +
    '</p>' +
    '<a href="index.html" class="btn btn-primary">На главную</a>' +
    '</div>';
}

/* ============================================
   6. Prefill Service from URL params or sessionStorage
   ============================================ */
function initServicePrefill() {
  var serviceSelect = document.getElementById('service');
  if (!serviceSelect) return;

  // Check URL params
  var params = new URLSearchParams(window.location.search);
  var serviceParam = params.get('service') || sessionStorage.getItem('prefill_service');

  if (serviceParam) {
    var option = Array.from(serviceSelect.options).find(function (opt) {
      return opt.value === serviceParam || opt.text.toLowerCase().includes(serviceParam.toLowerCase());
    });
    if (option) {
      option.selected = true;
    }
    sessionStorage.removeItem('prefill_service');
  }
}

/* ============================================
   7. Honeypot Spam Protection
   ============================================ */
function initHoneypot() {
  var hp = document.querySelector('input[name="_gotcha"], input[name="honeypot"]');
  if (hp) {
    hp.style.display = 'none';
    hp.parentElement && (hp.parentElement.style.display = 'none');
  }
}
