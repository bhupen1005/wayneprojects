import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextInput, Tooltip, ActionIcon } from "@mantine/core";
import { IconX, IconSearch } from "@tabler/icons-react";

const meta: Meta<typeof TextInput> = {
  title: "Project/CustomTextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placeholder: { control: "text" },
    type: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

const CustomTextInput = (props: any) => {
  const [value, setValue] = React.useState<string | null>(null);

  const handleInputReset = () => {
    setValue("");
  };

  const handleIconClick = () => {
    // Custom logic for icon click
  };

  const rightSection = value ? (
    <Tooltip label="Reset">
      <ActionIcon onClick={handleInputReset}>
        <IconX />
      </ActionIcon>
    </Tooltip>
  ) : (
    <Tooltip label="Search">
      <ActionIcon onClick={handleIconClick}>
        <IconSearch />
      </ActionIcon>
    </Tooltip>
  );

  return (
    <TextInput
      placeholder="Enter text"
      type="text"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      rightSection={rightSection}
      {...props}
    />
  );
};

export const Default: Story = {
  render: (args) => <CustomTextInput {...args} />,
  args: {
    type: "text",
    disabled: false,
  },
};
