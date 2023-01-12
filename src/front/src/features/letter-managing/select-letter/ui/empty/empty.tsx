import { $resources } from "@/shared/lib/theme";
import { useUnit } from "effector-react";
import React from "react";

import s from "./style.module.scss";

export const Empty = () => {
  const resources = useUnit($resources);
  return (
    <div className={s.emptyList}>
      <img className={s.image} src={resources.emptyList} />
      <span className={s.sign}>Писем нет</span>
    </div>
  );
};
