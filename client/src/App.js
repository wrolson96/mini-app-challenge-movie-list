import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import DisplayMovies from "./Components/DisplayMovies";
import SearchMovies from "./Components/SearchMovies";
import DisplaySearchedMovies from "./Components/DisplaySearchedMovies";

export default function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <div className="App">
        <SearchMovies />
        <Routes>
          <Route path="/" element={<DisplayMovies />} />
          <Route path="/search/:query" element={<DisplaySearchedMovies />} />
        </Routes>
      </div>
    </Router>
  );
}
