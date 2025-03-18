import type { Meta, StoryObj } from "@storybook/react";

import {
  Autocomplete as MantineAutocompleteComponent,
  rem,
} from "../components/Common";

const meta: Meta<typeof MantineAutocompleteComponent> = {
  title: "project/Autocomplete",
  component: MantineAutocompleteComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placeholder: { control: "text" },
    data: { control: "array" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof MantineAutocompleteComponent>;
export const Autocomplete: Story = {
  args: {
    placeholder: "Search",
    data: ["React", "Angular", "Vue", "Svelte", "Ember", "Backbone"],
  },
  render: (args) => <MantineAutocompleteComponent {...args} />,
};
export const CustomAutocomplete: Story = {
  args: {
    placeholder: "Search",
    data: ["React", "Angular", "Vue", "Svelte", "Ember", "Backbone"],
    onChange: (value: string) => console.log(value),
    value: "",
  },
  render: (args) => (
    <MantineAutocompleteComponent
      {...args}
      styles={{
        label: {
          position: "relative",
          top: "-10px",
          left: "2px",
        },
        dropdown: {
          display: "block",
        },
        input: {
          height: rem(48),
        },
      }}
    />
  ),
};
