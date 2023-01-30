import { ReactNode } from "react";
import { Spinner } from "../spinner";
import s from "./style.module.scss";

type LoaderProps = {
  children: ReactNode;
  loads: boolean;
};
export const Loader = (props: LoaderProps) => {
  if (props.loads)
    return (
      <div className={s.loader}>
        {props.children}
        <div className={s.loaderWall}>
          <Spinner size="big" />
        </div>
      </div>
    );
  return <>{props.children}</>;
};
