import React from "react";
import { IUser } from "shared";
import { Avatar } from "../../../elements/avatar";
import { SlicedAuthor } from "../../../letter-item/sliced-author";
import s from "./style.module.css";

export type InfoProps = {
  author: IUser;
  to: Array<IUser>;
  dateTime: string;
  indicator: string;
};

export const Info: React.FC<InfoProps> = (props) => {
  return (
    <div className={s.info}>
      <div className={s.avatar}>
        <Avatar src={props.author.avatar} />
      </div>
      <div className={s.topLine}>
        <SlicedAuthor
          name={props.author.name}
          surname={props.author.surname}
          read={true}
        />
        // time and indicator
      </div>
      <div className={s.bottomLine}>// to</div>
    </div>
  );
};
