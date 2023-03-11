import gsap from 'gsap';
import $ from 'jquery';

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
