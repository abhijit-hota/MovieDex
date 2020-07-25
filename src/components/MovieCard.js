import React from "react";
import defaultPoster from '../Stylesheets/default.png'

const MovieCard = (props) => {
    const styles = {
        backgroundColor: "whitesmoke",
        width: "240px",
        margin: "10px",
        marginBottom: "30px",
        marginTop: "10px",
        boxShadow: "5px 5px 15px #555555",
    };
    return (
        <div className="movieCard" style={styles}>
            <img
                src={
                    props.poster
                        ? `https://image.tmdb.org/t/p/w300${props.poster}`
                        : defaultPoster
                }
                alt={`${props.title} poster`}
                style={{ width: "100%" }}
            />
            <div className="label">
                <h3 style={{ margin: "0px" }}>{props.title}</h3>
                <h3>{props.year}</h3>
            </div>
        </div>
    );
};

export default MovieCard;
