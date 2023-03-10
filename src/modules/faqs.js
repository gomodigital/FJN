import $ from 'jquery';

export function faqs() {
  const $faqNav = $('.faq-nav');
  const $faqSections = $('.faq-section');

  $faqSections.each(function () {
    const $section = $(this);
    const $id = $section.find('.faq-group-slug').val();
    const $handle = $section.find('.faq-group-menu-handle').val();

    $section.attr('id', $id);
    $faqNav.append('<a href="#' + $id + '" class="faq-nav-link">' + $handle + '</a>');
    const $firstAccordionItem = $section.find('.faq-accordion-item').first();
    $firstAccordionItem.addClass('is-open');
  });

  const $navLinks = $faqNav.find('.faq-nav-link');
  $navLinks.removeClass('w--current');

  const currentHash = window.location.hash;
  if (currentHash) {
    $navLinks.each(function () {
      const $link = $(this);
      if ($link.attr('href') === currentHash) {
        $link.addClass('w--current');
      }
    });
  }

  // Add click event listeners to each link in the navigation bar
  $navLinks.click(function () {
    $navLinks.removeClass('w--current'); // Remove the w--current class from all links
    $(this).addClass('w--current'); // Add the w--current class to the clicked link
  });

  const $faqWrapper = $('.faq-group-collection-wrapper');
  const faqNavHeight = $faqNav.outerHeight();
  $faqWrapper.css('margin-top', -faqNavHeight);

  $('.faq-accordion-trigger').on('click', function () {
    $(this).parent('.faq-accordion-item').toggleClass('is-open');
  });
}
