import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MovieContainer from "./components/MovieContainer";
import Logo from "./components/Logo";
import Info from "./components/Info";
import Paginate from "./components/Paginate";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryString: "",
            page: 1,
            total_pages: 0,
            total_results: 0,
            present_results: 0,
        };
        this.setQueryString = this.setQueryString.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setNumPagesAndResults = this.setNumPagesAndResults.bind(this);
    }

    setQueryString(val) {
        this.setState({
            queryString: val,
        });
    }

    setPage(event, val) {
        this.setState({
            page: val,
        });
    }
    setNumPagesAndResults(total_pages, total_results, present_results) {
        this.setState({ total_pages, total_results, present_results }, () => console.log(this.state));
    }

    render() {
        return (
            <div className="App">
                <Logo />
                <Info />
                <SearchBar queryString={this.state.queryString} setQueryString={this.setQueryString} />
                {this.state.total_results > 0 ? (
                    <Paginate
                        present_results={this.state.present_results}
                        total_pages={this.state.total_pages}
                        total_results={this.state.total_results}
                        handleChange={this.setPage}
                    />
                ) : null}
                <MovieContainer
                    queryString={this.state.queryString}
                    page={this.state.page}
                    setNumPagesAndResults={this.setNumPagesAndResults}
                />
            </div>
        );
    }
}

export default App;
