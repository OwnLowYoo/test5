import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./Books";
import BookDetails from "./BookDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
