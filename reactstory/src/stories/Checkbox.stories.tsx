import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@mantine/core";

const meta: Meta<typeof Checkbox> = {
  title: "Mantine/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: { control: "select", options: ["blue", "red", "green", "yellow"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    radius: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    color: "blue",
    size: "md",
    radius: "sm",
    label: "Primary Checkbox",
  },
};

export const RedCheckbox: Story = {
  args: {
    color: "red",
    size: "md",
    radius: "sm",
    label: "Red Checkbox",
  },
};

export const LargeCheckbox: Story = {
  args: {
    color: "green",
    size: "lg",
    radius: "sm",
    label: "Large Checkbox",
  },
};

export const RoundedCheckbox: Story = {
  args: {
    color: "yellow",
    size: "md",
    radius: "xl",
    label: "Rounded Checkbox",
  },
};
