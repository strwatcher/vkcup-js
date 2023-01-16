import { useMonthTranslate } from "@/shared/lib/language";
import { MonthRule } from "@/shared/lib/language/dict-type";
import { useMemo } from "react";

export type DateTimeIndicatorProps = {
  date: string;
};

export const DateTimeIndicator = (props: DateTimeIndicatorProps) => {
  const months = useMemo(
    () => [
      "янв",
      "фев",
      "мар",
      "апр",
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
  const date = useMemo(() => new Date(props.date), [props.date]);

  const { month } = useMonthTranslate({
    month: {
      key: "monthShort",
      month: (date.getMonth() + 1) as keyof MonthRule,
    },
  });

  const isToday = useMemo(
    () => date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0),
    [date]
  );

  const finalDate = useMemo(() => {
    if (isToday) {
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
    }
    return `${date.getDate()} ${month}`;
  }, [date, isToday, month]);

  return <>{finalDate}</>;
};
