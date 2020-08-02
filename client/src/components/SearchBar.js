import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid, Button, MenuItem, Select, InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(4),
            width: "85vw",
            maxWidth: "700px",
            alignSelf: "center",
        },
    },
}));

const SearchBar = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.root}>
                <Grid lg={12} item>
                    <TextField
                        fullWidth
                        label="Search for a movie"
                        value={props.queryString}
                        size="medium"
                        onChange={(e) => props.setQueryString(e.target.value)}
                    />
                </Grid>
                {/* <Grid container styles={{ width: "100%" }}>
                    <Grid item xs={4} lg={4} md={4}>
                        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                        <Select>
                            <MenuItem>lorem</MenuItem>
                            <MenuItem>lorem</MenuItem>
                            <MenuItem>lorem</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={4} lg={4} md={4}>
                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select>
                            <MenuItem>lorem</MenuItem>
                            <MenuItem>lorem</MenuItem>
                            <MenuItem>lorem</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={4} lg={4} md={4}>
                        <InputLabel id="demo-simple-select-label">Order by</InputLabel>
                        <Select>
                            <MenuItem>lorem</MenuItem>
                            <MenuItem>lorem</MenuItem>
                            <MenuItem>lorem</MenuItem>
                        </Select>
                    </Grid>
                </Grid> */}
            </Grid>
        </div>
    );
};

export default SearchBar;
