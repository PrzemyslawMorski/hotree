import React, {FormEvent, FunctionComponent} from 'react';
import {DayPeriod, IWhenInput} from "./WhenInput";
import "../NewEventForm.css";
import {inputContainerClass, labelContainerClass} from "../NewEventForm";

interface IWhenProps {
    input: IWhenInput;
    onWhenChange: (event: FormEvent) => void;
}

const When: FunctionComponent<IWhenProps> = (props: IWhenProps) => {
    return (
        <div className={"sub-form"}>

            <div className={"sub-form--header-container"}>
                <span className={"sub-form--header"}>When</span>
            </div>

            <div className={"sub-form--field"}>
                <div className={labelContainerClass(props.input.startDateError)}>
                    <label>
                        Starts on<span style={{color: "red"}}>*</span>
                    </label>
                </div>

                <div className={inputContainerClass(props.input.startDateError)}>
                    <input type="date" name="startDate" value={props.input.startDate} onChange={props.onWhenChange}
                           placeholder={"dd/mm/yyyy"}/>

                    <label>
                        <span>at</span>
                        <input type="time" name="startTime" value={props.input.startTime} onChange={props.onWhenChange}
                               min={"1:0"} max={"12:59"} step={60}/>
                    </label>

                    <label>
                        <input type="radio" checked={props.input.startDayPeriod == DayPeriod.AM}
                               name="startDayPeriod" value={DayPeriod.AM} onChange={props.onWhenChange}/>
                        AM
                    </label>

                    <label>
                        <input type="radio" checked={props.input.startDayPeriod == DayPeriod.PM}
                               name="startDayPeriod" value={DayPeriod.PM} onChange={props.onWhenChange}/>
                        PM
                    </label>
                </div>

                <div className={"sub-form--field--error-container"}>
                    {props.input.startDateError !== "" ? <label>{props.input.startDateError}</label> : null}
                </div>
            </div>

            <div className={"sub-form--field"}>
                <div className={labelContainerClass(props.input.durationError)}>
                    <label htmlFor={"duration"}>
                        Duration
                    </label>
                </div>

                <div className={inputContainerClass(props.input.durationError)}>
                    <input type="number" name="duration" min="0" value={props.input.duration} onChange={props.onWhenChange}
                           placeholder={"Number"}/>

                    <span>hour</span>
                </div>

                <div className={"sub-form--field--error-container"}>
                    {props.input.durationError !== "" ? <label>{props.input.durationError}</label> : null}
                </div>
            </div>
        </div>
    );
};


export default When;
