import type { Meta, StoryObj } from "@storybook/react";
import { Card, Text, Button } from "@mantine/core";

const meta: Meta<typeof Card> = {
  title: "Mantine/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    shadow: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    radius: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    shadow: "sm",
    radius: "md",
    children: (
      <>
        <Text>Card Content</Text>
        <Button mt="md">Action</Button>
      </>
    ),
  },
};

export const ShadowCard: Story = {
  args: {
    shadow: "xl",
    radius: "md",
    children: (
      <>
        <Text>Card with shadow</Text>
        <Button mt="md">Action</Button>
      </>
    ),
  },
};

export const RoundedCard: Story = {
  args: {
    shadow: "sm",
    radius: "xl",
    children: (
      <>
        <Text>Rounded Card</Text>
        <Button mt="md">Action</Button>
      </>
    ),
  },
};
