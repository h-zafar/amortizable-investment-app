import { atom } from "jotai";

import {
  DEFAULT_FUNNEL_TITLE,
  DEFAULT_FUNNEL_RULES,
  DEFAULT_FUNNEL_RULE_TYPE,
  DEFAULT_OFFER,
  DEFAULT_OFFER_VARIANTS,
  DEFAULT_OFFER_LIMIT_TO_VARIANTS,
  DEFAULT_OFFER_HIDE_VARIANT_SELECTOR,
  DEFAULT_OFFER_PRICING,
  DEFAULT_OFFER_SETTINGS,
  DEFAULT_OFFER_ACCEPT,
  DEFAULT_OFFER_DECLINE,
  DEFAULT_TIMER_SETTINGS,
  DEFAULT_OFFER_TITLE_SETTINGS,
  DEFAULT_PRODUCT_DETAILS_SETTINGS,
  DEFAULT_LAYOUT_EDITOR_CARDS,
  DEFAULT_CART_CONTENTS,
  DEFAULT_ORDER_VALUE,
  DEFAULT_CART_ITEM_COUNT,
  DEFAULT_CUSTOMER_SHIPPING_LOCATION,
  DEFAULT_CUSTOMER_TAGS,
} from "./constants";

export const funnelTitleAtom = atom(DEFAULT_FUNNEL_TITLE);
export const funnelRulesAtom = atom(DEFAULT_FUNNEL_RULES);
export const funnelRuleTypeAtom = atom(DEFAULT_FUNNEL_RULE_TYPE);

// OFFER (DEFAULT)
export const offerAtom = atom(DEFAULT_OFFER);

// OFFER VARIANTS (OPTIONS)
export const offerVariantsAtom = atom(DEFAULT_OFFER_VARIANTS);
export const offerLimitToVariantsAtom = atom(DEFAULT_OFFER_LIMIT_TO_VARIANTS);
export const offerHideVariantSelectorAtom = atom(
  DEFAULT_OFFER_HIDE_VARIANT_SELECTOR
);

// OFFER PRICING (OPTIONS)
export const offerPricingAtom = atom(DEFAULT_OFFER_PRICING);

// OFFER SETTINGS (OPTIONS)
export const offerSettingsAtom = atom(DEFAULT_OFFER_SETTINGS);

export const offerAcceptAtom = atom(DEFAULT_OFFER_ACCEPT);
export const offerDeclineAtom = atom(DEFAULT_OFFER_DECLINE);

export const timerSettingsAtom = atom(DEFAULT_TIMER_SETTINGS);

export const offerTitleSettingsAtom = atom(DEFAULT_OFFER_TITLE_SETTINGS);

export const productDetailsSettingsAtom = atom(
  DEFAULT_PRODUCT_DETAILS_SETTINGS
);

export const layoutEditorCardsAtom = atom(DEFAULT_LAYOUT_EDITOR_CARDS);

export const cartContentsAtom = atom(DEFAULT_CART_CONTENTS);

export const orderValueAtom = atom(DEFAULT_ORDER_VALUE);

export const cartItemCountAtom = atom(DEFAULT_CART_ITEM_COUNT);

export const customerShippingLocationAtom = atom(
  DEFAULT_CUSTOMER_SHIPPING_LOCATION
);

export const customerTagsAtom = atom(DEFAULT_CUSTOMER_TAGS);

export default {
  funnelTitleAtom,
  funnelRulesAtom,
  funnelRuleTypeAtom,
  offerAtom,
  offerAcceptAtom,
  offerDeclineAtom,
  offerVariantsAtom,
  offerLimitToVariantsAtom,
  offerHideVariantSelectorAtom,
};
