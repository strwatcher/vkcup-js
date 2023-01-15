import { Modal } from "@/shared/ui";
import { useUnit } from "effector-react";
import {
  $areSettingsActive,
  toggleSettingsClicked,
} from "@/features/settings/model/control-settings";
import { NavigateSettings } from "@/features/settings";

export const SettingsModal = () => {
  const { opened, onClose } = useUnit({
    opened: $areSettingsActive,
    onClose: toggleSettingsClicked,
  });
  return (
    <Modal opened={opened} onClose={onClose}>
      <NavigateSettings />
    </Modal>
  );
};
