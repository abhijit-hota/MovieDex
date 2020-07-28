import React, { useState, useEffect } from "react";
import { Modal, Grow, Grid, CircularProgress, Button, Chip, makeStyles } from "@material-ui/core";
import "../Stylesheets/MovieModal.css";
import defaultPoster from "../Stylesheets/default.png";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(0.5),
            color: theme.palette.primary.light,
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
            if (imdbData.Response) {
                setLoading(false);
            }
        };
        fetchIMDBData();
    }, [tmdbData.imdb_id, imdbData.Response]);

    const posterImg = (
        <img
            src={tmdbData.poster_path ? `https://image.tmdb.org/t/p/w300${tmdbData.poster_path}` : defaultPoster}
            alt={`${tmdbData.title} poster`}
            style={{ maxWidth: "100%", margin: "auto" }}
            className="modalPoster"
        />
    );

    return (
        <Modal
            style={{ outline: "0" }}
            open={props.shouldModalDisplay}
            onClose={props.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Grow in={props.shouldModalDisplay}>
                <Grid container spacing={0} justify="center" alignItems="center" style={{ minHeight: "100vh" }}>
                    {/* <div> */}
                    <Grid className="movieModal">
                        {loading ? (
                            //Replace below element with skeleton loader
                            <div>Loading</div>
                        ) : (
                            <Grid container spacing={5} direction="row" alignItems="flex-start" wrap="nowrap">
                                <Grid item xs={12} sm={12} lg={4}>
                                    {posterImg}
                                </Grid>
                                <Grid item xs={12} sm={12} lg={8}>
                                    <h1 className="modalTitle">{tmdbData.title}</h1>
                                    <h2 className="modalYear">{imdbData.Year}</h2>
                                    <h3 className="modalPlot">{imdbData.Plot}</h3>
                                    <Grid container spacing={1} justify="flex-start">
                                        {tmdbData.genres
                                            ? tmdbData.genres.map((genre) => (
                                                  <Chip
                                                      className={classes.root}
                                                      key={genre.id}
                                                      variant="outlined"
                                                      label={genre.name}
                                                  />
                                              ))
                                            : null}
                                    </Grid>
                                    <h2>
                                        {`${Math.floor(parseFloat(tmdbData.runtime) / 60)}hrs ${
                                            parseFloat(tmdbData.runtime) % 60
                                        }mins`}
                                    </h2>
                                    <Grid container spacing={1} justify="space-between" alignItems="center">
                                        {imdbData.Ratings
                                            ? imdbData.Ratings.map((rating) => {
                                                  return (
                                                      <Grid item key={rating.Source}>
                                                          <div
                                                              style={{
                                                                  position: "absolute",
                                                                  textAlign: "center",
                                                                  width: "100px",
                                                                  height: "100px",
                                                                  lineHeight: "100px",
                                                              }}>
                                                              {rating.Value}
                                                          </div>

                                                          <CircularProgress
                                                              variant="static"
                                                              value={
                                                                  rating.Source[0] !== "I"
                                                                      ? parseFloat(rating.Value)
                                                                      : parseFloat(rating.Value) * 10
                                                              }
                                                              size={100}
                                                              thickness={5}
                                                          />
                                                      </Grid>
                                                  );
                                              })
                                            : "loading"}
                                    </Grid>
                                    <h4>{imdbData.Actors}</h4>
                                    <h4>{imdbData.Director}</h4>
                                </Grid>
                            </Grid>
                        )}
                        <Button onClick={props.closeModal}>Close</Button>
                    </Grid>
                    {/* </div> */}
                </Grid>
            </Grow>
        </Modal>
    );
};

export default MovieModal;
