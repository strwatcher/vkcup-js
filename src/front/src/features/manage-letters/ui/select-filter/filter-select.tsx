import { useMemo } from "react";
import { Button, List, Popup } from "@/shared/ui";
import { useUnit } from "effector-react";
import { $resources } from "@/shared/lib/theme";
import { Filter } from "@/entities/filter";
import { FilterProps } from "@/entities/filter/ui";
import { Separator } from "@/shared/ui/separator/separator";
import { useTranslate } from "@/shared/lib/language";
import { $$filterLetters } from "../../model";

export const FilterSelect = () => {
  const allLettersFilter = useUnit({
    active: $$filterLetters.$isUnset,
    activate: $$filterLetters.unsetAll,
    deactivate: $$filterLetters.unsetAll,
  });

  const unreadFilter = useUnit({
    active: $$filterLetters.unreadFilter.$active,
    activate: $$filterLetters.unreadFilter.activate,
    deactivate: $$filterLetters.unreadFilter.deactivate,
  });
  const hasAttachmentsFilter = useUnit({
    active: $$filterLetters.hasAttachmentsFilter.$active,
    activate: $$filterLetters.hasAttachmentsFilter.activate,
    deactivate: $$filterLetters.hasAttachmentsFilter.deactivate,
  });
  const withBookmarkFilter = useUnit({
    active: $$filterLetters.withBookmarkFilter.$active,
    activate: $$filterLetters.withBookmarkFilter.activate,
    deactivate: $$filterLetters.withBookmarkFilter.deactivate,
  });

  const resources = useUnit($resources);
  const { allLetters, withFlag, withAttachments, unread, filters, resetAll } =
    useTranslate({
      allLetters: "allLetters",
      unread: "unread",
      withFlag: "withFlag",
      withAttachments: "withAttachments",
      filters: "filters",
      resetAll: "eraseAll",
    });

  const options: Array<FilterProps & { id: string }> = [
    { id: "1", text: allLetters, ...allLettersFilter },
    {
      id: "2",
      text: unread,
      icon: resources.unread,
      ...unreadFilter,
    },
    {
      id: "3",
      text: withFlag,
      icon: resources.marked,
      ...withBookmarkFilter,
    },
    {
      id: "4",
      text: withAttachments,
      icon: resources.popupAttachment,
      ...hasAttachmentsFilter,
    },
  ];

  const activeFilters = useMemo(
    () =>
      options
        .filter((option) => option.active)
        .map((option, index) => ({
          icon: option.icon,
          id: `${index}`,
          text: option.text,
        })),
    [options]
  );

  return (
    <Popup
      headRender={(onClick) => (
        <Button variant="headerButton" adaptive onClick={onClick}>
          {activeFilters.map((filter) => (
            <img src={filter.icon} key={filter.id} />
          ))}

          {activeFilters.length > 1 || allLettersFilter.active
            ? filters
            : activeFilters[0].text}

          <img src={resources.arrowDown} />
        </Button>
      )}
      body={
        <>
          <List items={options} render={(filter) => <Filter {...filter} />} />
          <Separator size={240} thickness={1} direction="horizontal" />
          <Button variant="menuItem" onClick={allLettersFilter.activate}>
            {resetAll}
          </Button>
        </>
      }
    />
  );
};
