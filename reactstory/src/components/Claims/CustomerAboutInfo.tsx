import { IconUser } from "@tabler/icons-react";
import { Card, Grid, Group, Stack, Text, ThemeIcon } from "../Common";

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
