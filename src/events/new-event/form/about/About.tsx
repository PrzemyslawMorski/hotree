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
        <span>
            <input type="number" min={0.00} step={0.01} required name="paymentFee" value={props.input.eventFee}
                   onChange={props.onAboutChange} placeholder={"Fee"}/>
                   $
            <label>{props.input.eventFeeError}</label>
        </span>;

    return <div className={"sub-form"}>

        <div className={"sub-form__header"}>
            <span className={"sub-form__header-text"}>About</span>
        </div>

        <div className={"sub-form__field"}>
            <label className={"sub-form__field__label"} htmlFor={"title"}>
                Title<span style={{color: "red"}}>*</span>
            </label>
            <input type="text" required name="title" value={props.input.title} onChange={props.onAboutChange}
                   placeholder={"Make it short and clear"}/>
            <label>{props.input.titleError}</label>
        </div>

        <div className={"sub-form__field"}>
            <label className={"sub-form__field__label"} htmlFor={"description"}>
                Description<span style={{color: "red"}}>*</span>
            </label>
            <input type="textarea" required name="description" value={props.input.description}
                   onChange={props.onAboutChange} placeholder={"Write about your event, be creative"}/>
            <label>{props.input.descriptionError}</label>
        </div>

        <div className={"sub-form__field"}>
            <label className={"sub-form__field__label"} htmlFor={"category"}>
                Category
            </label>
            <select name="category" onChange={props.onAboutChange}
                    placeholder={"Select category (skills, interests, locations)"}>
                <option defaultValue={""} value={""}>
                    Select category (skills, interests, locations)
                </option>
                {eventCategories}
            </select>
        </div>

        <div className={"sub-form__field"}>
            <label className={"sub-form__field__label"} htmlFor={"paymentType"}>Payment</label>

            <input type="radio" checked={props.input.paymentType == PaymentType.FreeEvent}
                   name="paymentType" value={PaymentType.FreeEvent} onChange={props.onAboutChange}/>
            Free event

            <input type="radio" checked={props.input.paymentType == PaymentType.PaidEvent}
                   name="paymentType" value={PaymentType.PaidEvent} onChange={props.onAboutChange}/>

            Paid event

            {paymentFeeInput}
        </div>


        <div className={"sub-form__field"}>
            <label className={"sub-form__field__label"} htmlFor={"reward"}>Reward</label>

            <div>
                <input type="number" name="reward" placeholder={"Number"} value={props.input.reward}
                       onChange={props.onAboutChange}/>
            </div>

            <span>reward points for attendance</span>

        </div>
    </div>
};

export default About;
