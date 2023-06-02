import { Text, Select, TextField, Modal } from "@shopify/polaris";

import { useState } from "react";

import { useAtom } from "jotai";

import { timerSettingsAtom } from "../../../../store";

export const Timer = ({ classes }) => {
  const sizes = ["Large", "Small"];
  const colors = ["Blue", "Green", "Yellow", "Red", "None"];

  const [settings, setSettings] = useAtom(timerSettingsAtom);
  const [modalOpen, setModalOpen] = useState(false);

  const sizeOptions = sizes.map((v) => ({ label: v, value: v }));
  const colorOptions = colors.map((v) => ({
    label: v,
    value: v.toLowerCase(),
  }));

  return (
    <>
      <div
        className={`${
          settings.bannerSize === "Small" ? `w-fit px-24 mx-auto` : ``
        } rounded border bg-${
          settings.backgroundColor
        } p-4 text-center ${classes}`}
        onClick={() => setModalOpen(true)}
      >
        <span className="font-bold">0{settings.timerLength - 1}:59</span> left
        to claim this offer
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Timer"
        primaryAction={{ content: "Save", onAction: () => setModalOpen(false) }}
        secondaryActions={[
          { content: "Cancel", onAction: () => setModalOpen(false) },
        ]}
      >
        <Modal.Section>
          <TextField
            label={<Text>Timer Length (minutes)</Text>}
            min={1}
            max={10}
            type="number"
            value={settings.timerLength}
            onChange={(v) => setSettings({ ...settings, timerLength: v })}
          />

          <Select
            label={<Text>Banner Size</Text>}
            options={sizeOptions}
            value={settings.bannerSize}
            onChange={(v) => setSettings({ ...settings, bannerSize: v })}
          />

          <Select
            label={<Text>Background Color</Text>}
            options={colorOptions}
            value={settings.backgroundColor}
            onChange={(v) => setSettings({ ...settings, backgroundColor: v })}
          />
        </Modal.Section>
      </Modal>
    </>
  );
};
