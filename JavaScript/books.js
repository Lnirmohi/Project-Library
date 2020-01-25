let myLibrary = [];

const form = document.getElementById("form");

const tableBody = document.getElementById("tbody");

function books(title, author, noOfPages, isBookRead) {

    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.isBookRead = isBookRead;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${this.isBookRead === true ? "read already" : "not read yet"}`;
    };
}

form.onsubmit = (event) => {

    event.preventDefault();

    processFormData([...event.target.elements]);

    //console.log(event.target.elements);
};

function processFormData(formValues) {

    let valueArr = [];

    label:
    for(let i = 0; i < formValues.length; i++) {

        let element = formValues[i];

        if(element.nodeName === "BUTTON" ||
            (element.type === "radio" && element.checked === false)
        ) {
            continue label;
        }

        valueArr.push(element.value);
    }

    //console.log(valueArr);

    const tableRow = createTableRowForBook(valueArr, myLibrary.length);

    addBookToTable(tableRow);

    addBookToLibrary(new books(...valueArr));
}


function addBookToLibrary(book, index = null) {
    
    if(index !== null) {
        myLibrary.splice(index, 0, book);
    }else {
        myLibrary.push(book);
    }

    console.table(myLibrary);
}

function addBookToTable(book) {

    tableBody.appendChild(book);
}

function render() {
    
    for (let index = 0; index < myLibrary.length; index++) {

        let [name, author, pages, status] = [...myLibrary[i]];
        
        createTableRowForBook(myLibrary[i], index);
    }
}

function createTableRowForBook(valuesForRow, index) {

    const tr = document.createElement("tr");

    tr.setAttribute("data-index", index);

    tr.textContent = index;

    for(let i = 0; i < valuesForRow.length;i++) {

        let value = valuesForRow[i];

        const td = document.createElement("td");

        td.textContent = value;

        tr.appendChild(td);
    }

    return tr;
}