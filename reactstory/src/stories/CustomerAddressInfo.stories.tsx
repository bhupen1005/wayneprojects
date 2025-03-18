import type { Meta, StoryObj } from "@storybook/react";
import { CustomerAddressInfo as MantineCustomerAddressInfoComponent } from "../components/Claims/CustomerAddressInfo";
import { Box, Flex, Grid } from "@/components/Common";
import { CustomerAboutInfo } from "./CustomerAboutInfo.stories";

const meta: Meta<typeof MantineCustomerAddressInfoComponent> = {
  title: "project/CustomerAddressInfo",
  component: MantineCustomerAddressInfoComponent,
  argTypes: {
    Country: { control: "text" },
    Line1: { control: "text" },
    Line2: { control: "text" },
    Postcode: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof MantineCustomerAddressInfoComponent>;

export const CustomerAddressInfo: any = {
  args: {
    Country: "United States",
    Line1: "1234 Main St",
    Line2: "Apt 1234",
    Postcode: "12345",
  },
  render: (args: any) => <MantineCustomerAddressInfoComponent {...args} />,
};
