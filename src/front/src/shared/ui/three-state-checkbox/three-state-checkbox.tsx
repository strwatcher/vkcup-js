import { Checkbox } from "@/shared/ui";

export type ThreeVariantState = "unset" | "first" | "second";

export type ThreeVariantMapping<T> = {
  [P in ThreeVariantState]: T;
};

export type ThreeStateCheckboxProps = {
  state: ThreeVariantState;
  images: ThreeVariantMapping<string>;
  onChange: (state: ThreeVariantState) => void;
  hovered: boolean;
};

export const ThreeStateCheckbox = (props: ThreeStateCheckboxProps) => {
  return (
    <Checkbox
      hovered={props.hovered}
      state={props.state}
      images={props.images}
      setState={props.onChange}
      activeState={"unset"}
      hideActive
    />
  );
};
