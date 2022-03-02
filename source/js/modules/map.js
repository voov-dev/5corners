import ymaps from 'ymaps';
import _ from 'lodash/lodash';

const initMap = () => {
  if (document.getElementById('map')) {
    ymaps
        .load('https://api-maps.yandex.ru/2.1/?apikey=c71f1ef2-a698-4a2f-bf48-bae676848e90&lang=ru_RU')
        .then((maps) => {
          const myMap = new maps.Map('map', {
            center: [55.544667, 37.336759],
            zoom: 17,
            controls: [],
          });
          let myPlacemark;
          let newCoords = [55.544667, 37.336759];
          const addressView = new maps.SuggestView('address');

          addressView.events.add('select', _.debounce((evt) => {
            maps.geocode(evt.get('item').value.toString(), {results: 1}).then(function (res) {
              const firstGeoObject = res.geoObjects.get(0);
              const coords = firstGeoObject.geometry.getCoordinates();

              setPlacemark(coords);
              newCoords = coords;
            });
          }, 300));

          myMap.events.add('click', _.debounce((evt) => {
            const coords = evt.get('coords');

            setPlacemark(coords);
            getAddress(coords);
          }, 300));

          // Создание метки.
          function createPlacemark(coords) {
            return new maps.Placemark(coords, {
              iconCaption: coords,
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
              myPlacemark.events.add('dragend', _.debounce(() => {
                getAddress(myPlacemark.geometry.getCoordinates());
              }, 300));
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
              setTimeout(() => {
                document.getElementById('address').dispatchEvent(new Event('input', {bubbles: true}));
              }, 100);
            });
          }

          setPlacemark(newCoords);
          getAddress(newCoords);

          setTimeout(() => {
            document.getElementById('address').dispatchEvent(new Event('input', {bubbles: true}));
          }, 350);
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log('Failed to load Yandex Maps', error));
  }
};

export {initMap};
