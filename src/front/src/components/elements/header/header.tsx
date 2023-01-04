import React from "react";
import s from "./style.module.css";

export type HeaderProps = {
    logo: string;
    backIcon: string;
    needBack: boolean;
    goBack: () => void;
};

export const Header: React.FC<HeaderProps> = (props) => {
    return props.needBack ? (
        <div
            className={s.back}
            onClick={props.goBack}>
            <img src={props.backIcon} />
            <span className={s.backSign}>Вернуться</span>
        </div>
    ) : (
        <img src={props.logo} />
    );
};
