import React, {FormEvent, FunctionComponent} from 'react';
import {ICoordinatorInput} from "./CoordinatorInput";
import Employees, {User} from "../../../../mocks/employees";
import "../NewEventForm.css";

interface ICoordinatorProps {
    input: ICoordinatorInput;
    onCoordinatorChange: (event: FormEvent) => void;
}

const Coordinator: FunctionComponent<ICoordinatorProps> = (props: ICoordinatorProps) => {
    if (User == undefined) {
        alert("User with supplied id has not been found");
        return <div>
            <div>Coordinator - error</div>
        </div>;
    }

    const userOption = <option key={User.id} defaultValue={User.id.toString()}>Me
        - {User.name + " " + User.lastname}</option>;

    const othersOptions = Employees.map((employee) => {
        if (employee.id == User!.id) {
            return null;
        }

        return <option key={employee.id} value={employee.id}>{employee.name + " " + employee.lastname}</option>
    });

    return <div className={"sub-form"}>

        <div className={"sub-form--header-container"}>
            <span className={"sub-form--header"}>Coordinator</span>
        </div>

        <div className={"sub-form--field"}>
            <div className={"sub-form--field--label-container"}>
                <label htmlFor={"id"}>
                    Responsible<span style={{color: "red"}}>*</span>
                </label>
            </div>

            <div className={"sub-form--field--input-container"}>
                <select name="id" onChange={props.onCoordinatorChange}
                        placeholder={"Select category (skills, interests, locations)"}>
                    <optgroup label={"Me"}>
                        {userOption}
                    </optgroup>
                    <optgroup label={"Others"}>
                        {othersOptions}
                    </optgroup>
                </select>
            </div>
        </div>

        <div className={"sub-form--field"}>

            <div className={"sub-form--field--label-container"}>
                <label htmlFor={"email"}>
                    Email
                </label>
            </div>

            <div className={"sub-form--field--input-container"}>
                <input type="text" name="email" value={props.input.email} onChange={props.onCoordinatorChange}
                       placeholder={"Email"}/>
            </div>

            <div className={"sub-form--field--error-container"}>
                <label className={"sub-form--field--error"}>{props.input.emailError}</label>
            </div>
        </div>
    </div>
};


export default Coordinator;
