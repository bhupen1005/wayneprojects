import { Accordion } from "@/components/Common";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Accordion> = {
  title: "Mantine Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultValue: {
      control: "select",
      options: ["customization", "flexibility", "focus-ring"],
    },
    multiple: { control: "boolean" },
    transitionDuration: { control: "number" },
    w: {
      name: "Width",
      control: "select",
      defaultValue: 300,
      options: ["initial", 300, 600, 900],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  args: {
    defaultValue: "customization",
    multiple: false,
    transitionDuration: 200,
    w: 300,
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="customization">
        <Accordion.Control>Customization</Accordion.Control>
        <Accordion.Panel>
          Colors, fonts, shadows and many other parts are customizable to fit
          your design needs
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="flexibility">
        <Accordion.Control>Flexibility</Accordion.Control>
        <Accordion.Panel>
          Configure components appearance and behavior with vast amount of
          settings or overwrite any part of component styles
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="focus-ring">
        <Accordion.Control>No annoying focus ring</Accordion.Control>
        <Accordion.Panel>
          With new :focus-visible pseudo-class focus ring appears only when user
          navigates with keyboard
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    transitionDuration: 200,
    w: 300,
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="customization">
        <Accordion.Control>Customization</Accordion.Control>
        <Accordion.Panel>
          Colors, fonts, shadows and many other parts are customizable to fit
          your design needs
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="flexibility">
        <Accordion.Control>Flexibility</Accordion.Control>
        <Accordion.Panel>
          Configure components appearance and behavior with vast amount of
          settings or overwrite any part of component styles
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="focus-ring">
        <Accordion.Control>No annoying focus ring</Accordion.Control>
        <Accordion.Panel>
          With new :focus-visible pseudo-class focus ring appears only when user
          navigates with keyboard
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};

export const NoIconRotation: Story = {
  args: {
    defaultValue: "customization",
    multiple: false,
    transitionDuration: 200,
    w: 300,
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="customization">
        <Accordion.Control>Customization</Accordion.Control>
        <Accordion.Panel>
          Colors, fonts, shadows and many other parts are customizable to fit
          your design needs
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="flexibility">
        <Accordion.Control>Flexibility</Accordion.Control>
        <Accordion.Panel>
          Configure components appearance and behavior with vast amount of
          settings or overwrite any part of component styles
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="focus-ring">
        <Accordion.Control>No annoying focus ring</Accordion.Control>
        <Accordion.Panel>
          With new :focus-visible pseudo-class focus ring appears only when user
          navigates with keyboard
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};
