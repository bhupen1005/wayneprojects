import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip, Button } from "@mantine/core";

const meta: Meta<typeof Tooltip> = {
  title: "project/Mantine Tooltip",
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  render: () => (
    <Tooltip label="Go to login..">
      <Button color="dark">Dark Button</Button>
    </Tooltip>
  ),
};
