import React from "react";
import s from "./style.module.css";

export type CheckboxProps<TState extends string> = {
  state: TState;
  mapping: {
    [P in TState]: React.ReactNode;
  };
  setState: (state: TState) => void;
};

export function Checkbox<TState extends string>(
  props: CheckboxProps<TState>
): JSX.Element {
  return (
    <div
      className={s.checkbox}
      tabIndex={0}
      onClick={() => props.setState(props.state)}
    >
      {props.mapping[props.state]}
    </div>
  );
}
