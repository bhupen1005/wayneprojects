import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Text from "../components/Text";
import {
  CheckCircleSVGrenderer,
  CustomerLineSVGrenderer,
} from "@/components/SVGRenderer";
import { Flex, rem } from "@/components/Common";

const meta: Meta<typeof Text> = {
  title: "project/Text",
  component: Text,
  argTypes: {
    text: { control: "text" },
    color: { control: "color" },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    weight: {
      control: "select",
      options: ["lighter", "normal", "bold", "bolder"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    text: "This is a text component",
    color: "black",
    size: "md",
    weight: "normal",
  },
  render: (props) => <Text {...props} />,
};

export const LargeText: Story = {
  args: {
    text: "This is a large text component",
    size: "lg",
  },
};

export const BoldText: Story = {
  args: {
    text: "This is a bold text component",
    weight: "bold",
  },
};

export const ColoredText: Story = {
  args: {
    text: "This is a colored text component",
    color: "blue",
  },
};

export const AccordianHeading = {
  args: {
    text: "This is a colored text component",
    color: "blue",
  },
  render: ({ completed = true }) => (
    <Flex
      style={
        completed
          ? {
              borderLeft: "3px solid green",
              padding: rem(20),
              borderRadius: "4px",
            }
          : undefined
      }
    >
      {completed && <CheckCircleSVGrenderer />}
      <Flex ml={rem(20)}>
        <CustomerLineSVGrenderer />
        <Text
          ml={rem(10)}
          fw={500}
          text="Customer Details"
          color="black"
        ></Text>
      </Flex>
    </Flex>
  ),
};
