import React from "react";
import GitHubButton from "react-github-btn";

const Info = () => {
    const styles = {
        position: "static",
        top: "0",
        right: "0",
        display: 'flex',
        flex:'row wrap'
    };

    return (
        <div style={styles}>
            <GitHubButton
                href="https://github.com/abhijit-hota"
                data-color-scheme="no-preference: dark; light: dark; dark: dark;"
                data-size="large"
                data-show-count="true"
                aria-label="Made by Abhijit Hota">
                Made by Abhijit Hota
            </GitHubButton>
            <div style={{width:'10px'}}></div>
            <GitHubButton
                href="https://github.com/abhijit-hota/movie-dex"
                data-color-scheme="no-preference: dark; light: dark; dark: dark;"
                data-size="large"
                data-show-count="true"
                aria-label="Star this project on GitHub">
                Star this project on GitHub
            </GitHubButton>
        </div>
    );
};

export default Info;
