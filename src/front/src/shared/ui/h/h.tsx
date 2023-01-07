import React from "react";
import s from "./style.module.scss";

type HProps = {
    text: string;
};

export const H = (props: HProps) => {
    return <h1 className={s.h}>{props.text}</h1>;
};
