import { joinClasses } from "@/shared/lib/utils/join-classes";
import React, { ReactNode } from "react";
import s from "./style.module.scss";

type SlicedProps = {
    children: ReactNode;
    variant: "clip" | "ellipsis";
};

export const Sliced = (props: SlicedProps) => {
    return (
        <div className={joinClasses(s.sliced, s[props.variant])}>
            {props.children}
        </div>
    );
};
