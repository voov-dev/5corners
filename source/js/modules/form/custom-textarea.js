import _ from 'lodash/lodash';

export const customTextarea = () => {
  document.querySelectorAll('.custom-textarea__input').forEach((el) => {
    el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
    el.classList.add('custom-textarea__input--auto');

    el.addEventListener('input', _.throttle(() => {
      el.style.height = 'auto';
      el.style.height = (el.scrollHeight + 1) + 'px';
    }, 200));

    window.addEventListener('orientationchange', _.debounce(() => {
      el.dispatchEvent(new Event('input', {bubbles: true}));
    }, 300));

    window.addEventListener('resize', _.debounce(() => {
      el.dispatchEvent(new Event('input', {bubbles: true}));
    }, 300));
  });
};
