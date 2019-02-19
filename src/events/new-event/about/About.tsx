import React, {FormEvent, FunctionComponent} from 'react';
import {IAboutInput, PaymentType} from "./AboutInput";
import EventCategories from "../../../mocks/categories";
import "../NewEventForm.css";
import {inputContainerClass, labelContainerClass} from "../NewEventForm";
import {numCharsInText} from "../../../common/helperFunctions";

interface IAboutProps {
    input: IAboutInput;
    onAboutChange: (event: FormEvent) => void;
}

const About: FunctionComponent<IAboutProps> = (props: IAboutProps) => {
    const eventCategories = EventCategories.map((category) => <option value={category.id}
                                                                      key={category.id}>{category.name}</option>);

    const paymentFeeInput = props.input.paymentType == PaymentType.FreeEvent ? null :
        <label>
            <input id="event-fee-input" type="number" min={0.00} step={0.01} required name="eventFee" value={props.input.eventFee}
                   onChange={props.onAboutChange} placeholder={"Fee"}/>
            <span>$</span>
        </label>;

    return <div className={"sub-form"}>

        <div className={"sub-form--header-container"}>
            <span className={"sub-form--header"}>About</span>
        </div>

        <div className={"sub-form--field"}>
            <div className={labelContainerClass(props.input.titleError)}>
                <label id="title-label" htmlFor={"title"}>
                    Title<span style={{color: "red"}}>*</span>
                </label>
            </div>

            <div className={inputContainerClass(props.input.titleError)}>
                <input id="title-input" type="text" name="title" value={props.input.title}
                       onChange={props.onAboutChange}
                       placeholder={"Make it short and clear"}/>
            </div>

            <div className={"sub-form--field--error-container"}>
                {props.input.titleError !== "" ? <label id="title-error">{props.input.titleError}</label> : null}
            </div>
        </div>

        <div className={"sub-form--field"}>
            <div className={labelContainerClass(props.input.descriptionError)}>
                <label id="description-label" htmlFor={"description"}>
                    Description<span style={{color: "red"}}>*</span>
                </label>
            </div>

            <div className={inputContainerClass(props.input.descriptionError)}>
                <textarea id="description-input" name="description"
                          value={props.input.description}
                          onChange={props.onAboutChange} placeholder={"Write about your event, be creative"}/>
                <div className={"sub-form--field--input-info"}>
                    <div>
                        <span>
                        Max length 140 characters
                        </span>
                    </div>
                    <div>{numCharsInText(props.input.description)}/140</div>
                </div>
            </div>

            <div className={"sub-form--field--error-container"}>
                {props.input.descriptionError !== "" ? <label id={"description-error"}>{props.input.descriptionError}</label> : null}
            </div>
        </div>

        <div className={"sub-form--field"}>
            <div className={"sub-form--field--label-container"}>
                <label htmlFor={"category"}>
                    Category
                </label>
            </div>

            <div className={"sub-form--field--input-container"}>
                <select name="category" onChange={props.onAboutChange}
                        placeholder={"Select category (skills, interests, locations)"}>
                    <option defaultValue={""} value={""}>
                        Select category (skills, interests, locations)
                    </option>
                    {eventCategories}
                </select>
                <div className={"sub-form--field--input-info"}>
                    <span>Describes topic and people who should be interested in this event</span>
                </div>
            </div>

            <div className={"sub-form--field--error-container"}/>
        </div>

        <div className={"sub-form--field"}>
            <div className={labelContainerClass(props.input.eventFeeError)}>
                <label htmlFor={"paymentType"}>
                    Payment
                </label>
            </div>

            <div className={inputContainerClass(props.input.eventFeeError)}>
                <label>
                    <input type="radio" checked={props.input.paymentType == PaymentType.FreeEvent}
                           name="paymentType" value={PaymentType.FreeEvent} onChange={props.onAboutChange}>
                    </input>
                    Free event
                </label>

                <label>
                    <input type="radio" checked={props.input.paymentType == PaymentType.PaidEvent}
                           name="paymentType" value={PaymentType.PaidEvent} onChange={props.onAboutChange}/>
                    Paid event
                </label>

                {paymentFeeInput}
            </div>

            <div className={"sub-form--field--error-container"}>
                {props.input.eventFeeError !== "" ? <label id={"event-fee-error"}>{props.input.eventFeeError}</label> : null}
            </div>

        </div>

        <div className={"sub-form--field"}>
            <div className={labelContainerClass(props.input.rewardError)}>
                <label htmlFor={"reward"}>
                    Reward
                </label>
            </div>

            <div className={inputContainerClass(props.input.rewardError)}>
                <label>
                    <input type="number" name="reward" min="0" placeholder={"Number"} value={props.input.reward}
                           onChange={props.onAboutChange}/>
                </label>
                <span>reward points for attendance</span>
            </div>

            <div className={"sub-form--field--error-container"}>
                {props.input.rewardError !== "" ? <label>{props.input.rewardError}</label> : null}
            </div>
        </div>
    </div>
};


export default About;
