let newBook;
let library = [];

// Book constructor

class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = "Pages: " + form.pages.value;
        this.read = form.read.checked;
    }
}

//Checking if form is filled/valid

function checkForm() {
    event.preventDefault();
    if(form.title.value == "" || form.author.value == "" || form.pages.value == "") {
        alert("Please fill in all fields!")
        return false;
    } 
    else {
        return true;
    }
}

//Event listener for complete form button

const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", () => {
    if(checkForm() == false) return;
    addBook();
});

function addBook() {
    event.preventDefault();
    newBook = new Book(title, author, pages, read);
    library.push(newBook);
    saveLibrary();
    renderBook();
    form.reset();
}

//Building the book, deletes and rebuilds library from updated array

function renderBook() {
    const display = document.getElementById("bookcase");
    const books = document.querySelectorAll(".book");
    books.forEach(book => display.removeChild(book));

    for (let i=0; i < library.length; i++) {
        buildBook(library[i]);
    }
}

//Creating book from Javascript DOM elements

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

    const readBtn = document.createElement("button");
    readBtn.classList.add('readBtn')    
    bookDiv.appendChild(readBtn);
    if(bookContainer.read===false) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#e04f63';
    }else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#63da63'
    }

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

    readBtn.addEventListener('click', () => { 
        bookContainer.read = !bookContainer.read; 
        saveLibrary(); 
        renderBook();
    }); 

}


// Saving to local storage using JSON

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