
class Book {
    title: string;
    author: string;
    pages: number;
    id: string;
    constructor(title: string, author: string, pages: number) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = crypto.randomUUID();
    }
}

const myLibrary: Book[] = [];

function addBookToLibrary(book: Book) {
    myLibrary.push(book)
}

function displayBooks(myLibrary: Book[]){

    const bookList = document.getElementById("book-list");
    if (!bookList) return;

    // clear previous entries before displaying
    bookList.innerHTML = "";

    for (const book of myLibrary) {
        const p = document.createElement("p")
        p.textContent = `${book.title} by ${book.author} (${book.pages} pages)`;
        bookList.appendChild(p)
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("book-form") as HTMLFormElement;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = (document.getElementById("title") as HTMLInputElement).value;
        const author = (document.getElementById("author") as HTMLInputElement).value;
        const pages = parseInt((document.getElementById("pages") as HTMLInputElement).value);

        if (!title || !author || isNaN(pages)) {
            showFailureMessage("Please fill out all fields correctly!");
            return;
        }

        const newBook = new Book(title, author, pages);
        addBookToLibrary(newBook);
        showSuccessMessage("Book added successfully!");

        form.reset();
    })


    const viewBtn = document.getElementById("view-library-button") as HTMLButtonElement;
    const bookList = document.getElementById("book-list");
    let isVisible = false;
    viewBtn.addEventListener("click", () => {
        if (!bookList) return;
        if (myLibrary.length == 0) {
            showFailureMessage("No books in library!")
            return;
        }
        isVisible = !isVisible;
        if (isVisible) {
            displayBooks(myLibrary);
            viewBtn.textContent = "Click here to hide my library";
            bookList.style.display = "block";
        } else {
            viewBtn.textContent = "Click here to view my library";
            bookList.style.display = "none";
        }
    });

})

function showFailureMessage(message: string) {
    const failureMessage = document.getElementById("failure-message");
    if (!failureMessage) return;
    failureMessage.textContent = message;
    failureMessage.classList.add("show")
    setTimeout(() => {
        failureMessage.classList.remove("show")
    }, 3000)
}

function showSuccessMessage(message: string) {
    const successMessage = document.getElementById("success-message");
    if (!successMessage) return;
  
    // Set the message text
    successMessage.textContent = message;
  
    // Add the 'show' class without overwriting the ID or other classes
    successMessage.classList.add("show");
  
    // Remove the class after 3 seconds to reset it
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 3000);
}
  
