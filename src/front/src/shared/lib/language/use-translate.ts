import { useStore, useStoreMap } from "effector-react";
import { LanguageDictType, MonthRule, PluralRule } from "./dict-type";
import { $activeDict, $language } from "./model";

export function useTranslate({
  ...keys
}: {
  [key: string]: keyof LanguageDictType["simple"];
}) {
  return useStoreMap({
    store: $activeDict,
    keys: [keys],
    fn: (dict, [keys]) =>
      Object.fromEntries(
        Object.entries(keys).map(([k, v]) => [k, dict.simple[v]])
      ),
  });
}

export function usePluralTranslate({
  ...keys
}: {
  [key: string]: { key: keyof LanguageDictType["plural"]; plural: number };
}) {
  const activeLanguage = useStore($language);
  return useStoreMap({
    store: $activeDict,
    keys: [keys, activeLanguage],
    fn: (dict, [keys, language]) =>
      Object.fromEntries(
        Object.entries(keys).map(([k, v]) => {
          const plural = new Intl.PluralRules(language).select(v.plural);
          return [k, dict.plural[v.key][plural as keyof PluralRule]];
        })
      ),
  });
}
export function useMonthTranslate({
  ...keys
}: {
  [key: string]: {
    key: keyof LanguageDictType["month"];
    month: keyof MonthRule;
  };
}) {
  return useStoreMap({
    store: $activeDict,
    keys: [keys],
    fn: (dict, [keys]) =>
      Object.fromEntries(
        Object.entries(keys).map(([k, v]) => [k, dict.month[v.key][v.month]])
      ),
  });
}
