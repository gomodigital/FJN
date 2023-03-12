import Splide from '@splidejs/splide';
import '@splidejs/splide/css/core';

import { animateHeroSlider } from './animations';

export function sliderHomeHero() {
  const heroSlider = new Splide('.hero-slider', {
    type: 'fade',
    rewind: true,
    perMove: 1,
    pagination: false,
    autoplay: false,
    // interval: 2000,
  });

  heroSlider.mount();

  animateHeroSlider();

  heroSlider.on('moved', function () {
    animateHeroSlider();
  });
}

export function sliderHomePrograms() {
  const programSlider = new Splide('.programs-slider', {
    type: 'loop',
    perPage: 5,
    perMove: 1,
    gap: '.5rem',
    pagination: false,
    autoplay: true,
    interval: 5000,
    breakpoints: {
      568: {
        perPage: 2,
      },
    },
  });

  programSlider.mount();
}

export function sliderHomePartners() {
  const partnersSlider = new Splide('.partners-slider', {
    type: 'loop',
    rewind: true,
    perPage: 6,
    perMove: 1,
    gap: '1.5rem',
    pagination: false,
    breakpoints: {
      568: {
        perPage: 3,
      },
    },
  });

  partnersSlider.mount();
}
