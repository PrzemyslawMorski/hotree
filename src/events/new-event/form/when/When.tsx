import React, {FormEvent, FunctionComponent} from 'react';
import {DayPeriod, IWhenInput} from "./WhenInput";

interface IWhenProps {
    input: IWhenInput;
    onWhenChange: (event: FormEvent) => void;
}

const When: FunctionComponent<IWhenProps> = (props: IWhenProps) => {
    return (
        <div>
            <div>When</div>
            <div>
                <label>
                    Starts on<span style={{color: "red"}}>*</span>
                    <input type="date" name="startDate" value={props.input.startDate} onChange={props.onWhenChange}
                           placeholder={"dd/mm/yyyy"}/>
                    at
                    <input type="time" name="startTime" value={props.input.startTime} onChange={props.onWhenChange}
                           min={"0:00"} max={"11:59"} step={60}/>
                    <span>
                    <input type="radio" checked={props.input.startDayPeriod == DayPeriod.AM}
                           name="startDayPeriod" value={DayPeriod.AM} onChange={props.onWhenChange}/>
                    AM
                    </span>
                    <span>
                    <input type="radio" checked={props.input.startDayPeriod == DayPeriod.PM}
                           name="startDayPeriod" value={DayPeriod.PM} onChange={props.onWhenChange}/>
                    PM
                    </span>
                </label>
                <label>{props.input.startDateError}</label>
            </div>
            <div>
                <label>
                    Duration
                    <input type="number" name="duration" value={props.input.duration} onChange={props.onWhenChange}
                           placeholder={"Number"}/>
                    hour
                </label>
            </div>
        </div>
    );
};


export default When;
