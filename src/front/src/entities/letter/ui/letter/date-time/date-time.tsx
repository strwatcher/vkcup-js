import { useMonthTranslate, useTranslate } from "@/shared/lib/language";
import { MonthRule } from "@/shared/lib/language/dict-type";
import { useMemo } from "react";
import s from "./style.module.scss";

export type DateTimeProps = {
  dateTime: string;
};

export const DateTime = (props: DateTimeProps) => {
  const dateTime = useMemo(() => new Date(props.dateTime), [props.dateTime]);
  const isToday = useMemo(
    () => dateTime.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0),
    [dateTime]
  );

  const { today } = useTranslate({ today: "today" });

  const { month } = useMonthTranslate({
    month: {
      key: "monthFull",
      month: (dateTime.getMonth() + 1) as keyof MonthRule,
    },
  });

  const finalDate = useMemo(() => {
    let date = "";
    if (isToday) {
      date = today;
    } else {
      date = `${dateTime.getDate()} ${month}`;
    }
    return `${date}, ${dateTime.getHours()}:${String(
      dateTime.getMinutes()
    ).padStart(2, "0")}`;
  }, [dateTime, isToday, month]);

  return <div className={s.dateTime}>{finalDate}</div>;
};
