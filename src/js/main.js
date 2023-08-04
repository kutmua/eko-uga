document.addEventListener("DOMContentLoaded", function () {
  /* для корректного отображения загрузки страницы */
  document.getElementsByTagName("html")[0].style.visibility = "visible";

/* -------------------------------------------- */

  /* seo оптимизация */
  const telFirstSeo = document.querySelectorAll('.tel-1-seo');
  const telSecondSeo = document.querySelectorAll('.tel-2-seo');
  const emailSeo = document.querySelectorAll('.email-seo');

  function seoTarget() {
    if (emailSeo.length) {
      emailSeo.forEach(email => {
        email.addEventListener('click', () => {
          ym(93183406, 'reachGoal', 'email');
          return true;
        })
      })
    }

    if (telFirstSeo.length){
      telFirstSeo.forEach(firstTel => {
        firstTel.addEventListener('click', () => {
          ym(93183406, 'reachGoal', 'firstTel');
          return true;
        })
      })
    }

    if (telSecondSeo.length){
      telSecondSeo.forEach(secondTel => {
        secondTel.addEventListener('click', () => {
          ym(93183406, 'reachGoal', 'secondTel');
          return true;
        })
      })
    }
  }

/* -------------------------------------------- */

  /* открытие и закрытие бургера */
  const burger = document.querySelector('.header-nav-js');
  const burgerBtn = document.querySelector('.header-burger-js');
  const mobileNav = document.querySelector('.header__mobile-nav');

  burgerBtn.addEventListener('click', function() {
    this.classList.toggle('is-open');
    if (mobileNav.classList.contains('is-open')) {
      mobileNav.classList.remove('is-open');
      document.getElementsByTagName('body')[0].classList.remove('overflow--lock');
      document.getElementsByTagName('html')[0].classList.remove('overflow--lock');
    }
    else {
      mobileNav.classList.add('is-open');
      document.getElementsByTagName('body')[0].classList.add('overflow--lock');
      document.getElementsByTagName('html')[0].classList.add('overflow--lock');
    } 
  })

  function burgerClose() {
    if (burgerBtn.classList.contains('is-open')) {
      burgerBtn.classList.remove('is-open');
      burger.classList.remove('show');
      mobileNav.classList.remove('is-open');
      document.getElementsByTagName('body')[0].classList.remove('overflow--lock');
      document.getElementsByTagName('html')[0].classList.remove('overflow--lock');
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
  if (document.querySelector('.portfolio-container-js')){
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
  }

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
  const timerStorage = JSON.parse(localStorage.getItem('timer'));
  const deadline = new Date();
    // если нужен отсчет от дней
  // let dayDifference = 1;
    // если нужен отсчет от часов
  let hoursDifference = 1;
    // если нужен отсчет от минут
  let minutesDifference = 30;
    // если нужен отсчет от секунд
  // let secondsDifference = 30;

    /* установки для счетчика */
  deadline.setHours(deadline.getHours() + hoursDifference);
  deadline.setMinutes(deadline.getMinutes() + minutesDifference);
  // deadline.setSeconds(deadline.getSeconds() + secondsDifference);

  if (!timerStorage || timerStorage.total === 0) {
    clocks.forEach(clock => {
      getTimeRemaining(clock, false)

      const timeInterval = setInterval(() => {
        let t = getTimeRemaining(clock, false);

        if (t <= 0) {
          clearInterval(timeInterval);
          localStorage.removeItem('timer');
        }
      }, 1000);
    })
  }
  else {
    clocks.forEach(clock => {
      getTimeRemaining(clock, true)

      const timeInterval = setInterval(() => {
        let t = getTimeRemaining(clock, true);

        if (t <= 0) {
          clearInterval(timeInterval);
          localStorage.removeItem('timer');
        }
      }, 1000);
    })
  } 


  function getTimeRemaining(selector, check){
    if (check === false) { 
      let t = Date.parse(deadline) - Date.parse(new Date());
      let time = {};
      
      time = {
        total: t,
        seconds : Math.floor( (t/1000) % 60),
        minutes : Math.floor( (t/1000/60) % 60),
        hours : Math.floor( (t/(1000*60*60)) % 24),
        days : Math.floor( t/(1000*60*60*24))
      };

      drawTimer (selector, time);  
      localStorage.setItem('timer', JSON.stringify(time));

      return t
    }
    else {
      const timerStorage = JSON.parse(localStorage.getItem('timer'));
      let t;      
      if (timerStorage.total > 0) {
        t = timerStorage.total - 200;
      }
      let time = {};

      time = {
        total: t,
        seconds : Math.floor( ((t/1000) % 60) ),
        minutes : Math.floor( ((t/1000/60) % 60) ),
        hours : Math.floor( ((t/(1000*60*60)) % 24) ),
        days : Math.floor( (t/(1000*60*60*24)) )
      };

      drawTimer (selector, time);
      localStorage.setItem('timer', JSON.stringify(time));

      return t
    }
  }

  function drawTimer(selector, time) {
    const daysSpan = selector.querySelector('[data-counter-indicator="day"]');
    const hoursSpan = selector.querySelector('[data-counter-indicator="hour"]');
    const minutesSpan = selector.querySelector('[data-counter-indicator="minutes"]');
    const secondsSpan = selector.querySelector('[data-counter-indicator="seconds"]');

    (time.days <= 0) ? daysSpan.innerHTML = '00' : true;
    (time.days < 10) ? daysSpan.innerHTML = `0${time.days}` : daysSpan.innerHTML = time.days;
    
    (time.hours <= 0) ? hoursSpan.innerHTML = '00' : true;
    (time.hours < 10) ? hoursSpan.innerHTML = `0${time.hours}` : hoursSpan.innerHTML = time.hours;
  
    (time.minutes <= 0) ? minutesSpan.innerHTML = '00' : true;
    (time.minutes < 10) ? minutesSpan.innerHTML = `0${time.minutes}` : minutesSpan.innerHTML = time.minutes;

    (time.seconds <= 0) ? secondsSpan.innerHTML = '00' : true;
    (time.seconds < 10) ? secondsSpan.innerHTML = `0${time.seconds}` : secondsSpan.innerHTML = time.seconds; 
  }

/* -------------------------------------------- */

  /* ЗАПУСК ФУНКЦИЙ */
  seoTarget();
  smoothScroll();
  window.addEventListener('resize', smoothScroll);

/* -------------------------------------------- */

  /* ИНИЦИАЛИЗАЦИЯ БИБЛИОТЕК */
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
    const formBtnSubmit = form.querySelector('._form__btn.disable');

    formBtnSubmit.addEventListener('click', function () {
      ym(93183406, 'reachGoal', 'formid');
      return true;
    });

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
            if(formBtnSubmit.classList.contains('disable') && formBtnSubmit.hasAttribute('disabled')){
              formBtnSubmit.removeAttribute('disabled');
              formBtnSubmit.classList.remove('disable');
            }
            return true
          }
          else {
            if(!formBtnSubmit.classList.contains('disable') && !formBtnSubmit.hasAttribute('disabled')){
              formBtnSubmit.setAttribute('disabled', '');
              formBtnSubmit.classList.add('disable');
            }
            return false
          }
            
        },
        errorMessage: 'Введите номер телефона',
      },
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
    ])

    .onSuccess((event) => {

      if(!formBtnSubmit.classList.contains('disable') && !formBtnSubmit.hasAttribute('disabled')){
        formBtnSubmit.setAttribute('disabled', '');
        formBtnSubmit.classList.add('disable');
      }

      /* блок для эмуляции отправки формы для GitHub pages*/
      const gratitudeModal = new bootstrap.Modal('#gratitudeModal', {
        keyboard: true
      })
      // requestModal.hide();
      // priceModal.hide();
      // gratitudeModal.show();
      // event.target.reset();
      /* --------------------------------- */

      /* рабочий блок отправки формы на почту для хостинга*/
      let formData = new FormData(event.target);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            requestModal.hide();
            priceModal.hide();
            console.log('Отправлено');
            event.target.reset();
          }
        }
      }

      if (document.querySelector('.send-main-page.hidden')) {
        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);
        location.replace("https://eko-yuga.ru/thanks-page");
      }
      else if (document.querySelector('.send-secondary-page.hidden')) {
        xhr.open('POST', '../mail.php', true);
        xhr.send(formData);
        location.replace("https://eko-yuga.ru/thanks-page");
      }
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