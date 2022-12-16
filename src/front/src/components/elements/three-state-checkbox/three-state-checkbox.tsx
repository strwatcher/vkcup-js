import React from "react";
import { joinClasses } from "../../../utils/join-classes";
import { Checkbox } from "../checkbox";
import s from "./style.module.css";

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
    <div
      className={joinClasses(
        s.wrapper,
        props.state === "unset" && s.unset,
        props.hovered && s.hovered
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox
        state={props.state}
        mapping={mapping}
        setState={props.onChange}
      />
    </div>
  );
};
