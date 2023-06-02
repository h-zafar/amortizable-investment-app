import { Select } from "@shopify/polaris";

import { useState } from "react";

import {
  PricingOptions,
  SettingsOptions,
  VariantsOptions,
  DesignOptions,
} from "./index";

import { Accordion } from "../Accordion";

export const Options = () => {
  const [selected, setSelected] = useState(null);

  const accordions = [
    {
      id: 1,
      title: "Variants",
      description: "Specify which variants you want this offer limited to",
      children: <VariantsOptions />,
    },
    {
      id: 2,
      title: "Pricing",
      description: "Specify the pricing for this offer",
      children: <PricingOptions />,
    },
    {
      id: 3,
      title: "Settings",
      description: "Specify the details of this offer",
      children: <SettingsOptions />,
    },
    {
      id: 4,
      title: "Design",
      description: "Customize the content and layout of this offer",
      children: <DesignOptions />,
    },
  ];

  const selectedAccordionMarkup = () => {
    if (selected) {
      const accordion = accordions.find((acc) => acc.title === selected);
      return (
        <Accordion
          title={accordion.title}
          description={accordion.description}
          open
          onClose={() => setSelected(null)}
        >
          {accordion.children}
        </Accordion>
      );
    }
    return null;
  };

  return (
    <div>
      {selectedAccordionMarkup()}

      {!selected && (
        <>
          <h2 className="text-xl font-bold pb-2">Purchase Options</h2>
          <Select disabled />
          <p className="italic text-[#6D7175] mt-1">
            No other options are available for this product
          </p>

          <hr className="my-2" />
          {accordions.map((accordion) => (
            <div
              key={accordion.id}
              className="cursor-pointer"
              onClick={() => setSelected(accordion.title)}
            >
              <Accordion
                title={accordion.title}
                description={accordion.description}
              >
                {accordion.children}
              </Accordion>
              <hr className="my-2" />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
