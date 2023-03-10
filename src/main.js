import $ from 'jquery';

import accordion from './modules/accordion';
import faqs from './modules/faqs';
import library from './modules/library';

import './styles/style.css';

const currentYear = new Date().getFullYear();
$('.copyright-year').text(currentYear);

// Open external links in a new tab
$('a[href^="http"]:not([href*="' + window.location.hostname + '"])').attr('target', '_blank');

// Normal modals
const modals = $('.modal');
modals.detach().appendTo('body');

$(document).on('click', 'a[href^="#modal-"]', function (e) {
  e.preventDefault();
  const target = $(this).attr('href');
  $(target).addClass('is-open');
  $('body').addClass('no-scroll');
  history.replaceState({}, document.title, window.location.href.split('#')[0]);
});

$('.modal_close').on('click', function (e) {
  e.preventDefault();
  const modal = $(this).closest('.modal');
  modal.removeClass('is-open');
  $('body').removeClass('no-scroll');
});

// Video modals
const modalsVideo = $('.modal-video');
modalsVideo.detach().appendTo('body');

$(document).on('click', 'a[href^="#modal-video-"]', function (e) {
  e.preventDefault();
  const target = $(this).attr('href');
  $(target).addClass('is-open');
  $('body').addClass('no-scroll');
  history.replaceState({}, document.title, window.location.href.split('#')[0]);
  const video = $(target).find('.modal-video_player');
  video[0].play();
});

$('.modal-video_close').on('click', function (e) {
  e.preventDefault();
  const modalVideo = $(this).closest('.modal-video');
  modalVideo.removeClass('is-open');
  $('body').removeClass('no-scroll');
  // Pause the video
  const video = $(this).closest('.modal-video').find('.modal-video_player');
  video[0].pause();
});

const accordionElements = $('.accordion-wrapper');
const faqsSection = $('.section_faqs');
const librarySection = $('.section_library-header');

if (accordionElements.length > 0) {
  accordion();
}

if (faqsSection.length > 0) {
  faqs();
}

if (librarySection.length > 0) {
  library();
}
