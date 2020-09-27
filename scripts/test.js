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

(function() {
  // Go back to previous page
  let finish = document.querySelector('#end-test');
  prevPage(finish);
  
  // Load values from storage
  let cardsObj = loadStorage();
  console.log(cardsObj);

  let testContainer = document.querySelector('.test-container');
})()