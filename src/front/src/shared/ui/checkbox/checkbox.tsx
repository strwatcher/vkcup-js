import { joinClasses } from "@/shared/lib/utils/join-classes";
import React from "react";
import s from "./style.module.scss";

type CheckboxProps<TState extends string> = {
    state: TState;
    mapping: {
        [P in TState]: React.ReactElement;
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

    const variants = React.useMemo(() => {
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

        const states: TState[] = Array.from(
            Object.keys(props.mapping)
        ) as TState[];

        const mapping: { [P in TState]?: React.ReactNode } = {};
        states.forEach((state) => {
            const element = props.mapping[state];
            mapping[state] = React.cloneElement(element, {
                className,
                onClick,
            });
        });

        return mapping;
    }, [
        props.mapping,
        onClick,
        props.activeState,
        props.hideActive,
        props.state,
        props.hovered,
    ]);

    return <>{variants[props.state]}</>;
};
