import React, { useState, useEffect } from "react";
import Ratings from "./ModalRatings";
import { Modal, Grow, Grid, Button, Chip, makeStyles } from "@material-ui/core";
import "../Stylesheets/MovieModal.css";
import defaultPoster from "../Stylesheets/default.png";

const useStyles = makeStyles((theme) => ({
    modalGenres: {
        "& > *": {
            margin: theme.spacing(0.5),
        },
    },
}));

const MovieModal = (props) => {
    const [tmdbData, setTmdbData] = useState({});
    const [imdbData, setImdbData] = useState({});
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        const fetchImdbIDandPoster = async () => {
            const res = await fetch(`getMovieDetails/?id=${props.tmdb_id}`);
            const resJSON = await res.json();
            await setTmdbData(resJSON);
        };
        fetchImdbIDandPoster();
    }, [props.tmdb_id]);

    useEffect(() => {
        const fetchIMDBData = async () => {
            const res = await fetch(`/getIMDBData/?imdbId=${tmdbData.imdb_id}`);
            const resJSON = await res.json();
            setImdbData(resJSON);
            if (imdbData.Response === "True") {
                setLoading(false);
            }
        };
        if (tmdbData.imdb_id && tmdbData.imdb_id.length > 0) {
            fetchIMDBData();
        } else if (tmdbData.imdb_id) {
            setLoading(false);
        }
    }, [tmdbData.imdb_id, imdbData.Response]);

    const posterImg = (
        <img
            src={tmdbData.poster_path ? `https://image.tmdb.org/t/p/w400${tmdbData.poster_path}` : defaultPoster}
            alt={`${tmdbData.title} poster`}
            style={{ maxWidth: "100%", margin: "auto" }}
            className="modalPoster"
        />
    );

    return (
        <Modal
            disableScrollLock
            style={{ outline: "0" }}
            open={props.shouldModalDisplay}
            onClose={props.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Grow in={props.shouldModalDisplay}>
                <Grid container spacing={0} justify="center" alignItems="center" style={{ minHeight: "100vh" }}>
                    <Grid className="movieModal">
                        {loading ? (
                            //Replace below element with skeleton loader
                            <div>Loading</div>
                        ) : (
                            <Grid container spacing={5} direction="row" alignItems="flex-start" wrap="wrap">
                                <Grid item xs={12} sm={6} lg={5}>
                                    {posterImg}
                                </Grid>
                                <Grid item xs={12} sm={6} lg={7}>
                                    <h1 className="modalTitle">{tmdbData.title}</h1>
                                    <h2 className="modalYear">
                                        {imdbData.Year || tmdbData.release_date.split("-")[0]}
                                    </h2>
                                    <Grid container spacing={1} justify="flex-start" className={classes.modalGenres}>
                                        {tmdbData.genres
                                            ? tmdbData.genres.map((genre) => (
                                                  <Chip key={genre.id} variant="outlined" label={genre.name} />
                                              ))
                                            : null}
                                    </Grid>
                                    <h3 className="modalPlot">{imdbData.Plot || tmdbData.overview}</h3>
                                    <h3 className="modalRuntime">
                                        Runtime:
                                        {` ${Math.floor(parseFloat(tmdbData.runtime) / 60)}hrs ${
                                            parseFloat(tmdbData.runtime) % 60
                                        }mins`}
                                    </h3>
                                    {imdbData.Ratings && <Ratings ratings={imdbData.Ratings} />}
                                </Grid>
                                <Grid item lg={12}>
                                    <h4>Director: {imdbData.Director && imdbData.Director}</h4>
                                    <h4>Cast: {imdbData.Actors && imdbData.Actors}</h4>
                                </Grid>
                                <Grid item lg={12} className="btn">
                                    <Button onClick={props.closeModal} variant="outlined" color="primary">
                                        Close
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grow>
        </Modal>
    );
};

export default MovieModal;
