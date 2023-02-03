import { joinClasses } from "@/shared/lib";
import s from "./style.module.scss";

type ProgressbarProps = {
  finished: boolean;
};
export const Progressbar = (props: ProgressbarProps) => {
  return (
    <div className={s.progressbarContainer}>
      <div
        className={joinClasses(s.progressbar, props.finished && s.finished)}
      />
    </div>
  );
};
