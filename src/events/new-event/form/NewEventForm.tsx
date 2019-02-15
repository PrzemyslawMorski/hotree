import React, {Component, FormEvent} from 'react';
import About from "./about/About";
import Coordinator from "./coordinator/Coordinator";
import When from "./when/When";
import {IAboutInput} from "./about/AboutInput";

interface INewEventFormProps {
    onEventCreated: () => void;
}

interface INewEventFormState {
    aboutInput: IAboutInput;
}

class NewEventForm extends Component<INewEventFormProps> {
    state: INewEventFormState = {
        aboutInput: {
            title: "",
            titleError: "",
            description: "",
            descriptionError: "",
            category: "",
            paymentType: "free",
            paymentFee: "",
            paymentFeeError: "",
            reward: "",
        }
    };

    constructor(props: INewEventFormProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAboutChange = this.onAboutChange.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <About input={this.state.aboutInput} onAboutChange={this.onAboutChange}/>
                <Coordinator/>
                <When/>
                <button type="submit">Publish event</button>
            </form>
        );
    }

    onAboutChange(event: FormEvent) {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;

        const newAboutInput = this.state.aboutInput;
        newAboutInput[name] = value;

        this.setState({aboutInput: newAboutInput});

        console.log(target.value)
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();

        console.log("submitted");
        this.props.onEventCreated();
    }
}

export default NewEventForm;
