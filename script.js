class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = form.pages.value;
        this.read = form.read.checked;
    }
}

const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", addBook);



