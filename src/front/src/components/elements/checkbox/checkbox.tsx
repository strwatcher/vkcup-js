import React from "react";
import s from "./style.module.css";

export type CheckboxProps<TState extends string> = {
  state: TState;
  mapping: {
    [P in TState]: React.ReactElement;
  };
  setState: (state: TState) => void;
};

export function Checkbox<TState extends string>(
  props: CheckboxProps<TState>
): JSX.Element {
  const mapping = React.useMemo(() => {
    const states: TState[] = Array.from(Object.keys(props.mapping)) as TState[];
    let mapping: { [P in TState]?: React.ReactNode } = {};
    states.forEach((state) => {
      const element = props.mapping[state];
      mapping[state] = React.cloneElement(element, {
        className: s.checkbox,
        tabIndex: 0,
        onClick: () => props.setState(props.state),
      });
    });
    return mapping;
  }, [props.mapping]);

  return <>{mapping[props.state]}</>;
}