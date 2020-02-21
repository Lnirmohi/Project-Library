function books(title, author, noOfPages, isBookRead) {

    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.isBookRead = isBookRead;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${this.isBookRead === true ? "read already" : "not read yet"}`;
    };
}

let myLibrary = [];

const form = document.getElementById("form");
const tableBody = document.getElementById("tbody");
const removeBookBtn = document.getElementById("remove-book-btn");
const addBookBtn = document.getElementById("add-book-btn");
const closeFormBtn = document.getElementById("close-form");

addBookBtn.addEventListener("click", toggleFormDisplay);
closeFormBtn.addEventListener("click", toggleFormDisplay);
removeBookBtn.addEventListener("click", toggleRemoveBtnDisplay);

form.onsubmit = (event) => {

    event.preventDefault();

    processFormData([...event.target.elements]);

    toggleRemoveBookBtnStatus();
};

// toggles form display
function toggleFormDisplay(event) {

    const formContainer = document.getElementById("add-book-form");

    if(formContainer.classList.contains("hidden")) {

        formContainer.classList.remove("hidden");
    }else {

        formContainer.classList.add("hidden");
    }
}

function toggleRemoveBtnDisplay(event) {

    let removeBtnList = [...document.getElementsByClassName("delete-book")];

    if(removeBtnList[0].classList.contains("hidden")) {

        console.log(event.target);

        removeBtnList.forEach((btn) => {

            btn.classList.remove("hidden");
        });
    }else {

        removeBtnList.forEach((btn) => {

            btn.classList.add("hidden");
        });
    }

    toggleRemoveBookBtnStatus();
}

function processFormData(formValues) {

    let valueArr = [];

    label:
    for(let i = 0; i < formValues.length; i++) {

        let element = formValues[i];
        
        //skip values of button and unchecked radio button
        if(element.nodeName === "BUTTON" ||
            (element.type === "radio" && element.checked === false)
        ) {
            continue label;
        }

        valueArr.push(element.value);
    }

    const tableRow = createTableRowForBook(valueArr, myLibrary.length);

    addBookToLibrary(new books(...valueArr));

    addBookToTableDisplay(tableRow);
}


function addBookToLibrary(book, index = null) {
    
    //if index of book to be added is specified
    if(index !== null) {
        myLibrary.splice(index, 0, book);
        refreshBookTable();
    }else {
        myLibrary.push(book);
    }
}

function addBookToTableDisplay(book) {

    tableBody.appendChild(book);
}

function render() {
    
    for (let index = 0; index < myLibrary.length; index++) {
        
        createTableRowForBook(myLibrary[i], index);
    }
}

function createTableRowForBook(valuesForRow, index) {

    const tr = document.createElement("tr");

    tr.setAttribute("data-index", index+1);

    const tdForIndex = document.createElement("td");
    tdForIndex.textContent = index + 1;
    tr.appendChild(tdForIndex);

    for(let i = 0; i < valuesForRow.length;i++) {

        let value = valuesForRow[i];

        const td = document.createElement("td");
        
        td.textContent = value;

        tr.appendChild(td);
    }

    // add delete at the end of each book on the last table-column
    const deleteBtn = document.createElement("td");
    deleteBtn.classList.add("hidden", "delete-book");

    deleteBtn.appendChild(createDeleteButton());

    tr.appendChild(deleteBtn);

    return tr;
}

function removeTableRows() {

    let newtbody = document.createElement("tbody");
    newtbody.setAttribute("id", "tbody");

    let oldtbody = document.getElementById("tbody");

    oldtbody.parentNode.replaceChild(oldtbody, newtbody);
}

function createDeleteButton() {

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";

    deleteButton.style.cssText = "background: #FEEEE6; color: #EF7748; font-size: 16px ;font-weight: 700; border: none; height: 30px; width: 22px";

    return deleteButton;
}

// if there is book in libraby then the remove-book-btn is enable else disabled
function toggleRemoveBookBtnStatus() {

    if(myLibrary.length > 0) {

        removeBookBtn.disabled = false;
    }else {

        removeBookBtn.disabled = true;
    }
}