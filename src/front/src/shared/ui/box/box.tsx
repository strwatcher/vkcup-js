import { joinClasses } from "@/shared/lib/utils/join-classes";
import React from "react";
import s from "./style.module.scss";

type BoxProps = {
  variant: "horizontal" | "vertical";
  children: React.ReactNode;
};
export const Box = (props: BoxProps) => {
  return (
    <div className={joinClasses(s.box, s[props.variant])}>{props.children}</div>
  );
};
