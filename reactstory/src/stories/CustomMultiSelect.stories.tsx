import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect, Tooltip, ActionIcon } from "@mantine/core";
import { IconX, IconChevronDown } from "@tabler/icons-react";

const meta: Meta<typeof MultiSelect> = {
  title: "Project/CustomMultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    data: { control: "array" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const CustomMultiSelect = (props: any) => {
  const multiSelectRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState([]);
  const data = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
  ];

  const handleReset = () => {
    setValue([]);
  };

  const handleIconClick = () => {
    if (multiSelectRef.current) {
      multiSelectRef.current.focus();
    }
  };

  const hasSelectedValue = value.length > 0;

  return (
    <MultiSelect
      {...props}
      ref={multiSelectRef}
      data={data}
      value={value}
      onChange={setValue}
      placeholder="Select frameworks"
      rightSection={
        hasSelectedValue ? (
          <Tooltip label="Reset" position="left">
            <ActionIcon onClick={handleReset}>
              <IconX />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label="Open Dropdown" position="left">
            <ActionIcon onClick={handleIconClick}>
              <IconChevronDown />
            </ActionIcon>
          </Tooltip>
        )
      }
      searchable
      clearable
    />
  );
};

export const Default: Story = {
  render: (args) => <CustomMultiSelect {...args} />,
  args: {
    placeholder: "Select frameworks",
    disabled: false,
  },
};
