import React from "react";
import { IUser } from "shared";
import { ReadIndicator } from "../../elements/read-indicator";
import s from "./style.module.css";

export type InfoProps = {
  read: boolean;
  important: boolean;
  marked: boolean;
  sender: IUser;
  to: Array<IUser>;
  dateTime: string;
  onReadChange: () => void;
  hovered: boolean;
};

export const Info: React.FC<InfoProps> = (props) => {
  return (
    <div className={s.info}>
      <ReadIndicator
        hovered={props.hovered}
        onChange={props.onReadChange}
        read={props.read}
      />
    </div>
  );
};
