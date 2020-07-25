import React from "react";
import "../Stylesheets/SearchBar.css";

const SearchBar = (props) => {
    return (
        <>
            <input
                placeholder="Start Searching..."
                type="text"
                name="searchBar"
                id="searchBar"
                value={props.queryString}
                onChange={(e) => props.setQueryString(e.target.value)}
            />
        </>
    );
};

export default SearchBar;