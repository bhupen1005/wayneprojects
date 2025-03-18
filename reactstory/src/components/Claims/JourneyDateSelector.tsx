import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Card, Group, Stack, Text } from "../Common";

const generatePastDates = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push({
      day: date.getDate().toString().padStart(2, "0"),
      label:
        i === 0
          ? "Today"
          : i === 1
            ? "Yesterday"
            : date.toLocaleDateString("en-US", { weekday: "long" }),
    });
  }
  return dates;
};

interface DateSelectorProps {
  onDateChange?: (selectedDate: string) => void;
}

export const JourneyDateSelector = ({ onDateChange }: DateSelectorProps) => {
  const [value, setValue] = useState<Date | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>(
    generatePastDates()[0].day,
  );

  const travelDateRef = useRef<HTMLButtonElement>(null);

  const pastDates = generatePastDates();

  const handleDateSelection = (day: string) => {
    setSelectedDate(day);
    if (onDateChange) onDateChange(day);
  };

  return (
    <Group spacing="xs" m={50}>
      {/* Date Selection Cards */}
      {pastDates.map((date) => (
        <Card
          key={date.day}
          onClick={() => handleDateSelection(date.day)}
          radius="md"
          shadow="sm"
          withBorder
          sx={(theme) => ({
            width: "90px",
            height: "124px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor:
              selectedDate === date.day ? theme.colors.dark[7] : "white",
            color: selectedDate === date.day ? "white" : theme.colors.dark[7],
            transition: "background-color 0.2s ease",
          })}
        >
          <Stack spacing={4} align="center">
            <Text fw={700} fz="lg">
              {date.day}
            </Text>
            <Text fz="sm">{date.label}</Text>
          </Stack>
        </Card>
      ))}

      {/* Date Picker Card */}

      <DatePickerInput
        ref={travelDateRef}
        icon={
          <IconCalendar
            size="2rem"
            style={{
              border: "none",
            }}
          />
        }
        label="Select a Date"
        styles={{
          label: {
            width: "60px",
            textAlign: "center",
            left: 20,
            top: 70,
            fontSize: "16px",
            position: "relative",
            zIndex: 9999,
            cursor: "pointer",
            visibility: "hidden",
          },
          root: {
            width: "100px",
            height: "124px",
            backgroundColor: "white",
            // border: "1px solid red",
          },
          icon: {
            margin: "auto",
            top: -30,
            position: "relative",
            visibility: "hidden",
          },
          input: {
            border: "1px solid #F2F2F2",
            width: "100px",
            height: "124px",
            backgroundColor: "white",
            position: "relative",
            top: -80,
            zIndex: 0,
            visibility: "visible",
            // "&:focus": {
            //   background: "red",
            // },
            // "&:active": {
            //   background: "red",
            // },
          },
        }}
        // value={value}
        onChange={setValue}
        onClick={() => travelDateRef.current?.focus()}
      />
    </Group>
  );
};
