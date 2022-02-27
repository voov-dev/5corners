export const customTextarea = () => {
  document.querySelectorAll('.custom-textarea__input').forEach(el => {
    el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
    el.classList.add('custom-textarea__input--auto');
    el.addEventListener('input', e => {
      el.style.height = 'auto';
      el.style.height = (el.scrollHeight + 1) + 'px';
    });
  });
};
