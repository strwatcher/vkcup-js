import React from "react";
import { Checkbox } from "../../components/elements/checkbox";
import { useTheme } from "../../hooks/use-theme";
import { genUrl } from "../../services/api/model";

export type SimpleCheckboxState = "checked" | "unchecked";

export type SimpleCheckboxProps = {
  state: SimpleCheckboxState;
  onChange: () => void;
};

export const SimpleCheckbox: React.FC<SimpleCheckboxProps> = (props) => {
  const { resources } = useTheme();
  const { checked, unchecked } = React.useMemo(
    () => ({
      checked: <img src={genUrl(resources.checkboxChecked)} />,
      unchecked: <img src={genUrl(resources.checkbox)} />,
    }),
    [resources]
  );

  return (
    <Checkbox
      state={props.state}
      mapping={{ checked, unchecked }}
      setState={props.onChange}
    />
  );
};
