document.addEventListener("DOMContentLoaded", function () {
  /* открытие и закрытие бургера */
  const burger = document.querySelector('.header-nav-js');
  const burgerBtn = document.querySelector('.header-burger-js');
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

  /* кнопка "показать еще" */
  const portfolioArray = Array.from(document.querySelector('.portfolio-container-js').children);
  const showMoreBtn = document.querySelector('.show-more-btn-js');
  const caseLength = document.querySelectorAll('.portfolio__case').length;
  let items = 8;

  showMoreBtn.addEventListener('click', () => {
    items +=2;
    const visibleItems = portfolioArray.slice(0, items);
  
    visibleItems.forEach(el => {
      el.classList.add('show');
    })
  
    if (visibleItems.length === caseLength) {
      showMoreBtn.style.display = 'none';
    }
  })


/* -------------------------------------------- */

  /* счетчик скидки */
  const clocks = document.querySelectorAll('.counter-js');
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

      if (t.total <= 0) {
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

    /* открытие селекта */
  const formSelect = document.querySelectorAll('._form__select');

  formSelect.forEach(select => {
    select.addEventListener('click', () => {
      select.classList.toggle('open')
    })
  })
  document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('_form__select')) {
      formSelect.forEach(select => {
        if(select.classList.contains('open')) {
          select.classList.remove('open')
        }
      })
    }
  })

/* -------------------------------------------- */

    /* слайдер ДО и ПОСЛЕ (оставить только для GitHub) */
  const slider = document.querySelector('.contrast-slider-js');
  const before = document.querySelector('.before');
  const beforeImage = before.querySelector('img');
  const change = document.querySelector('.change');
  const body = document.body;

  let isActive = false;

  let width = slider.offsetWidth;
  beforeImage.style.width = `${width}px`;

  change.addEventListener('mousedown', () => {
    isActive = true;
  });

  body.addEventListener('mouseup', () => {
    isActive = false;
  });

  body.addEventListener('mouseleave', () => {
    isActive = false;
  });

  const beforeAfterSlider = (x) => {
    let shift = Math.max(0, Math.min(x, slider.offsetWidth));
    before.style.width = `${shift}px`;
    change.style.left = `${shift}px`;
  };

  const pauseEvents = (e) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  body.addEventListener('mousemove', (e) => {
    if (!isActive) {
      return;
    }

    let x = e.pageX;
    x -= slider.getBoundingClientRect().left;
    beforeAfterSlider(x);
    pauseEvents(e);
  });

  change.addEventListener('touchstart', () => {
    isActive = true;
  });

  body.addEventListener('touchend', () => {
    isActive = false;
  });

  body.addEventListener('touchcancel', () => {
    isActive = false;
  });

  body.addEventListener('touchmove', (e) => {
    if (!isActive) {
      return;
    }

    let x;
    
    let i;
    for (i = 0; i < e.changedTouches.length; i++) {
      x = e.changedTouches[i].pageX; 
    }
    
    x -= slider.getBoundingClientRect().left;

    beforeAfterSlider(x);
    pauseEvents(e);
  });

/* -------------------------------------------- */

  /* ЗАПУСК ФУНКЦИЙ */
  smoothScroll();
  window.addEventListener('resize', smoothScroll);

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
  const reviewsSwiper = new Swiper('.reviews-swiper', {
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

    /* stats-swiper */
  const statsSwiper = new Swiper('.stats__swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".stats__swiper-pagination",
      renderBullet: function (index, className) {
        return '<button class="'+ className + ' stats__swiper-btn button stats__swiper-btn-' + (index + 1) + '"></button>';
      },
      clickable: true,
    },
  });
  
    /* city-swiper */  
  const citySwiperSmall = new Swiper(".city__swiper-small", {
    spaceBetween: 10,
    slidesPerView: 10,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      200: {
        slidesPerView: 4
      },
      360: {
        slidesPerView: 5
      },
      500: {
        slidesPerView: 7
      },
      650: {
        slidesPerView: 8
      },
      770: {
        slidesPerView: 10
      },
    }
  });
  const citySwiperBig = new Swiper(".city__swiper-big", {
    loop: true,
    navigation: {
      nextEl: '.city__swiper-big-btn-next',
      prevEl: '.city__swiper-big-btn-prev',
    },
    thumbs: {
      swiper: citySwiperSmall,
    },
  });

    /* iunput-mask, just-validate */
  const inputMask = new Inputmask('+7 (999) 999-99-99');
  const forms = document.querySelectorAll('.validate-form-js');
  const requestModal = new bootstrap.Modal('#requestModal', {
    keyboard: true
  });
  const gratitudeModal = new bootstrap.Modal('#gratitudeModal', {
    keyboard: true
  })

  forms.forEach(form => {
    // iunput-mask
    const inputTel = form.querySelector('input[type="tel"]');

    inputMask.mask(inputTel);

    /* --------- */

    // just-validate
    const validation = new JustValidate(form, {
      errorFieldCssClass: 'is-invalid',
    });
    validation
    .addField('.validate-form-phone-js', [
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

      /* блок для эмуляции отправки формы для GitHub pages*/
      const gratitudeModal = new bootstrap.Modal('#gratitudeModal', {
        keyboard: true
      })
      gratitudeModal.show();
      requestModal.hide();
      event.target.reset();
      /* --------------------------------- */

      /* рабочий блок отправки формы на почту для хостинга*/
      // let formData = new FormData(event.target);

      // let xhr = new XMLHttpRequest();

      // xhr.onreadystatechange = function () {
      //   if (xhr.readyState === 4) {
      //     if (xhr.status === 200) {

      //       requestModal.hide();
      //       gratitudeModal.show();
      //       console.log('Отправлено');
      //       event.target.reset();
      //     }
      //   }
      // }

      // xhr.open('POST', 'mail.php', true);
      // xhr.send(formData);
    });
  })
});