const initSearchForm = () => {
  const search = document.querySelector('.search-form');

  if (!search) {
    return;
  }

  const searchBtn = search.querySelector('.search-form__btn');
  const searchInput = search.querySelector('.search-form__input input');

  searchBtn.addEventListener('click', () => {
    searchInput.focus();
  });

  searchInput.addEventListener('blur', () => {
    searchInput.value = '';
  });
};

export {initSearchForm};
