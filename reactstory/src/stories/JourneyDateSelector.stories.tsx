import type { Meta, StoryObj } from "@storybook/react";
import { JourneyDateSelector as JourneyDateSelectorComponent } from "../components/Claims/JourneyDateSelector";

const meta: Meta<typeof JourneyDateSelectorComponent> = {
  title: "project/Journey/JourneyDateSelector",
  component: JourneyDateSelectorComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onDateChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof JourneyDateSelectorComponent>;

export const JourneyDateSelector: any = {
  args: {
    defaultValue: new Date(),
  },
  render: (args: any) => <JourneyDateSelectorComponent {...args} />,
};
