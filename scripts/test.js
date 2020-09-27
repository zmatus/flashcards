/**
 * Clear storage and go back to previous page.
 * 
 * @param {HTMLElement} btn 
 */
const prevPage = btn => {
  btn.addEventListener('click', () => {
    localStorage.clear();
    history.back();
  });
}

/**
 * Shuffle array in place.
 * 
 * @param {Array} terms 
 */
const shuffle = terms => {
  let i;
  let j;
  let temp;

  for (i = terms.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = terms[i];
    terms[i] = terms[j];
    terms[j] = temp;
  }
  return terms;
}

/**
 * 
 * @param {string} term 
 */
const showAnswer = term => {
  return new Promise(() => {
    let back = document.querySelector('.test-back');
    let answerBtn = document.querySelector('#answer');

    answerBtn.addEventListener('click', () => {
      back.innerHTML = term;
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'w') back.innerHTML = term;
    });
  });
}

/**
 * Generate test with shuffled array terms.
 * 
 * @param {Object} termsObj 
 */
const loadTest = async (termsObj) => {
  let terms = Object.keys(termsObj);
  terms = shuffle(terms);

  console.log(terms);

  let right = 0;
  let wrong = 0;
  let front = document.querySelector('.test-front');

  for (let i = 0; i < terms.length; i++) {
    let frontTerm = terms[i];
    let backTerm = termsObj[terms[i]];

    console.log(frontTerm);

    front.innerHTML = frontTerm;

    await showAnswer(backTerm);
  }
}

/**
 * Set page title and parse JSON back to object.
 */
const loadStorage = () => {
  let title = 'Test: ' + localStorage.getItem('title');
  let header = document.querySelector('h1');

  header.textContent = title;
  document.title = title;

  return JSON.parse(localStorage.getItem('cards'));
}

(function() {
  // Go back to previous page
  let end = document.querySelector('#end');
  prevPage(end);
  
  // Load values from storage
  let cardsObj = loadStorage();

  loadTest(cardsObj);
})()