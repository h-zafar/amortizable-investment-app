export const DEFAULT_FUNNEL_TITLE = "New Funnel";
export const DEFAULT_FUNNEL_RULES = [];
export const DEFAULT_FUNNEL_RULE_TYPE = "Any";

// OFFER (DEFAULT)
export const DEFAULT_OFFER = null;

// OFFER VARIANTS (OPTIONS)
export const DEFAULT_OFFER_VARIANTS = [];
export const DEFAULT_OFFER_LIMIT_TO_VARIANTS = false;
export const DEFAULT_OFFER_HIDE_VARIANT_SELECTOR = false;

// OFFER PRICING (OPTIONS)
export const DEFAULT_OFFER_PRICING = {
  pricingType: "original",
  amountOffPerUnit: 0.01,
  percentageOff: 1,
};

// OFFER SETTINGS (OPTIONS)
export const DEFAULT_OFFER_SETTINGS = {
  hideOffer: false,
  hideCondition: "",
  displayQuantity: "Yes",
  limitQuantity: true,
  limitQuantityValue: 1,
  shippingType: "free_shipping",
  shippingRate: 0.01,
};

export const DEFAULT_OFFER_ACCEPT = null;
export const DEFAULT_OFFER_DECLINE = null;

export const DEFAULT_TIMER_SETTINGS = {
  timerLength: 10,
  bannerSize: "Large",
  backgroundColor: "blue",
};

export const DEFAULT_OFFER_TITLE_SETTINGS = {
  size: "xl",
  alignment: "center",
  bold: true,
  title: "Wait, there's an offer for you!",
};

export const DEFAULT_PRODUCT_DETAILS_SETTINGS = {
  //title
  title: "",
  titleSize: "xl",
  titleAlignment: "center",
  titleBold: true,
  titleShown: true,
  // size
  priceSize: "xl",
  priceAlignment: "center",
  priceBold: false,
  priceShown: true,
  // description
  description: "",
  descriptionSize: "xl",
  descriptionAlignment: "center",
  descriptionBold: false,
  descriptionShown: false,
};

export const DEFAULT_LAYOUT_EDITOR_CARDS = [
  {
    id: 1,
    text: "Timer",
  },
  {
    id: 2,
    text: "Offer Title",
  },
  {
    id: 3,
    text: "Product Image",
  },
  {
    id: 4,
    text: "Product Details",
  },
  {
    id: 5,
    text: "Quantity and Variants",
  },
  {
    id: 6,
    text: "Pricing Breakdown",
  },
  {
    id: 7,
    text: "Section Divider",
  },
  {
    id: 8,
    text: "Offer Buttons",
  },
];

export const DEFAULT_CART_CONTENTS = {
  first: "Cart contents",
  second: "Contains",
  third: "Any",
  fourth: "Products",
  fifth: null,
};

export const DEFAULT_ORDER_VALUE = {
  first: "Order value",
  second: "is less than",
  third: 100,
};

export const DEFAULT_CART_ITEM_COUNT = {
  first: "Cart item count",
  second: "is less than",
  third: 10,
};

export const DEFAULT_CUSTOMER_SHIPPING_LOCATION = {
  first: "Customer shipping location",
  second: "Is any",
  third: "",
};

export const DEFAULT_CUSTOMER_TAGS = {
  first: "Customer tags",
  second: "Is any",
  third: "",
};
