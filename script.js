let newBook;
let library = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = "Pages: " + form.pages.value;
        this.read = form.read.checked;
    }
}

const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", addBook);

function addBook() {
    event.preventDefault();
    newBook = new Book(title, author, pages, read);
    library.push(newBook);
    saveLibrary();
    renderBook();
    form.reset();
}

function renderBook() {
    const display = document.getElementById("bookcase");
    const books = document.querySelectorAll(".book");
    books.forEach(book => display.removeChild(book));

    for (let i=0; i < library.length; i++) {
        buildBook(library[i]);
    }
}

function buildBook(bookContainer) {
    const libraryContainer = document.querySelector("#bookcase");


    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute("id", library.indexOf(bookContainer));

    const titleDiv = document.createElement("div");
    titleDiv.textContent = bookContainer.title;
    titleDiv.classList.add("title");
    bookDiv.appendChild(titleDiv);

    const authorDiv = document.createElement("div");
    authorDiv.textContent = bookContainer.author;
    authorDiv.classList.add("author");
    bookDiv.appendChild(authorDiv);

    const pageDiv = document.createElement("div");
    pageDiv.textContent = bookContainer.pages;
    pageDiv.classList.add("pages");
    bookDiv.appendChild(pageDiv);


    const readCheckBox = document.createElement("input");
    readCheckBox.type = 'checkbox';
    readCheckBox.classList.add("readCheckBox");

    const label = document.createElement("label");
    label.htmlFor = "read ";
    label.classList.add("readLabel");
    label.appendChild(document.createTextNode("Read: "))

    bookDiv.appendChild(label);
    bookDiv.appendChild(readCheckBox);
    setCheckBox(bookContainer, readCheckBox);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.setAttribute("id", "removeBtn");
    bookDiv.appendChild(removeBtn);

    libraryContainer.appendChild(bookDiv);

    removeBtn.addEventListener("click", () => {
        library.splice(library.indexOf(bookContainer), 1);
        saveLibrary();
        renderBook();
    });

}

function setCheckBox(container, checkBox) {
    if(container.read === true) {
        checkBox.checked = true;
    }else {
        checkBox.checked = false;
    }
}

function saveLibrary() {
    localStorage.setItem("library", JSON.stringify(library));
}

function load() {
    if(!localStorage.library) {
        renderBook();
    }
    else {
        let objects = localStorage.getItem("library");
        objects = JSON.parse(objects);
        library = objects;
        renderBook();
    }
}

load();