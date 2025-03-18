import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@mantine/core";

const meta: Meta<typeof Avatar> = {
  title: "Mantine/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    radius: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {
    size: "md",
    radius: "sm",
    src: "https://avatars.githubusercontent.com/u/1?v=4",
    alt: "Avatar",
  },
};

export const LargeAvatar: Story = {
  args: {
    size: "lg",
    radius: "sm",
    src: "https://avatars.githubusercontent.com/u/1?v=4",
    alt: "Large Avatar",
  },
};

export const RoundedAvatar: Story = {
  args: {
    size: "md",
    radius: "xl",
    src: "https://avatars.githubusercontent.com/u/1?v=4",
    alt: "Rounded Avatar",
  },
};
