import React from "react";
import s from "./style.module.css";

export type DateTimeProps = {
  dateTime: string;
};

export const DateTime: React.FC<DateTimeProps> = (props) => {
  const months = React.useMemo(
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
  const dateTime = React.useMemo(
    () => new Date(props.dateTime),
    [props.dateTime]
  );
  const isToday = React.useMemo(
    () => dateTime.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0),
    [dateTime]
  );

  const finalDate = React.useMemo(() => {
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
