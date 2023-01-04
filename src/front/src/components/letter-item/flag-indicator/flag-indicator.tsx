import React from "react";
import s from "./style.module.css";

export type FlagIndicatorProps = {
    icon: string;
};

export const FlagIndicator: React.FC<FlagIndicatorProps> = (props) => {
    return (
        <div className={s.flagIndicator}>
            <img src={props.icon} />
        </div>
    );
};
