import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@mantine/core";

const meta: Meta<typeof Slider> = {
  title: "Mantine/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: { control: "select", options: ["blue", "red", "green", "yellow"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    radius: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    value: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Primary: Story = {
  args: {
    color: "blue",
    size: "md",
    radius: "sm",
  },
};

export const RedSlider: Story = {
  args: {
    color: "red",
    size: "md",
    radius: "sm",
    value: 75,
  },
};

export const LargeSlider: Story = {
  args: {
    color: "green",
    size: "lg",
    radius: "sm",
    value: 90,
  },
};

export const RoundedSlider: Story = {
  args: {
    color: "yellow",
    size: "md",
    radius: "xl",
    value: 30,
  },
};
