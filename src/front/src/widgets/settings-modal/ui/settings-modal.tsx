import { SelectTheme } from "@/features/settings";
import { Modal } from "@/shared/ui";
import { useUnit } from "effector-react";
import {
  $areSettingsActive,
  toggleSettingsClicked,
} from "@/features/settings/model/control-settings";

export const SettingsModal = () => {
  const { opened, onClose } = useUnit({
    opened: $areSettingsActive,
    onClose: toggleSettingsClicked,
  });
  return (
    <Modal opened={opened} onClose={onClose}>
      <SelectTheme />
    </Modal>
  );
};
