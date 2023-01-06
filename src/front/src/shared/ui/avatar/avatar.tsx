import React from "react";
import s from "./style.module.css";

export type AvatarProps = {
    src?: string;
};

export const Avatar: React.FC<AvatarProps> = (props) => {
    return props.src ? (
        <img
            className={s.avatar}
            src={props.src}
        />
    ) : (
        <div className={s.avatar}></div>
    );
};
