import Splide from '@splidejs/splide';
import '@splidejs/splide/css/core';
import { gsap } from 'gsap'; // eslint-disable-line
import Swiper, { Navigation, Autoplay, EffectFade } from 'swiper'; // eslint-disable-line
import 'swiper/css';
import 'swiper/css/effect-fade';

Swiper.use([Navigation, Autoplay, EffectFade]);

export function sliderHomeHero() {
  const swiper = new Swiper('.hero-slider .swiper', { // eslint-disable-line
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: true,
    },
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
    let slideContainer = slide.querySelector('.hero-slider_container');
    let heading = slide.querySelectorAll('.heading_xlarge .char');
    let intro = slide.querySelector('.hero-slider_intro');
    let cta = slide.querySelector('.button');
    let imageContainer = slide.querySelector('.hero-slider_image-container');
    let image = slide.querySelector('.hero-slider_image');
    let tl = gsap.timeline({ paused: true });
    gsap.set(slideContainer, { autoAlpha: 0 });
    tl.to(slideContainer, { autoAlpha: 1, duration: 1 });
    tl.fromTo(heading, { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, duration: 0.5, ease: 'back.out(2)', stagger: { amount: 0.25 } }, 0);
    tl.fromTo(intro, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.5');
    tl.fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.5');
    tl.fromTo(imageContainer, { clipPath: 'circle(0%)' }, { clipPath: 'circle(100%)', duration: 1.5, ease: 'back.out(2)' }, '-=1.5');
    tl.fromTo(image, { scale: 2 }, { scale: 1, duration: 1.5, ease: 'power4.out' }, '-=1.5');
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

// export function sliderHomePrograms() {
//   const swiper = new Swiper('.programs-slider .swiper', { // eslint-disable-line
//     slidesPerView: 'auto',
//     spaceBetween: 8, // Adjust this value to match the desired gap (8px = 0.5rem)
//     // loop: true,
//     // loopedSlides: 8,
//     // watchOverflow: true,
//     // autoplay: {
//     //   delay: 5000,
//     // },
//     navigation: {
//       nextEl: '.programs-slider_nav .swiper-button-next',
//       prevEl: '.programs-slider_nav .swiper-button-prev',
//     },
//     // breakpoints: {
//     //   568: {
//     //     slidesPerView: 2,
//     //   },
//     // },
//   });
//   swiper.on('slideChange', function () {
//     const lastIndex = swiper.slides.length - 1;

//     if (swiper.activeIndex === lastIndex) {
//       swiper.slideTo(0, 0, false);
//     } else if (swiper.activeIndex === 0 && swiper.previousIndex === lastIndex) {
//       swiper.slideTo(lastIndex, 0, false);
//     }
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
