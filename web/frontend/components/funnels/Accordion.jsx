import { Button, Icon } from "@shopify/polaris";

import { ArrowLeftMinor, ChevronRightMinor } from "@shopify/polaris-icons";

export const Accordion = ({ open, onClose, title, description, children }) => {
  if (open) {
    return (
      <div className="p-2">
        <div className="flex gap-2 w-full items-center pb-2 mb-2 border-b">
          <Button onClick={onClose}>
            <Icon source={ArrowLeftMinor} />
          </Button>
          <p className="font-bold text-md">Back</p>
        </div>
        {children}
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p>{description}</p>
        </div>
        <div>
          <Icon source={ChevronRightMinor} />
        </div>
      </div>
    );
  }
};
