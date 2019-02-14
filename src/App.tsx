import React, { Component } from 'react';
import NewEvent from "./events/new-event/NewEvent";
import Header from "./common/Header";
import "./App.css"
class App extends Component {
    render() {
        return (
            <div className="App">
                <Header pageName={"New Event"}/>
                <NewEvent/>
            </div>
        );
    }
}

export default App;
