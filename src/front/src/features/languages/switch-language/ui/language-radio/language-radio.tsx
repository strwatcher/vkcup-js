import { $resources } from "@/shared/lib/theme";
import { Sign, SimpleCheckbox } from "@/shared/ui";
import { useStoreMap } from "effector-react";
import s from "./style.module.scss";

type LanguageRadioProps = {
  icon: string;
  sign: string;
  activate: () => void;
  active: boolean;
};

export const LanguageRadio = (props: LanguageRadioProps) => {
  const { checked, unchecked } = useStoreMap($resources, (resources) => ({
    checked: resources.radioChecked,
    unchecked: resources.radioUnchecked,
  }));

  return (
    <div className={s.languageRadio}>
      <SimpleCheckbox
        images={{ checked, unchecked }}
        checked={props.active}
        onChange={props.activate}
      />
      <img src={props.icon} />
      <Sign text={props.sign} />
    </div>
  );
};
