import { Checkbox } from "@/shared/ui";
import React from "react";

export type ThreeVariantState = "unset" | "first" | "second";

export type ThreeVariantMapping<T> = {
    [P in ThreeVariantState]: T;
};

export type ThreeStateCheckboxProps = {
    state: ThreeVariantState;
    images: ThreeVariantMapping<string>;
    onChange: (state: ThreeVariantState) => void;
    hovered: boolean;
};

export const ThreeStateCheckbox: React.FC<ThreeStateCheckboxProps> = (
    props
) => {
    return (
        <Checkbox
            hovered={props.hovered}
            state={props.state}
            images={props.images}
            setState={props.onChange}
            activeState={"unset"}
            hideActive
        />
    );
};
