import { joinClasses } from "@/shared/lib/utils/join-classes";
import { Sliced } from "@/shared/ui";
import React from "react";
import s from "./style.module.css";

export type SlicedTitleContentProps = {
  title: string;
  text: string;
  read: boolean;
};

export const SlicedTitleContent: React.FC<SlicedTitleContentProps> = (
  props
) => {
  return (
    <Sliced variant="ellipsis">
      <span className={joinClasses(s.title, !props.read && s.bold)}>
        {props.title}
      </span>
      <span>{props.text}</span>
    </Sliced>
  );
};
