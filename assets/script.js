/**
 * Filter out deck links from search query.
 * 
 * @param {HTMLElement} deckLinks
 * @param {HTMLElement} searchbar
 */
function filterDecks(deckLinks, searchbar) {

  searchbar.addEventListener('keyup', function(e) {
    let query = e.target.value;

    deckLinks.forEach(deck => {
      deck.classList.add('hide');
    });
  
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

  console.log(flashcards);
  
  searchbar.addEventListener('keyup', function(e) {
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
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });
  });
}

if (window.location.pathname == '/') {
  const decks = Array.from(document.querySelectorAll('.deck'));
  const search = document.querySelector('#search-decks');
  filterDecks(decks, search);
}

if (window.location.pathname != '/') {
  let container = document.querySelector('.cards-container');
  let cardText = container.children;
  
  let allCards = [];
  for (let i = 0; i < cardText.length; i++) {
    let card = cardText[i];
    let cardsArr = card.textContent.split('\n');

    card.classList.add('hide');
    
    let front = cardsArr[0].split('.');
    let back = cardsArr[1].split('.');

    let cardObj = {
      front: front[1].trim(),
      back: back[1].trim()
    };
    allCards.push(cardObj);
  }
  makeCards(container, allCards);

  let cards = document.querySelectorAll('.card');
  flipCard(cards);

  cards = Array.from(cards);
  let search = document.querySelector('#search-cards');

  filterCards(cards, search);
}