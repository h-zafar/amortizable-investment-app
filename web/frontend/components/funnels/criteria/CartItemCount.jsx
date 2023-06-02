import {
  Button,
  HorizontalStack,
  Icon,
  Text,
  Select,
  TextField,
} from "@shopify/polaris";

import { DeleteMinor } from "@shopify/polaris-icons";

import { useState, useEffect } from "react";
import { DEFAULT_CART_ITEM_COUNT } from "../../../../store/constants";

export const CartItemCount = ({
  data,
  onDelete,
  onUpdate,
  shouldUpdate = false,
}) => {
  const firstRuleTypes = [
    "is less than",
    "is less than or equal to",
    "is greater than",
    "is greater than or equal to",
    "is equal to",
    "is not equal to",
  ];

  const [state, setState] = useState(DEFAULT_CART_ITEM_COUNT);
  const [hasUpdated, setHasUpdated] = useState(false);

  const firstRuleOptions = firstRuleTypes.map((v) => ({ label: v, value: v }));

  useEffect(() => {
    onUpdate(state);
  }, [state]);

  useEffect(() => {
    if (data && !hasUpdated) {
      setState(data);
      setHasUpdated(true);
    }
  }, [data]);

  return (
    <HorizontalStack blockAlign="center" gap="2" align="space-between">
      <Text>{state.first}</Text>

      <Select
        options={firstRuleOptions}
        onChange={(v) => setState({ ...state, second: v })}
        value={state.second}
      />

      <TextField
        value={state.third}
        onChange={(v) => setState({ ...state, third: v })}
      />

      <Button destructive onClick={onDelete}>
        <Icon source={DeleteMinor} />
      </Button>
    </HorizontalStack>
  );
};
