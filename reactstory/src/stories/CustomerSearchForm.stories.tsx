import type { Meta, StoryObj } from "@storybook/react";
import { CustomerSearchForm as MantineCustomerSearchFormComponent } from "../components/Claims/CustomerSearchForm";

const meta: Meta<typeof MantineCustomerSearchFormComponent> = {
  title: "project/CustomerSearchForm",
  component: MantineCustomerSearchFormComponent,
  argTypes: {
    placeholder: { control: "text" },
    data: { control: "array" },
    loading: { control: "boolean", options: [true, false] },
    onSearch: { action: "searched" },
    onReset: { action: "reset" },
    defaultValue: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof MantineCustomerSearchFormComponent>;

export const CustomerSearchForm: any = {
  args: {
    placeholder: "Search",
    data: ["React", "Angular", "Vue", "Svelte", "Ember", "Backbone"],
  },
  render: (args: any) => <MantineCustomerSearchFormComponent {...args} />,
};
