import type { Meta, StoryObj } from "@storybook/react";
import Image from "../components/Image";

const meta: Meta<typeof Image> = {
  title: "project/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    maw: { control: "number", name: "max-width", defaultValue: 200 },
    radius: { control: "number", name: "border-radius", defaultValue: 0 },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
    alt: "Placeholder image",
  },
  render: (props) => <Image {...props} />,
};
