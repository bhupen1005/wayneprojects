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

interface AboutSectionProps {
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  toc: string;
  honorific?: string; // "Mr." / "Mrs." / "Dr." etc.
}

export const CustomerAboutInfo = ({
  title,
  firstName,
  lastName,
  email,
  toc,
  honorific = "",
}: AboutSectionProps) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder m={50}>
      {/* Header */}
      <Group spacing="xs" mb="md">
        <ThemeIcon variant="light" color="pink" radius="xl" size="lg">
          <IconUser size={20} />
        </ThemeIcon>
        <Text fw={600} fz="lg">
          {title}
        </Text>
      </Group>

      {/* Information Grid */}
      <Grid>
        <Grid.Col span={6} sm={4}>
          <Stack spacing={4}>
            <Text fw={600}>Title</Text>
            <Text>{honorific}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6} sm={4}>
          <Stack spacing={4}>
            <Text fw={600}>First Name</Text>
            <Text>{firstName}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6} sm={4}>
          <Stack spacing={4}>
            <Text fw={600}>Last Name</Text>
            <Text>{lastName}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6} sm={4}>
          <Stack spacing={4}>
            <Text fw={600}>Email</Text>
            <Text truncate>{email}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6} sm={4}>
          <Stack spacing={4}>
            <Text fw={600}>TOC</Text>
            <Text>{toc}</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
