import { Letter } from "@/entities/letter";
import { LettersList } from "@/features/letter-managing";
import { ScreenSizeGate } from "@/shared/lib/screen-size";
import { ThemeGate } from "@/shared/lib/theme/model";
import { ThreeVariantState } from "@/shared/ui";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { useEvent, useGate, useUnit } from "effector-react";
import React, { useCallback } from "react";
import { mainPageModel } from "../model";
import { Layout } from "./layout";

export const Main: React.FC = () => {
  useGate(ScreenSizeGate);
  useGate(ThemeGate);

  const model = useUnit({
    letters: mainPageModel.$filtered,
    letter: mainPageModel.$activeLetter,
    lettersFetching: mainPageModel.$areLettersFetching,
    lettersJustFetched: mainPageModel.$lettersJustFetched,
    unreadFilterActive: mainPageModel.unreadFilter.$active,
    hasAttachmentsFilterActive: mainPageModel.hasAttachmentsFilter.$active,
    withBookmarkFilterActive: mainPageModel.withBookmarkFilter.$active,
    allFilterActive: mainPageModel.$unset,
  });

  const filtersEvents = useUnit({
    unreadActivate: mainPageModel.unreadFilter.activate,
    unreadDeactivate: mainPageModel.unreadFilter.deactivate,
    attachmentsActivate: mainPageModel.hasAttachmentsFilter.activate,
    attachmentsDeactivate: mainPageModel.hasAttachmentsFilter.deactivate,
    bookmarkActivate: mainPageModel.withBookmarkFilter.activate,
    bookmarkDeactivate: mainPageModel.withBookmarkFilter.deactivate,
    deactivateAll: mainPageModel.deactivateAll,
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

    onLettersFetchFinished: useEvent(mainPageModel.fetchFinished),
  };

  return (
    <Layout
      contentEmpty={model.letters.length === 0}
      head={
        <Header
          needReturnBack={!!model.letter}
          returnBack={callbacks.letterCloseClick}
          filters={{
            all: {
              activate: filtersEvents.deactivateAll,
              deactivate: filtersEvents.deactivateAll,
              active: model.allFilterActive,
            },
            unread: {
              activate: filtersEvents.unreadActivate,
              deactivate: filtersEvents.unreadDeactivate,
              active: model.unreadFilterActive,
            },
            hasAttachments: {
              activate: filtersEvents.attachmentsActivate,
              deactivate: filtersEvents.attachmentsDeactivate,
              active: model.hasAttachmentsFilterActive,
            },
            withBookmark: {
              activate: filtersEvents.bookmarkActivate,
              deactivate: filtersEvents.bookmarkDeactivate,
              active: model.withBookmarkFilterActive,
            },
          }}
        />
      }
    >
      <Sidebar />
      {model.letter ? (
        <Letter
          {...model.letter}
          onReadToggle={callbacks.letterReadToggle}
          onMarkToggle={callbacks.letterMarkToggle}
        />
      ) : (
        <LettersList
          letters={model.letters}
          onReadToggle={callbacks.letterReadToggle}
          onMarkToggle={callbacks.letterMarkToggle}
          onSelectToggle={callbacks.letterSelectToggle}
          onAttachmentsOpened={callbacks.attachmentsOpen}
          onAttachmentsClosed={callbacks.attachmentsClose}
          onLetterClick={callbacks.letterOpenClick}
          fetchHasFinished={callbacks.onLettersFetchFinished}
          justFetched={model.lettersJustFetched}
          fetching={model.lettersFetching}
        />
      )}
    </Layout>
  );
};
