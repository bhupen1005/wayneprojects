import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Group } from "@mantine/core";

const meta: Meta<typeof Modal> = {
  title: "Mantine/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    radius: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  args: {
    size: "md",
    radius: "md",
  },
  render: (args) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Modal {...args} opened={opened} onClose={close} title="Authentication">
          <Text>Large Modal Content</Text>
        </Modal>

        <Group position="center">
          <Button onClick={open}>Open modal</Button>
        </Group>
      </>
    );
  },
};

export const LargeModal: Story = {
  render: (args) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Button onClick={open}>Open Large modal</Button>
        <Modal {...args} opened={opened} onClose={close} title="Authentication">
          <Text>Large Modal Content</Text>
        </Modal>
      </>
    );
  },
  args: {
    size: "lg",
  },
};

export const RoundedModal: Story = {
  render: (args) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
      <>
        <Button onClick={open}>Open Rounded modal</Button>
        <Modal {...args} opened={opened} onClose={close} title="Authentication">
          <Text>Large Modal Content</Text>
        </Modal>
      </>
    );
  },
  args: {
    radius: "xl",
  },
};
