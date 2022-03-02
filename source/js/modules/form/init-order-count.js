import _ from 'lodash/lodash';

const initOrderCount = () => {
  const COUNT_ORDER = document.querySelector('.header__counter output');
  const TOTAL_ORDER = document.querySelector('.checkout-page__total-count output');

  if (COUNT_ORDER && TOTAL_ORDER) {
    document.addEventListener('change', _.debounce((evt) => {
      if (evt.target.className === 'custom-qty__input') {
        updateCount(COUNT_ORDER, TOTAL_ORDER);
      }
    }, 300));

    updateCount(COUNT_ORDER, TOTAL_ORDER);
  }
};

const updateCount = (orderEl, totalCount) => {
  orderEl.value = 0;
  totalCount.value = 0;

  document.querySelectorAll('.custom-qty__input').forEach((item) => {
    if (!isNaN(item.value) && item.value.length !== 0) {
      orderEl.value = parseInt(orderEl.value, 10) + parseInt(item.value, 10);
      totalCount.value = parseInt(totalCount.value, 10) + parseInt(item.getAttribute('data-price'), 10) * parseInt(item.value, 10);
    }
  });
};

export {initOrderCount};
