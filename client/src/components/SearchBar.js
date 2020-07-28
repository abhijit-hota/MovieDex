import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    root: {
      '& > *': {
        // margin: theme.spacing(0),
        width: '50vw',
      },
    },
  });

const SearchBar = (props) => {
    const classes = useStyles();

    return (
        <>
            <TextField
                className={classes.root}
                id="standard-basic"
                label="Start Searching..."
                value={ props.queryString }
                size='medium'
                onChange={(e) => props.setQueryString(e.target.value)}
            />
        </>
    );
};

export default SearchBar;
