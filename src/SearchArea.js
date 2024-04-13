import React from "react";

const SearchArea = (props) => {
  return (
    <div className="search-area">
      <form onSubmit={props.searchBook} action="">
        <input onChange={props.handleSearch} type="text" />

        <button type="submit">Search</button>
        <select defaultValue="all" onChange={props.handleCategory}>
          <option value="all">All</option>
          <option value="art">Art</option>
          <option value="biography">Biography</option>
          <option value="computers">Computers</option>
          <option value="history">History</option>
          <option value="medical">Medical</option>
          <option value="poetry">Poetry</option>
        </select>
        <select defaultValue="Sort" onChange={props.handleSort}>
          <option value="Sort">Relevant</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
        <div>Total Books: {props.totalBooks}</div>
      </form>
    </div>
  );
};
export default SearchArea;
