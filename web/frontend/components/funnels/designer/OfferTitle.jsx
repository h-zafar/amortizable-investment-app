import { Modal } from "@shopify/polaris";

import { useState } from "react";

import { useAtom } from "jotai";

import { offerTitleSettingsAtom } from "../../../../store";

import { TheTextEditor } from "../TheTextEditor";

export const OfferTitle = ({ classes }) => {
  const [settings, setSettings] = useAtom(offerTitleSettingsAtom);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className={`p-4 m-4 text-${settings.alignment} ${classes}`}
        onClick={() => setModalOpen(true)}
      >
        <p
          className={`text-${settings.size} ${
            settings.bold ? `font-bold` : ""
          }`}
        >
          {settings.title}
        </p>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Offer Title"
        primaryAction={{ content: "Save", onAction: () => setModalOpen(false) }}
        secondaryActions={[
          { content: "Cancel", onAction: () => setModalOpen(false) },
        ]}
      >
        <Modal.Section>
          <TheTextEditor
            value={settings.title}
            setValue={(v) => setSettings({ ...settings, title: v })}
            textFieldProps={{ maxLength: 75, showCharacterCount: true }}
            size={settings.size}
            setSize={(v) => setSettings({ ...settings, size: v })}
            alignment={settings.alignment}
            setAlignment={(v) => setSettings({ ...settings, alignment: v })}
            bold={settings.bold}
            setBold={(v) => setSettings({ ...settings, bold: v })}
          />
        </Modal.Section>
      </Modal>
    </>
  );
};
