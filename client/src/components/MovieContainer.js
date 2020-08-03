import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../Stylesheets/MovieContainer.css";
import MovieModal from "./MovieModal";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieContainer = ({ setNumPagesAndResults, queryString, page }) => {
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
        if (queryString.length === 0) {
            setNumPagesAndResults(0, 0, 0);
            setLoading(true);
            setMessage("");
        }
        if (queryString.length) {
            setLoading(true);
            setMessage("Loading");
            const fetchData = async () => {
                const res = await fetch(`/getMovies/?queryString=${queryString}&page=${page}`);
                const resJSON = await res.json();
                const { results, total_pages, total_results } = resJSON;
                setMovies(results);
                setNumPagesAndResults(total_pages, total_results, results.length);

                setLoading(false);
                if (results && results.length === 0) {
                    setMessage("No movies found! :(");
                }
            };
            fetchData();
        }
    }, [queryString, page]);

    return (
        <>
            <div id="movieContainer">
                {isLoading && queryString.length > 0? (
                    Array.from(new Array(5)).map((item, index) => <MovieCardSkeleton key={index} />)
                ) : queryString.length > 0 && movies && movies.length ? (
                    movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            poster={movie.poster_path}
                            id={movie.id}
                            year={movie.release_date ? movie.release_date.split("-")[0] : null}
                            openModal={openModal}
                        />
                    ))
                ) : (
                    <h1>{message}</h1>
                )}
            </div>
            {shouldModalDisplay ? (
                <MovieModal shouldModalDisplay={shouldModalDisplay} tmdb_id={tmdb_id} closeModal={closeModal} />
            ) : null}
        </>
    );
};

export default MovieContainer;
