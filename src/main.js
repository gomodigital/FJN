import $ from 'jquery';

import { accordion } from './modules/accordion';
import { animateMap } from './modules/animations';
import { faqs } from './modules/faqs';
import { library } from './modules/library';
import { videoModals, modals } from './modules/modals';
import { sliderHomeHero, sliderHomePrograms, sliderHomePartners } from './modules/sliders';

import './styles/style.css';

const currentYear = new Date().getFullYear();
const accordionElements = $('.accordion-wrapper');
const faqsSection = $('.section_faqs');
const librarySection = $('.section_library-header');
const videoModalsElements = $('.modal-video');
const modalsElements = $('.modal');
const mapPartners = $('.section_home-partners');
const heroSlider = $('.hero-slider');
const programsSlider = $('.programs-slider');
const partnersSlider = $('.partners-slider');

// Set the current year in the footer
$('.copyright-year').text(currentYear);

// Open external links in a new tab
$('a[href^="http"]:not([href*="' + window.location.hostname + '"])').attr('target', '_blank');

if (accordionElements.length > 0) {
  accordion();
}

if (faqsSection.length > 0) {
  faqs();
}

if (librarySection.length > 0) {
  library();
}

if (videoModalsElements.length > 0) {
  videoModals();
}

if (modalsElements.length > 0) {
  modals();
}

if (mapPartners.length > 0) {
  animateMap();
}

if (heroSlider.length > 0) {
  sliderHomeHero();
}

if (programsSlider.length > 0) {
  sliderHomePrograms();
}

if (partnersSlider.length > 0) {
  sliderHomePartners();
}
