import { $screenSize } from "@/shared/lib/screen-size";
import { Button } from "@/shared/ui";
import { useUnit } from "effector-react";
import { MouseEventHandler } from "react";
import { $resources } from "@/shared/lib/theme";
import { useTranslate } from "@/shared/lib/language";

type CreateLetterProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const CreateLetter = (props: CreateLetterProps) => {
  const { size, resources } = useUnit({
    size: $screenSize,
    resources: $resources,
  });
  const { writeLetter } = useTranslate({ writeLetter: "writeLetter" });

  if (size === "small")
    return (
      <Button variant="outlined" onClick={props.onClick}>
        {<img src={resources.pencil} />}
      </Button>
    );

  return (
    <Button variant="outlined" onClick={props.onClick}>
      {writeLetter}
    </Button>
  );
};