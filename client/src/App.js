import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MovieContainer from "./components/MovieContainer";
import Logo from "./components/Logo"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryString: "thor",
		};
		this.setQueryString = this.setQueryString.bind(this);
    }
    
	setQueryString(val) {
		this.setState({
			queryString: val
		});
	}
    
    render() {
        return (
            <div className="App">
				<Logo/>
				<SearchBar queryString={ this.state.queryString } setQueryString={ this.setQueryString } />
				<MovieContainer queryString={ this.state.queryString }/>
            </div>
        );
    }
}

export default App;
