import { useMemo } from "react";
import { Button, List, Popup } from "@/shared/ui";
import { useUnit } from "effector-react";
import { $resources } from "@/shared/lib/theme";
import { Filter } from "@/entities/filter";
import { FilterProps } from "@/entities/filter/ui";
import { Separator } from "@/shared/ui/separator/separator";
import { useTranslate } from "@/shared/lib/language";

export type FilterSelectProps = {
  all: FilterModel;
  unread: FilterModel;
  hasAttachments: FilterModel;
  withBookmark: FilterModel;
};

type FilterModel = {
  active: boolean;
  activate: () => void;
  deactivate: () => void;
};

export const FilterSelect = (props: FilterSelectProps) => {
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

  const options: Array<FilterProps & { id: string }> = useMemo(
    () => [
      { id: "1", text: allLetters, ...props.all },
      {
        id: "2",
        text: unread,
        icon: resources.unread,
        ...props.unread,
      },
      {
        id: "3",
        text: withFlag,
        icon: resources.marked,
        ...props.withBookmark,
      },
      {
        id: "4",
        text: withAttachments,
        icon: resources.popupAttachment,
        ...props.hasAttachments,
      },
    ],
    [
      props.all,
      props.unread,
      props.hasAttachments,
      props.withBookmark,
      allLetters,
      unread,
      withAttachments,
      withFlag,
    ]
  );

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

          {activeFilters.length > 1 || props.all.active
            ? filters
            : activeFilters[0].text}

          <img src={resources.arrowDown} />
        </Button>
      )}
      body={
        <>
          <List items={options} render={(filter) => <Filter {...filter} />} />
          <Separator size={240} thickness={1} direction="horizontal" />
          <Button variant="menuItem" onClick={props.all.activate}>
            {resetAll}
          </Button>
        </>
      }
    />
  );
};
