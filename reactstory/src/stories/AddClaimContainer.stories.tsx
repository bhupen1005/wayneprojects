import type { Meta, StoryObj } from "@storybook/react";

import { AddClaimContainer as MantineAddClaimContainerComponent } from "../components/Claims/AddClaimContainer";

const meta: Meta<typeof MantineAddClaimContainerComponent> = {
  title: "project/AddClaimContainer",
  component: MantineAddClaimContainerComponent,
  argTypes: {
    placeholder: { control: "text" },
    data: { control: "array" },
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof MantineAddClaimContainerComponent>;

export const AddClaimContainer: Story = {
  args: {
    placeholder: "Search",
    data: ["React", "Angular", "Vue", "Svelte", "Ember", "Backbone"],
  },
  render: () => <MantineAddClaimContainerComponent />,
};
