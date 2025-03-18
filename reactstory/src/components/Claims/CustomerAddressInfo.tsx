import { useRef, useState } from "react";
import {
  Group,
  Card,
  Text,
  Stack,
  Box,
  Grid,
  ThemeIcon,
  Center,
  Divider,
  Button,
  TextInput,
  Anchor,
  Flex,
  Image,
  Table,
  NativeSelect,
  FileInput,
  ActionIcon,
  Autocomplete,
} from "../Common";
import {
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconCreditCard,
  IconDownload,
  IconPhoto,
  IconSearch,
  IconTicket,
  IconTrash,
  IconUpload,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { DatePickerInput } from "@mantine/dates";
import { rem } from "@mantine/core";

interface AddressSectionProps {
  Line1: string;
  Line2: string;
  Country: string;
  Postcode: string;
}

export const CustomerAddressInfo = ({
  Line1,
  Line2,
  Country,
  Postcode,
}: AddressSectionProps) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder m={50}>
      {/* Header */}
      <Group spacing="xs" mb="md">
        <ThemeIcon variant="light" color="pink" radius="xl" size="lg">
          <IconUser size={20} />
        </ThemeIcon>
        <Text fw={600} fz="lg">
          Address
        </Text>
      </Group>

      {/* Information Grid */}
      <Grid>
        <Grid.Col span={6}>
          <Stack spacing={4}>
            <Text fw={600}>Line1</Text>
            <Text>{Line1}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack spacing={4}>
            <Text fw={600}>Line2</Text>
            <Text>{Line2}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack spacing={4}>
            <Text fw={600}>Country</Text>
            <Text>{Country}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack spacing={4}>
            <Text fw={600}>Postcode</Text>
            <Text>{Postcode}</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
