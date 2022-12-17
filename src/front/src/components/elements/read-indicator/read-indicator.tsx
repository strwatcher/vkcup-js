import React from "react";
import { useTheme } from "../../../hooks/use-theme";
import { joinClasses } from "../../../utils/join-classes";
import { SimpleCheckbox } from "../../elements/simple-checbox";
import s from "./style.module.css";

export type ReadIndicatorProps = {
  hovered: boolean;
  read: boolean;
  onChange: () => void;
};

export const ReadIndicator: React.FC<ReadIndicatorProps> = (props) => {
  const { resources } = useTheme();
  return (
    <div
      className={joinClasses(
        s.readIndicator,
        props.hovered && s.hovered,
        props.read && s.read
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <SimpleCheckbox
        images={{ checked: resources.read, unchecked: resources.unread }}
        checked={props.read}
        onChange={props.onChange}
      />
    </div>
  );
};
