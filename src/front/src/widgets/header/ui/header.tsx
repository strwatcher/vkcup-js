import { useMemo, MouseEventHandler } from "react";

import { Button, Header as HeaderLayout } from "@/shared/ui";
import { FilterSelect } from "@/features/manage-letters";
import { useUnit } from "effector-react";
import { $resources } from "@/shared/lib/theme";
import { $screenSize } from "@/shared/lib/screen-size";
import { useTranslate } from "@/shared/lib/language";

type HeaderProps = {
  needReturnBack?: boolean;
  returnBack: MouseEventHandler<HTMLButtonElement>;
};

export const Header = (props: HeaderProps) => {
  const { resources, size } = useUnit({
    resources: $resources,
    size: $screenSize,
  });
  const { returnBack } = useTranslate({ returnBack: "returnBack" });

  const logo = useMemo(() => {
    if (size === "big") return resources.logo;
    return resources.compactLogo;
  }, [resources, size]);

  if (props.needReturnBack) {
    return (
      <HeaderLayout>
        <Button variant="headerButton" gap={19.5} onClick={props.returnBack}>
          <img src={resources.arrowBack} />
          <span>{returnBack}</span>
        </Button>
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <img src={logo} />
      <FilterSelect />
    </HeaderLayout>
  );
};
