import React, { MouseEventHandler, ReactNode } from "react";
import { joinClasses } from "@/shared/lib/utils/join-classes";
import s from "./style.module.scss";

type ButtonVariant = "activated" | "outlined" | "transparent";

export type ButtonProps = {
    variant: ButtonVariant;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;

    active?: boolean;
};

export const Button = (props: ButtonProps) => {
    return (
        <button
            className={joinClasses(
                s.button,
                s[props.variant],
                props.active && s.active
            )}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
};
