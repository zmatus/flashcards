/**
 * Filter out flashcards from search query.
 * 
 * @param {HTMLElement} flashcards
 * @param {HTMLElement} searchbar 
 */
const filterCards = (flashcards, searchbar) => {
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
const makeCards = (cardContainer, termsArr) => {
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
const flipCard = (cards) => {
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
const processTextTerms = (text) => {
  let terms = text.textContent.split('\n');
  if (terms.length < 2) return;

  let frontTerm = terms[0].substr(terms[0].indexOf('.') + 1);
  let backTerm = terms[1].substr(terms[1].indexOf('.') + 1);

  if (!frontTerm[1] || !backTerm[1]) return;

  return {
    front: frontTerm,
    back: backTerm
  };
}

/**
 * Return array containing term object from <div> and a flag
 * to signify if next term should be skipped.
 * 
 * @param {HTMLElement} terms 
 */
const processCodeTerms = (prevTerm, term, nextTerm) => {

  const processText = (text) => {
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
const processTerms = (termsArr) => {
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

let container = document.querySelector('.cards-container');
let terms = Array.from(container.children);
let allCards = processTerms(terms);

// Generate flashcards from terms
makeCards(container, allCards);

// Hide all <p> in <main>
terms.forEach((element) => {
  if (element.tagName == 'P') element.classList.add('hide');
});

// Make cards flippable
let flashcards = document.querySelectorAll('.card');
flipCard(flashcards);

// Make cards searchable
flashcards = Array.from(flashcards);
let searchCards = document.querySelector('#search-cards');
filterCards(flashcards, searchCards);
