import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';

class Search extends Component {
  
  handleSearch(event) {
    this.props.searchBooks(event.target.value.toLowerCase(), 20);
  }

  imageLink = (book) => {
    if (book.imageLinks !== undefined) {
      return (book.imageLinks.thumbnail);
    }
  }

  render() {
    const { searchedBooks, onSelect, resetSearch, isInMainBookShelves } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
    			<Link className="close-search" to="/" onClick={() => resetSearch()}>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onKeyUp={this.handleSearch.bind(this)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.length > -1 ? 
              (searchedBooks.map((book) => (
              <BookItem key={book.id} book={book} 
					              isInMainBookShelves={isInMainBookShelves} 
					              onSelect={onSelect}/>
                                ))
              ) : <li>Invalid search query. Please use another search term.</li>
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;