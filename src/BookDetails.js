import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import request from "superagent";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = () => {
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
    request
      .get(url)
      .then((response) => {
        const bookData = response.body;
        setBook(bookData);
      })
      .catch((error) => {
        console.log("Error fetching book details:", error);
      });
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  const { title, authors, publishedDate, description, imageLinks, categories } =
    book.volumeInfo;

  return (
    <div>
      <h2>{title}</h2>
      <p>Author(s): {authors ? authors.join(", ") : "No author"}</p>
      <p>Published Date: {publishedDate || "No published date"}</p>
      <p>Categories: {categories ? categories.join(", ") : "No categories"}</p>
      <div style={{ display: "flex" }}>
        <img
          src={imageLinks?.thumbnail || "/images/img_1.png"}
          style={{
            width: description ? "300%" : "30%",
            height: "auto",
            marginRight: "20px",
          }}
        />
        <div>
          <p>Description: {description || "No description available"}</p>
        </div>
      </div>

      <Link to="/" className="back-button">
        Back to Search
      </Link>
    </div>
  );
};

export default BookDetails;
