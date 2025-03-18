import type { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "../components/Common";

const meta: Meta<typeof TextInput> = {
  title: "project/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    required: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Default Input",
  },
  render: (props) => <TextInput {...props} />,
};
export const Required: Story = {
  args: {
    label: "Required Input",
    required: true,
  },
  render: (props) => <TextInput {...props} />,
};
export const Placeholder: Story = {
  args: {
    label: "Placeholder Input",
    placeholder: "Placeholder",
  },
  render: (props) => <TextInput {...props} />,
};
export const RequiredPlaceholder: Story = {
  args: {
    label: "Required Placeholder Input",
    placeholder: "Placeholder",
    required: true,
  },
  render: (props) => <TextInput {...props} />,
};
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    disabled: true,
  },
  render: (props) => <TextInput {...props} />,
};
export const Error: Story = {
  args: {
    label: "Error Input",
    error: "There is an error",
  },
  render: (props) => <TextInput {...props} />,
};
export const ErrorPlaceholder: Story = {
  args: {
    label: "Error Placeholder Input",
    placeholder: "Placeholder",
    error: "There is an error",
  },
  render: (props) => <TextInput {...props} />,
};
export const ErrorDisabled: Story = {
  args: {
    label: "Error Disabled Input",
    disabled: true,
    error: "There is an error",
  },
  render: (props) => <TextInput {...props} />,
};
export const ErrorRequired: Story = {
  args: {
    label: "Error Required Input",
    required: true,
    error: "There is an error",
  },
  render: (props) => <TextInput {...props} />,
};
export const ErrorRequiredDisabled: Story = {
  args: {
    label: "Error Required Disabled Input",
    required: true,
    disabled: true,
    error: "There is an error",
  },
  render: (props) => <TextInput {...props} />,
};
export const ErrorRequiredPlaceholder: Story = {
  args: {
    label: "Error Required Placeholder Input",
    placeholder: "Placeholder",
    required: true,
    error: "There is an error",
  },
  render: (props) => <TextInput {...props} />,
};
