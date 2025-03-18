import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@mantine/core";

const meta: Meta<typeof Switch> = {
  title: "Mantine/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: { control: "select", options: ["blue", "red", "green", "yellow"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    radius: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  args: {
    color: "blue",
    size: "md",
    radius: "sm",
    label: "Primary Switch",
  },
};

export const RedSwitch: Story = {
  args: {
    color: "red",
    size: "md",
    radius: "sm",
    label: "Red Switch",
  },
};

export const LargeSwitch: Story = {
  args: {
    color: "green",
    size: "lg",
    radius: "sm",
    label: "Large Switch",
  },
};

export const RoundedSwitch: Story = {
  args: {
    color: "yellow",
    size: "md",
    radius: "xl",
    label: "Rounded Switch",
  },
};
