/**
 * Filter out deck links from search query.
 * 
 * @param {HTMLElement} deckLinks
 * @param {HTMLElement} searchbar
 */
function filterDecks(deckLinks, searchbar) {
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

/**
 * Filter out flashcards from search query.
 * 
 * @param {HTMLElement} flashcards
 * @param {HTMLElement} searchbar 
 */
function filterCards(flashcards, searchbar) {
  searchbar.addEventListener('keyup', function (e) {
    let query = e.target.value;

    flashcards.forEach(card => {
      card.parentNode.classList.add('hide');
    });

    flashcards.filter(card => {
      let front = card.firstChild.textContent.toLowerCase();
      let back = card.lastChild.textContent.toLowerCase();

      if (front.includes(query) || back.includes(query)) {
        card.parentNode.classList.remove('hide');
      }
    });
  });
}

/**
 * Create flashcard for each object inside array.
 * 
 * Card HTML structure:
 * 
 * <div class="card-box">
 *   <div class="card">
 *     <div class="card-front"></div>
 *     <div class="card-back"></div>
 *   </div>
 * </div>
 * 
 * @param {HTMLElement} cardContainer 
 * @param {Array.<Object>} termsArr 
 */
function makeCards(cardContainer, termsArr) {
  for (let i = 0; i < termsArr.length; i++) {
    let front = document.createElement('div');
    front.classList.add('card-front');
    front.textContent = termsArr[i].front;

    let back = document.createElement('div');
    back.classList.add('card-back');
    back.textContent = termsArr[i].back;

    let card = document.createElement('div');
    card.classList.add('card');
    card.appendChild(front);
    card.appendChild(back);

    let cardBox = document.createElement('div');
    cardBox.classList.add('card-box');
    cardBox.appendChild(card);

    cardContainer.appendChild(cardBox);
  }
}

/**
 * Add event listener to flip card on click.
 * 
 * @param {HTMLElement} cards 
 */
function flipCard(cards) {
  cards.forEach(card => {
    card.addEventListener('click', function () {
      card.classList.toggle('flipped');
    });
  });
}

/**
 * Create a term object from <p> containing only text.
 * 
 * @param {HTMLElement} terms 
 */
function processTextTerms(terms) {
  let termsArr = terms.textContent.split('\n');
  let front = termsArr[0].split('.');
  let back = termsArr[1].split('.');
  let termsObj = {
    front: front[1].trim(),
    back: back[1].trim()
  };
  return termsObj;
}

/**
 * Create term object from <div> containing code and
 * <p> containing text.
 * 
 * @param {HTMLElement} terms 
 */
function processCodeTerms(terms) {
  if (terms.tagName == 'DIV') {
    console.log(terms);
    console.log(terms.textContent);
  }
}

/**
 * Process and place terms into cards.
 * 
 * @param {Array} termsArr 
 */
function processTerms(termsArr) {
  for (let i = 0; i < termsArr.length; i++) {
    let card = termsArr[i];
    processCodeTerms(card);
  }
}

if (window.location.pathname == '/') {
  const decks = Array.from(document.querySelectorAll('.deck'));
  const search = document.querySelector('#search-decks');
  filterDecks(decks, search);
} else {
  let container = document.querySelector('.cards-container');
  let terms = Array.from(container.children);

  console.log(terms);

  let allCards = [];
  processTerms(terms);
  // for (let i = 0; i < cardText.length; i++) {
  //   let card = cardText[i];
  //   // card.classList.add('hide');

  //   processCodeTerms(card);

  //   let cardObj = processTextTerms(card);
  //   allCards.push(cardObj);
  // }
  // makeCards(container, allCards);

  // let cards = document.querySelectorAll('.card');
  // flipCard(cards);

  // cards = Array.from(cards);
  // let search = document.querySelector('#search-cards');

  // filterCards(cards, search);
}
