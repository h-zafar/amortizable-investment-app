import { Banner } from "@shopify/polaris";

import { useState } from "react";

import {
  Timer,
  OfferTitle,
  ProductDetails,
  ProductImage,
  OfferButtons,
} from "./index";
import { useAtomValue } from "jotai";
import { layoutEditorCardsAtom } from "../../../../store";

export const Designer = ({ offer }) => {
  const [previewInfoVisible, setPreviewInfoVisible] = useState(true);

  const ringClasses = `hover:ring-2 hover:ring-offset-4 hover:cursor-pointer`;

  const cards = useAtomValue(layoutEditorCardsAtom);

  const renderItem = (type, props) => {
    switch (type) {
      case "Timer":
        return <Timer {...props} />;

      case "Offer Title":
        return <OfferTitle {...props} />;

      case "Product Image":
        return <ProductImage {...props} />;

      case "Product Details":
        return <ProductDetails {...props} />;

      case "Section Divider":
        return <hr className="my-2" />;

      case "Offer Buttons":
        return <OfferButtons {...props} />;

      default:
        return <></>;
    }
  };

  return (
    <div className="bg-white m-2 rounded shadow p-16 py-8">
      {cards?.map((card) =>
        renderItem(card.text, { classes: ringClasses, offer })
      )}

      {previewInfoVisible && (
        <Banner
          title="About Preview"
          onDismiss={() => setPreviewInfoVisible(false)}
        >
          <p>
            This preview may not accurately display your store`s theme and
            branding style, but don`t worry. Your customers will see branding in
            every offer. Create a test order to see what your customers will
            see.
          </p>
        </Banner>
      )}

      {!previewInfoVisible && (
        <div className="flex items-center justify-center">
          <button
            onClick={() => setPreviewInfoVisible(true)}
            className="rounded-3xl border shadow p-2"
          >
            About this preview
          </button>
        </div>
      )}
    </div>
  );
};
