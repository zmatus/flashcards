const storageSize = () => {
  let _lsTotal = 0,
    _xLen, _x;
  for (_x in localStorage) {
      if (!localStorage.hasOwnProperty(_x)) {
          continue;
      }
      _xLen = ((localStorage[_x].length + _x.length) * 2);
      _lsTotal += _xLen;
      console.log("> " + _x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
  };
  console.log(">>> Total Size = " + (_lsTotal / 1024).toFixed(2) + " KB");
}

/**
 * Clear storage and go back to previous page.
 * 
 * @param {HTMLElement} btn 
 */
const prevPage = (btn) => {
  btn.addEventListener('click', () => {
    localStorage.clear();
    history.back();
  });
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

/**
 * Hide nav when test starts.
 */
const hideNav = () => {
  let nav = document.querySelector('.control');
  nav.classList.add('hide');
}

/**
 * Clear container and show <nav> when test ends.
 * 
 * @param {HTMLElement} container 
 */
const clearContainer = (container) => {

}

/**
 * Create test control buttons for simple test.
 * 
 * @param {HTMLElement} container 
 */
const makeSimpleControl = (container) => {
  let control = document.createElement('nav');
  control.classList.add('simple-control');

  let end = document.createElement('button');
  end.innerHTML = '&larr; End Test';
  end.classList.add('end-test');
  control.appendChild(end);

  let answer = document.createElement('button');
  answer.innerHTML = '&#9873; Answer'
  answer.classList.add('answer');
  control.appendChild(answer);

  let correct = document.createElement('button');
  correct.innerHTML = '&#9745; Correct';
  correct.classList.add('correct');
  control.appendChild(correct);

  let incorrect = document.createElement('button');
  incorrect.innerHTML = '&#9746; Incorrect';
  incorrect.classList.add('incorrect');
  control.appendChild(incorrect);
  
  container.appendChild(control);
}

/**
 * Generate questions
 * 
 * @param {Object} cards 
 */
const generateSimpleTest = (container, cards) => {
  console.log(cards);
  makeSimpleControl(container);
}

(function() {
  console.log(localStorage);
  storageSize();

  let testContainer = document.querySelector('.test-container');

  // Go back to previous page
  let finish = document.querySelector('#finish');
  prevPage(finish);

  // Load values from storage
  let cardsObj = loadStorage();

  // Start simple test
  let simple = document.querySelector('#simple');
  simple.addEventListener('click', () => {
    hideNav();
    generateSimpleTest(testContainer, cardsObj);
  });
})()