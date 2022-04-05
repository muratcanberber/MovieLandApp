import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import svgIcon from "./img/search.svg";
import MovieCard from "./components/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let fetchUrl = "";
  const searchMovies = async (title) => {
    if (title) {
      fetchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${title}`;
    } else {
      fetchUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    }
    const response = await fetch(fetchUrl);
    const data = await response.json();

    setMovies(data.results);
  };
  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchMovies(searchTerm)}
        />
        <img
          src={svgIcon}
          alt="searchIcon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies
            .filter((item) => item.poster_path !== null)
            .map((item) => (
              <MovieCard
                release_date={item.release_date}
                poster_path={item.poster_path}
                title={item.title}
              />
            ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
