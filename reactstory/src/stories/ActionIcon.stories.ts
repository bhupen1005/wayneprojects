import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react"; // Import an icon
import { Meta } from "@storybook/react";

export default {
  title: "Mantine/Button/ActionIcon",
  component: ActionIcon,
  argTypes: {
    color: { control: "color" }, // Allows color selection
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"], // Mantine sizes
    },
    variant: {
      control: "select",
      options: ["filled", "outline", "light", "subtle", "transparent"],
    },
  },
} as Meta;

export const ActionButton = {
  args: {
    children: React.createElement(IconHeart),
    color: "blue",
    size: "md",
    variant: "filled",
  },
}
export const DeleteButton = {
  args: {
    children: React.createElement(IconHeart),
    color: "blue",
    size: "md",
    variant: "filled",
  },
}