import React from 'react';
import './App.css';
import SearchShelf from './SearchShelf';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI.js';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      searchedBooks: [],
      maxSearchResults: 20,
      query: ''
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  callAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }
  
  componentDidMount = () => {
    this.callAllBooks()
  }

  handleSelect = (book, event, query) => {
    const value = event.target.value;
    this.setState((prevState) => ({
      book: { ...prevState.book,
        shelf: value
      }
    }))
    BooksAPI.update(book, value)
      .then((book) => {
        this.callAllBooks()
      })
  }

  isInMainBookShelves = (currentBook) => {
    const books = this.state.books.filter((book) => {
      return book.id === currentBook.id
    });
    return books.length > 0 ? books[0].shelf : currentBook.shelf = "none"; 
  }

  searchBooks = (query, maxSearchResults) => {
    BooksAPI.search(query, maxSearchResults).then((searchBooks) => {
      if (query.length > 0) {
        this.setState((currentState) => ({
          searchedBooks: searchBooks
        }))
      }
      else {
        this.setState((currentState) => ({
          searchedBooks: []
        }))
      }
    })
  }
    
  resetSearch() {
    this.setState((currentState) => ({
      searchedBooks: []
    }))
  }
  
  render() {
    const { books, searchedBooks } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <BookShelf books={books} 
      				       onSelect={this.handleSelect}
      				       isInMainBookShelves={this.isInMainBookShelves}/>
          </div>
        )}/> 
        <Route exact path='/search' render={() => (
          <SearchShelf books={books} 
					             searchedBooks={searchedBooks} 
					             searchBooks={this.searchBooks} 
					             onSelect={this.handleSelect} 
					             onPageNavigation={this.resetSearch}
					             isInMainBookShelves={this.isInMainBookShelves}/>
        )}/> 
    </div>
    )
  }
}

export default BooksApp
