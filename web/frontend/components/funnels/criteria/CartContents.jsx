import {
  Button,
  HorizontalStack,
  Icon,
  Text,
  Box,
  Select,
} from "@shopify/polaris";

import { DeleteMinor, EditMinor } from "@shopify/polaris-icons";

import { ResourcePicker } from "@shopify/app-bridge-react";

import { useState, useEffect } from "react";

import { ProductItem } from "../ProductItem";

import { DEFAULT_CART_CONTENTS } from "../../../../store/constants";

export const CartContents = ({
  data,
  onUpdate,
  onDelete,
  shouldUpdate = false,
}) => {
  const dataTypes = [
    "Products",
    "Products in these collections",
    "Products with these tags",
  ];

  // const [state, setState] = useAtom(cartContentsAtom);
  const [state, setState] = useState(DEFAULT_CART_CONTENTS);

  const [hasUpdated, setHasUpdated] = useState(false);

  const [pickerOpen, setPickerOpen] = useState(false);

  const ruleOptions = ["Contains", "Doesn't contain"].map((r) => ({
    label: r,
    value: r,
  }));
  const quantityOptions = ["Any", "All"].map((t) => ({ label: t, value: t }));
  const dataTypeOptions = dataTypes.map((d) => ({ label: d, value: d }));

  useEffect(() => {
    onUpdate(state);
  }, [state.first, state.second, state.third, state.fourth, state.fifth]);

  useEffect(() => {
    if (data && !hasUpdated) {
      setState(data);
      setHasUpdated(true);
    }
  }, [data]);

  const getResType = (res) => {
    switch (res) {
      case dataTypes[0]:
        return "Product";
      case dataTypes[1]:
        return "Collection";
      default:
        return "Product";
    }
  };

  return (
    <>
      <HorizontalStack blockAlign="center" gap="2" align="space-between">
        <Text>{state.first}</Text>

        <Select
          options={ruleOptions}
          onChange={(v) => setState({ ...state, second: v })}
          value={state.second}
        />

        <Select
          options={quantityOptions}
          onChange={(v) => setState({ ...state, third: v })}
          value={state.third}
        />

        <Text>of the following</Text>

        <Select
          disabled={state.fifth !== null}
          options={dataTypeOptions}
          onChange={(v) => setState({ ...state, fourth: v })}
          value={state.fourth}
        />

        <Button destructive onClick={onDelete}>
          <Icon source={DeleteMinor} />
        </Button>
      </HorizontalStack>

      <Box padding="2"></Box>

      {!state.fifth && (
        <Button primary onClick={() => setPickerOpen(true)}>
          Select {getResType(state.fourth)}s
        </Button>
      )}

      <Box padding="2"></Box>

      {state.fifth && (
        <div className="flex gap-2 justify-between items-center">
          <div className="border divide-x w-full divide-y">
            {state?.fifth?.selection?.map((res) => (
              <div className="p-2">
                <ProductItem product={res} />
              </div>
            ))}
          </div>
          <div>
            <Button plain onClick={() => setPickerOpen(true)}>
              <Icon source={EditMinor} />
            </Button>
          </div>
        </div>
      )}

      <ResourcePicker
        open={pickerOpen}
        resourceType={getResType(state.fourth)}
        selectMultiple
        onCancel={() => setPickerOpen(false)}
        onSelection={(data) => {
          setPickerOpen(false);
          console.log("SELECTION", data);
          setState({ ...state, fifth: data });
        }}
      />
    </>
  );
};
