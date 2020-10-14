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
 * Show question term on <div>.
 * 
 * @param {string} term 
 */
const showQuestion = term => {
  let question = document.querySelector('.test-question');

  question.innerHTML = term;
  
  // Typeset dynamically and change padding
  if (term.includes('$$')) {
    MathJax.typesetPromise();
    question.style.paddingTop = '0.5em';
  } else question.style.paddingTop = '2em';
}

/**
 * Show answer term on <div> when button is clicked.
 * 
 * @param {string} term 
 */
const showAnswer = term => {

  console.log(term);

  let answer = document.querySelector('.test-answer');
  let answerBtn = document.querySelector('#answer');

  answerBtn.addEventListener('click', () => {
    answer.innerHTML = term;

    // Typeset dynamically and change padding
    if (term.includes('$$')) {
      MathJax.typesetPromise();
      answer.style.paddingTop = '0.5em';
    } else answer.style.paddingTop = '2em';
  });
}

/**
 * Clear answer <div> when either correct or incorrect
 * button is clicked.
 * 
 * Resolve 1 for correct or 0 for incorrect.
 */
const userAnswer = () => {

  function clearAnswer() {
    let answer = document.querySelector('.test-answer');
    answer.innerHTML = '';
  }

  return new Promise((resolve) => {
    clearAnswer();

    let correctBtn = document.querySelector('#correct');
    correctBtn.addEventListener('click', () => {
      resolve(1);
    });
    let incorrectBtn = document.querySelector('#incorrect');
    incorrectBtn.addEventListener('click', () => {
      resolve(0);
    });
  });
}

/**
 * Hide test control buttons.
 */
const hideControl = () => {
  let answer = document.querySelector('#answer');
  let correct = document.querySelector('#correct');
  let incorrect = document.querySelector('#incorrect');

  answer.classList.add('hide');
  correct.classList.add('hide');
  incorrect.classList.add('hide');
}

const showScore = (right, wrong) => {
  let leftDiv = document.querySelector('.test-question');
  leftDiv.innerHTML = `<h3>Correct: ${right}`;

  let rightDiv = document.querySelector('.test-answer');
  rightDiv.innerHTML = `<h3>Incorrect: ${wrong}`;
}

/**
 * Create new button to reload test page.
 */
const newTest = () => {
  let reloadBtn = document.createElement('button');
  reloadBtn.innerHTML = '&#x27F2; New Test';
  reloadBtn.id = 'new';
  reloadBtn.addEventListener('click', () => {
    window.location.reload();
  });
  let testControl = document.querySelector('.test-control');
  testControl.appendChild(reloadBtn);
}

/**
 * Generate test with shuffled array terms.
 * 
 * @param {Object} termsObj 
 */
const loadTest = async termsObj => {
  let terms = Object.keys(termsObj);
  terms = shuffle(terms);

  let right = 0;
  let wrong = 0;
  for (let i = 0; i < terms.length; i++) {
    let question = terms[i]
    let answer = termsObj[question];

    showQuestion(question);
    showAnswer(answer);

    // Wait for user to click answer button
    let score = await userAnswer();
    if (score) right++;
    else wrong++;
  }
  showScore(right, wrong);
  hideControl();
  newTest();
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
})();