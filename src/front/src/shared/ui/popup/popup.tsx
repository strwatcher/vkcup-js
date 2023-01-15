import { useClickOutside } from "@/shared/lib/hooks/use-click-outside";
import { useState, useRef, MouseEventHandler, ReactNode } from "react";
import s from "./style.module.scss";

type PopupProps = {
  headRender: (onClick: MouseEventHandler) => ReactNode;
  body: ReactNode;
};

export const Popup = (props: PopupProps) => {
  const [opened, setOpened] = useState(false);
  const popupRef = useRef(null);

  useClickOutside(() => setOpened(false), popupRef);

  return (
    <div ref={popupRef} className={s.popupHead}>
      <>
        {props.headRender(() => setOpened((prev) => !prev))}
        {opened && <div className={s.popupBody}>{props.body}</div>}
      </>
    </div>
  );
};
