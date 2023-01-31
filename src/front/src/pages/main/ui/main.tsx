import { Letter } from "@/entities/letter";
import {
  $$filterLetters,
  $$selectLetter,
  LettersList,
} from "@/features/manage-letters";
import { ScreenSizeGate } from "@/shared/lib/screen-size";
import { ThemeGate } from "@/shared/lib/theme";
import { ThreeVariantState } from "@/shared/ui";
import { Content } from "@/widgets/content";
import { Header } from "@/widgets/header";
import { SettingsModal } from "@/widgets/settings-modal";
import { Sidebar } from "@/widgets/sidebar";
import { useEvent, useGate, useStoreMap, useUnit } from "effector-react";
import { useCallback } from "react";
import { Layout } from "./layout";

export const Main = () => {
  useGate(ScreenSizeGate);
  useGate(ThemeGate);

  const lettersListEmpty = useStoreMap(
    $$filterLetters.$filtered,
    (letters) => !letters.length
  );

  const letterOpened = useStoreMap(
    $$selectLetter.$active,
    (letter) => !!letter
  );

  const closeContent = useEvent($$selectLetter.onCloseClicked);

  return (
    <>
      <Layout
        contentEmpty={lettersListEmpty}
        head={
          <Header needReturnBack={letterOpened} returnBack={closeContent} />
        }
      >
        <Sidebar />
        <Content />
      </Layout>
      <SettingsModal />
    </>
  );
};

//   {model.letter ? (
//     <Letter
//       attachmentsFetching={model.attachmetnsFetching}
//       {...model.letter}
//       onReadToggle={callbacks.letterReadToggle}
//       onMarkToggle={callbacks.letterMarkToggle}
//     />
//   ) : (
//     <LettersList />
//   )}
