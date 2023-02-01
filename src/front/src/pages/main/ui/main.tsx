import { $$filterLetters } from "@/features/manage-letters";
import { ScreenSizeGate } from "@/shared/lib/screen-size";
import { ThemeGate } from "@/shared/lib/theme";
import { Content } from "@/widgets/content";
import { Header } from "@/widgets/header";
import { SettingsModal } from "@/widgets/settings-modal";
import { Sidebar } from "@/widgets/sidebar";
import { useGate, useStoreMap, useUnit } from "effector-react";
import { $needReturnBack, returnHome } from "../model";
import { Layout } from "./layout";

export const Main = () => {
  useGate(ScreenSizeGate);
  useGate(ThemeGate);

  const lettersListEmpty = useStoreMap(
    $$filterLetters.$filtered,
    (letters) => !letters.length
  );

  const needReturnBack = useUnit($needReturnBack);

  return (
    <>
      <SettingsModal />
      <Layout
        contentEmpty={lettersListEmpty}
        head={
          <Header needReturnBack={needReturnBack} returnBack={returnHome} />
        }
      >
        <Sidebar />
        <Content />
      </Layout>
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
