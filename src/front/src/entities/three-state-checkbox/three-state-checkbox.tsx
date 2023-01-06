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
    const mapping: ThreeVariantMapping<React.ReactElement> = React.useMemo(
        () => ({
            unset: <img src={props.images.unset} />,
            first: <img src={props.images.first} />,
            second: <img src={props.images.second} />,
        }),
        []
    );

    return (
        <Checkbox
            hovered={props.hovered}
            state={props.state}
            mapping={mapping}
            setState={props.onChange}
            activeState={"unset"}
            hideActive
        />
    );
};
