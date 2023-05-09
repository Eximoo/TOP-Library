const myLibrary = [];
let bookCounter = 0;

let theHobbit = new Book('The Hobbit', 'J. R. R. Tolkien', 450, false);
let theHobbit2 = new Book('The Hobbit', 'J. R. R. Tolkien', 450, true);
let theHobbit3 = new Book('The Hobbit', 'J. R. R. Tolkien', 450, true);
let theHobbit4 = new Book('The Hobbit', 'J. R. R. Tolkien', 450, false);
myLibrary.push(theHobbit2, theHobbit, theHobbit4, theHobbit3);
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
  //createCard(book); //was temp solution
  updateViewWithArr(myLibrary);
  form.reset();
});
function bookFactory(title, author, pages, isRead) {}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = bookCounter;
  bookCounter++;
  this.changeStatus = function () {
    this.isRead = !this.isRead;
    updateReadStatusInView(this.id);
  };
}

Book.prototype.deleteSelf = function () {
  deleteBookFromView(this.id);
  delete myLibrary[myLibrary.map((x) => x.id).indexOf(this.id)];
};

function updateReadStatusInView(bookIndex) {
  const el = document.querySelector(`[data-index="${bookIndex}"]`);
  if (el.hasAttribute('read')) {
    el.removeAttribute('read');
  } else {
    el.setAttribute('read', 0);
  }
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
            <div class="book-pages">#${book.pages}</div>
    `;
  const btn = document.createElement('button');
  btn.className = 'read-btn';
  btn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Read/Unread</title><path d="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z" /></svg>';
  btn.addEventListener('click', () => {
    book.changeStatus();
  });

  // btn.addEventListener('click', () => {
  //   book.deleteSelf();
  // });
  newBook.append(btn);

  const gridCnt = document.getElementsByClassName('grid-cnt');
  gridCnt[0].appendChild(newBook);
}
