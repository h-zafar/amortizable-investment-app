import {
  Button,
  HorizontalStack,
  Icon,
  Text,
  Box,
  Thumbnail,
} from "@shopify/polaris";

import { DeleteMinor } from "@shopify/polaris-icons";

export const ProductItem = ({ product, showDeleteIcon = false, onDelete }) => {
  return (
    <HorizontalStack blockAlign="center" gap="2" wrap={false}>
      <Thumbnail source={product?.images[0]?.originalSrc} size="small" />
      <Box width="100%">
        <Text>{product.title}</Text>
      </Box>

      {showDeleteIcon && (
        <Button plain onClick={onDelete}>
          <Icon source={DeleteMinor} />
        </Button>
      )}
    </HorizontalStack>
  );
};
