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
        const abortController = new AbortController();

        if (queryString.length === 0) {
            setNumPagesAndResults({ total_pages: 0, total_results: 0, present_results: 0 });
            setLoading(true);
            setMessage("");
        }
        if (queryString.length > 0) {
            setLoading(true);
            setMessage("Loading");

            const fetchData = async () => {
                try {
                    const res = await fetch(`/search/?queryString=${queryString}&page=${page}`, {
                        signal: abortController.signal,
                    });

                    if (res.status >= 200 && res.status < 400) {
                        const resJSON = await res.json();
                        const { results, total_pages, total_results } = resJSON;
                        setMovies(results);

                        const present_results = results.length;
                        setNumPagesAndResults({ total_pages, total_results, present_results });

                        setLoading(false);

                        if (results && results.length === 0) {
                            setMessage("No movies found! :(");
                        }
                    } else {
                        setLoading(false);
                        setMessage("Something went wrong. Please try again.");
                    }
                } catch (error) {
                    if (abortController.signal.aborted) {
                        console.log("Request aborted. Clean up called.");
                    } else {
                        console.log(error);
                    }
                }
            };
            fetchData();

            return () => {
                abortController.abort();
            };
        }
    }, [queryString, page, setNumPagesAndResults]);

    return (
        <>
            <div id="movieContainer">
                {isLoading && queryString.length > 0 ? (
                    Array.from(new Array(10)).map((item, index) => <MovieCardSkeleton key={index} />)
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
