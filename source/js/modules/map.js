import ymaps from 'ymaps';

const initMap = () => {
  if (document.getElementById('map')) {
    ymaps
        .load('https://api-maps.yandex.ru/2.1/?apikey=c71f1ef2-a698-4a2f-bf48-bae676848e90&lang=ru_RU')
        .then((maps) => {
          const myMap = new maps.Map('map', {
            center: [55.544667, 37.336759],
            zoom: 17,
          });
          let myPlacemark;
          const addressView = new maps.SuggestView('address');

          addressView.events.add('select', function (evt) {
            maps.geocode(evt.get('item').value.toString(), {results: 1}).then(function (res) {
              const firstGeoObject = res.geoObjects.get(0);
              const coords = firstGeoObject.geometry.getCoordinates();

              setPlacemark(coords);
            });
          });

          // Слушаем клик на карте.
          myMap.events.add('click', function (e) {
            const coords = e.get('coords');

            setPlacemark(coords);
            getAddress(coords);
          });

          // Создание метки.
          function createPlacemark(coords) {
            return new maps.Placemark(coords, {
              iconCaption: 'поиск...',
            }, {
              preset: 'islands#violetDotIconWithCaption',
              draggable: true,
            });
          }

          function setPlacemark(coords) {
            if (myPlacemark) {
              myPlacemark.geometry.setCoordinates(coords);
            } else {
              myPlacemark = createPlacemark(coords);
              myMap.geoObjects.add(myPlacemark);
              // Слушаем событие окончания перетаскивания на метке.
              myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
              });
            }

            myMap.setCenter(coords);
          }

          // Определяем адрес по координатам (обратное геокодирование).
          function getAddress(coords) {
            myPlacemark.properties.set('iconCaption');
            maps.geocode(coords).then(function (res) {
              let firstGeoObject = res.geoObjects.get(0);

              myPlacemark.properties
                  .set({
                    balloonContent: firstGeoObject.getAddressLine(),
                  });

              document.getElementById('address').value = firstGeoObject.getAddressLine();
            });
          }
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log('Failed to load Yandex Maps', error));
  }
};

export {initMap};
