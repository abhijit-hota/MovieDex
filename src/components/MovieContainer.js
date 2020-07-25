import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../Stylesheets/MovieContainer.css";

const MovieContainer = (props) => {
    const [movies, getMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        if (props.queryString.length === 0) {
            setMessage("Start searching now!");
        }

        if (props.queryString.length > 3) {
            setLoading(true);
            setMessage("Loading");
            fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&query=${props.queryString}&page=1&include_adult=false`
            )
                .then((res) => res.json())
                .then((response) => {
                    getMovies(response.results);
                    setLoading(false);
                    if (response.results.length === 0) {
                        setMessage("No movies found! :(");
                    }
                })
                .catch((err) => `Error asila: ${err}`);
        }
    }, [props.queryString]);

    return (
        <div id="movieContainer">
            {isLoading ? (
                <h1>{message}</h1>
            ) : movies && movies.length ? (
                movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        poster={movie.poster_path}
                        year={movie.release_date.split("-")[0]}
                    />
                ))
            ) : (
                <h1>{message}</h1>
            )}
        </div>
    );
};

export default MovieContainer;
