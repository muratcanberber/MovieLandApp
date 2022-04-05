import React from "react";

function MovieCard(props) {
  const basePosterUrl = "https://image.tmdb.org/t/p/w780";
  const { release_date, poster_path, title } = props;
  return (
    <div className="movie">
      <div>
        <p>{release_date.split("-")[0]}</p>
      </div>
      <div>
        <p>
          <img src={basePosterUrl + poster_path} alt="posterImg" />
        </p>
      </div>
      <div>
        <span>{title}</span>
      </div>
    </div>
  );
}

export default MovieCard;
