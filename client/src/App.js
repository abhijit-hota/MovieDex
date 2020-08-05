import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MovieContainer from "./components/MovieContainer";
import Logo from "./components/Logo";
import Info from "./components/Info";
import Paginate from "./components/Paginate";

const App = (props) => {
    const [queryString, setQueryString] = useState("");
    const [page, setPage] = useState(1);
    const [num_pages_results, setNumPagesAndResults] = useState({
        total_pages: 0,
        total_results: 0,
        present_results: 0,
    });
    return (
        <div className="App">
            <Logo />
            <Info />
            <SearchBar queryString={queryString} setQueryString={setQueryString} />
            {num_pages_results.total_results > 0 ? (
                <Paginate
                    present_results={num_pages_results.present_results}
                    total_pages={num_pages_results.total_pages}
                    total_results={num_pages_results.total_results}
                    handleChange={setPage}
                />
            ) : null}
            <MovieContainer queryString={queryString} page={page} setNumPagesAndResults={setNumPagesAndResults} />
        </div>
    );
};

export default App;
