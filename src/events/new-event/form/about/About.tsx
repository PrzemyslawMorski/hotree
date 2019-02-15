import React, {FormEvent, FunctionComponent} from 'react';
import {IAboutInput, PaymentType} from "./AboutInput";
import EventCategories from "../../../../mocks/categories";

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

    return <div>
        <div>About</div>
        <div>
            <label>
                Title<span style={{color: "red"}}>*</span>
                <input type="text" required name="title" value={props.input.title} onChange={props.onAboutChange}
                       placeholder={"Make it short and clear"}/>
            </label>
            <label>{props.input.titleError}</label>
        </div>

        <div>
            <label>
                Description<span style={{color: "red"}}>*</span>
                <input type="textarea" required name="description" value={props.input.description}
                       onChange={props.onAboutChange} placeholder={"Write about your event, be creative"}/>
            </label>
            <label>{props.input.descriptionError}</label>
        </div>

        <div>
            <label>
                Category
                <select name="category" onChange={props.onAboutChange}
                        placeholder={"Select category (skills, interests, locations)"}>
                    <option defaultValue={""} value={""}>
                        Select category (skills, interests, locations)
                    </option>
                    {eventCategories}
                </select>
            </label>
        </div>

        <div>
            <label>
                Payment
                <span>
                    <input type="radio" checked={props.input.paymentType == PaymentType.FreeEvent}
                           name="paymentType" value={PaymentType.FreeEvent} onChange={props.onAboutChange}/>
                    Free event
                </span>
                <span>
                    <input type="radio" checked={props.input.paymentType == PaymentType.PaidEvent}
                           name="paymentType" value={PaymentType.PaidEvent} onChange={props.onAboutChange}/>
                    Paid event
                </span>

                {paymentFeeInput}

            </label>
        </div>


        <div>
            <label>
                Reward
                <input type="text" name="reward" placeholder={"Number"} value={props.input.reward}
                       onChange={props.onAboutChange}/>
                reward points for attendance
            </label>
        </div>
    </div>
};

export default About;
