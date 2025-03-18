import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AccordianHeading } from "@/components/Claims/AccordianHeading";

const meta: Meta<typeof AccordianHeading> = {
  title: "SVG Icons",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    completed: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof AccordianHeading>;

export const AccordianHeadingIcon: Story = {
  render: (props) => <AccordianHeading {...props} />,
};
