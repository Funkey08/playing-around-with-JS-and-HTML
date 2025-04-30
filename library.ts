
function Book(title: string) {
    let book;
    book.title = title;
    book.id = crypto.randomUUID();
    return book;
}

const myLibrary: book[] = [];

function addBookToLibrary() {

}

