const addBookButton = document.querySelector("#bookAdd");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const form = document.querySelector(".book-form");
const formButton = document.querySelector("#formButton");

addBookButton.addEventListener("click", e => {
    console.log("Add book");
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
});

overlay.addEventListener("click", e => {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
});

formButton.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

    console.log(data);

    addBookToLibrary(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("read"));
    displayBooks();
    form.reset();
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
});

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function() {
        return (`${this.title} by ${this.author}, ${this.pages}, ${this.read} with ID of ${this.id}`);
    }
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("Lord of the Rings: Fellowship of the Ring", "J.R.R Tolkien", 550, "read");
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 300, "read");
addBookToLibrary("Mistborn: The Final Empire", "Brandon Sanderson", 672, "not read");
addBookToLibrary("Lord of the Rings: The Two Towers", "J.R.R Tolkien", 464, "not read");
addBookToLibrary("Lord of the Rings: The Return of the King", "J.R.R Tolkien", 600, "not read");
addBookToLibrary("Sapiens", "Yuval Noah Harari", 464, "not read");
addBookToLibrary("Pride and Pejudice", "Jane Austen", 450, "not read");
addBookToLibrary("Count of Monte Cristo", "Alexandre Dumas", 1300, "read");


function displayBooks() {
    const booksContainer = document.querySelector(".books-container");

    booksContainer.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const title = document.createElement("h4");
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement("h4");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("h4");
        pages.textContent = `Pages: ${book.pages}`;

        const read = document.createElement("h4");
        read.textContent = `Staus: ${book.read ? "Read" : "Not read"}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-button");

        const readBtn = document.createElement("button");
        readBtn.textContent = "Change read status";
        readBtn.classList.add("read-button");

        removeBtn.addEventListener("click", e => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            myLibrary.splice(index, 1);
            displayBooks();
        });

        readBtn.addEventListener("click", e => {
            book.toggleRead();
            displayBooks();
        });

        card.append(title, author, pages, read, removeBtn, readBtn);

        booksContainer.appendChild(card);
    });
}

displayBooks();