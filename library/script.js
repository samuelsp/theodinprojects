const bookValue = document.getElementById('bookText');
const bookAlert = document.getElementById('Alert');
const bookItems = document.getElementById('list-books');
const addUpdate = document.getElementById('AddUpdateClick');

//https://medium.com/@sharathchandark/how-to-build-a-todo-list-app-using-html-css-and-javascript-340cda6e3f9f

let books = JSON.parse(localStorage.getItem('book-list'));
if (!books) {
    books = [];
}

function setLocalStorage() {
    localStorage.setItem('book-list', JSON.stringify(books));
}

function setAlertMessage(message) {
  bookAlert.removeAttribute("class");
  bookAlert.innerText = message;
  setTimeout(() => {
    bookAlert.innerText = "";
    //bookAlert.classList.add("toggleMe");
  }, 1000);
}

function addBook() {
    if (bookValue.value === "") {
        bookAlert.innerText = "Please enter your book text!";
        bookValue.focus();
    } else {
        let IsPresent = false;
        books.forEach((element) => {
            if (element.item == bookValue.value) {
                IsPresent = true;
            }
        });

        if (IsPresent) {
            setAlertMessage("This book is already present in the list!");            
            return;
        }

        let li = document.createElement("li");
        const item = `<div title="List of books">${bookValue.value}</div><div>
                <img class="edit book-controls" onclick="UpdateBookItems(this)" src="./assets/check.png" alt="Check Icon" />
                <img class="delete book-controls" onclick="DeleteBookItems(this)" src="./assets/delete.png" alt="Delete Icon" />
                <img class="complete book-controls" onclick="CompletedBookItems(this.parentElement.parentElement)" src="./assets/task_alt.png" alt="Complete Icon" /></div></div>`;
                li.innerHTML = item;
        bookItems.appendChild(li);

        books.push({ item: bookValue.value });      
        setLocalStorage(); 
        bookValue.value = ""; 
        bookAlert.innerText = ""; 
    }
}

function CompletedBookItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration === "") {        
        e.parentElement.querySelector("div").style.textDecoration = "line-through";        
        e.parentElement.querySelector("img.edit").remove();

        books.forEach((element) => {
            if (
                e.parentElement.querySelector("div").innerText.trim() == element.item
            ) {
                element.status = true;
            }
        });
        setLocalStorage();
        setAlertMessage("Book item Completed Successfully!");
    }
}

function DeleteBookItems(e) {
    let deleteValue =
      e.parentElement.parentElement.querySelector("div").innerText;
  
    if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
      e.parentElement.parentElement.setAttribute("class", "deleted-item");
      bookValue.focus();
  
      books.forEach((element) => {
        if (element.item == deleteValue.trim()) {
          books.splice(element, 1);
        }
      });
  
      setTimeout(() => {
        e.parentElement.parentElement.remove();
      }, 1000);
  
      setLocalStorage();
    }
  }

  function UpdateBookItems(e) {
    if (
      e.parentElement.parentElement.querySelector("div").style.textDecoration ===
      ""
    ) {
      bookValue.value =
        e.parentElement.parentElement.querySelector("div").innerText;
      updateText = e.parentElement.parentElement.querySelector("div");
      addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
      addUpdate.setAttribute("src", "./assets/refresh.png");
      bookValue.focus();
    }
  }
  
  function UpdateOnSelectionItems() {
    let IsPresent = false;
    books.forEach((element) => {
      if (element.item == bookValue.value) {
        IsPresent = true;
      }
    });
  
    if (IsPresent) {
      setAlertMessage("This item already present in the list!");
      return;
    }
  
    books.forEach((element) => {
      if (element.item == updateText.innerText.trim()) {
        element.item = bookValue.value;
      }
    });
    setLocalStorage();
  
    updateText.innerText = bookValue.value;
    addUpdate.setAttribute("onclick", "addBook()");
    addUpdate.setAttribute("src", "./assets/plus.png");
    bookValue.value = "";
    setAlertMessage("Book updated successfully!");
  }

function ReadBookItems() {
    books.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if (element.status) {
        style = "style='text-decoration: line-through'";
      }
      const items = `<div ${style} title="List of books">${element.item}
      ${
        style === ""
          ? ""
          : '<img class="book-controls" src="./assets/check.png" />'
      }</div><div>
      ${
        style === ""
          ? '<img class="edit book-controls" onclick="UpdateBookItems(this)" src="./assets/check.png" />'
          : ""
      }
      <img class="delete book-controls" onclick="DeleteBookItems(this)" src="./assets/delete.png" />
      <img class="complete book-controls" onclick="CompletedBookItems(this.parentElement.parentElement)" src="./assets/task_alt.png" alt="Complete Icon" /></div></div>`;
      li.innerHTML = items;
      bookItems.appendChild(li);
    });
  }

  ReadBookItems();