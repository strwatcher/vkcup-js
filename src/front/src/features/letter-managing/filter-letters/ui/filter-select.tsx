import React from "react";
import { Button, List, Popup } from "@/shared/ui";
import { useUnit } from "effector-react";
import { $resources } from "@/shared/lib/theme";
import { Filter } from "@/entities/filter";
import { FilterProps } from "@/entities/filter/ui";
import { Separator } from "@/shared/ui/separator/separator";

type FilterSelectProps = {
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

  const options: Array<FilterProps & { id: string }> = React.useMemo(
    () => [
      { id: "1", text: "Все письма", ...props.all },
      {
        id: "2",
        text: "Непрочитанные",
        icon: resources.unread,
        ...props.unread,
      },
      {
        id: "3",
        text: "С флажком",
        icon: resources.marked,
        ...props.withBookmark,
      },
      {
        id: "4",
        text: "С вложениями",
        icon: resources.attachment,
        ...props.hasAttachments,
      },
    ],
    [props.all, props.unread, props.hasAttachments, props.withBookmark]
  );

  const activeFilters = React.useMemo(
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
        <Button variant="menuItem" adaptive onClick={onClick}>
          {activeFilters.map((filter) => (
            <img src={filter.icon} key={filter.id} />
          ))}
          {activeFilters.length > 1 || props.all.active
            ? "Фильтры"
            : activeFilters[0].text}
          <img src={resources.arrowDown} />
        </Button>
      )}
      body={
        <>
          <List items={options} render={(filter) => <Filter {...filter} />} />
          <Separator size={240} thickness={1} direction="horizontal" />
          <Button variant="menuItem" onClick={props.all.activate}>
            Сбросить всё
          </Button>
        </>
      }
    />
  );
};
