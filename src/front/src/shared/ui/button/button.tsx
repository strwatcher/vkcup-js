import React, { MouseEventHandler, ReactNode } from "react";
import { joinClasses } from "@/shared/lib/utils/join-classes";
import s from "./style.module.scss";

type ButtonVariant = "activated" | "outlined" | "transparent" | "menuItem";

export type ButtonProps = {
  variant: ButtonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;

  active?: boolean;
  adaptive?: boolean;
  gap?: number;
};

export const Button = (props: ButtonProps) => {
  const setGap = React.useCallback(
    (node: HTMLButtonElement | null) => {
      if (props.gap) {
        node?.style.setProperty("--gap", props.gap + "px");
      }
    },
    [props.gap]
  );

  return (
    <button
      className={joinClasses(
        s.button,
        s[props.variant],
        props.active && s.active,
        props.adaptive && s.adaptive
      )}
      onClick={props.onClick}
      ref={setGap}
    >
      {props.children}
    </button>
  );
};
