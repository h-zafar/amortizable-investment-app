import { Text, Select, TextField } from "@shopify/polaris";

import { useAtom } from "jotai";

import { offerPricingAtom } from "../../../../store";

export const PricingOptions = () => {
  const [state, setState] = useAtom(offerPricingAtom);

  const pricingOptions = [
    {
      label: "Use original price",
      value: "original",
    },
    {
      label: "Amount off (per unit)",
      value: "amount_off_per_unit",
    },
    {
      label: "Percentage off",
      value: "percentage_off",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Text variant="headingLg">One-time Purchase</Text>
      <Select
        options={pricingOptions}
        value={state.pricingType}
        onChange={(v) => setState({ ...state, pricingType: v })}
      />

      {state.pricingType === "amount_off_per_unit" && (
        <TextField
          value={state.amountOffPerUnit}
          type="number"
          min={0}
          onChange={(v) => setState({ ...state, amountOffPerUnit: v })}
          placeholder="Discount"
          prefix={<Text>$</Text>}
        />
      )}

      {state.pricingType === "percentage_off" && (
        <TextField
          value={state.percentageOff}
          onChange={(v) => setState({ ...state, percentageOff: v })}
          type="number"
          placeholder="Percentage Discount"
          min={1}
          prefix={<Text>%</Text>}
        />
      )}
    </div>
  );
};
