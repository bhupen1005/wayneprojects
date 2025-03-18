import type { Meta, StoryObj } from "@storybook/react";
import { Notification } from "@mantine/core";

const meta: Meta<typeof Notification> = {
  title: "Mantine/Notification",
  component: Notification,
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
type Story = StoryObj<typeof Notification>;

export const Primary: Story = {
  args: {
    color: "blue",
    radius: "sm",
    withCloseButton: true,
    title: "Primary Notification",
    children: "This is a primary notification",
  },
};

export const RedNotification: Story = {
  args: {
    color: "red",
    radius: "sm",
    withCloseButton: true,
    title: "Red Notification",
    children: "This is a red notification",
  },
};

export const GreenNotification: Story = {
  args: {
    color: "green",
    radius: "sm",
    withCloseButton: true,
    title: "Green Notification",
    children: "This is a green notification",
  },
};

export const RoundedNotification: Story = {
  args: {
    color: "yellow",
    radius: "xl",
    withCloseButton: true,
    title: "Rounded Notification",
    children: "This is a rounded notification",
  },
};
