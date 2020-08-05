import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, InputAdornment, Button, TextField } from "@material-ui/core";
// import { Grid, Button, MenuItem, Select, InputLabel } from "@material-ui/core";

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

const scrollToRef = (ref) => {

    window.scrollTo({
        top: ref.current.offsetTop,
        left: 0,
        behavior: "smooth",
    });
}

const SearchBar = (props) => {
    const classes = useStyles();
    const myRef = useRef(null);

    const handleChange = (val) => {
        props.setQueryString(val);
        if (val.length > 0) {
            scrollToRef(myRef);
        }
    };

    const clearInput = () => {
        props.setQueryString("");
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
    return (
        <div id="searchBox" ref={myRef}>
            <Grid container className={classes.root}>
                <Grid lg={12} item>
                    <TextField
                        fullWidth
                        label="Search for a movie"
                        value={props.queryString}
                        size="medium"
                        onChange={(e) => handleChange(e.target.value)}
                        InputProps={ props.queryString.length > 0 ? {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={() => clearInput()}>Clear</Button>
                                </InputAdornment>
                            ),
                        } : null}
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
