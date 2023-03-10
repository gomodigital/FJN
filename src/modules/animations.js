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
