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

    /* iunput-mask, just-validate */
  const inputMask = new Inputmask('+7 (999) 999-99-99');
  const forms = document.querySelectorAll('.counter-form');

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
    .addField('.counter-form__phone', [
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
      console.log('Validation passes and form submitted', event);
    });
  })
});