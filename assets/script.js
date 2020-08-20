const decks = Array.from(document.querySelectorAll('.deck'));
const search = document.querySelector('#search-decks');

search.addEventListener('keyup', function(e) {
  let query = e.target.value;
  
  decks.forEach(deck => {
    deck.classList.add('hide-deck');
  })

  decks.filter(deck => {
    if (deck.textContent.toLowerCase().includes(query)) {
      deck.classList.remove('hide-deck');
    }
  });
});
