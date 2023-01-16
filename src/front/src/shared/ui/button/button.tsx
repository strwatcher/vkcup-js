import { joinClasses } from "@/shared/lib";
import { useCallback, MouseEventHandler, ReactNode } from "react";
import s from "./style.module.scss";

type ButtonVariant =
  | "activated"
  | "outlined"
  | "sidebarButton"
  | "menuItem"
  | "headerButton"
  | "accent";

type TextVariant = "primary" | "sidebar" | "header";

export type ButtonProps = {
  variant: ButtonVariant;
  textVariant?: TextVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;

  active?: boolean;
  adaptive?: boolean;
  gap?: number;
};

export const Button = (props: ButtonProps) => {
  const setGap = useCallback(
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
        props.adaptive && s.adaptive,
        props.textVariant && s[props.textVariant]
      )}
      onClick={props.onClick}
      ref={setGap}
    >
      {props.children}
    </button>
  );
};
