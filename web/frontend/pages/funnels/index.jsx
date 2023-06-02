import {
  Page,
  Layout,
  Text,
  AlphaCard,
  VerticalStack,
  TextField,
  LegacyFilters,
  Button,
  LegacyCard,
  ResourceList,
  ResourceItem,
  Box,
  HorizontalGrid,
  ButtonGroup,
} from "@shopify/polaris";

import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

import { useState, useCallback, useEffect } from "react";

import { useQuery } from "react-query";

import axios from "axios";

export default function Funnels() {
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery("funnelsData", () =>
    axios.get("http://localhost:1337/api/funnels/").then((res) => res.data)
  );

  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState(undefined);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleTaggedWithRemove = useCallback(
    () => setTaggedWith(undefined),
    []
  );
  const handleQueryValueRemove = useCallback(
    () => setQueryValue(undefined),
    []
  );
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const resourceName = {
    singular: "funnel",
    plural: "funnels",
  };

  const promotedBulkActions = [
    {
      content: "Delete funnels",
      onAction: () => {
        if (
          confirm(
            "Sure to delete the selected funnels? This action is non-reversible."
          )
        ) {
          selectedItems.forEach((id) => {
            axios.delete(`http://localhost:1337/api/funnels/${id}`);
          });
          setSelectedItems([]);
        }
      },
    },
  ];

  const bulkActions = [];

  const filters = [
    {
      key: "taggedWith3",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters =
    taggedWith && !isEmpty(taggedWith)
      ? [
          {
            key: "taggedWith3",
            label: disambiguateLabel("taggedWith3", taggedWith),
            onRemove: handleTaggedWithRemove,
          },
        ]
      : [];

  const filterControl = (
    <LegacyFilters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    >
      <div style={{ paddingLeft: "8px" }}>
        <Button onClick={() => console.log("New filter saved")}>Save</Button>
      </div>
    </LegacyFilters>
  );

  useEffect(() => {
    console.log("Funnels", data);
  }, [data]);

  return (
    <Page fullWidth>
      <TitleBar
        title="Funnels"
        // primaryAction={{
        //   content: "Primary action",
        //   onAction: () => console.log("Primary action"),
        // }}
        // secondaryActions={[
        //   {
        //     content: "Secondary action",
        //     onAction: () => console.log("Secondary action"),
        //   },
        // ]}
      />
      <Layout>
        <Layout.Section>
          <AlphaCard sectioned>
            <Text variant="headingMd" as="h2" alignment="center">
              $0.00
            </Text>
            <VerticalStack>
              <p style={{ textAlign: "center" }}>
                all-time post-purchase revenue earned with CartHook
              </p>
            </VerticalStack>
          </AlphaCard>

          <Box padding="2"></Box>

          <LegacyCard sectioned>
            <HorizontalGrid columns={4} alignItems="center">
              <Text variant="headingLg" as="h1">
                Funnels
              </Text>

              <Box></Box>
              <Box></Box>

              <ButtonGroup fullWidth>
                <Button>Manage Priority</Button>
                <Button primary onClick={() => navigate("/funnels/create")}>
                  Create Funnel
                </Button>
              </ButtonGroup>
            </HorizontalGrid>

            <ResourceList
              resourceName={resourceName}
              items={data?.data || []}
              renderItem={renderItem}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              promotedBulkActions={promotedBulkActions}
              bulkActions={bulkActions}
              sortValue={sortValue}
              sortOptions={[
                { label: "Newest update", value: "DATE_MODIFIED_DESC" },
                { label: "Oldest update", value: "DATE_MODIFIED_ASC" },
              ]}
              onSortChange={(selected) => {
                setSortValue(selected);
                console.log(`Sort option changed to ${selected}.`);
              }}
              filterControl={filterControl}
            />
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );

  function renderItem(item) {
    const {
      id,
      attributes: { Name, Priority },
    } = item;

    return (
      <ResourceItem
        id={id}
        url={`/funnels/${id}`}
        accessibilityLabel={`View details for ${Name}`}
        persistActions
      >
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {Name}
        </Text>
        <div>Priority: {Priority}</div>
      </ResourceItem>
    );
  }

  function disambiguateLabel(key, value) {
    switch (key) {
      case "taggedWith3":
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value?.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}
