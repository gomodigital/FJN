import Swiper from 'swiper';

import 'swiper/css';

export function sliderHomeHero2() {
  const heroSlider = new Swiper('.swiper', { // eslint-disable-line
    effect: 'fade',
    loop: true,
    speed: 500,
    // autoplay: {
    //   delay: 5000,
    // },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
