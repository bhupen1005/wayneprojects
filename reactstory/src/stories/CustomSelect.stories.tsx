import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select, Tooltip, ActionIcon } from "@mantine/core";
import { IconX, IconChevronDown } from "@tabler/icons-react";

const meta: Meta<typeof Select> = {
  title: "Project/CustomSelect",
  component: Select,
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
type Story = StoryObj<typeof Select>;

const CustomSelect = (props: any) => {
  const selectRef = useRef<HTMLInputElement>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const inputData = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
  ];

  const handleInputReset = () => {
    setSelectedValue(null);
  };

  const handleIconClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  return (
    <Select
      ref={selectRef}
      placeholder="Select"
      data={inputData}
      value={selectedValue}
      onChange={setSelectedValue}
      rightSection={
        selectedValue ? (
          <Tooltip label="Reset">
            <ActionIcon onClick={handleInputReset}>
              <IconX />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label="Open Dropdown">
            <ActionIcon onClick={handleIconClick}>
              <IconChevronDown />
            </ActionIcon>
          </Tooltip>
        )
      }
      {...props}
      searchable
      nothingFound="No options"
      clearable
    />
  );
};

export const Default: Story = {
  render: (args) => <CustomSelect {...args} />,
  args: {
    placeholder: "Select",
    disabled: false,
  },
};
