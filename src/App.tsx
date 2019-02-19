import React, { Component } from 'react';
import Header from "./common/header/Header";
import NewEventForm from "./events/new-event/NewEventForm";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header pageName={"New event"}/>
                <NewEventForm/>
            </div>
        );
    }
}

export default App;
