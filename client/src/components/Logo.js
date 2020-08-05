import React from "react";
import logo from "../Stylesheets/logo.png";
import tmdbLogo from "../Stylesheets/tmdbLogo.png";
import omdbLogo from "../Stylesheets/omdbLogo.png";

const Logo = () => {
    const styles = {
        primaryLogo: {
            margin: "40px 0 40px 0px",
            width: "90vw",
            maxWidth: "500px",
            justifySelf: "center",
        },
        apiLogos: {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
        },
    };

    return (
        <div style={styles.primaryLogo}>
            <img style={{ width: "100%", margin: "auto" }} src={logo} alt="MovieDex Logo" />
            <h4 style={{ margin: "20px 0 10px 0"}}>Powered by</h4>
            <div style={styles.apiLogos}>
                <a target="blank" href="https://developers.themoviedb.org/3/">
                    <img style={{ width: "130px" }} src={tmdbLogo} alt="TMDB Logo" />
                </a>
                <a target="blank" href="http://www.omdbapi.com/">
                    <img style={{ width: "150px" }} src={omdbLogo} alt="OMDB Logo" />
                </a>
            </div>
        </div>
    );
};

export default Logo;
