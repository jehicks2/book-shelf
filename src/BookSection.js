import React, { Component } from 'react';
import BookItem from './BookItem';

class BookSection extends Component {

  render(){
    const {books, sectionName, onSelect, shelfTitle, isInMainBookShelves} = this.props;
    return(
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => {return book.shelf === sectionName}).map((book) => (
              <BookItem key={book.id} book={book} 
      	                onSelect={onSelect} 
      	                isInMainBookShelves={isInMainBookShelves}/>
              ))
            }
          </ol>
        </div>
      </div>
    </div>
    )
  }
}

export default BookSection;