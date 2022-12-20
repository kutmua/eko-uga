document.addEventListener("DOMContentLoaded", function () {
  /* открытие и закрытие бургера */
  const burger = document.querySelector('.navbar-collapse.collapse');
  const burgerBtn = document.querySelector('.header__burger');
  burgerBtn.addEventListener('click', function() {
    this.classList.toggle('is-open')
  })

  function burgerClose() {
    if (burgerBtn.classList.contains('is-open')) {
      burgerBtn.classList.remove('is-open');
      burger.classList.remove('show')
    }
  }
/* -------------------------------------------- */

  /* плавный скролл */
  function smoothScroll() {
    const anchors = document.querySelectorAll('.anchor-link');

    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(event){
        event.preventDefault();

        const blockID = anchor.getAttribute('href');
        let headerHeight = document.querySelector('.header__nav').offsetHeight;
        let y = document.querySelector('' + blockID).offsetTop - headerHeight;
        window.scrollTo(0, y);

        burgerClose();
      });
    })
  }

/* -------------------------------------------- */

  /* счетчик скидки */
  const clocks = document.querySelectorAll('.counter');
  const deadline = new Date();
  // let yearsDifference = 1;
  // let monthsDifference = 1;
  // let dayDifference = 1;
  let hoursDifference = 1;
  let minutesDifference = 30;

    /* установки для счетчика */
  deadline.setHours(deadline.getHours() + hoursDifference)
  deadline.setMinutes(deadline.getMinutes() + minutesDifference);

  function getTimeRemaining(endtime){
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(selector, endtime){
    const daysSpan = selector.querySelector('[data-counter-indicator="day"]');
    const hoursSpan = selector.querySelector('[data-counter-indicator="hour"]');
    const minutesSpan = selector.querySelector('[data-counter-indicator="minutes"]');
    const secondsSpan = selector.querySelector('[data-counter-indicator="seconds"]');

    function updateClock(){
      const t = getTimeRemaining(endtime);
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = t.hours;
      minutesSpan.innerHTML = t.minutes;
      secondsSpan.innerHTML = t.seconds;

      if (t.total<=0) {
        clearInterval(timeinterval);
      }
    }
    updateClock();
    const timeinterval = setInterval(updateClock,1000);
  }

  clocks.forEach(clock => {
    initializeClock(clock, deadline);
  })

/* -------------------------------------------- */

  /* ЗАПУСК ФУНКЦИЙ */
  smoothScroll();
  window.addEventListener('resize',smoothScroll);

/* -------------------------------------------- */

  /* ИНИЦИАЛИЗАЦИЯ БИБЛИОТЕК */
    /* typed */
  const typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 150,
    backSpeed: 100,
    loop: true,
    loopCount: Infinity,
  });

    /* reviews-swiper */
  const swiper = new Swiper('.reviews-swiper', {
    direction: 'horizontal',

    pagination: {
      el: '.reviews-swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.reviews-swiper-btn-next',
      prevEl: '.reviews-swiper-btn-prev',
    },

  });

    /* iunput-mask, just-validate */
  const inputMask = new Inputmask('+7 (999) 999-99-99');
  const forms = document.querySelectorAll('._validate-form');

  forms.forEach(form => {
    // iunput-mask
    const inputTel = form.querySelector('input[type="tel"]');

    inputMask.mask(inputTel);

    /* --------- */

    // just-validate
    const validation = new JustValidate(form, {
      errorFieldCssClass: 'is-invalid',
    });
    const requestModal = new bootstrap.Modal('#requestModal', {
      keyboard: true
    });

    validation
    .addField('._validate-form__phone', [
      {
        validator: (value)=>{
          let phone = inputMask.unmaskedvalue(value);
          if (phone.length === 10){
            return true
          }
          else return false
        },
        errorMessage: 'Введите номер телефона',
      },
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
    ])
    .onSuccess((event) => {
      const gratitudeModal = new bootstrap.Modal('#gratitudeModal', {
        keyboard: true
      })
      requestModal.hide();
      gratitudeModal.show(event.submitter);

      setTimeout(()=>{
        event.path[0][0].value = '';
        event.path[0][1].value = '';
      }, 500);
    });
  })
});