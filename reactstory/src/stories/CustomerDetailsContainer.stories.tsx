import type { Meta, StoryObj } from "@storybook/react";
import { CustomerDetailsContainer as MantineCustomerDetailsContainerComponent } from "../components/Claims/CustomerDetailsContainer";
import { CustomerSearchForm } from "./CustomerSearchForm.stories";
import { Box, Flex, Grid } from "@/components/Common";
import { CustomerAboutInfo } from "./CustomerAboutInfo.stories";
import { CustomerAddressInfo } from "./CustomerAddressInfo.stories";

const meta: Meta<typeof MantineCustomerDetailsContainerComponent> = {
  title: "project/CustomerDetailsContainer",
  component: MantineCustomerDetailsContainerComponent,
  argTypes: {
    customer: { control: "object" },
    loading: { control: "boolean", options: [true, false] },
  },
};

export default meta;
type Story = StoryObj<typeof MantineCustomerDetailsContainerComponent>;

export const CustomerDetailsContainer: any = {
  render: () => (
    <>
      <Grid>
        <Grid.Col span={12}>
          <CustomerSearchForm.render {...CustomerSearchForm.args} />
        </Grid.Col>
      </Grid>

      <Grid gutter="sm">
        <Grid.Col xs={12} md={6}>
          <CustomerAboutInfo.render {...CustomerAboutInfo.args} />
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <CustomerAddressInfo.render {...CustomerAddressInfo.args} />
        </Grid.Col>
      </Grid>
    </>
  ),
};
