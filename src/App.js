import React, { Component } from "react";
import './App.css';
import Welcome from "../client/components/welcome";

class App extends Component {
    render() {
        return (
            <div className = "App-header">
                <Welcome></Welcome>                
            </div>
        );
    }
}

export default App;
