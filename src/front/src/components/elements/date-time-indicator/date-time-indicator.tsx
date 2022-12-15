import React from "react";
import s from "./style.module.css";

export type DateTimeIndicatorProps = {
  date: string;
};

export const DateTimeIndicator: React.FC<DateTimeIndicatorProps> = (props) => {
  const months = React.useMemo(
    () => [
      "янв",
      "фев",
      "мар",
      "мая",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек",
    ],
    []
  );
  const date = React.useMemo(() => new Date(props.date), [props.date]);
  const isToday = React.useMemo(
    () => date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0),
    [date]
  );

  const finalDate = React.useMemo(() => {
    if (isToday) {
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
    }
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }, [date, isToday]);

  return <>{finalDate}</>;
};
