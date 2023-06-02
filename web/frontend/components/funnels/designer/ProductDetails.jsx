import { Modal } from "@shopify/polaris";

import { useEffect, useState } from "react";

import { TheTextEditor } from "../TheTextEditor";
import { useAtom } from "jotai";
import { productDetailsSettingsAtom } from "../../../../store";

export const ProductDetails = ({ offer, classes }) => {
  const [settings, setSettings] = useAtom(productDetailsSettingsAtom);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (offer?.title) {
      setSettings({
        ...settings,
        title: offer?.title || "",
      });
    }
  }, []);

  return (
    <>
      <div className={`p-4 m-4 ${classes}`} onClick={() => setModalOpen(true)}>
        {settings.titleShown && (
          <p
            className={`text-${settings.titleSize} text-${
              settings.titleAlignment
            } ${settings.titleBold && `font-semibold`}`}
          >
            {settings.title}
          </p>
        )}

        {settings.priceShown && (
          <p
            className={`text-${settings.priceSize} text-${
              settings.priceAlignment
            } ${settings.priceBold && `font-bold`} `}
          >
            ${`${offer?.variants[0]?.price}`}
          </p>
        )}

        {settings.descriptionShown && (
          <p
            className={`text-${settings.descriptionSize} text-${
              settings.descriptionAlignment
            } ${settings.descriptionBold && `font-bold`} `}
          >
            {settings.description}
          </p>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Product Details"
        primaryAction={{ content: "Save", onAction: () => setModalOpen(false) }}
        secondaryActions={[
          { content: "Cancel", onAction: () => setModalOpen(false) },
        ]}
      >
        <Modal.Section>
          <TheTextEditor
            value={settings.title}
            setValue={(v) => setSettings({ ...settings, title: v })}
            size={settings.titleSize}
            setSize={(v) => setSettings({ ...settings, titleSize: v })}
            alignment={settings.titleAlignment}
            setAlignment={(v) =>
              setSettings({ ...settings, titleAlignment: v })
            }
            bold={settings.titleBold}
            setBold={(v) => setSettings({ ...settings, titleBold: v })}
            title="Product name"
            showTitle
            showVisibilityToggle
            shown={settings.titleShown}
            setShown={(v) => setSettings({ ...settings, titleShown: v })}
          />

          <hr className="my-2" />

          <TheTextEditor
            showTextFiled={false}
            size={settings.priceSize}
            setSize={(v) => setSettings({ ...settings, priceSize: v })}
            alignment={settings.priceAlignment}
            setAlignment={(v) =>
              setSettings({ ...settings, priceAlignment: v })
            }
            bold={settings.priceBold}
            setBold={(v) => setSettings({ ...settings, priceBold: v })}
            title="Price"
            showTitle
            showVisibilityToggle
            shown={settings.priceShown}
            setShown={(v) => setSettings({ ...settings, priceShown: v })}
          />

          <hr className="my-2" />

          <TheTextEditor
            value={settings.description}
            setValue={(v) => setSettings({ ...settings, description: v })}
            textFieldProps={{
              type: "text",
              multiline: true,
              placeholder: "Enter product description here",
            }}
            size={settings.descriptionSize}
            setSize={(v) => setSettings({ ...settings, descriptionSize: v })}
            alignment={settings.descriptionAlignment}
            setAlignment={(v) =>
              setSettings({ ...settings, descriptionAlignment: v })
            }
            bold={settings.descriptionBold}
            setBold={(v) => setSettings({ ...settings, descriptionBold: v })}
            title="Description"
            showTitle
            showVisibilityToggle
            shown={settings.descriptionShown}
            setShown={(v) => setSettings({ ...settings, descriptionShown: v })}
          />
        </Modal.Section>
      </Modal>
    </>
  );
};
