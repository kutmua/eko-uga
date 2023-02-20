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

  /* счетчик скидки */
  const clocks = document.querySelectorAll('.counter-js');
  const deadline = new Date();
  // let yearsDifference = 1;
  // let monthsDifference = 1;
  // let dayDifference = 1;
  let hoursDifference = 1;
  let minutesDifference = 30;
  // let secondsDifference = 60;

    /* установки для счетчика */
  deadline.setHours(deadline.getHours() + hoursDifference);
  deadline.setMinutes(deadline.getMinutes() + minutesDifference);
  // deadline.setSeconds(deadline.getSeconds() + secondsDifference);

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

      (t.days <= 0) ? daysSpan.innerHTML = '00' : true;
      (t.days < 10) ? daysSpan.innerHTML = `0${t.days}` : daysSpan.innerHTML = t.days;
      
      (t.hours <= 0) ? hoursSpan.innerHTML = '00' : true;
      (t.hours < 10) ? hoursSpan.innerHTML = `0${t.hours}` : hoursSpan.innerHTML = t.hours;
    
      (t.minutes <= 0) ? minutesSpan.innerHTML = '00' : true;
      (t.minutes < 10) ? minutesSpan.innerHTML = `0${t.minutes}` : minutesSpan.innerHTML = t.minutes;

      (t.seconds <= 0) ? secondsSpan.innerHTML = '00' : true;
      (t.seconds < 10) ? secondsSpan.innerHTML = `0${t.seconds}` : secondsSpan.innerHTML = t.seconds; 
      
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
    updateClock();
    setInterval(updateClock,1000);
  }

  clocks.forEach(clock => {
    initializeClock(clock, deadline);
  })

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

    /* iunput-mask, just-validate */
  const inputMask = new Inputmask('+7 (999) 999-99-99');
  const forms = document.querySelectorAll('.validate-form-js');
  const requestModal = new bootstrap.Modal('#requestModal', {
    keyboard: true
  });
  const gratitudeModal = new bootstrap.Modal('#gratitudeModal', {
    keyboard: true
  })
  const priceModal = new bootstrap.Modal('#priceModal', {
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
      requestModal.hide();
      priceModal.hide();
      gratitudeModal.show();
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

    /* cars-swiper */  
  const carsSwiperSmall = new Swiper(".cars__swiper-small-1", {
    spaceBetween: 10,
    slidesPerView: 7,
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
        slidesPerView: 5
      },
      650: {
        slidesPerView: 6
      },
      770: {
        slidesPerView: 7
      },
    }
  });

  const carsSwiperBig = new Swiper(".cars__swiper-big-1", {
    loop: true,
    navigation: {
      nextEl: '.cars__swiper-big-btn-next',
      prevEl: '.cars__swiper-big-btn-prev',
    },
    thumbs: {
      swiper: carsSwiperSmall,
    },
  });

  const carsSwiperSmall2 = new Swiper(".cars__swiper-small-2", {
    spaceBetween: 10,
    slidesPerView: 7,
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
        slidesPerView: 5
      },
      650: {
        slidesPerView: 6
      },
      770: {
        slidesPerView: 7
      },
    }
  });

  const carsSwiperBig2 = new Swiper(".cars__swiper-big-2", {
    loop: true,
    navigation: {
      nextEl: '.cars__swiper-big-btn-next',
      prevEl: '.cars__swiper-big-btn-prev',
    },
    thumbs: {
      swiper: carsSwiperSmall2,
    },
  });
});