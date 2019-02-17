import React, {FormEvent, FunctionComponent} from 'react';
import {IAboutInput, PaymentType} from "./AboutInput";
import EventCategories from "../../../../mocks/categories";
import "../NewEventForm.css";

interface IAboutProps {
    input: IAboutInput;
    onAboutChange: (event: FormEvent) => void;
}

const About: FunctionComponent<IAboutProps> = (props: IAboutProps) => {
    const eventCategories = EventCategories.map((category) => <option value={category.id}
                                                                      key={category.id}>{category.name}</option>);
    const paymentFeeInput = props.input.paymentType == PaymentType.FreeEvent ? null :
        <label>
            <input type="number" min={0.00} step={0.01} required name="paymentFee" value={props.input.eventFee}
                   onChange={props.onAboutChange} placeholder={"Fee"}/>
            <span>$</span>
            <label>{props.input.eventFeeError}</label>
        </label>;

    return <div className={"sub-form"}>

        <div className={"sub-form--header-container"}>
            <span className={"sub-form--header"}>About</span>
        </div>

        <div className={"sub-form--field"}>
            <div className={"sub-form--field--label-container"}>
                <label htmlFor={"title"}>
                    Title<span style={{color: "red"}}>*</span>
                </label>
            </div>

            <div className={"sub-form--field--input-container"}>
                <input type="text" name="title" value={props.input.title}
                       onChange={props.onAboutChange}
                       placeholder={"Make it short and clear"}/>
            </div>

            <div className={"sub-form--field--error-container"}>
                <label className={"sub-form--field--error"}>{props.input.titleError}</label>
            </div>
        </div>

        <div className={"sub-form--field"}>
            <div className={"sub-form--field--label-container"}>
                <label htmlFor={"description"}>
                    Description<span style={{color: "red"}}>*</span>
                </label>
            </div>

            <div className={"sub-form--field--input-container"}>
                <textarea name="description"
                       value={props.input.description}
                       onChange={props.onAboutChange} placeholder={"Write about your event, be creative"}/>
            </div>

            <div className={"sub-form--field--error-container"}>
                <label className={"sub-form--field--error"}>{props.input.descriptionError}</label>
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
            </div>
        </div>

        <div className={"sub-form--field"}>
            <div className={"sub-form--field--label-container"}>
                <label htmlFor={"paymentType"}>
                    Payment
                </label>
            </div>

            <div className={"sub-form--field--input-container"}>
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

        </div>

        <div className={"sub-form--field"}>
            <div className={"sub-form--field--label-container"}>
                <label htmlFor={"reward"}>
                    Reward
                </label>
            </div>

            <div className={"sub-form--field--input-container"}>
                <label>
                    <input type="number" name="reward" placeholder={"Number"} value={props.input.reward}
                           onChange={props.onAboutChange}/>
                </label>
                <span>reward points for attendance</span>
            </div>
        </div>
    </div>
};

export default About;
