import Splide from '@splidejs/splide';
import '@splidejs/splide/css/core';
import { gsap } from 'gsap'; // eslint-disable-line
import Swiper, { Navigation, Autoplay } from 'swiper';
import 'swiper/css';

Swiper.use([Navigation, Autoplay]);

export function sliderHomeHero() {
  const swiper = new Swiper('.hero-slider .swiper', { // eslint-disable-line
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.hero-slider_nav .swiper-button-next',
      prevEl: '.hero-slider_nav .swiper-button-prev',
    },
    on: {
      slideChangeTransitionEnd: function () {
        this.slides[this.previousIndex].animation.progress(0).pause(); // Reset the animation on the previous slide
        this.slides[this.activeIndex].animation.restart(); // Restart the animation on the active slide
      },
    },
  });

  function setupAnimation(slide) {
    let heading = slide.querySelectorAll('.heading_xlarge .char');
    let intro = slide.querySelector('.hero-slider_intro');
    let cta = slide.querySelector('.button');
    let imageContainer = slide.querySelector('.hero-slider_image-container');
    let image = slide.querySelector('.hero-slider_image');
    gsap.set(heading, { autoAlpha: 0, yPercent: 100 });
    gsap.set(intro, { autoAlpha: 0, y: 20 });
    gsap.set(cta, { autoAlpha: 0, y: 20 });
    gsap.set(imageContainer, { clipPath: 'circle(0%)' });
    gsap.set(image, { scale: 2 });
    let tl = gsap.timeline({ paused: true });
    tl.to(heading, { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'back.out(2)', stagger: { amount: 0.25 } });
    tl.to(intro, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'back.out(2)' });
    tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'back.out(2)' });
    tl.to(imageContainer, { clipPath: 'circle(100%)', duration: 1, ease: 'back.out(2)' }, '-=0.5');
    tl.to(image, { scale: 1, duration: 1, ease: 'power4.out' }, '-=1');
    slide.animation = tl;
  }

  swiper.on('init', function () {
    this.slides.forEach((slide, index) => { // eslint-disable-line
      setupAnimation(slide);
    });
  });

  // Manually trigger the init event if the swiper instance is already initialized
  if (swiper.initialized) {
    swiper.emit('init');
  }

  // Animate the initial slide after a short delay
  setTimeout(() => {
    swiper.slides[swiper.activeIndex].animation.play();
  }, 1000);
}

// export function sliderHomePrograms2() {
//   const swiperEl = document.querySelector('.test-slider .swiper');
//   const swiper = new Swiper(swiperEl, { // eslint-disable-line
//     // direction: 'horizontal',
//     slidesPerView: 'auto',
//     // width: '21.55%',
//     spaceBetween: 8, // Adjust this value to match the desired gap (8px = 0.5rem)
//     loop: true,
//     watchOverflow: true,
//     // autoplay: {
//     //   delay: 5000,
//     // },
//     navigation: {
//       nextEl: '.test-slider_nav .swiper-button-next',
//       prevEl: '.test-slider_nav .swiper-button-prev',
//     },
//     // breakpoints: {
//     //   568: {
//     //     slidesPerView: 2,
//     //   },
//     // },
//   });
// }

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
