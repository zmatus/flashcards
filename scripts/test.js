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
const toggleNav = () => {
  let nav = document.querySelector('.control');
  nav.classList.toggle('hide');
}

/**
 * Clear container and show <nav>
 * when end test button is clicked.
 * 
 * @param {HTMLElement} end
 * @param {HTMLElement} container 
 */
const clearContainer = (container) => {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  toggleNav();
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

const makeSimpleBox = (container) => {
  let front = document.createElement('div');
  let frontHeader = document.createElement('h2');
  frontHeader.textContent = 'Front';
  front.classList.add('simple-front');
  front.appendChild(frontHeader);
  
  let back = document.createElement('div');
  let backHeader = document.createElement('h2');
  backHeader.textContent = 'Back';
  back.classList.add('simple-back');
  back.appendChild(backHeader);
  
  let box = document.createElement('div');
  box.classList.add('simple-test');
  box.appendChild(front);
  box.appendChild(back);
  
  container.appendChild(box);
}

/**
 * Generate questions
 * 
 * @param {Object} cards 
 */
const generateSimpleTest = (container, cards) => {
  console.log(cards);

  makeSimpleControl(container);

  // End test and go back to tests selection
  let endTest = document.querySelector('.end-test');
  endTest.addEventListener('click', () => {
    clearContainer(container);
  });

  makeSimpleBox(container);
}

(function() {
  console.log(localStorage);

  let testContainer = document.querySelector('.test-container');

  // Go back to previous page
  let finish = document.querySelector('#finish');
  prevPage(finish);

  // Load values from storage
  let cardsObj = loadStorage();

  // Start simple test
  let simple = document.querySelector('#simple');
  simple.addEventListener('click', () => {
    toggleNav();
    generateSimpleTest(testContainer, cardsObj);
  });
})()