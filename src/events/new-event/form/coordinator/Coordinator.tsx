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

        <div className={"sub-form__header"}>
            <span className={"sub-form__header-text"}>Coordinator</span>
        </div>

        <div className={"sub-form__field"}>
            <label className={"sub-form__field__label"} htmlFor={"id"}>
                Responsible<span style={{color: "red"}}>*</span>
            </label>

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

        <div className={"sub-form__field"}>
            <label className={"sub-form__field__label"} htmlFor={"email"}>
                Email
            </label>

            <input type="text" name="email" value={props.input.email} onChange={props.onCoordinatorChange}
                   placeholder={"Email"}/>

            <label>{props.input.emailError}</label>
        </div>
    </div>
};


export default Coordinator;
