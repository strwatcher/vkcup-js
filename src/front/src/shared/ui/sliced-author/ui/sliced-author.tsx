import { joinClasses } from "@/shared/lib";
import { Sliced } from "@/shared/ui";
import s from "./style.module.scss";

export type SlicedAuthorProps = {
  name: string;
  surname: string;
  read: boolean;
};

export const SlicedAuthor = (props: SlicedAuthorProps) => {
  return (
    <Sliced variant="clip">
      <span className={joinClasses(s.author, props.read && s.read)}>
        {props.name} {props.surname}
      </span>
    </Sliced>
  );
};
