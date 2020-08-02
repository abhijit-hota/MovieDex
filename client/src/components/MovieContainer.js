import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../Stylesheets/MovieContainer.css";
import MovieModal from "./MovieModal";
// import Paginate from "./Pagination";

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
            props.setNumPagesAndResults(0, 0);
        }
        if (props.queryString.length) {
            setLoading(true);
            setMessage("Loading");
            const fetchData = async () => {
                const res = await fetch(`/getMovies/?queryString=${props.queryString}&page=${props.page}`);
                const resJSON = await res.json();
                // if (res.status >= 200 && res.status < 400) {   
                    const { results, total_pages, total_results } = resJSON;
                    setMovies(results);
                    props.setNumPagesAndResults(total_pages, total_results);
                    
                    setLoading(false);
                    if (results.length === 0) {
                        setMessage("No movies found! :(");
                    }
                // }
            };
            console.log("called");
            fetchData();
        }
    }, [props.queryString, props.page]);

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
