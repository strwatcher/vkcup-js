import { useUnit } from "effector-react";
import { useRef, useMemo } from "react";
import { useHover } from "@/shared/lib/hooks/use-hover";
import { H } from "@/shared/ui/h";
import { $flags } from "@/shared/lib/theme";
import { Paragraph, ThreeVariantState } from "@/shared/ui";
import { InfoControls } from "./info-controls";
import { Attachments } from "./attachments";
import { Flag } from "./flag";
import { LetterLayout } from "./letter-layout";
import { LetterState } from "../../lib";

type LetterProps = LetterState & {
  attachmentsFetching: boolean;
  onReadToggle: (id: string, read: boolean) => void;
  onMarkToggle: (id: string, mark: ThreeVariantState) => void;
};

export const Letter = (props: LetterProps) => {
  const { flags } = useUnit({
    flags: $flags,
  });

  const letterRef = useRef(null);
  const hovered = useHover(letterRef);

  const markIndicator = useMemo(() => {
    if (props.important) return "second";
    if (props.bookmark) return "first";
    return "unset";
  }, [props.bookmark, props.important]);

  return (
    <LetterLayout
      letterRef={letterRef}
      head={
        <>
          <H text={props.title} />
          {props.flag && <Flag name={props.flag} icon={flags[props.flag]} />}
        </>
      }
      info={
        <InfoControls
          read={props.read}
          onReadChange={() => props.onReadToggle(props.id, props.read)}
          markIndicator={markIndicator}
          onMarkIndicatorChange={() =>
            props.onMarkToggle(props.id, markIndicator)
          }
          sender={props.author}
          to={props.to}
          dateTime={props.date}
          hovered={hovered}
        />
      }
      attachments={
        props.attachments && (
          <Attachments
            attachments={props.doc}
            fetching={props.attachmentsFetching}
          />
        )
      }
      text={<Paragraph text={props.text} />}
    />
  );
};
