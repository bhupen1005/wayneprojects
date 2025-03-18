import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@mantine/core";

const meta: Meta<typeof Badge> = {
  title: "Mantine/Badge",
  component: Badge,
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
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    color: "blue",
    size: "md",
    radius: "sm",
    children: "Primary Badge",
  },
};

export const RedBadge: Story = {
  args: {
    color: "red",
    size: "md",
    radius: "sm",
    children: "Red Badge",
  },
};

export const LargeBadge: Story = {
  args: {
    color: "green",
    size: "lg",
    radius: "sm",
    children: "Large Badge",
  },
};

export const RoundedBadge: Story = {
  args: {
    color: "yellow",
    size: "md",
    radius: "xl",
    children: "Rounded Badge",
  },
};
