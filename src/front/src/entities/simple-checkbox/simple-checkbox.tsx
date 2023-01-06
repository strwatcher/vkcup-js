import { Checkbox } from "@/shared/ui";
import React from "react";

export type SimpleCheckboxState = "checked" | "unchecked";

export type SimpleCheckboxProps = {
    hideActive?: boolean;
    hovered?: boolean;
    checked: boolean;
    images: {
        [P in SimpleCheckboxState]: string;
    };
    onChange: () => void;
};

export const SimpleCheckbox: React.FC<SimpleCheckboxProps> = (props) => {
    const { checked, unchecked } = React.useMemo(
        () => ({
            checked: <img src={props.images.checked} />,
            unchecked: <img src={props.images.unchecked} />,
        }),
        [props.images]
    );

    const state = React.useMemo(
        () => (props.checked ? "checked" : "unchecked"),
        [props.checked]
    );

    return (
        <Checkbox
            hovered={props.hovered}
            hideActive={props.hideActive}
            activeState={"checked"}
            state={state}
            mapping={{ checked, unchecked }}
            setState={props.onChange}
        />
    );
};
