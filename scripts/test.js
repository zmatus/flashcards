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
 * Set test page title and <h1>.
 * 
 * @param {string} title 
 */
const setTitle = (title) => {
  let header = document.querySelector('h1');
  header.textContent = title;
  document.title = title;
}

const prevPage = (btn) => {
  btn.addEventListener('click', () => {
    localStorage.clear();
    history.back();
  })
}

(function() {
  console.log(localStorage);
  storageSize();

  // Set test page title and <h1>
  let pageTitle = 'Test: ' + localStorage.getItem('title');
  setTitle(pageTitle);

  // Parse JSON back to object
  let cardsObj = JSON.parse(localStorage.getItem('cards'));
  console.log(cardsObj);

  // Go back to previous page
  let finish = document.querySelector('#finish');
  finish.addEventListener('click', () => {
    localStorage.clear();
    history.back();
  });
})()