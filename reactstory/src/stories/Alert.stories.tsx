import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "@mantine/core";

const meta: Meta<typeof Alert> = {
  title: "Mantine/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: { control: "select", options: ["blue", "red", "green", "yellow"] },
    radius: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    withCloseButton: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
  args: {
    color: "blue",
    radius: "sm",
    withCloseButton: true,
    children: "This is a primary alert",
  },
};

export const RedAlert: Story = {
  args: {
    color: "red",
    radius: "sm",
    withCloseButton: true,
    children: "This is a red alert",
  },
};

export const GreenAlert: Story = {
  args: {
    color: "green",
    radius: "sm",
    withCloseButton: true,
    children: "This is a green alert",
  },
};

export const RoundedAlert: Story = {
  args: {
    color: "yellow",
    radius: "xl",
    withCloseButton: true,
    children: "This is a rounded alert",
  },
};
