import React from "react";
import s from "./style.module.scss";

import { IUser } from "shared";
import { Info } from "./info";
import { useUnit } from "effector-react";
import { SimpleCheckbox, ThreeVariantState } from "@/shared/ui";
import { $resources } from "@/shared/lib/theme";

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
  const resources = useUnit($resources);
  return (
    <div className={s.infoControls}>
      <SimpleCheckbox
        onChange={props.onReadChange}
        checked={props.read}
        images={{
          checked: resources.read,
          unchecked: resources.unread,
        }}
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
