/**
 * @module deck
 */

/**
 * Filter out deck links from search query.
 * 
 * @param {HTMLElement} deckLinks
 * @param {HTMLElement} searchbar
 */
const filterDecks = (deckLinks, searchbar) => {
  searchbar.addEventListener('keyup', function (e) {
    let query = e.target.value;

    // Hide all decks on key press
    deckLinks.forEach(deck => {
      deck.classList.add('hide');
    });

    // Remove hidden decks matching search query
    deckLinks.filter(deck => {
      if (deck.textContent.toLowerCase().includes(query)) {
        deck.classList.remove('hide');
      }
    });
  });
}

(function() {
  let decks = Array.from(document.querySelectorAll('.deck'));
  let searchDecks = document.querySelector('#search-decks');

  filterDecks(decks, searchDecks);
})();
