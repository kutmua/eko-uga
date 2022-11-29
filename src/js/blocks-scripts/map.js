ymaps.ready(init);
function init(){
  const myMap = new ymaps.Map("map", {
    center: [45.02758378, 39.02070407],
    controls: [],
    zoom: 15,
  });

  myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    hintContent: 'Краснодар, Селезнева 4. "Эко-Юга"',
  }, {
    iconLayout: 'default#image',
    iconImageHref:'../img/placemark.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-10, -20]
  }),

  myMap.geoObjects.add(myPlacemark);                                            /* добавление метки */
  myMap.behaviors.disable([
    'scrollZoom', 'dblClickZoom', 'multiTouch', 'rightMouseButtonMagnifier',    /* полное отключение зума карты */
    'leftMouseButtonMagnifier'
  ]);
  myMap.behaviors.disable('drag');                                              /* полное отключение перетаскивания карты на телефонах */
}