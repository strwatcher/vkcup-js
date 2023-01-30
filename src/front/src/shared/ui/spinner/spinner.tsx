import { joinClasses } from "@/shared/lib";
import s from "./style.module.scss";

type SpinnerProps = {
  size: "small" | "medium" | "big";
};
export const Spinner = (props: SpinnerProps) => {
  return <div className={joinClasses(s.spinner, s[props.size])} />;
};
