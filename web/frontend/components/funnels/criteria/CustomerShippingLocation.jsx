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

import { DEFAULT_CUSTOMER_SHIPPING_LOCATION } from "../../../../store/constants";

export const CustomerShippingLocation = ({
  data,
  onDelete,
  onUpdate,
  shouldUpdate = false,
}) => {
  const [state, setState] = useState(DEFAULT_CUSTOMER_SHIPPING_LOCATION);
  const [hasUpdated, setHasUpdated] = useState(false);

  const firstRuleOptions = ["Is any", "Is not any"].map((v) => ({
    label: v,
    value: v,
  }));

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

      <Text>of the following locations...</Text>

      <TextField
        value={state.third}
        placeholder="Locations"
        onChange={(v) => setState({ ...state, third: v })}
      />

      <Button destructive onClick={onDelete}>
        <Icon source={DeleteMinor} />
      </Button>
    </HorizontalStack>
  );
};
