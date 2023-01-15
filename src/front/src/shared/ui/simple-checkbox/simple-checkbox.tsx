import { Checkbox } from "@/shared/ui";
import { useMemo } from "react";

export type SimpleCheckboxState = "checked" | "unchecked";

export type SimpleCheckboxProps = {
  hideActive?: boolean;
  hovered?: boolean;
  checked: boolean;
  images: {
    [P in SimpleCheckboxState]: string;
  };
  onChange: () => void;
};

export const SimpleCheckbox = (props: SimpleCheckboxProps) => {
  const state = useMemo(
    () => (props.checked ? "checked" : "unchecked"),
    [props.checked]
  );

  return (
    <Checkbox
      hovered={props.hovered}
      hideActive={props.hideActive}
      activeState={"checked"}
      state={state}
      images={props.images}
      setState={props.onChange}
    />
  );
};
