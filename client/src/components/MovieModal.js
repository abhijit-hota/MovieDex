import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ReactDOM from "react-dom";
import "../Stylesheets/MovieModal.css";

const MovieModal = (props) => {
    const [imdbData, setImdbData] = useState({});

    useEffect(() => {
        const fetchIMDBData = async () => {
            const res = await fetch(
                `http://www.omdbapi.com/?i=${props.imdb_id}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
            );
            const resJSON = await res.json();
            setImdbData(resJSON);
        };
        fetchIMDBData();
    }, [props.imdb_id]);

    return (
        <Modal
            open={props.shouldModalDisplay}
            onClose={props.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div className="movieModal">
                {/* {props.posterImg} */}
                <div>{props.imdb_id}</div>
            </div>
        </Modal>
    );
};

export default MovieModal;
