import $ from 'jquery';

import library from './modules/library';

import './styles/style.css';

const currentYear = new Date().getFullYear();
$('.copyright-year').text(currentYear);

// Open external links in a new tab
$('a[href^="http"]:not([href*="' + window.location.hostname + '"])').attr('target', '_blank');

// Open accordion
var $gridLine = $('.grid-line--diagonal-inverted');

// Function to check the initial state of the accordion items and hide the grid line if necessary
function checkAccordionState() {
  if ($('.accordion-item.is-open').length > 0) {
    $gridLine.hide();
  } else {
    $gridLine.show();
  }
}

$('.accordion-trigger').on('click', function () {
  $(this).parent('.accordion-item').toggleClass('is-open');
  if ($('.accordion-item.is-open').length > 0) {
    $gridLine.hide();
  } else {
    $gridLine.show();
  }
});

// Store the original location of the modal video element
const originalLocation = $('.modal-video').parent();

$('.play-button').on('click', function (e) {
  e.preventDefault();
  const targetId = $(this).attr('href');
  const modalVideo = $(targetId);
  modalVideo.detach();
  $('body').append(modalVideo);
  requestAnimationFrame(() => {
    modalVideo.addClass('is-open');
    $('body').css('overflow', 'hidden');
  });
});

$('.modal-video_close').on('click', function (e) {
  e.preventDefault();
  const modalVideo = $(this).closest('.modal-video');
  modalVideo.removeClass('is-open');
  setTimeout(function () {
    modalVideo.detach();
    originalLocation.append(modalVideo);
    $('body').css('overflow', 'auto');
  }, 500); // Delay in milliseconds
});

const modals = $('.modal');
modals.detach().appendTo('body');

$(document).on('click', 'a[href^="#modal-"]', function (e) {
  e.preventDefault();
  const target = $(this).attr('href');
  $(target).addClass('is-open');
  $('body').css('overflow', 'hidden');
  history.replaceState({}, document.title, window.location.href.split('#')[0]);
});

$('.modal_close').on('click', function (e) {
  e.preventDefault();
  const modal = $(this).closest('.modal');
  modal.removeClass('is-open');
  $('body').css('overflow', 'auto');
});

checkAccordionState();

if (window.location.pathname.startsWith('/biblioteca') || window.location.pathname.startsWith('/artigo') || window.location.pathname.startsWith('/tema') || window.location.pathname.startsWith('/tag')) {
  console.log('library');
  library();
}
