import { useMemo } from "react";
import s from "./style.module.scss";

export type DateTimeProps = {
  dateTime: string;
};

export const DateTime = (props: DateTimeProps) => {
  const months = useMemo(
    () => [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ],
    []
  );
  const dateTime = useMemo(() => new Date(props.dateTime), [props.dateTime]);
  const isToday = useMemo(
    () => dateTime.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0),
    [dateTime]
  );

  const finalDate = useMemo(() => {
    let date = "";
    if (isToday) {
      date = "Сегодня";
    } else {
      date = `${dateTime.getDate()} ${months[dateTime.getMonth()]}`;
    }
    return `${date}, ${dateTime.getHours()}:${String(
      dateTime.getMinutes()
    ).padStart(2, "0")}`;
  }, [dateTime, isToday]);

  return <div className={s.dateTime}>{finalDate}</div>;
};
