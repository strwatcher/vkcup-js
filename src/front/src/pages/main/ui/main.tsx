import { Letter } from "@/entities/letter";
import { LettersList } from "@/features/letter-managing";
import { $screenSize, ScreenSizeGate } from "@/shared/lib/screen-size";
import { $resources } from "@/shared/lib/theme";
import { Button, Header, ThreeVariantState } from "@/shared/ui";
import { Sidebar } from "@/widgets/sidebar";
import { useEvent, useGate, useUnit } from "effector-react";
import React, { useCallback } from "react";
import { mainPageModel } from "../model";
import { Layout } from "./layout";

export const Main: React.FC = () => {
  useGate(ScreenSizeGate);
  const { resources, size } = useUnit({
    resources: $resources,
    size: $screenSize,
  });

  const model = useUnit({
    letters: mainPageModel.$letters,
    letter: mainPageModel.$activeLetter,
    lettersFetching: mainPageModel.$areLettersFetching,
    lettersJustFetched: mainPageModel.$lettersJustFetched,
  });
  const callbacks = {
    letterCloseClick: useEvent(mainPageModel.onLetterCloseCliked),
    letterOpenClick: useEvent(mainPageModel.onLetterClicked),
    attachmentsOpen: useEvent(mainPageModel.attachmentsApi.open),
    attachmentsClose: mainPageModel.attachmentsApi.close,

    letterReadToggle: useCallback((id: string, read: boolean) => {
      if (read) mainPageModel.readApi.unread(id);
      else mainPageModel.readApi.read(id);
    }, []),
    letterSelectToggle: useCallback((id: string, selected: boolean) => {
      if (selected) mainPageModel.selectionApi.deselect(id);
      else mainPageModel.selectionApi.select(id);
    }, []),
    letterMarkToggle: useCallback((id: string, mark: ThreeVariantState) => {
      if (mark === "unset") mainPageModel.markApi.bookmark(id);
      else if (mark === "first") mainPageModel.markApi.markImportant(id);
      else mainPageModel.markApi.unmark(id);
    }, []),

    lettersFetchFinished: useEvent(mainPageModel.fetchFinished),
  };

  const logo = React.useMemo(() => {
    if (size === "big") return resources.logo;
    return resources.compactLogo;
  }, [resources, size]);

  if (model.letter) {
    return (
      <Layout
        head={
          <Header>
            <Button
              variant="transparent"
              gap={19.5}
              onClick={callbacks.letterCloseClick}
            >
              <img src={resources.arrowBack} />
              <span>Вернуться</span>
            </Button>
          </Header>
        }
      >
        <Sidebar />
        <Letter
          {...model.letter}
          onReadToggle={callbacks.letterReadToggle}
          onMarkToggle={callbacks.letterMarkToggle}
        />
      </Layout>
    );
  }
  return (
    <Layout
      head={
        <Header>
          <img src={logo} />
        </Header>
      }
    >
      <Sidebar />
      <LettersList
        letters={model.letters}
        onReadToggle={callbacks.letterReadToggle}
        onMarkToggle={callbacks.letterMarkToggle}
        onSelectToggle={callbacks.letterSelectToggle}
        onAttachmentsOpened={callbacks.attachmentsOpen}
        onAttachmentsClosed={callbacks.attachmentsClose}
        onLetterClick={callbacks.letterOpenClick}
        fetchHasFinished={callbacks.lettersFetchFinished}
        justFetched={model.lettersJustFetched}
        fetching={model.lettersFetching}
      />
    </Layout>
  );
};
