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
    let frontTerm = termsArr[i].front;
    let backTerm = termsArr[i].back;
    let front;
    let back;

    if (frontTerm.tagName == 'DIV') {
      front = frontTerm;
      front.classList.add('code-front');
    } else {
      front = document.createElement('div');
      front.textContent = frontTerm;
      front.classList.add('card-front');
    }

    if (backTerm.tagName == 'DIV') {
      back = backTerm;
      back.classList.add('code-back');
    } else {
      back = document.createElement('div');
      back.textContent = termsArr[i].back;
      back.classList.add('card-back');
    }

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
 * Return term object from <p> containing only text.
 * 
 * @param {HTMLElement} terms 
 */
function processTextTerms(terms) {
  let termsArr = terms.textContent.split('\n');
  if (termsArr.length < 2) return;

  let frontTerm = termsArr[0].split('.');
  let backTerm = termsArr[1].split('.');
  if (!frontTerm[1] || !backTerm[1]) return;

  return {
    front: frontTerm[1].trim(),
    back: backTerm[1].trim()
  };
}

/**
 * Return array containing term object from <div> and a flag
 * to signify if next term should be skipped.
 * 
 * @param {HTMLElement} terms 
 */
function processCodeTerms(prevTerm, term, nextTerm) {

  function processText(text) {
    let term = text.textContent.split('\n');
    term = term[0].substr(term[0].indexOf('.') + 1);
    return term.trim();
  }

  let frontTerm;
  let backTerm;
  let flag;

  // If length of previous term less than 4, <div> is front card
  if (prevTerm.textContent.length < 4) {
    frontTerm = term;
    backTerm = processText(nextTerm);
    flag = true;
  } else {  // Otherwise <div> is back card
    frontTerm = processText(prevTerm);
    backTerm = term;
    flag = false;
  }
  return [{
    front: frontTerm,
    back: backTerm
  }, flag];
}

/**
 * Process and place terms into cards.
 * 
 * @param {array} termsArr
 * @return {array} allCards
 */
function processTerms(termsArr) {
  let allCards = [];
  let i = 0;
  while (i < termsArr.length) {
    let prev = termsArr[i - 1];
    let current = termsArr[i];
    let next = termsArr[i + 1];

    if (current.tagName == 'DIV') {
      let [card, flag] = processCodeTerms(prev, current, next);
      allCards.push(card);
      flag ? i += 2 : i++;
    } else {
      let card = processTextTerms(current);
      if (card) allCards.push(card);
      i++;
    }
  }
  return allCards;
}

if (window.location.pathname == '/') {
  const decks = Array.from(document.querySelectorAll('.deck'));
  const search = document.querySelector('#search-decks');
  filterDecks(decks, search);
} else {
  let container = document.querySelector('.cards-container');
  let terms = Array.from(container.children);

  let allCards = processTerms(terms);
  makeCards(container, allCards);
  
  let cards = document.querySelectorAll('.card');
  flipCard(cards);

  cards = Array.from(cards);
  let search = document.querySelector('#search-cards');
  filterCards(cards, search);
  // for (let i = 0; i < cardText.length; i++) {
  //   let card = cardText[i];
  //   // card.classList.add('hide');

  //   processCodeTerms(card);

  //   let cardObj = processTextTerms(card);
  //   allCards.push(cardObj);
  // }
  // makeCards(container, allCards);


}
