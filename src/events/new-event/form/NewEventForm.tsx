import React, {Component, FormEvent} from 'react';
import About from "./about/About";
import Coordinator from "./coordinator/Coordinator";
import When from "./when/When";

interface INewEventFormProps {
    onEventCreated: () => void;
}

class NewEventForm extends Component<INewEventFormProps> {

    constructor(props: INewEventFormProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <About/>
                <Coordinator/>
                <When/>
                <button type="submit">Publish event</button>
            </form>
        );
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();

        console.log("submitted");
        this.props.onEventCreated();
    }
}

export default NewEventForm;
