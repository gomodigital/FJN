import $ from 'jquery'

export default function library() {
  const searchInput = $('#library-search_input')
  const searchReset = $('#library-search_reset')
  const featuredArticles = $('.library-articles.is-featured')
  const typeLinks = $('.library-types_item')
  const typeClear = $('.library-types_clear')

  // Set input type to "search" on page load
  searchInput.attr('type', 'search')
  searchReset.hide()

  // Check if search input already has content or if there's a search term in the query string on page load
  const searchParams = new URLSearchParams(window.location.search)
  if (searchInput.val().length > 0 || searchParams.has('search')) {
    hideFeaturedArticles()
    searchReset.show()
  } else {
    showFeaturedArticles()
  }

  // Fade in search reset button when user starts typing
  searchInput.on('input', () => {
    if (searchInput.val().length > 0) {
      hideFeaturedArticles()
      searchReset.show()
    } else {
      showFeaturedArticles()
      searchReset.hide()
    }
  })

  // Clear search input and fade out reset button when reset button is clicked
  searchReset.on('click', () => {
    showFeaturedArticles()
    searchReset.hide()
  })

  // Hide featured articles when type link is active
  typeLinks.on('click', function (event) {
    event.preventDefault()
    const isOtherActive =
      typeLinks.filter(function () {
        return $(this).hasClass('jetboost-filter-active')
      }).length > 0
    if (
      isOtherActive ||
      typeLinks.filter('.jetboost-filter-active').length === 0
    ) {
      hideFeaturedArticles()
    } else {
      showFeaturedArticles()
    }
  })

  // Show featured articles when type clear link is clicked
  typeClear.on('click', () => {
    if (searchInput.val().length === 0) {
      showFeaturedArticles()
    }
    typeLinks.removeClass('jetboost-filter-active')
  })

  function showFeaturedArticles() {
    if (featuredArticles.length > 0) {
      featuredArticles.show()
    }
  }

  function hideFeaturedArticles() {
    if (featuredArticles.length > 0) {
      featuredArticles.hide()
    }
  }
}
