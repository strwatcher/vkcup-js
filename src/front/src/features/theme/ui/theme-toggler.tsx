import { IScreenSize } from "@/shared/lib/screen-size";
import { Button } from "@/shared/ui";
import React from "react";
import s from "./style.module.css";

export type ThemeTogglerProps = {
  title: string;
  icon: string;
  toggle: () => void;
  variant: IScreenSize;
};

export const ThemeToggler: React.FC<ThemeTogglerProps> = (props) => {
  return (
    <Button onClick={props.toggle} variant={"transparent"}>
      <img src={props.icon} />
      {props.variant === "big" && (
        <span className={s.themeText}>{props.title}</span>
      )}
    </Button>
  );
};
