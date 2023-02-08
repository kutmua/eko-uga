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

  /* ЗАПУСК ФУНКЦИЙ */
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
});