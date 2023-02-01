import { useMonthTranslate } from "@/shared/lib/language";
import { MonthRule } from "@/shared/lib/language/dict-type";
import { useMemo } from "react";

export type DateTimeIndicatorProps = {
  date: string;
};

export const DateTimeIndicator = (props: DateTimeIndicatorProps) => {
  const date = useMemo(() => new Date(props.date), [props.date]);

  const { month } = useMonthTranslate({
    month: {
      key: "monthShort",
      month: (date.getMonth() + 1) as keyof MonthRule,
    },
  });

  const isToday = useMemo(
    () => date.getDate() === new Date().getDate(),
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
