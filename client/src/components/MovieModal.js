import React, { useState, useEffect } from "react";
import Ratings from "./ModalRatings";
import { Grow, Grid, Button, Chip, makeStyles, Dialog, useMediaQuery, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import "../Stylesheets/MovieModal.css";
import defaultPoster from "../Stylesheets/default.png";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    modalGenres: {
        "& > *": {
            margin: theme.spacing(0.5),
            marginBottom: "15px",
        },
    },
}));

const MovieModal = (props) => {
    const [tmdbData, setTmdbData] = useState({});
    const [imdbData, setImdbData] = useState({});
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

    useEffect(() => {
        const abortController = new AbortController();

        const fetchImdbIDandPoster = async () => {
            try {
                const res = await fetch(`getMovieDetails/?id=${props.tmdb_id}`, { signal: abortController.signal });
                const resJSON = await res.json();
                await setTmdbData(resJSON);
            } catch (error) {
                if (abortController.signal.aborted) {
                    console.log("Request aborted. Clean up called.");
                } else {
                    console.log(error);
                }
            }
        };
        fetchImdbIDandPoster();

        return () => {
            abortController.abort();
        };
    }, [props.tmdb_id]);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchIMDBData = async () => {
            try {
                const res = await fetch(`/getIMDBData/?imdbId=${tmdbData.imdb_id}`, { signal: abortController.signal });
                const resJSON = await res.json();
                setImdbData(resJSON);
                if (imdbData.Response === "True") {
                    setLoading(false);
                }
            } catch (error) {
                if (abortController.signal.aborted) {
                    console.log("Request aborted. Clean up called.");
                } else {
                    console.log(error);
                }
            }
        };

        if (tmdbData.imdb_id && tmdbData.imdb_id.length > 0) {
            fetchIMDBData();
        } else if (tmdbData.imdb_id) {
            setLoading(false);
        }

        return () => {
            abortController.abort();
        };
    }, [tmdbData.imdb_id, imdbData.Response]);

    const posterImg = (
        <img
            src={tmdbData.poster_path ? `https://image.tmdb.org/t/p/w400${tmdbData.poster_path}` : defaultPoster}
            alt={`${tmdbData.title} poster`}
            style={{ maxWidth: "100%", margin: "auto", borderRadius: "10px", boxShadow: "5px 5px 15px #212121" }}
            className="modalPoster"
        />
    );

    return (
        <Dialog
            fullScreen={fullScreen}
            maxWidth="md"
            open={props.shouldModalDisplay}
            onClose={props.closeModal}
            aria-labelledby="Movie Modal"
            aria-describedby="Movie description">
            <Grow in={props.shouldModalDisplay}>
                <Grid className="movieModal">
                    <Grid container spacing={5} direction="row" alignItems="flex-start" wrap="wrap">
                        <Grid item xs={12} sm={6} lg={5}>
                            {loading ? (
                                <Skeleton variant="rect" animation="wave" width={320} height={480} />
                            ) : (
                                posterImg
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6} lg={7}>
                            <Typography variant="h4" className="modalTitle">
                                {loading ? <Skeleton /> : tmdbData.title}
                            </Typography>
                            <Typography className="labels" variant="h6" gutterBottom>
                                {loading ? (
                                    <Skeleton variant="text" width={75} height={30} />
                                ) : (
                                    imdbData.Year || tmdbData.release_date.split("-")[0]
                                )}
                            </Typography>
                            <Grid container spacing={1} justify="flex-start" className={classes.modalGenres}>
                                {loading
                                    ? Array.from(new Array(3)).map((item, index) => (
                                          <Skeleton key={index} variant="rect" width={70} height={35} />
                                      ))
                                    : tmdbData.genres
                                    ? tmdbData.genres.map((genre) => (
                                          <Chip key={genre.id} variant="outlined" label={genre.name} />
                                      ))
                                    : null}
                            </Grid>
                            <Typography variant="subtitle1" className="valueText" gutterBottom>
                                {loading ? (
                                    <>
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                    </>
                                ) : (
                                    imdbData.Plot || tmdbData.overview
                                )}
                            </Typography>
                            <Typography variant="h6" className="labels">
                                Runtime
                            </Typography>
                            <Typography variant="subtitle1" className="valueText" gutterBottom>
                                {loading ? (
                                    <Skeleton variant="text" width={150} />
                                ) : (
                                    ` ${Math.floor(parseFloat(tmdbData.runtime) / 60)}hrs ${
                                        parseFloat(tmdbData.runtime) % 60
                                    }mins`
                                )}
                            </Typography>
                            <Grid
                                container
                                spacing={3}
                                justify="flex-start"
                                alignItems="center"
                                style={{ marginTop: "15px" }}>
                                {loading
                                    ? Array.from(new Array(3)).map((item, index) => (
                                          <Grid item key={index} lg={3} xs={3} sm={3}>
                                              <Skeleton variant="circle" width={80} height={80} />
                                          </Grid>
                                      ))
                                    : imdbData.Ratings && <Ratings ratings={imdbData.Ratings} />}
                            </Grid>
                            <Grid container spacing={3} style={{ marginTop: "20px" }}>
                                <Grid item xs={12} lg={8} md={8}>
                                    <Typography variant="h6" className="labels">
                                        Cast
                                    </Typography>
                                    <Typography variant="subtitle1" className="valueText">
                                        {loading ? (
                                            <>
                                                <Skeleton />
                                                <Skeleton variant="text" width={200} />
                                            </>
                                        ) : (
                                            imdbData.Actors && imdbData.Actors
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} lg={4} md={4}>
                                    <Typography variant="h6" className="labels">
                                        Director
                                    </Typography>
                                    <Typography variant="subtitle1" className="valueText">
                                        {loading ? <Skeleton /> : imdbData.Director && imdbData.Director}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} className="btn">
                            <Button onClick={props.closeModal} variant="outlined" color="primary">
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grow>
        </Dialog>
    );
};

export default MovieModal;
