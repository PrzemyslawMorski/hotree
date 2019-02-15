import React, {FormEvent, FunctionComponent} from 'react';
import {IAboutInput} from "./AboutInput";
import EventCategories from "../../../../mocks/categories";

interface IAboutProps {
    input: IAboutInput;
    onAboutChange: (event: FormEvent) => void;
}

const About: FunctionComponent<IAboutProps> = (props) => {
    const eventCategories = EventCategories.map((category) => <option value={category.id}
                                                                      key={category.id}>{category.name}</option>);
    const paymentFeeInput = props.input.paymentType == "paid" ? null :
        <span>
            <input type="number" min={0.00} step={0.01} required name="paymentFee" value={props.input.paymentFee}
                   onChange={props.onAboutChange} placeholder={"Fee"}/>
                   $
        </span>;

    return <div>
        <div>About</div>
        <div>
            <label>
                Title<span style={{color: "red"}}>*</span>
                <input type="text" required name="title" value={props.input.title} onChange={props.onAboutChange} placeholder={"Make it short and clear"}/>
            </label>
        </div>

        <div>
            <label>
                Description<span style={{color: "red"}}>*</span>
                <input type="textarea" required name="description" value={props.input.description}
                       onChange={props.onAboutChange} placeholder={"Write about your event, be creative"}/>
            </label>
        </div>

        <div>
            <label>
                Category
                <select name="category" onChange={props.onAboutChange} placeholder={"Select category (skills, interests, locations)"}>
                    <option selected value={""}>
                        Select category (skills, interests, locations)
                    </option>
                    {eventCategories}
                </select>
            </label>
        </div>

        <div>
            <label>
                Payment
                <span><input type="radio" checked name="paymentType" value={"Free event"} onChange={props.onAboutChange}/>Free event</span>
                <span><input type="radio" name="paymentType" value={"Paid event"} onChange={props.onAboutChange}/>Paid event</span>

                {paymentFeeInput}

            </label>
        </div>


        <div>
            <label>
                Reward
                <input type="text" name="reward" placeholder={"Number"} value={props.input.reward} onChange={props.onAboutChange}/>
                reward points for attendance
            </label>
        </div>
    </div>
};

export default About;
