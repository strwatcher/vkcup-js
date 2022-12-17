import { useStore } from "effector-react";
import React from "react";
import { LetterLayout } from "../../components/layouts/letter-layout";
import { Body } from "../../components/letter/body";
import { Flag } from "../../components/letter/flag";
import { Info } from "../../components/letter/info";
import { Title } from "../../components/letter/title";
import { useTheme } from "../../hooks/use-theme";
import { $currentLetter, letterReadToggled } from "./model";

export const Letter: React.FC = () => {
  const { flags, resources } = useTheme();

  const current = useStore($currentLetter)!;

  const callbacks = {
    toggleRead: React.useCallback(() => {
      letterReadToggled();
    }, []),
  };

  return (
    <LetterLayout
      head={
        <>
          <Title text={current.title} />
          <Flag name={current.flag} icon={flags[current.flag]} />
        </>
      }
      info={
        <Info
          read={current.read}
          important={current.important}
          marked={current.bookmark}
          sender={current.author}
          to={current.to}
          dateTime={current.date}
          onReadChange={callbacks.toggleRead}
          hovered={true}
        />
      }
      attachments={"Attachments"}
      text={<Body text={current.text} />}
    />
  );
};
