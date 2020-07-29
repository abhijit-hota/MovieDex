import React from "react";
import defaultPoster from "../Stylesheets/default.png";
import { Card, CardActions, CardContent, CardMedia, Button } from "@material-ui/core";

const MovieCard = (props) => {
    const styles = {
        backgroundColor: "whitesmoke",
        width: "270px",
        margin: "10px",
        height: "auto",
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    return (
        <Card style={styles} raised>
            <CardMedia
                component="img"
                alt={`${props.title} poster`}
                width="100%"
                image={props.poster ? `https://image.tmdb.org/t/p/w300${props.poster}` : defaultPoster}
                title={`${props.title}`}
            />
            <CardContent>
                <h2 style={{ margin: "0px" }}>{props.title}</h2>
                <h4 style={{ margin: "0px" }}>{props.year}</h4>
            </CardContent>
            <CardActions>
                <Button variant="outlined" color="primary" size="medium" onClick={() => props.openModal(props.id)}>
                    More
                </Button>
            </CardActions>
        </Card>
    );
};

export default MovieCard;
