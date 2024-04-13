import React, { Component } from "react";
import SearchArea from "./SearchArea";
import request from "superagent";
import BookList from "./BookList";
import { API_URL } from "./config";
class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchField: "",
      category: "all", //
      sort: "",
      startIndex: 0,
      totalBooks: 0,
    };
  }

  searchBook = (e) => {
    e.preventDefault();
    const { searchField } = this.state;

    if (searchField.trim() === "") {
      return;
    }

    const maxResults = 30;
    const startIndex = 0;

    request
      .get(API_URL)
      .query({ q: this.state.searchField, maxResults, startIndex })
      .then((data) => {
        console.log(data);
        const cleanData = this.cleanData(data);
        this.setState({
          books: cleanData,
          startIndex: maxResults,
          totalBooks: data.body.totalItems,
        }); //totalbooks
      });
  };

  loadMoreBooks = () => {
    const { searchField, startIndex } = this.state;
    const maxResults = 30;
    const newStartIndex = startIndex + maxResults;

    request
      .get(API_URL)
      .query({ q: searchField, maxResults, startIndex: newStartIndex }) // Использование нового startIndex для загрузки следующих результатов
      .then((data) => {
        const newBooks = this.cleanData(data);
        this.setState((prevState) => ({
          books: [...prevState.books, ...newBooks],
          startIndex: newStartIndex, // Обновление startIndex для следующей пагинации
        }));
      });
  };

  handleSearch = (e) => {
    this.setState({ searchField: e.target.value });
  };

  handleSort = (e) => {
    this.setState({ sort: e.target.value });
  };

  cleanData = (data) => {
    const cleanedData = data.body.items.map((book) => {
      if (!book.volumeInfo.hasOwnProperty("publishedDate")) {
        book.volumeInfo["publishedDate"] = "";
      } else if (!book.volumeInfo.hasOwnProperty("imageLinks")) {
        book.volumeInfo["imageLinks"] = {
          thumbnail: "/images/img_1.png",
        };
      }
      return book;
    });
    return cleanedData;
  };

  render() {
    const sortedBooks = this.state.books.sort((a, b) => {
      if (this.state.sort === "Newest")
        return (
          parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
          parseInt(a.volumeInfo.publishedDate.substring(0, 4))
        );
      else if (this.state.sort === "Oldest")
        return (
          parseInt(a.volumeInfo.publishedDate.substring(0, 4)) -
          parseInt(b.volumeInfo.publishedDate.substring(0, 4))
        );
    });
    return (
      <div>
        <SearchArea
          searchBook={this.searchBook}
          handleSearch={this.handleSearch}
          handleCategory={this.handleCategory} //
          handleSort={this.handleSort}
          totalBooks={this.state.totalBooks}
        />
        <BookList books={sortedBooks} />
        {this.state.books.length > 0 && (
          <button onClick={this.loadMoreBooks} className="loadMore-button">
            Load More
          </button>
        )}
      </div>
    );
  }
}

export default Books;
