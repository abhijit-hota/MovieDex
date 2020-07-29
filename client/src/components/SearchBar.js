import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(4),
            width: "85vw",
            maxWidth: "700px",
        },
    },
}));

const SearchBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                fullWidth
                label="Search for a movie"
                value={props.queryString}
                size="medium"
                onChange={(e) => props.setQueryString(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
