import { Text, Select, TextField, Checkbox } from "@shopify/polaris";

import { useAtom } from "jotai";

import { offerSettingsAtom } from "../../../../store";

export const SettingsOptions = () => {
  const [state, setState] = useAtom(offerSettingsAtom);

  const options = [
    {
      label: "When product was in initial order",
      value: "when_product_was_in_initial_order",
    },
    {
      label: "Only when a selected variant of product was in initial order",
      value: "only_when_a_selected_variant_of_product_was_in_initial_order",
      disabled: true,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Text fontWeight="bold" variant="bodyLg">
        Display
      </Text>

      <Checkbox
        checked={state.hideOffer}
        onChange={(v) => setState({ ...state, hideOffer: v })}
        label={<Text>Hide Offer</Text>}
      />

      <Select
        options={options}
        value={state.hideCondition}
        onChange={(v) => setState({ ...state, hideCondition: v })}
      />

      <hr className="my-2" />

      <Text fontWeight="bold" variant="bodyLg">
        Quantity
      </Text>

      <Select
        label={<Text>Display Quantity?</Text>}
        value={state.displayQuantity}
        onChange={(v) => setState({ ...state, displayQuantity: v })}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />

      <div className="flex flex-col gap-2">
        <Checkbox
          checked={state.limitQuantity}
          onChange={(v) => setState({ ...state, limitQuantity: v })}
          label={<Text>Limit Quantity</Text>}
        />

        {state.limitQuantity && (
          <TextField
            value={state.limitQuantityValue}
            onChange={(v) => setState({ ...state, limitQuantityValue: v })}
            type="number"
            min={1}
            max={25}
          />
        )}
      </div>

      <hr className="my-2" />

      <div>
        <Text fontWeight="bold" variant="bodyLg">
          Shipping
        </Text>
        <Text>Configure shipping charges for your product offer.</Text>
      </div>

      <Select
        value={state.shippingType}
        onChange={(v) => setState({ ...state, shippingType: v })}
        options={[
          {
            label: "Free shipping",
            value: "free_shipping",
          },
          {
            label: "Flat rate shipping",
            value: "flat_rate_shipping",
          },
        ]}
      />

      {state.shippingType === "flat_rate_shipping" && (
        <TextField
          value={state.shippingRate}
          onChange={(v) => setState({ ...state, shippingRate: v })}
          type="number"
          min={0.01}
          placeholder="Shipping rate"
          prefix={<Text>$</Text>}
        />
      )}
    </div>
  );
};
