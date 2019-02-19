import React from 'react';
import "./Summary.css";

interface ISummaryProps {
    onBackToFormClick: () => void;
}

const Summary: React.FunctionComponent<ISummaryProps> = (props) => {
    return <div className={"summary"}>
        <div>
            <span className={"summary--header"}>Success</span>
            <span>Event has been created.</span>
        </div>

        <button className={"button--success"} onClick={props.onBackToFormClick}>Back to form - for testing convenience</button>
    </div>
};

export default Summary;
