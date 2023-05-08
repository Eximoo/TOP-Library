const myLibrary = [];
let bookCounter = 0;

let theHobbit = new Book('The Hobbit', 'J. R. R. Tolkien', 450, false);
let theHobbit2 = new Book('The Hobbit', 'J. R. R. Tolkien', 450, false);
let theHobbit3 = new Book('The Hobbit', 'J. R. R. Tolkien', 450, false);
let theHobbit4 = new Book('The Hobbit', 'J. R. R. Tolkien', 450, false);

myLibrary.push(theHobbit, theHobbit2, theHobbit3, theHobbit4);
displayCardsFromArr(myLibrary);
displayCardsFromArr(myLibrary);

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
  createCard(book);
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
}

function displayCardsFromArr(bookArr) {
  bookArr.forEach((book) => {
    if (!isBookDisplayed(book)) {
      createCard(book);
    }
  });
}
function isBookDisplayed(book) {
  let isDisplayed = false;
  let arr = Array.from(
    document.getElementsByClassName('grid-cnt')[0].childNodes
  ).slice(3);
  console.log(arr);
  arr.forEach((element) => {
    console.log(element.dataset.index);
    // if (book.id === element.dataset.index) {
    //   isDisplayed = true;
    // }
  });
  //   ((element) => {
  //     console.log({ element });
  //     numCallbackRuns++;
  //   });
  return isDisplayed;
}
function createCard(book) {
  const newBook = document.createElement('div');
  newBook.setAttribute('class', 'book');
  newBook.setAttribute('data-index', `${book.id}`);
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

function addBook(test) {
  myLibrary.push(test);
}
