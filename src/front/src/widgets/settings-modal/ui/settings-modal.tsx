import { Modal } from "@/shared/ui";
import { useUnit } from "effector-react";
import { NavigateSettings } from "@/features/settings";
import { $$settings } from "@/features/settings/model";

export const SettingsModal = () => {
  const active = useUnit($$settings.$active);
  return (
    <Modal active={active} onClose={$$settings.toggleClicked}>
      <NavigateSettings />
    </Modal>
  );
};
