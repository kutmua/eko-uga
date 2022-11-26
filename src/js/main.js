document.addEventListener("DOMContentLoaded", function () {

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
});