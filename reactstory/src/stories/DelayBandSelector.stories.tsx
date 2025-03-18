import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DelayBandSelector from "../components/DelayBandSelector";

const meta: Meta<typeof DelayBandSelector> = {
  title: "project/DelayBandSelector",
  component: DelayBandSelector,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof DelayBandSelector>;

export const Default: Story = {
  args: {
    title: "Select Delay Band",
    defaultSelected: "15-29",
    delayOptions: [
      { label: "1 – 14 Min", value: "1-14" },
      { label: "15 – 29 Min", value: "15-29" },
      { label: "30 – 59 Min", value: "30-59" },
      { label: "60 – 119 Min", value: "60-119" },
      { label: "120+ Min", value: "120+" },
    ],
  },
};
