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

const loadTest = (termsObj) => {
  let right = 0;
  let wrong = 0;
  let total = Object.keys(termsObj);

  console.log(total);
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
  console.log(cardsObj);

  loadTest(cardsObj);
})()