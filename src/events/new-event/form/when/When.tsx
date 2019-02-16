import React, {FormEvent, FunctionComponent} from 'react';
import {DayPeriod, IWhenInput} from "./WhenInput";
import "../NewEventForm.css";

interface IWhenProps {
    input: IWhenInput;
    onWhenChange: (event: FormEvent) => void;
}

const When: FunctionComponent<IWhenProps> = (props: IWhenProps) => {
    return (
        <div className={"sub-form"}>

            <div className={"sub-form__header"}>
                <span className={"sub-form__header-text"}>When</span>
            </div>

            <div className={"sub-form__field"}>
                <label className={"sub-form__field__label"}>
                    Starts on<span style={{color: "red"}}>*</span>
                </label>

                <input type="date" name="startDate" value={props.input.startDate} onChange={props.onWhenChange}
                       placeholder={"dd/mm/yyyy"}/>

                <span>at</span>

                <input type="time" name="startTime" value={props.input.startTime} onChange={props.onWhenChange}
                       min={"0:00"} max={"11:59"} step={60}/>
                <input type="radio" checked={props.input.startDayPeriod == DayPeriod.AM}
                       name="startDayPeriod" value={DayPeriod.AM} onChange={props.onWhenChange}/>

                <span>
                    AM
                </span>

                <input type="radio" checked={props.input.startDayPeriod == DayPeriod.PM}
                       name="startDayPeriod" value={DayPeriod.PM} onChange={props.onWhenChange}/>

                <span>
                    PM
                </span>

                <label>{props.input.startDateError}</label>
            </div>

            <div className={"sub-form__field"}>
                <label className={"sub-form__field__label"} htmlFor={"duration"}>
                    Duration
                </label>

                <input type="number" name="duration" value={props.input.duration} onChange={props.onWhenChange}
                       placeholder={"Number"}/>

                <span>hour</span>
            </div>
        </div>
    );
};


export default When;
