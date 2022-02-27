export const mainMenu = () => {
  function toggleClassMenu() {
    myMenu.classList.toggle('main-menu--animatable');
    myMenu.classList.toggle('main-menu--visible');
  }

  function onTransitionEnd() {
    myMenu.classList.remove('main-menu--animatable');
  }

  const myMenu = document.querySelector('.main-menu');
  const menu = document.querySelector('.main-nav__toggle');

  myMenu.addEventListener('transitionend', onTransitionEnd, false);
  menu.addEventListener('click', toggleClassMenu, false);

  const breakpoint = window.matchMedia('(min-width:1024px)');
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
