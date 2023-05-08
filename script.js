const myLibrary = [];
let bookCounter = 0;

let theHobbit = new Book('The Hobbit', 'J. R. R. Tolkien', 450, false);
let theHobbit2 = new Book('The Hobbit', 'J. R. R. Tolkien', 450, true);
let theHobbit3 = new Book('The Hobbit', 'J. R. R. Tolkien', 450, true);
let theHobbit4 = new Book('The Hobbit', 'J. R. R. Tolkien', 450, false);
myLibrary.push(theHobbit2, theHobbit, theHobbit4, theHobbit3);
updateViewWithArr(myLibrary);
let theHobbit5 = new Book('The Hobbit', 'J. R. R. Tolkien', 450, false);
myLibrary.push(theHobbit5);
updateViewWithArr(myLibrary);

const form = document.getElementById('add-book-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let book = new Book(
    form.elements['title'].value,
    form.elements['author'].value,
    form.elements['pages'].value,
    form.elements['read'].checked
  );
  //add to database
  myLibrary.push(book);
  //display new card
  createCard(book); //temp solution
  //   displayCardsFromArr(myLibrary);
});

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = bookCounter;
  bookCounter++;
  this.changeStatus = function () {
    this.isRead = !this.isRead;
  };
  this.deleteSelf = function () {
    deleteBookFromView(this.id);
    delete myLibrary[myLibrary.map((x) => x.id).indexOf(this.id)];
  };
}
function updateViewWithArr(bookArr) {
  let indexListOfDisplayedBooks = Array.from(
    document.getElementsByClassName('grid-cnt')[0].childNodes
  )
    .slice(3)
    .map((y) => y.dataset.index);
  bookArr.forEach((book) => {
    if (!indexListOfDisplayedBooks.includes(`${book.id}`)) {
      createCard(book);
    }
  });
}
function deleteBookFromView(bookIndex) {
  document.querySelector(`[data-index="${bookIndex}"]`).remove();
}
function createCard(book) {
  const newBook = document.createElement('div');
  newBook.setAttribute('class', 'book');
  newBook.setAttribute('data-index', `${book.id}`);
  if (book.isRead) {
    newBook.setAttribute('read', '');
  }
  newBook.innerHTML = `
            <div class="book-title">${book.title}</div>
                <div class="book-by">
                    <span class="book-author">${book.author}</span>
                </div>
            <div class="book-pages">${book.pages}</div>
    `;
  const gridCnt = document.getElementsByClassName('grid-cnt');
  gridCnt[0].appendChild(newBook);
}
