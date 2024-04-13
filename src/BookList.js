import React from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  return (
    <div className="List">
      {books.map((book) => (
        <Link to={`/books/${book.id}`} key={book.id}>
          <BookCard
            image={
              book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
            }
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors}
            published={book.volumeInfo.publishedDate}
            categories={book.volumeInfo.categories}
          />
        </Link>
      ))}
    </div>
  );
};

export default BookList;
