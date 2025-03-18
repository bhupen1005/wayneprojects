import type { Meta, StoryObj } from "@storybook/react";
import TicketUpload from "../components/Testing";

const meta: Meta<typeof TicketUpload> = {
  title: "project/TicketUpload",
  component: TicketUpload,
  parameters: {},
  argTypes: {
    onUpload: { action: "uploaded" },
    accept: { control: "array" },
    maxSize: { control: "number" },
    label: { control: "text" },
    clickableText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TicketUpload>;

export const Default: Story = {
  args: {
    accept: ["image/*"],
    maxSize: 5,
    label: "Upload Ticket Here",
    clickableText: "Click",
  },
};
