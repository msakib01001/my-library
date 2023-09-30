class Book {
    constructor(title, author, isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    static addToBookList(book){
        // console.log(book);
        let list = document.getElementById('book-list')
        let row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class = "delete">X</a></td>`

        // console.log(row);
        list.append(row)
    }
    static clearFields() {
        document.getElementById('title').value=''
        document.getElementById('author').value= ''
        document.getElementById('isbn').value=''
    }
    static showAlert(message, classN){
        let div = document.createElement('div');
        div.className = `alert ${classN}`
        div.appendChild(document.createTextNode(message))

        let container = document.querySelector('.container')
        let form = document.querySelector("#book-form")
        container.insertBefore(div, form)

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2000)
    }
    static deleteBook(target){
        if (target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())
            this.showAlert("Book Removed!", 'success') 
        }
    }
}

class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        console.log(books);
        return books
        
    }

    static addBook (book) {
        let books = Store.getBooks()
        books.push(book)
        

        localStorage.setItem('books', JSON.stringify(books))

    }

    static displayBooks(){
        let books = Store.getBooks();

        books.forEach(book => {
            UI.addToBookList(book)
        });
    }

    static removeBook(isbn){
        let books = Store.getBooks()

        books.forEach((book, index) => {
            if (book.isbn === isbn){
                books.splice (index, 1)
                localStorage.setItem('books', JSON.stringify(books))
            }
        })
    }
}


// Define Functions 
const newBook = (e) => {
    e.preventDefault()

    let title = document.getElementById('title').value
    author = document.getElementById('author').value
    isbn = document.getElementById('isbn').value

    if (title ==='' || author === '' || isbn === ''){
        UI.showAlert("Please Fill All the Fields!", "error")
    }
    else{
        let book = new Book (title, author, isbn)
        UI.addToBookList(book)
        UI.clearFields()
        UI.showAlert("Book Added!", "success")

        Store.addBook(book)
    }

}

// delete books 
const removeBook = (e) => {
    UI.deleteBook(e.target);
    e.preventDefault()
}

// Define Event Listener
document.getElementById('submit').addEventListener('click', newBook)

document.getElementById('book-list').addEventListener('click', removeBook)

document.addEventListener('DOMContentLoaded', Store.displayBooks())