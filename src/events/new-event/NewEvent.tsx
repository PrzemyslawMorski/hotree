import React, {Component} from 'react';
import NewEventForm from "./form/NewEventForm";
import Summary from "./summary/Summary";
import {NewEventDto} from "./NewEventDto";

class NewEvent extends Component {
    state = {
        eventCreated: false
    };

    constructor(props: any) {
        super(props);
        this.onEventCreated = this.onEventCreated.bind(this);
    }

    render() {
        if (this.state.eventCreated) {
            // this should be a redirect to a success page
            return <Summary/>
        }

        return (
            <div>
                <NewEventForm onEventCreated={this.onEventCreated}/>
            </div>
        );
    }

    onEventCreated(newEvent: NewEventDto) {
        console.log(JSON.stringify(newEvent));
        this.setState({eventCreated: true})
    }
}

export default NewEvent;
