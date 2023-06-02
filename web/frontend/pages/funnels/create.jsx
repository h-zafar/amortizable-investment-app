import {
  AlphaCard,
  Badge,
  Banner,
  Button,
  HorizontalStack,
  Icon,
  Page,
  Text,
  Box,
  Divider,
  Select,
  HorizontalGrid,
  ButtonGroup,
  TextField,
  Modal,
  VerticalStack,
} from "@shopify/polaris";

import {
  EditMinor,
  DeleteMinor,
  SaveMinor,
  ArrowLeftMinor,
  TickMinor,
  CancelMinor,
  PlusMinor,
} from "@shopify/polaris-icons";

import {
  ResourcePicker,
  TitleBar,
  useNavigate,
} from "@shopify/app-bridge-react";

import { Fragment, useCallback, useEffect, useState } from "react";

import { useAtom } from "jotai";

import axios from "axios";

import {
  funnelRuleTypeAtom,
  funnelRulesAtom,
  funnelTitleAtom,
  layoutEditorCardsAtom,
  offerAcceptAtom,
  offerAtom,
  offerDeclineAtom,
  offerHideVariantSelectorAtom,
  offerLimitToVariantsAtom,
  offerPricingAtom,
  offerSettingsAtom,
  offerTitleSettingsAtom,
  offerVariantsAtom,
  productDetailsSettingsAtom,
  timerSettingsAtom,
} from "../../../store";

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
} from "../../../store/constants";

import {
  CartContents,
  CartItemCount,
  CustomerShippingLocation,
  CustomerTags,
  OrderValue,
} from "../../components/funnels/criteria";

import { Options } from "../../components/funnels/options";

import { Designer } from "../../components/funnels/designer";

import { ProductItem } from "../../components/funnels";

export default function CreateFunnel() {
  const selectionTypes = [
    "Cart contents",
    "Order value",
    "Cart item count",
    "Customer shipping location",
    "Customer tags",
  ];

  const navigate = useNavigate();

  const [title, setTitle] = useAtom(funnelTitleAtom);
  const [ruleType, setRuleType] = useAtom(funnelRuleTypeAtom);
  const [schemas, setSchemas] = useAtom(funnelRulesAtom);

  const [offer, setOffer] = useAtom(offerAtom);
  const [offerAccept, setOfferAccept] = useAtom(offerAcceptAtom);
  const [offerDecline, setOfferDecline] = useAtom(offerDeclineAtom);

  const [offerVariants, setOfferVariants] = useAtom(offerVariantsAtom);
  const [offerLimitToVariants, setOfferLimitToVariants] = useAtom(
    offerLimitToVariantsAtom
  );
  const [offerHideVariantsSelector, setOfferHideVariantsSelector] = useAtom(
    offerHideVariantSelectorAtom
  );

  const [offerPricing, setOfferPricing] = useAtom(offerPricingAtom);
  const [offerSettings, setOfferSettings] = useAtom(offerSettingsAtom);

  const [timerSettings, setTimerSettings] = useAtom(timerSettingsAtom);
  const [offerTitleSettings, setOfferTitleSettings] = useAtom(
    offerTitleSettingsAtom
  );
  const [productDetailsSettings, setProductDetailsSettings] = useAtom(
    productDetailsSettingsAtom
  );
  const [layoutEditorCards, setLayoutEditorCards] = useAtom(
    layoutEditorCardsAtom
  );

  const [mode, setMode] = useState("FUNNEL");
  const [visible, setVisible] = useState(true);
  const [criteria, setCriteria] = useState("");

  const [titleModalOpen, setTitleModalOpen] = useState(false);
  const [offersPickerOpen, setOffersPickerOpen] = useState(false);
  const [acceptPickerOpen, setAcceptPickerOpen] = useState(false);
  const [declinePickerOpen, setDeclinePickerOpen] = useState(false);

  const breadcrumbs = [{ content: "Funnels", url: "/funnels" }];

  const options = ["Any", "All"].map((type) => ({ label: type, value: type }));

  const criteriaOptions = [
    { label: "Add rule", value: "" },
    ...selectionTypes.map((selection) => ({
      label: selection,
      value: selection,
    })),
  ];

  const handleSelectChange = useCallback((value) => setRuleType(value), []);
  const handleCriteriaChange = useCallback((value) => setCriteria(value), []);

  useEffect(() => {
    if (criteria) {
      setSchemas([...schemas, getSchema(criteria)]);
      setCriteria("");
    }
  }, [criteria]);

  useEffect(() => {
    resetState();
  }, []);

  const getSchema = (criteria) => {
    switch (criteria) {
      case "Cart contents":
        return DEFAULT_CART_CONTENTS;
      case "Order value":
        return DEFAULT_ORDER_VALUE;
      case "Cart item count":
        return DEFAULT_CART_ITEM_COUNT;
      case "Customer shipping location":
        return DEFAULT_CUSTOMER_SHIPPING_LOCATION;
      case "Customer tags":
        return DEFAULT_CUSTOMER_TAGS;
    }
  };

  const resetState = () => {
    setTitle(DEFAULT_FUNNEL_TITLE);
    setSchemas(DEFAULT_FUNNEL_RULES);
    setRuleType(DEFAULT_FUNNEL_RULE_TYPE);
    setOffer(DEFAULT_OFFER);
    setOfferAccept(DEFAULT_OFFER_ACCEPT);
    setOfferDecline(DEFAULT_OFFER_DECLINE);
    setOfferVariants(DEFAULT_OFFER_VARIANTS);
    setOfferLimitToVariants(DEFAULT_OFFER_LIMIT_TO_VARIANTS);
    setOfferHideVariantsSelector(DEFAULT_OFFER_HIDE_VARIANT_SELECTOR);
    setOfferPricing(DEFAULT_OFFER_PRICING);
    setOfferSettings(DEFAULT_OFFER_SETTINGS);
    setTimerSettings(DEFAULT_TIMER_SETTINGS);
    setOfferTitleSettings(DEFAULT_OFFER_TITLE_SETTINGS);
    setProductDetailsSettings(DEFAULT_PRODUCT_DETAILS_SETTINGS);
    setLayoutEditorCards(DEFAULT_LAYOUT_EDITOR_CARDS);
  };

  const renderComponent = (type, props) => {
    switch (type) {
      case selectionTypes[0]:
        return <CartContents {...props} />;

      case selectionTypes[1]:
        return <OrderValue {...props} />;

      case selectionTypes[2]:
        return <CartItemCount {...props} />;

      case selectionTypes[3]:
        return <CustomerShippingLocation {...props} />;

      case selectionTypes[4]:
        return <CustomerTags {...props} />;

      default:
        return <Text>{type}</Text>;
    }
  };

  const handleRuleDelete = (i) => {
    if (confirm("Sure to delete?")) {
      let currSchemas = schemas.filter((_, idx) => idx !== i);
      setSchemas(currSchemas);
    }
  };

  const handleRuleUpdate = (i, data) => {
    let currSchemas = schemas;
    currSchemas[i] = data;
    setSchemas(currSchemas);
  };

  const handleSave = async () => {
    let data = {
      type: ruleType,
      rules: schemas,
      offer,
      offerAccept,
      offerDecline,
      offerMetadata: {
        offerVariants,
        offerLimitToVariants,
        offerHideVariantsSelector,
        offerPricing,
        offerSettings,
        timerSettings,
        offerTitleSettings,
        productDetailsSettings,
        layoutEditorCards,
      },
    };

    const res = await axios.post("http://localhost:1337/api/funnels/", {
      data: { Name: title, Priority: 1, conditions: data },
    });

    console.log("POST res: ", res);

    if (res.status === 200) {
      resetState();
      navigate("/funnels");
    }
  };

  return (
    <>
      {mode === "FUNNEL" && (
        <Page
          fullWidth
          title={title}
          titleMetadata={
            <ButtonGroup spacing="extraTight">
              <Button plain onClick={() => setTitleModalOpen(true)}>
                <Icon source={EditMinor} />
              </Button>
              <Button
                plain
                onClick={handleSave}
                disabled={schemas.length === 0}
              >
                <Icon source={SaveMinor} />
              </Button>
            </ButtonGroup>
          }
        >
          <TitleBar title="New Funnel" breadcrumbs={breadcrumbs}></TitleBar>

          <Box padding="2" />

          {visible && (
            <Banner
              title="Currently Inactive"
              onDismiss={() => {
                setVisible(!visible);
              }}
            >
              <p>
                This funnel is currently inactive. All changes will be autosaved
                until you are ready to publish. You can safely exit this view at
                any time without losing any changes. You can learn more about
                creating funnels here.
              </p>
            </Banner>
          )}

          <Box padding="2"></Box>

          <AlphaCard>
            <Text as="h2" variant="headingMd">
              Display Criteria
            </Text>

            <HorizontalStack blockAlign="center" gap="2">
              <Text>Show these offers when</Text>

              <Select
                disabled={schemas.length === 0}
                options={options}
                onChange={handleSelectChange}
                value={ruleType}
              />

              <Text>of the following individual criteria are met</Text>
            </HorizontalStack>

            <Box paddingBlockStart="2" paddingBlockEnd="2">
              <Divider />
            </Box>

            {schemas.map((schema, i) => (
              <Fragment key={i}>
                {renderComponent(schema.first, {
                  i,
                  criteria: schema.first,
                  onDelete: () => handleRuleDelete(i),
                  onUpdate: (data) => handleRuleUpdate(i, data),
                })}

                <Box paddingBlockStart="2" paddingBlockEnd="2">
                  <Divider />
                </Box>
              </Fragment>
            ))}

            <HorizontalGrid columns={4}>
              <Select
                options={criteriaOptions}
                onChange={handleCriteriaChange}
                value={criteria}
              />
            </HorizontalGrid>
          </AlphaCard>

          <Box padding="2"></Box>

          <AlphaCard>
            <Text as="h2" variant="headingMd">
              Offers
            </Text>

            <Text>Choose offers to include in this funnel</Text>

            <Box padding="2"></Box>

            <HorizontalGrid columns={1}>
              {offer && offer.selection && (
                <>
                  <HorizontalStack align="end">
                    <Button onClick={() => setMode("OFFER")}>
                      Manage Offers
                    </Button>
                  </HorizontalStack>

                  <Box padding="2" />

                  <AlphaCard roundedAbove="md" background="bg-subdued">
                    <HorizontalStack blockAlign="center" gap="2" wrap={false}>
                      <Box width="100%">
                        <ProductItem product={offer?.selection[0]} />
                      </Box>

                      <Button destructive onClick={() => setOffer(null)}>
                        <Icon source={DeleteMinor} />
                      </Button>
                    </HorizontalStack>
                  </AlphaCard>
                </>
              )}

              {offerAccept && (
                <AlphaCard background="bg-subdued">
                  <HorizontalStack blockAlign="center" gap="2" wrap={false}>
                    <Icon source={TickMinor} color="success" />
                    <Box width="100%">
                      <ProductItem product={offerAccept?.selection[0]} />
                    </Box>

                    <Button destructive onClick={() => setOfferAccept(null)}>
                      <Icon source={DeleteMinor} />
                    </Button>
                  </HorizontalStack>
                </AlphaCard>
              )}

              {offerDecline && (
                <AlphaCard background="bg-subdued">
                  <HorizontalStack blockAlign="center" gap="2" wrap={false}>
                    <Icon source={CancelMinor} color="critical" />
                    <Box width="100%">
                      <ProductItem product={offerDecline?.selection[0]} />
                    </Box>

                    <Button destructive onClick={() => setOfferDecline(null)}>
                      <Icon source={DeleteMinor} />
                    </Button>
                  </HorizontalStack>
                </AlphaCard>
              )}

              {!offer && (
                <Button onClick={() => setOffersPickerOpen(true)}>
                  Add Offer
                </Button>
              )}
            </HorizontalGrid>

            <ResourcePicker
              open={offersPickerOpen}
              resourceType="Product"
              selectMultiple={false}
              onCancel={() => setOffersPickerOpen(false)}
              onSelection={(data) => {
                setOffersPickerOpen(false);
                console.log("Offer SELECTION", data);
                setOffer(data);
                setMode("OFFER");
              }}
            />
          </AlphaCard>

          <Box padding="2"></Box>

          <AlphaCard>
            <Text as="h2" variant="headingMd">
              Priority
            </Text>

            <HorizontalGrid columns={2} alignItems="center">
              <Text>
                Set the priority for the funnel to appear instead of others.
                This funnel is #5 out of 5 total funnels.
              </Text>

              <HorizontalStack blockAlign="end" align="end">
                <Button>Change</Button>
              </HorizontalStack>
            </HorizontalGrid>
          </AlphaCard>

          <Modal
            fullScreen
            large
            open={titleModalOpen}
            onClose={() => setTitleModalOpen(false)}
            title="Change funnel name"
            primaryAction={{
              content: "Save",
              disabled: title.length === 0,
              onAction: () => {
                setTitleModalOpen(false);
              },
            }}
            secondaryActions={[
              {
                content: "Close",
                onAction: () => setTitleModalOpen(false),
              },
            ]}
          >
            <Modal.Section>
              <Text>Funnel name</Text>
              <TextField
                placeholder="Funnel name"
                value={title}
                onChange={(value) => setTitle(value)}
              />
            </Modal.Section>
          </Modal>
        </Page>
      )}

      {mode === "OFFER" && (
        <Page fullWidth>
          <AlphaCard>
            <HorizontalStack blockAlign="center" gap="2" wrap={false}>
              <Button onClick={() => setMode("FUNNEL")}>
                <Icon source={ArrowLeftMinor} />
              </Button>

              <Box width="100%">
                <Text>Back to funnel</Text>
              </Box>

              <Button primary onClick={() => setMode("FUNNEL")}>
                Save
              </Button>
            </HorizontalStack>

            <Box padding="2" />
            <Divider />
            <Box padding="2" />

            <HorizontalStack gap="4" blockAlign="center">
              <Box
                borderRadius="1"
                borderWidth="1"
                borderColor="border-strong"
                padding="1"
              >
                {offer && (
                  <ProductItem
                    product={offer?.selection[0]}
                    showDeleteIcon
                    onDelete={() => {
                      if (confirm("Sure to delete?")) {
                        setOffer(null);
                      }
                    }}
                  />
                )}

                {!offer && (
                  <div className="flex justify-between items-center gap-2">
                    <Text color="critical">First offer required!</Text>

                    <Button
                      primary
                      onClick={() => {
                        setMode("FUNNEL");
                        return setOffersPickerOpen(true);
                      }}
                    >
                      Add Offer
                    </Button>
                  </div>
                )}
              </Box>

              <VerticalStack gap="2" align="space-between">
                <Badge icon={TickMinor} status="success">
                  Accept
                </Badge>

                <Badge icon={CancelMinor} status="critical">
                  Decline
                </Badge>
              </VerticalStack>

              <VerticalStack gap="2" align="space-between">
                {offerAccept && (
                  <Box
                    borderRadius="1"
                    borderWidth="1"
                    borderColor="border-strong"
                    padding="1"
                  >
                    <ProductItem
                      product={offerAccept?.selection[0]}
                      showDeleteIcon
                      onDelete={() => setOfferAccept(null)}
                    />
                  </Box>
                )}
                {!offerAccept && (
                  <Box>
                    <Button
                      size="slim"
                      onClick={() => setAcceptPickerOpen(true)}
                    >
                      <Icon source={PlusMinor} />
                    </Button>
                  </Box>
                )}

                {offerDecline && (
                  <Box
                    borderRadius="1"
                    borderWidth="1"
                    borderColor="border-strong"
                    padding="1"
                  >
                    <ProductItem
                      product={offerDecline?.selection[0]}
                      showDeleteIcon
                      onDelete={() => setOfferDecline(null)}
                    />
                  </Box>
                )}
                {!offerDecline && (
                  <Box>
                    <Button
                      size="slim"
                      onClick={() => setDeclinePickerOpen(true)}
                    >
                      <Icon source={PlusMinor} />
                    </Button>
                  </Box>
                )}
              </VerticalStack>
            </HorizontalStack>
          </AlphaCard>

          <div className="flex gap-4 border-t">
            <div className="w-4/12 bg-white p-4 h-fit shadow">
              <Options />
            </div>
            <div className="flex-1">
              <Designer offer={offer?.selection[0]} />
            </div>
          </div>

          <ResourcePicker
            open={acceptPickerOpen}
            resourceType="Product"
            selectMultiple={false}
            onCancel={() => setAcceptPickerOpen(false)}
            onSelection={(data) => {
              setAcceptPickerOpen(false);
              console.log("Accept offer SELECTION", data);
              setOfferAccept(data);
            }}
          />

          <ResourcePicker
            open={declinePickerOpen}
            resourceType="Product"
            selectMultiple={false}
            onCancel={() => setDeclinePickerOpen(false)}
            onSelection={(data) => {
              setDeclinePickerOpen(false);
              console.log("Decline offer SELECTION", data);
              setOfferDecline(data);
            }}
          />
        </Page>
      )}
    </>
  );
}
