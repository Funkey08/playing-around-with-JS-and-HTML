var Book = /** @class */ (function () {
    function Book(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = crypto.randomUUID();
    }
    return Book;
}());
var myLibrary = [];
function addBookToLibrary(book) {
    myLibrary.push(book);
}
function displayBooks(myLibrary) {
    var bookList = document.getElementById("book-list");
    if (!bookList)
        return;
    // clear previous entries before displaying
    bookList.innerHTML = "";
    for (var _i = 0, myLibrary_1 = myLibrary; _i < myLibrary_1.length; _i++) {
        var book = myLibrary_1[_i];
        var p = document.createElement("p");
        p.textContent = "".concat(book.title, " by ").concat(book.author, " (").concat(book.pages, " pages)");
        bookList.appendChild(p);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("book-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var title = document.getElementById("title").value;
        var author = document.getElementById("author").value;
        var pages = parseInt(document.getElementById("pages").value);
        if (!title || !author || isNaN(pages)) {
            showFailureMessage("Please fill out all fields correctly!");
            return;
        }
        var newBook = new Book(title, author, pages);
        addBookToLibrary(newBook);
        showSuccessMessage("Book added successfully!");
        form.reset();
    });
    var viewBtn = document.getElementById("view-library-button");
    var bookList = document.getElementById("book-list");
    var isVisible = false;
    viewBtn.addEventListener("click", function () {
        if (!bookList)
            return;
        if (myLibrary.length == 0) {
            showFailureMessage("No books in library!");
            return;
        }
        isVisible = !isVisible;
        if (isVisible) {
            displayBooks(myLibrary);
            viewBtn.textContent = "Click here to hide my library";
            bookList.style.display = "block";
        }
        else {
            viewBtn.textContent = "Click here to view my library";
            bookList.style.display = "none";
        }
    });
});
function showFailureMessage(message) {
    var failureMessage = document.getElementById("failure-message");
    if (!failureMessage)
        return;
    failureMessage.textContent = message;
    failureMessage.classList.add("show");
    setTimeout(function () {
        failureMessage.classList.remove("show");
    }, 3000);
}
function showSuccessMessage(message) {
    var successMessage = document.getElementById("success-message");
    if (!successMessage)
        return;
    // Set the message text
    successMessage.textContent = message;
    // Add the 'show' class without overwriting the ID or other classes
    successMessage.classList.add("show");
    // Remove the class after 3 seconds to reset it
    setTimeout(function () {
        successMessage.classList.remove("show");
    }, 3000);
}
