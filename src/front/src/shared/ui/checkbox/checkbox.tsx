import { joinClasses } from "@/shared/lib/utils/join-classes";
import React from "react";
import s from "./style.module.scss";

type CheckboxProps<TState extends string> = {
    state: TState;
    images: {
        [P in TState]: string;
    };
    setState: (state: TState) => void;
    hovered?: boolean;
    hideActive?: boolean;
    activeState: TState;
};

export const Checkbox = <TState extends string>(
    props: CheckboxProps<TState>
) => {
    const onClick = React.useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            props.setState(props.state);
        },
        [props.state]
    );

    const className = React.useMemo(() => {
        let className = joinClasses(s.checkbox);

        if (
            props.hovered ||
            props.activeState !== props.state ||
            !props.hideActive
        ) {
            className = joinClasses(className, s.show);
        } else {
            className = joinClasses(className, s.hide);
        }

        return className;
    }, [props.activeState, props.hideActive, props.state, props.hovered]);

    return (
        <img
            onClick={onClick}
            className={className}
            src={props.images[props.state]}
        />
    );
};
