import { useState } from "react";
import { Button, Group, Stack, Text, ThemeIcon, Box } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

interface DelayBandSelectorProps {
  title?: string;
  delayOptions: { label: string; value: string }[];
  defaultSelected?: string;
  onChange?: (value: string) => void;
}

export default function DelayBandSelector({
  title = "Delay Band",
  delayOptions,
  defaultSelected = delayOptions[0]?.value,
  onChange,
}: DelayBandSelectorProps) {
  const [selected, setSelected] = useState(defaultSelected);

  const handleSelection = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <Stack spacing="sm">
      <Group spacing="xs">
        <ThemeIcon variant="light" color="gray" radius="xl" size="lg">
          <IconClock size={24} />
        </ThemeIcon>
        <Text fw={600} fz="lg">
          {title}
        </Text>
      </Group>

      <Box>
        <Group spacing="xs">
          {delayOptions.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              color="dark"
              onClick={() => handleSelection(option.value)}
              radius="md"
              size="md"
              px="md"
              aria-pressed={selected === option.value}
              sx={{
                ":hover": {
                  backgroundColor: "white",
                },
              }}
              styles={(theme) => ({
                root: {
                  color: "dark",
                  minWidth: "100px",
                  borderRadius: "4px",
                  transition: "background-color 0.2s ease, color 0.2s ease",
                  borderColor:
                    selected === option.value
                      ? theme.colors.pink[6]
                      : theme.colors.gray[5],
                },
              })}
            >
              {option.label}
            </Button>
          ))}
        </Group>
      </Box>
    </Stack>
  );
}
