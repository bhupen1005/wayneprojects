import type { Meta, StoryObj } from "@storybook/react";
import { CustomerAboutInfo as MantineCustomerAboutInfoComponent } from "../components/Claims/CustomerAboutInfo";
import { Box } from "@/components/Common";

const meta: Meta<typeof MantineCustomerAboutInfoComponent> = {
  title: "project/CustomerAboutInfo",
  component: MantineCustomerAboutInfoComponent,
  argTypes: {
    email: { control: "text" },
    firstName: { control: "text" },
    lastName: { control: "text" },
    honorific: { control: "text" },
    title: { control: "text" },
    toc: {
      control: "date",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MantineCustomerAboutInfoComponent>;

export const CustomerAboutInfo: any = {
  args: {
    email: "customer@",
    firstName: "Customer",
    lastName: "Name",
    toc: "2021-01-01",
    honorific: "Mr.",
    title: "About",
  },
  render: (args: any) => <MantineCustomerAboutInfoComponent {...args} />,
};
