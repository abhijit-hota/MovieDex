const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

app.get("/getMovies/", async (req, res) => {
    try {
        const movieList = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${req.query.queryString}&page=1&include_adult=false`
        );
        const movieListJSON = await movieList.json();
        res.json(movieListJSON.results);
    } catch (error) {
        console.error("Error occured", error);
        res.json(["Error obtaining results"])
    }
});

app.get("/getMovieDetails/", async (req, res) => {
    const movie = await fetch(
        `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
    );
    const movieJSON = await movie.json();
    res.json(movieJSON);
});

app.get("/getIMDBData/", async (req, res) => {
    const data = await fetch(`http://www.omdbapi.com/?i=${req.query.imdbId}&apikey=${process.env.OMDB_API_KEY}`);
    const dataJSON = await data.json();
    res.json(dataJSON);
});

app.listen(3001, () => console.log("Server running!"));