import type { Meta, StoryObj } from "@storybook/react";
import MantineLoaderComponent from "../components/Loader";

const meta: Meta<typeof MantineLoaderComponent> = {
  title: "project/Mantine Loader",
  component: MantineLoaderComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: "number", name: "size", defaultValue: 40 },
    color: { control: "color", name: "color", defaultValue: "#000000" },
  },
};

export default meta;

type Story = StoryObj<typeof MantineLoaderComponent>;

export const Default: Story = {
  args: {
    size: 40,
    color: "#000000",
  },
  render: (props) => <MantineLoaderComponent {...props} />,
};
