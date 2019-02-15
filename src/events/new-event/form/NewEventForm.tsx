import React, {Component, FormEvent} from 'react';
import About from "./about/About";
import Coordinator from "./coordinator/Coordinator";
import When from "./when/When";
import {IAboutInput, PaymentType} from "./about/AboutInput";
import {NewEventDto} from "../NewEventDto";
import {ICoordinatorInput} from "./coordinator/CoordinatorInput";
import {DayPeriod, IWhenInput} from "./when/WhenInput";

interface INewEventFormProps {
    onEventCreated: (newEvent: NewEventDto) => void;
}

interface INewEventFormState {
    aboutInput: IAboutInput;
    coordinatorInput: ICoordinatorInput;
    whenInput: IWhenInput;
}

const w3cEmailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class NewEventForm extends Component<INewEventFormProps> {
    state: INewEventFormState = {
        aboutInput: {
            title: "",
            titleError: "",
            description: "",
            descriptionError: "",
            categoryId: "",
            paymentType: PaymentType.FreeEvent,
            eventFee: "",
            eventFeeError: "",
            reward: "",
        },
        coordinatorInput: {
            id: "",
            email: "",
            emailError: "",
        },
        whenInput: {
            startDate: "",
            startTime: "",
            startDateError: "",
            startDayPeriod: DayPeriod.AM,
            duration: "",
        },
    };

    constructor(props: INewEventFormProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAboutChange = this.onAboutChange.bind(this);
        this.onCoordinatorChange = this.onCoordinatorChange.bind(this);
        this.onWhenChange = this.onWhenChange.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} noValidate={true}>
                <About input={this.state.aboutInput} onAboutChange={this.onAboutChange}/>
                <Coordinator input={this.state.coordinatorInput} onCoordinatorChange={this.onCoordinatorChange}/>
                <When input={this.state.whenInput} onWhenChange={this.onWhenChange}/>
                <button type="submit">Publish event</button>
            </form>
        );
    }

    onAboutChange(event: FormEvent) {
        const target = event.target as HTMLInputElement;
        const value = target.value.trim();
        const name = target.name;

        const newAboutInput = this.state.aboutInput;
        newAboutInput[name] = value;

        this.setState({aboutInput: newAboutInput});
    }

    onCoordinatorChange(event: FormEvent) {
        const target = event.target as HTMLInputElement;
        const value = target.value.trim();
        const name = target.name;

        const newCoordinatorInput = this.state.coordinatorInput;
        newCoordinatorInput[name] = value;

        this.setState({coordinatorInput: newCoordinatorInput});
    }

    onWhenChange(event: FormEvent) {
        const target = event.target as HTMLInputElement;
        const value = target.value.trim();
        const name = target.name;

        const newWhenInput = this.state.whenInput;
        newWhenInput[name] = value;

        this.setState({whenInput: newWhenInput});
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();

        let formValid = true;

        let titleError = "";
        let descriptionError = "";
        let paymentFeeError = "";

        let emailError = "";

        let startDateError = "";

        if (this.state.aboutInput.title == "") {
            titleError = "Title cannot be empty"
        }

        if (this.state.aboutInput.description == "") {
            descriptionError = "Description cannot be empty"
        }

        if (this.state.aboutInput.description != "" && this.state.aboutInput.description.length > 140) {
            descriptionError = "Description cannot be longer than 140 characters"
        }

        if (this.state.aboutInput.paymentType == PaymentType.PaidEvent &&
            this.state.aboutInput.eventFee == "") {
            paymentFeeError = "Payment fee cannot be empty"
        }

        if (this.state.coordinatorInput.email != "" &&
            !w3cEmailRegex.test(this.state.coordinatorInput.email)) {
            emailError = "Email has to be a valid email";
        }

        if (this.state.whenInput.startDate == "") {
            startDateError = "Start date cannot be empty";
        }

        if (this.state.whenInput.startDate != "" && Date.parse(this.state.whenInput.startDate) < Date.now()) {
            startDateError = "Event cannot be created prior to current date";
        }

        const newState = this.state;

        if (titleError != "" || descriptionError != "" || paymentFeeError != "") {
            formValid = false;
            newState.aboutInput.titleError = titleError;
            newState.aboutInput.descriptionError = descriptionError;
            newState.aboutInput.eventFeeError = paymentFeeError;
        }

        if (emailError != "") {
            formValid = false;
            newState.coordinatorInput.emailError = emailError;
        }

        if (startDateError != "") {
            formValid = false;
            newState.whenInput.startDateError = startDateError;
        }

        if (formValid) {
            console.log("submitted");

            const dateFormatted = date12hTo24h(this.state.whenInput.startDate,
                this.state.whenInput.startTime, this.state.whenInput.startDayPeriod);

            let categoryIdAsNum = Number.parseInt(this.state.aboutInput.categoryId);
            if (Number.isNaN(categoryIdAsNum)) {
                categoryIdAsNum = -1;
            }

            let eventFeeAsNum = Number.parseInt(this.state.aboutInput.eventFee);
            if (Number.isNaN(eventFeeAsNum)) {
                eventFeeAsNum = 0;
            }

            let rewardAsNum = Number.parseInt(this.state.aboutInput.reward);
            if (Number.isNaN(rewardAsNum)) {
                rewardAsNum = 0;
            }

            let durationAsNum = Number.parseInt(this.state.aboutInput.duration);
            if (Number.isNaN(durationAsNum)) {
                durationAsNum = 0;
            }

            const newEvent: NewEventDto = {
                title: this.state.aboutInput.title,
                description: this.state.aboutInput.description,
                categoryId: categoryIdAsNum,
                paidEvent: this.state.aboutInput.paymentType == PaymentType.PaidEvent,
                eventFee: eventFeeAsNum,
                reward: rewardAsNum,
                date: dateFormatted,
                duration: durationAsNum,
                coordinator: {
                    id: this.state.coordinatorInput.id,
                    email: this.state.coordinatorInput.email,
                }
            };
            this.props.onEventCreated(newEvent);
        } else {
            this.setState(newState);
        }
    }
}

function date12hTo24h(startDate: string, startTime: string, startDayPeriod: DayPeriod): string {
    return "date12hTo24h not implemented";
}

export default NewEventForm;
