import React from "react";
import { IUser } from "shared";
import { Info } from "./info";
import { ReadIndicator } from "../../elements/read-indicator";
import s from "./style.module.css";
import { ThreeVariantState } from "../../elements/three-state-checkbox";

export type InfoControlsProps = {
  read: boolean;
  markIndicator: ThreeVariantState;
  onMarkIndicatorChange: () => void;
  sender: IUser;
  to: Array<IUser>;
  dateTime: string;
  onReadChange: () => void;
  hovered: boolean;
};

export const InfoControls: React.FC<InfoControlsProps> = (props) => {
  return (
    <div className={s.infoControls}>
      <ReadIndicator
        hovered={props.hovered}
        onChange={props.onReadChange}
        read={props.read}
      />
      <Info
        hovered={props.hovered}
        author={props.sender}
        to={props.to}
        dateTime={props.dateTime}
        indicator={props.markIndicator}
        onChange={props.onMarkIndicatorChange}
      />
    </div>
  );
};
