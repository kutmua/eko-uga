document.addEventListener("DOMContentLoaded", function () {
    /* открытие бургера */
  const burgerBtn = document.querySelector('.header__burger');
  burgerBtn.addEventListener('click', function() {
    this.classList.toggle('is-open')
  })


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

    /* iunput-mask */
  const inputMask = new Inputmask('+7 (999) 999-99-99');
  const telSelector = document.querySelectorAll('input[type="tel"]');

  telSelector.forEach(tel => {
    inputMask.mask(tel)
  })
});