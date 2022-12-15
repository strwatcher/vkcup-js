import React from "react";
import { joinClasses } from "../../../utils/join-classes";
import {
  SimpleCheckbox,
  SimpleCheckboxState,
} from "../simple-checbox/simple-checkbox";
import s from "./style.module.css";

export type ReadIndicatorProps = {
  hovered: boolean;
  images: { [P in SimpleCheckboxState]: string };
  read: boolean;
  onChange: () => void;
};

export const ReadIndicator: React.FC<ReadIndicatorProps> = (props) => {
  return (
    <div
      className={joinClasses(
        s.readIndicator,
        props.hovered && s.hovered,
        props.read && s.read
      )}
    >
      <SimpleCheckbox
        images={props.images}
        checked={props.read}
        onChange={props.onChange}
      />
    </div>
  );
};
