export const mainMenu = () => {
  function toggleClassMenu() {
    myMenu.classList.toggle('main-menu--animatable');
    myMenu.classList.toggle('main-menu--visible');
  }

  function onTransitionEnd() {
    myMenu.classList.remove('main-menu--animatable');
  }

  const breakpoint = window.matchMedia('(min-width: 1024px)');
  const myMenu = document.querySelector('.main-menu');
  const myMenuWrapper = document.querySelector('.main-menu__wrapper');
  const myMenuOverlay = document.querySelector('.main-menu__overlay');
  const menu = document.querySelector('.header__burger');

  myMenu.addEventListener('transitionend', onTransitionEnd, false);
  menu.addEventListener('click', toggleClassMenu, false);

  document.addEventListener('keydown', (evt) => {
    if (myMenu.classList.contains('main-menu--visible') &&
      (evt.key === 'Escape' || evt.key === 'Esc')) {
      evt.preventDefault();

      toggleClassMenu();
    }
  });

  myMenuOverlay.addEventListener('click', (evt) => {
    const withinBoundaries = evt.composedPath().includes(myMenuWrapper);

    if (!withinBoundaries) {
      toggleClassMenu();
    }
  });

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      myMenu.classList.add('main-menu--desktop');
      myMenu.classList.remove('main-menu--mobile');
    } else {
      myMenu.classList.remove('main-menu--desktop');
      myMenu.classList.add('main-menu--mobile');
    }
  };
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};
