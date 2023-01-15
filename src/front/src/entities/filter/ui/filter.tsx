import { useCallback } from "react";
import { Button } from "@/shared/ui";
import { useStore } from "effector-react";
import { $resources } from "@/shared/lib/theme";

import s from "./style.module.scss";

export type FilterProps = {
  icon?: string;
  text: string;
  active?: boolean;
  activate: () => void;
  deactivate: () => void;
};
export const Filter = (props: FilterProps) => {
  const resources = useStore($resources);
  const toggle = useCallback(() => {
    if (props.active) {
      props.deactivate();
    } else {
      props.activate();
    }
  }, [props.active]);

  return (
    <div className={s.filter}>
      {props.active && (
        <img className={s.activeIndicator} src={resources.checkMark} />
      )}
      <Button variant="menuItem" onClick={toggle}>
        {props.icon && <img src={props.icon} />}
        <span className={s.text}>{props.text}</span>
      </Button>
    </div>
  );
};
