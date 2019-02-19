import React, {Component, FormEvent} from 'react';
import About from "./about/About";
import Coordinator from "./coordinator/Coordinator";
import When from "./when/When";
import {IAboutInput, PaymentType} from "./about/AboutInput";
import {NewEventDto} from "./NewEventDto";
import {ICoordinatorInput} from "./coordinator/CoordinatorInput";
import {DayPeriod, IWhenInput} from "./when/WhenInput";
import "./NewEventForm.css";
import {User} from "../../mocks/employees";
import Summary from "./summary/Summary";

interface INewEventFormState {
    eventCreated: boolean;
    aboutInput: IAboutInput;
    coordinatorInput: ICoordinatorInput;
    whenInput: IWhenInput;
}

const w3cEmailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class NewEventForm extends Component {
    state: INewEventFormState = {
        eventCreated: false,
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
            rewardError: "",
        },
        coordinatorInput: {
            id: User!.id.toString(),
            email: "",
            emailError: "",
        },
        whenInput: {
            startDate: "",
            startTime: "",
            startDateError: "",
            startDayPeriod: DayPeriod.AM,
            duration: "",
            durationError: "",
        },
    };

    constructor(props: any) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.onAboutChange = this.onAboutChange.bind(this);
        this.onCoordinatorChange = this.onCoordinatorChange.bind(this);
        this.onWhenChange = this.onWhenChange.bind(this);

        // convenience methods for quick submitting and returning to the form
        this.onEventCreated = this.onEventCreated.bind(this);
        this.onBackToForm = this.onBackToForm.bind(this);
    }

    render() {
        if (this.state.eventCreated) {
            return <Summary onBackToFormClick={this.onBackToForm}/>
        }

        return (
            <form onSubmit={this.onSubmit} noValidate={true} className={"form"}>
                <About input={this.state.aboutInput} onAboutChange={this.onAboutChange}/>
                <Coordinator input={this.state.coordinatorInput} onCoordinatorChange={this.onCoordinatorChange}/>
                <When input={this.state.whenInput} onWhenChange={this.onWhenChange}/>
                <div className={"submit"}>
                    <button type="submit" className={"submit--button"}>Publish event</button>
                </div>
            </form>
        );
    }

    onAboutChange(event: FormEvent) {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;

        const newAboutInput = this.state.aboutInput;
        newAboutInput[name] = value;

        if (name == "paymentType" && value == PaymentType.FreeEvent) {
            newAboutInput.eventFeeError = "";
        }

        if (name == "description" && numCharsInText(value) > 140) {
            return;
        }

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
        let rewardError = "";

        let emailError = "";

        let startDateError = "";
        let durationError = "";

        if (this.state.aboutInput.title == "") {
            formValid = false;
            titleError = "Title cannot be empty"
        }

        if (this.state.aboutInput.description == "") {
            formValid = false;
            descriptionError = "Description cannot be empty"
        }

        if (this.state.aboutInput.description != "" && this.state.aboutInput.description.length > 140) {
            formValid = false;
            descriptionError = "Description cannot be longer than 140 characters"
        }

        if (this.state.aboutInput.paymentType == PaymentType.PaidEvent &&
            this.state.aboutInput.eventFee == "") {
            formValid = false;
            paymentFeeError = "Payment fee cannot be empty"
        }

        if (this.state.aboutInput.paymentType == PaymentType.PaidEvent &&
            Number(this.state.aboutInput.eventFee) < 0) {
            formValid = false;
            paymentFeeError = "Payment fee cannot be negative"
        }

        if (Number(this.state.aboutInput.reward) < 0) {
            rewardError = "Reward cannot be negative"
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

        if (Number(this.state.whenInput.duration) < 0) {
            durationError = "Duration cannot be negative"
        }

        const newState = this.state;

        newState.aboutInput.titleError = titleError;
        newState.aboutInput.descriptionError = descriptionError;
        newState.aboutInput.eventFeeError = paymentFeeError;
        newState.aboutInput.rewardError = rewardError;

        newState.coordinatorInput.emailError = emailError;

        newState.whenInput.startDateError = startDateError;
        newState.whenInput.durationError = durationError;

        if (titleError != "" || descriptionError != "" || paymentFeeError != "" ||
            rewardError != "" || emailError != "" || startDateError != "" ||
            durationError != "") {
            formValid = false;
        }

        if (formValid) {
            const dateFormatted = format12hDate(this.state.whenInput.startDate,
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
            this.onEventCreated(newEvent);
        } else {
            this.setState(newState);
        }
    }

    onEventCreated(newEvent: NewEventDto) {
        console.log(JSON.stringify(newEvent));
        this.setState({eventCreated: true});
    }

    onBackToForm() {
        this.setState({eventCreated: false});
    }
}

function format12hDate(startDate: string, startTime: string = "00:00", startDayPeriod: DayPeriod = DayPeriod.PM): string {
    const yearMonthDay = startDate.split("-");
    if (yearMonthDay.length !== 3) {
        return startDate;
    }

    if (startTime === "") {
        startTime = "00:00";
    }

    const hourMinute = startTime.split(":");
    if (hourMinute.length !== 2) {
        return startDate;
    }

    let hourAsNum = Number(hourMinute[0]);

    if (Number.isNaN(Number(yearMonthDay[0])) || Number.isNaN(Number(yearMonthDay[1])) || Number.isNaN(Number(yearMonthDay[2])) ||
        Number.isNaN(hourAsNum) || Number.isNaN(Number(hourMinute[1]))) {
        return startDate;
    }

    if (hourAsNum >= 13 || hourAsNum === 0) {
        // time is in 24h format
        return `${startDate}T${startTime}`
    }

    // time is in 12h format
    if (startDayPeriod === DayPeriod.PM) {
        hourAsNum += 12;
    }

    const time = hourAsNum.toString() + hourMinute[1];
    return `${startDate}T${time}`;
}

export function labelContainerClass(fieldErrorValue: string) {
    if (fieldErrorValue !== "") {
        return "sub-form--field--label-container sub-form--field--label-error"
    } else {
        return "sub-form--field--label-container";
    }
}

export function inputContainerClass(fieldErrorValue: string) {
    if (fieldErrorValue !== "") {
        return " sub-form--field--input-error"
    } else {
        return "sub-form--field--input-container";
    }
}

export function numCharsInText(text: string): number {
    // count all chars except whitespace
    return text.replace(" ", "").length;
}

export default NewEventForm;