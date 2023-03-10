import { $resources } from "@/shared/lib/theme";
import {
  SlicedAuthor,
  ThreeStateCheckbox,
  ThreeVariantState,
} from "@/shared/ui";
import { Avatar } from "@/shared/ui/avatar";
import { useStore } from "effector-react";
import { IUser } from "shared";
import { DateTime } from "../../date-time";
import { Recipients } from "../../recipients";
import s from "./style.module.scss";

export type InfoProps = {
  author: IUser;
  to: Array<IUser>;
  dateTime: string;
  indicator: ThreeVariantState;
  onChange: () => void;
  hovered: boolean;
};

export const Info = (props: InfoProps) => {
  const resources = useStore($resources);

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
        <DateTime dateTime={props.dateTime} />
        <div className={s.markIndicator}>
          <ThreeStateCheckbox
            state={props.indicator}
            onChange={props.onChange}
            hovered={props.hovered}
            images={{
              unset: resources.unmarked,
              first: resources.marked,
              second: resources.exclamation,
            }}
          />
        </div>
      </div>
      <div className={s.bottomLine}>
        <Recipients to={props.to} />
      </div>
    </div>
  );
};
