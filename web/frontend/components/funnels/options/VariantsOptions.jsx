import { Button, Text, Modal, Checkbox } from "@shopify/polaris";

import { useState, useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";
import {
  offerAtom,
  offerHideVariantSelectorAtom,
  offerLimitToVariantsAtom,
  offerVariantsAtom,
} from "../../../../store";

export const VariantsOptions = () => {
  const offer = useAtomValue(offerAtom);

  const [selection, setSelection] = useAtom(offerVariantsAtom);
  const [limit, setLimit] = useAtom(offerLimitToVariantsAtom);
  const [hideVariantSelectors, setHideVariantSelectors] = useAtom(
    offerHideVariantSelectorAtom
  );

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Text variant="bodyLg" fontWeight="bold">
        Variants
      </Text>

      <Text>Limit your offer to specific product variants, if desired.</Text>

      {limit && (
        <div className="flex flex-col gap-2">
          {offer?.selection[0]?.options?.map((option) => (
            <div key={option.name} className="flex gap-2 divide-x border">
              <div className="font-bold p-4">{option?.name}</div>
              <div className="p-4">
                {option?.values?.map((value) => {
                  if (selection.includes(value)) {
                    return `${value}, `;
                  }
                  return null;
                })}
              </div>
            </div>
          ))}

          <Checkbox
            checked={hideVariantSelectors}
            onChange={(v) => setHideVariantSelectors(v)}
            label={
              <Text>
                Hide variant selectors on offer. (Option available when only one
                variant is offered)
              </Text>
            }
          />
        </div>
      )}

      <Button fullWidth onClick={() => setModalOpen(true)}>
        Manage Variants
      </Button>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Variants"
        primaryAction={{ content: "Save", onAction: () => setModalOpen(false) }}
        secondaryActions={[
          { content: "Cancel", onAction: () => setModalOpen(false) },
        ]}
      >
        <Modal.Section>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <Text>Limit to variant(s)</Text>
              <Checkbox checked={limit} onChange={(v) => setLimit(v)} />
            </div>

            {limit &&
              offer?.selection[0]?.options?.map((v) => (
                <>
                  <Text>{v?.name}</Text>
                  <hr className="mb-2" />
                  {v?.values?.map((value) => (
                    <Checkbox
                      checked={selection.findIndex((s) => s === value) !== -1}
                      label={<Text>{value}</Text>}
                      onChange={(val) => {
                        if (val) {
                          let curr = [...selection, value];
                          setSelection(curr);
                        } else {
                          let curr = selection.filter((s) => s !== value);
                          setSelection(curr);
                        }
                      }}
                    />
                  ))}
                </>
              ))}
          </div>
        </Modal.Section>
      </Modal>
    </div>
  );
};
