import { joinClasses } from "@/shared/lib/utils/join-classes";
import { Sliced } from "@/shared/ui";
import s from "./style.module.scss";

export type SlicedTitleContentProps = {
  title: string;
  text: string;
  read: boolean;
};

export const SlicedTitleContent = (props: SlicedTitleContentProps) => {
  return (
    <Sliced variant="ellipsis">
      <span className={joinClasses(s.title, !props.read && s.bold)}>
        {props.title}
      </span>
      <span>{props.text}</span>
    </Sliced>
  );
};
