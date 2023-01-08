import { setupFilter } from "@/entities/filter";
import { combine, createApi, createStore, Store } from "effector";
import { LettersState } from "../load-letters/model";

export type LetterFilter =
  | "unread"
  | "hasAttachments"
  | "withBookmark"
  | "unset";

export function setupLettersFilter($letters: Store<LettersState>) {
  const $activeFilter = createStore<LetterFilter>("unset");

  const filtersApi = createApi($activeFilter, {
    unset: () => "unset",
    setHasAttachments: () => "hasAttachments",
    setWithBookmark: () => "withBookmark",
    setUnread: () => "unread",
  });

  const $unread = setupFilter($letters, "read", (read) => !read);
  const $hasAttachments = setupFilter($letters, "doc");
  const $withBookmark = setupFilter($letters, "bookmark");

  const $filtered = combine(
    {
      filter: $activeFilter,
      unset: $letters,
      unread: $unread,
      hasAttachments: $hasAttachments,
      withBookmark: $withBookmark,
    },
    (stores) => stores[stores.filter]
  );

  return { $activeFilter, $filtered, filtersApi };
}
