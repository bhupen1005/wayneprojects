import type { Meta, StoryObj } from "@storybook/react";

import { IconDatabase, IconSearch } from "@tabler/icons-react";
import { Button as MantineButtonComponent } from "../components/Common";

const meta: Meta<typeof MantineButtonComponent> = {
  title: "project/Buttons",
  component: MantineButtonComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "cyan", "dark", "light", "pink", "red"],
    },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    onClick: { action: "clicked" },
    px: { control: "number" },
    py: { control: "number" },
    radius: { control: "number" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MantineButtonComponent>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    color: "primary",
  },
  render: (args) => <MantineButtonComponent {...args} />,
};
export const CustomButton: Story = {
  args: {
    children: "Primary Button",
    color: "red",
  },
  render: (args) => (
    <MantineButtonComponent
      {...args}
      style={{
        backgroundColor: "#eee",
        color: "#333",
        padding: "10px 20px",
        //style will override the default styles
      }}
    />
  ),
};

export const DBIconButton: Story = {
  args: {
    leftIcon: <IconDatabase />,
    children: "Icon Button",
  },
  render: (args) => (
    <MantineButtonComponent {...args}>{args.children}</MantineButtonComponent>
  ),
};
export const SearchIconButton: Story = {
  args: {
    leftIcon: <IconSearch />,
    children: "Search",
  },
  render: (args) => (
    <MantineButtonComponent {...args}>{args.children}</MantineButtonComponent>
  ),
};

export const SearchButtonStyleOverride: Story = {
  args: {
    leftIcon: <IconSearch size="20px" color="#828282" />,
    children: "Search",
  },
  render: (args) => (
    <MantineButtonComponent
      style={{
        backgroundColor: "#E0E0E0",
        color: "#828282",
        padding: "10px 20px",
        fontSize: "16px",
      }}
      {...args}
    >
      Search
    </MantineButtonComponent>
  ),
};
