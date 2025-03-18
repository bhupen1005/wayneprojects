import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, ActionIcon } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import { IconX, IconCalendar } from "@tabler/icons-react";

const meta: Meta<typeof DatePickerInput> = {
  title: "Project/CustomDatePickerInput",
  component: DatePickerInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    disabled: { control: "boolean" },
    valueFormat: { control: "text" },
    maxDate: { control: "date" },
    minDate: { control: "date" },
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerInput>;

const CustomDatePickerInput = (props: any) => {
  const selectRef = useRef<HTMLInputElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleInputReset = () => {
    setSelectedDate(null);
  };

  const handleIconClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  return (
    <DatePickerInput
      ref={selectRef}
      rightSection={
        selectedDate ? (
          <Tooltip label="Reset">
            <ActionIcon onClick={handleInputReset}>
              <IconX />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label="Select Date">
            <ActionIcon onClick={handleIconClick}>
              <IconCalendar />
            </ActionIcon>
          </Tooltip>
        )
      }
      placeholder="Select"
      value={selectedDate}
      onChange={setSelectedDate}
      clearable
      valueFormat="DD/MM/YYYY"
      maxDate={new Date()}
      minDate={new Date("01/01/2020")}
      sx={{
        ".mantine-Day-day": {
          color: "black !important",
          "&:disabled": {
            opacity: 0.5,
          },
        },
      }}
      {...props}
    />
  );
};

export const Default: Story = {
  render: (args) => <CustomDatePickerInput {...args} />,
  args: {
    disabled: false,
    valueFormat: "DD/MM/YYYY",
    maxDate: new Date(),
    minDate: new Date("01/01/2020"),
  },
};
