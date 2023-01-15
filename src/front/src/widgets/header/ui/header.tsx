import { useMemo, MouseEventHandler } from "react";

import { Button, Header as HeaderLayout } from "@/shared/ui";
import { FilterSelect, FilterSelectProps } from "@/features/letter-managing";
import { useUnit } from "effector-react";
import { $resources } from "@/shared/lib/theme";
import { $screenSize } from "@/shared/lib/screen-size";

type HeaderProps = {
  needReturnBack?: boolean;
  returnBack: MouseEventHandler<HTMLButtonElement>;
  filters: FilterSelectProps;
};

export const Header = (props: HeaderProps) => {
  const { resources, size } = useUnit({
    resources: $resources,
    size: $screenSize,
  });

  const logo = useMemo(() => {
    if (size === "big") return resources.logo;
    return resources.compactLogo;
  }, [resources, size]);

  if (props.needReturnBack) {
    return (
      <HeaderLayout>
        <Button variant="headerButton" gap={19.5} onClick={props.returnBack}>
          <img src={resources.arrowBack} />
          <span>Вернуться</span>
        </Button>
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <img src={logo} />
      <FilterSelect {...props.filters} />
    </HeaderLayout>
  );
};
