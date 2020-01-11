function books(title, author, noOfPages, isBookRead) {

    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.isBookRead = isBookRead;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${this.isBookRead === true ? "read already" : "not read yet"}`;
    };
}

let book = new books("a", "b", 30, false);

console.log(book.info());