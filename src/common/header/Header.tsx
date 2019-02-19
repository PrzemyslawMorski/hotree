import React from 'react';
import "./Header.css";

interface IHeaderProps {
    pageName: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
    return <div className={"header"}>
        <div className={"header-top"}/>
        <div className={"header-main"}>
            <span>{props.pageName}</span>
        </div>
    </div>
};

export default Header;
