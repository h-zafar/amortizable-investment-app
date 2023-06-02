import { Icon, Text, Select, TextField, Checkbox } from "@shopify/polaris";

import {
  TextAlignmentCenterMajor,
  TextAlignmentLeftMajor,
  TextAlignmentRightMajor,
} from "@shopify/polaris-icons";

export const TheTextEditor = ({
  value,
  setValue,
  textFieldProps,
  showTextFiled = true,
  size,
  setSize,
  alignment,
  setAlignment,
  bold,
  setBold,
  shown = true,
  setShown,
  title,
  showVisibilityToggle = false,
  showTitle = false,
}) => {
  const sizes = [
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
    { label: "X-Large", value: "xl" },
  ];

  const alignments = [
    { label: "Left", value: "start", icon: TextAlignmentLeftMajor },
    { label: "Center", value: "center", icon: TextAlignmentCenterMajor },
    { label: "Right", value: "end", icon: TextAlignmentRightMajor },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <div>{showTitle && <Text fontWeight="bold">{title}</Text>}</div>
        <div>
          {showVisibilityToggle && (
            <Checkbox
              label="Shown"
              checked={shown}
              onChange={(v) => setShown(v)}
            />
          )}
        </div>
      </div>

      {shown && (
        <>
          <div className="flex gap-4 items-center mb-4">
            <Select
              label={<Text>Size</Text>}
              labelInline
              options={sizes}
              onChange={(v) => setSize(v)}
              value={size}
            />

            <Text>|</Text>

            <div className="flex gap-1 items-center">
              {alignments.map((align) => (
                <div
                  key={align.label}
                  onClick={() => setAlignment(align.value)}
                  className={`p-2 cursor-pointer ${
                    align.value === alignment ? `bg-blue rounded` : ``
                  }`}
                >
                  <Icon
                    source={align.icon}
                    color={
                      align.value === alignment ? "interactive" : "subdued"
                    }
                  />
                </div>
              ))}
            </div>

            <Text>|</Text>

            <div
              onClick={() => setBold(!bold)}
              className={`p-2 px-4 cursor-pointer select-none ${
                bold && "bg-blue rounded"
              }`}
            >
              <p className="font-bold text-blue-900">B</p>
            </div>
          </div>

          {showTextFiled && (
            <TextField
              value={value}
              onChange={(v) => setValue(v)}
              {...textFieldProps}
            />
          )}
        </>
      )}
    </>
  );
};
