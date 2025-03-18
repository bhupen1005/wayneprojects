import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DateSelector from "../components/Testing";

const meta: Meta<typeof DateSelector> = {
  title: "project/DateSelector",
  component: DateSelector,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onDateChange: { action: "dateChanged" },
  },
};

export default meta;
type Story = StoryObj<typeof DateSelector>;

export const Default: Story = {};
