import { useTranslate } from "@/shared/lib/language";
import { $resources } from "@/shared/lib/theme";
import { useUnit } from "effector-react";

import s from "./style.module.scss";

export const Empty = () => {
  const resources = useUnit($resources);
  const { noLetters } = useTranslate({ noLetters: "noLetters" });
  return (
    <div className={s.emptyList}>
      <img className={s.image} src={resources.emptyList} />
      <span className={s.sign}>{noLetters}</span>
    </div>
  );
};
