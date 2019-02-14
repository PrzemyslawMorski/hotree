import React from 'react';
import "./Header.css";

interface IHeaderProps {
    pageName: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
    return <div className={"header"}>
        <div className={"header__top"}/>
        <div className={"header__main"}>
            <span className={"header__main__text"}>{props.pageName}</span>
        </div>
    </div>
};

export default Header;
