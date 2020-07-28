import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../Stylesheets/MovieContainer.css";
import MovieModal from "./MovieModal";

const MovieContainer = (props) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [shouldModalDisplay, setModalDisplay] = useState(false);
    const [tmdb_id, setId] = useState("");

    const openModal = async (id) => {
        setModalDisplay(true);
        setId(id);
    };

    const closeModal = () => {
        setModalDisplay(false);
    };
    useEffect(() => {
        if (props.queryString.length === 0) {
            setLoading(true);
            setMessage("");
        }
        if (props.queryString.length) {
            setLoading(true);
            setMessage("Loading");
            const fetchData = async () => {
                const res = await fetch(
                    `/getMovies/?queryString=${props.queryString}`
                );
                const resJSON = await res.json();
                setMovies(resJSON);
                setLoading(false);
                if (resJSON.length === 0) {
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
            {shouldModalDisplay ? (
                <MovieModal
                    shouldModalDisplay={shouldModalDisplay}
                    tmdb_id={tmdb_id}
                    closeModal={closeModal}
                />
            ) : null}
        </>
    );
};

export default MovieContainer;
