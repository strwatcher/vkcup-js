import { joinClasses } from "@/shared/lib/utils/join-classes";
import React, { MouseEventHandler } from "react";
import s from "./style.module.scss";

type ThemeSelectorProps = {
  variant: "imaged" | "solid";
  fill: string; // url if variant == "imaged" else color
  active: boolean;
  activeImage: string;
  onActivate: MouseEventHandler;
};

export const ThemeSelector = (props: ThemeSelectorProps) => {
  return (
    <div className={s.themeSelectorContainer} onClick={props.onActivate}>
      {props.variant === "solid" ? (
        <div className={s.solid} style={{ backgroundColor: props.fill }} />
      ) : (
        <img className={s.imaged} src={props.fill} />
      )}

      <div className={joinClasses(s.activeIndicator, props.active && s.active)}>
        <img className={s.activeImage} src={props.activeImage} />
      </div>
    </div>
  );
};
