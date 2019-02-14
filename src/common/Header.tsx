import React from 'react';

interface IHeaderProps {
    pageName: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
    return <div>
        <div className={"header-top"}/>
        <div className={"header-main"}>
            <span className={"header-text"}>{props.pageName}</span>
        </div>
    </div>
};

export default Header;
