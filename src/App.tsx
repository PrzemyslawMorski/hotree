import React, { Component } from 'react';
import NewEvent from "./events/new-event/NewEvent";
import Header from "./common/header/Header";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header pageName={"New event"}/>
                <NewEvent/>
            </div>
        );
    }
}

export default App;
