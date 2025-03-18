import type { Meta, StoryObj } from "@storybook/react";

import TooltipWithIcon from "../components/Common/TooltipWithIcon";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const meta: Meta<typeof TooltipWithIcon> = {
  title: "project/TooltipWithIcon",
  component: TooltipWithIcon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TooltipWithIcon>;

export const Default: Story = {
  args: {
    label: "Delete",
    children: <IconTrash size="40px" />,
  },
  render: (props) => <TooltipWithIcon {...props} />,
};
export const WithClick: Story = {
  args: {
    label: "Delete",
    children: <IconTrash size="20px" />,
    onClick: () => alert("Clicked"),
  },
  render: (props) => <TooltipWithIcon {...props} />,
};
export const WithCustomIcon: Story = {
  args: {
    label: "Delete",
    children: <IconEdit size="20px" />,
  },
  render: (props) => <TooltipWithIcon {...props} />,
};
export const WithCustomIconAndClick: Story = {
  args: {
    label: "Delete",
    children: <IconTrash size="20px" />,
    onClick: () => alert("Clicked"),
  },
  render: (props) => <TooltipWithIcon {...props} />,
};
