import { CustomerSearchForm } from "@/stories/CustomerSearchForm.stories";
import { Box, Flex, Grid } from "../Common";
import { CustomerAboutInfo } from "@/stories/CustomerAboutInfo.stories";
import { CustomerAddressInfo } from "@/stories/CustomerAddressInfo.stories";

export const CustomerDetailsContainer = () => {
  return (
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
  );
};
