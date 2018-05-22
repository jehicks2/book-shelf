import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookSection from './BookSection';

class BookShelf extends Component {
  render() {
    const { books, onSelect,isInMainBookShelves} = this.props
    return (
      <div>
            <div className="list-books-content">
                  <BookSection books={books} 
      						   sectionName={"currentlyReading"} 
      						   shelfTitle={"Currently Reading"}
      						   onSelect={onSelect}
      						   isInMainBookShelves={isInMainBookShelves}/>
                  <BookSection books={books} 
      						   sectionName={"wantToRead"}
      						   shelfTitle={"Want to Read"}
                               onSelect={onSelect}
      						   isInMainBookShelves={isInMainBookShelves}/>
                  <BookSection books={books} 
      						   sectionName={"read"}
      						   shelfTitle={"Read"}
      						   onSelect={onSelect}
      						   isInMainBookShelves={isInMainBookShelves}/>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
    </div>
    )
  }
}

export default BookShelf;