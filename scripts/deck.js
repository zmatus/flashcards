/**
 * Process and place terms into cards.
 * 
 * @param {Array} termsArr
 * @return {Array} allCards
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

/**
 * Return term object from <p> containing only text.
 * 
 * @param {HTMLElement} terms 
 */
const processTextTerms = (text) => {

  function getTerm(term) {
    return term.substr(term.indexOf('.') + 1);
  }

  let frontTerm;
  let backTerm;
  let terms = text.textContent.split('\n');
  if (terms.length < 2) {
    return;
  } else if (terms.length == 2) {   // Regular text term
    frontTerm = getTerm(terms[0]);
    backTerm = getTerm(terms[1]);
  } else if (terms.length > 2) {    // Text term with math equations
    console.log(terms);
    if (terms[1].includes('\\')) {
      frontTerm = terms[1];
      backTerm = getTerm(terms[2]);
    } else {
      frontTerm = getTerm(terms[0]);
      // backTerm = terms[2];
      backTerm = terms[2];
      console.log(backTerm);
    }
  }


  if (!frontTerm[1] || !backTerm[1]) return;

  return {
    front: frontTerm.trim(),
    back: backTerm.trim()
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
 * Generate flashcards from children of cards container.
 * 
 * @param {HTMLElement} cardsContainer 
 */
const generateCards = (container) => {
  let terms = Array.from(container.children);
  let allCards = processTerms(terms);
  
  // Generate flashcards from terms
  makeCards(container, allCards);
  
  // Hide non-card elements
  terms.forEach((element) => {
    if (element.tagName == 'P') element.classList.add('hide');
  });
}

/**
 * Add event listener to flip card on click.
 * 
 * @param {HTMLElement} cards 
 */
const flipCard = (cards) => {
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}

/**
 * Filter out flashcards from search query.
 * 
 * @param {HTMLElement} flashcards
 * @param {HTMLElement} searchbar 
 */
const filterCards = (flashcards, searchbar) => {
  searchbar.addEventListener('keyup', (e) => {
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
 * Add flip and search functionalities to flashcards.
 * 
 * @param {HTMLElement} cards 
 */
const addCardFunc = (cards) => {
  // Make cards flippable
  flipCard(cards);
  
  // Make cards searchable
  cards = Array.from(cards);
  let search = document.querySelector('#search-cards');
  filterCards(cards, search);
}

/**
 * Convert array of flashcards <div> to object.
 * 
 * @param {Array.<HTMLElement>} flashcards 
 */
const cardsToObj = (flashcards) => {
  let obj = {};

  flashcards.forEach((card) => {
    let front = card.firstChild.innerHTML;
    let back = card.lastChild.innerHTML;

    obj[front] = back;
  });
  return obj;
}

/**
 * Add title and cards object to local storage
 * on button click. Clear storage if not empty.
 * 
 * @param {HTMLElement} test
 * @param {Object} cards 
 */
const updateStorage = (test, cards) => {
  if (localStorage.length !== 0) localStorage.clear();

  test.addEventListener('click', () => {
    localStorage.setItem("title", document.title);
    localStorage.setItem("cards", JSON.stringify(cards));
  });
}

(function() {
  let cardsContainer = document.querySelector('.cards-container');
  generateCards(cardsContainer);

  let flashcards = document.querySelectorAll('.card');
  addCardFunc(flashcards);

  let testBtn = document.querySelector('#test-btn');
  let cardsObj = cardsToObj(flashcards);
  updateStorage(testBtn, cardsObj);
})();
