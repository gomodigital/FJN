import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import $ from 'jquery';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function animateMap() {
  const mapInfo = $('#map-info');
  const links = $('.partners-map_nav-link');

  // set the initial selected link
  let selectedLink = $('#trigger-candidates');

  // set the initial circle scale and opacity to 0
  mapInfo.find('circle').each(function () {
    $(this).attr('opacity', '0');
    gsap.set(this, { scale: 0, opacity: 0, transformOrigin: 'center center' });
  });

  // add click event listeners to the link elements
  links.on('click', function () {
    // get the target group ID from the link block ID
    const targetId = $(this).attr('id').replace('trigger-', '');
    // get the target group element in the SVG
    const targetGroup = mapInfo.find(`#${targetId}`);
    // get all the circles in the SVG
    const circles = targetGroup.find('circle');
    // loop through the circles and set their opacity and scale based on the target group
    const timeline = gsap.timeline({ paused: true });
    circles.each(function (index) {
      // set the opacity and scale to 1 for the circle with a delay
      timeline.fromTo(this, { opacity: 0, scale: 0 }, { duration: 0.25, opacity: 1, scale: 1, ease: 'power4.out', delay: index * 0.01 }, 0);
    });

    // play the timeline
    timeline.play();

    // reset the opacity and scale for all circles in other groups
    mapInfo
      .find('circle')
      .not(circles)
      .each(function () {
        gsap.to(this, { duration: 0.5, opacity: 0, scale: 0, ease: 'power4.out' });
      });

    // remove the 'selected' class from the previously selected link
    selectedLink.removeClass('selected');

    // add the 'selected' class to the current link
    $(this).addClass('selected');

    // set the current link as the selected link
    selectedLink = $(this);
  });

  // trigger the click event on the initial selected link
  selectedLink.click();
}

export function animateMenu() {
  const mainMenuItems = $('.nav-primary_item');
  const secondaryMenuItems = $('.nav-secondary_item');
  const closeButton = $('#main-menu-close');
  const navLogoBackground = $('.nav_logo-bg');
  const languageButton = $('.button-language');
  let tl = gsap.timeline();
  tl.from(navLogoBackground, { duration: 1, opacity: 0, scale: 0, ease: 'power4.out' }, 0);
  tl.from(languageButton, { duration: 0.5, y: -20, ease: 'power4.out' }, 0);
  tl.from(secondaryMenuItems, { duration: 0.5, opacity: 0, y: -20, stagger: 0.1, ease: 'power4.out' }, 0);
  tl.from(mainMenuItems, { duration: 0.5, opacity: 0, y: -20, stagger: 0.1, ease: 'power4.out' }, 0.4);
  tl.from(closeButton, { duration: 0.5, opacity: 0, ease: 'power4.out' }, 1);
}

export function offsetMenuButton() {
  const menuButton = $('#main-menu-button');
  let tl = gsap.timeline();
  tl.to(menuButton, { duration: 0.5, opacity: 0, yPercent: -100, ease: 'power4.out' }, 0);
}

export function resetMenuButton() {
  const menuButton = $('#main-menu-button');
  let tl = gsap.timeline();
  tl.to(menuButton, { duration: 0.5, opacity: 1, yPercent: 0, ease: 'power4.out' }, 0);
}

// export function animateLines() {
//   const verticalLines = $('.grid-line--vertical');
//   verticalLines.css('scaleY', '0');
//   // const horizontalLines = $('.grid-line--horizontal');
//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: verticalLines,
//       start: 'top top',
//       end: 'bottom top',
//       scrub: true,
//     },
//   });
//   verticalLines.each(function () {
//     tl.to($(this), { duration: 2, scaleY: 1, ease: 'power4.out' }, 0);
//   });
// }

export function animateHeroSlider() {
  const heroSlider = $('.hero-slider');
  const heroSlideHeading = heroSlider.find('.heading_xlarge');
  const heroSlideButton = heroSlider.find('.button');
  const heroSlideIntro = heroSlider.find('.hero-slider_intro');
  const heroSlideImageContainer = heroSlider.find('.hero-slider_image-container');
  const heroSlideImage = heroSlider.find('.hero-slider_image');
  let typeSplit = new SplitType(heroSlideHeading, { types: 'words, chars', tagName: 'span' }); // eslint-disable-line
  let chars = heroSlideHeading.find('.char');
  let tl = gsap.timeline();
  // tl.from(heroSlideHeading, { duration: 1, opacity: 0, y: 200, ease: 'power4.out' }, 0);
  tl.from(chars, { duration: 0.5, opacity: 0, y: 20, stagger: 0.1, ease: 'power4.out' }, 0);
  tl.from(heroSlideIntro, { duration: 1, opacity: 0, y: 20, ease: 'power4.out' }, 0.4);
  tl.from(heroSlideImageContainer, { duration: 1, clipPath: 'circle(0%)', ease: 'power4.out' }, 0.4);
  tl.fromTo(heroSlideImage, { duration: 5, scale: 2 }, { scale: 1, ease: 'power4.out' }, 0.4);
  tl.from(heroSlideButton, { duration: 1, opacity: 0, y: 20, ease: 'power4.out' }, 0.4);
}

export function animateHero() {
  const heading = $('.hero_heading .heading_xlarge');
  const headingSplit = new SplitType(heading, { types: 'words, chars', tagName: 'span' }); // eslint-disable-line
  const headingLetters = heading.find('.char');
  const intro = $('.hero-main-content .text_large');
  const cta = $('.hero-main-content .cta-group');
  let tl = gsap.timeline();
  tl.from(headingLetters, { duration: 0.1, opacity: 0, y: 20, ease: 'power4.out', stagger: 0.05, autoAlpha: 1 }, 0);
  tl.from(intro, { duration: 0.5, opacity: 0, y: 20, ease: 'power4.out', autoAlpha: 1 }, '+=0.2');
  tl.from(cta, { duration: 0.5, opacity: 0, y: 20, ease: 'power4.out', autoAlpha: 1 }, '+=0.05');
}
