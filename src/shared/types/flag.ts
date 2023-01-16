export type IFlag =
  | "orders"
  | "finance"
  | "registrations"
  | "travelling"
  | "tickets"
  | "finesAndTaxes";

const map = {
  Заказы: "orders",
  Финансы: "finance",
  Регистрации: "registrations",
  Путешевствия: "travelling",
  Билеты: "tickets",
  "Штрафы и налоги": "finesAndTaxes",
};

export function toFlag(rawFlag: string): IFlag {
  return map[rawFlag as keyof typeof map] as IFlag;
}
