import { joinClasses } from "@/shared/lib/utils/join-classes";
import { Sliced } from "@/shared/ui";
import React from "react";
import s from "./style.module.css";

export type SlicedAuthorProps = {
  name: string;
  surname: string;
  read: boolean;
};

export const SlicedAuthor: React.FC<SlicedAuthorProps> = (props) => {
  return (
    <Sliced variant="clip">
      <span className={joinClasses(s.author, props.read && s.read)}>
        {props.name} {props.surname}
      </span>
    </Sliced>
  );
};
