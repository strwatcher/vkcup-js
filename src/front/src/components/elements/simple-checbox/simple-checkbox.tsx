import React from "react";
import { genUrl } from "../../../services/api/model";
import { Checkbox } from "../checkbox";

export type SimpleCheckboxState = "checked" | "unchecked";

export type SimpleCheckboxProps = {
    checked: boolean;
    images: {
        [P in SimpleCheckboxState]: string;
    };
    onChange: () => void;
};

export const SimpleCheckbox: React.FC<SimpleCheckboxProps> = (props) => {
    const { checked, unchecked } = React.useMemo(
        () => ({
            checked: <img src={genUrl(props.images.checked)} />,
            unchecked: <img src={genUrl(props.images.unchecked)} />,
        }),
        [props.images]
    );

    const state = React.useMemo(
        () => (props.checked ? "checked" : "unchecked"),
        [props.checked]
    );

    return (
        <Checkbox
            state={state}
            mapping={{ checked, unchecked }}
            setState={props.onChange}
        />
    );
};
