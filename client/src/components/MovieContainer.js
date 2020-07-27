import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../Stylesheets/MovieContainer.css";
import MovieModal from "./MovieModal";

const MovieContainer = (props) => {
    const [movies, getMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [shouldModalDisplay, setModalDisplay] = useState(false);
    const [imdb_id, setImdbId] = useState("");
    const [posterImg, setPoster] = useState({});

    const openModal = async (id, posterIMG) => {
        setModalDisplay(true);
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`
        );
        const resJSON = await res.json();
        setImdbId(resJSON.imdb_id);
        setPoster(posterIMG);
    };

    const closeModal = () => {
        setModalDisplay(false);
    };
    useEffect(() => {
        if (props.queryString.length === 0) {
            setMessage("Start searching now!");
        }
        if (props.queryString.length > 3) {
            setLoading(true);
            setMessage("Loading");
            const fetchData = async () => {
                const res = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&query=${props.queryString}&page=1&include_adult=false`
                );
                const resJSON = await res.json();
                getMovies(resJSON.results);
                setLoading(false);
                if (resJSON.results.length === 0) {
                    setMessage("No movies found! :(");
                }
            };
            fetchData();
        }
    }, [props.queryString]);

    return (
        <>
            <div id="movieContainer">
                {isLoading ? (
                    <h1>{message}</h1>
                ) : movies && movies.length ? (
                    movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            poster={movie.poster_path}
                            id={movie.id}
                            year={
                                movie.release_date
                                    ? movie.release_date.split("-")[0]
                                    : null
                            }
                            openModal={openModal}
                        />
                    ))
                ) : (
                    <h1>{message}</h1>
                )}
            </div>
            {/* {shouldModalDisplay ? ( */}
            <MovieModal
                shouldModalDisplay={shouldModalDisplay}
                imdb_id={imdb_id}
                closeModal={ closeModal }
                posterImg={posterImg}
            >
            </MovieModal>
            {/* // ) : null} */}
        </>
    );
};

export default MovieContainer;
