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
} from "./Common";
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
import { rem, Tooltip } from "@mantine/core";
import { CalendarSVGRenderer } from "./SVGRenderer";

// ***********************************************************

interface TicketUploadProps {
  onUpload?: (file: File | null) => void;
  accept?: string[];
  maxSize?: number; // in MB
  label?: string;
  clickableText?: string;
}

const TicketUpload = ({
  onUpload,
  accept = ["image/*"],
  maxSize = 5,
  label = "Upload Ticket Here",
  clickableText = "Click",
}: TicketUploadProps) => {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (files: FileWithPath[]) => {
    const uploadedFile = files[0];
    setFile(uploadedFile);
    setError(null);
    if (onUpload) onUpload(uploadedFile);
  };

  const handleReject = () => {
    setFile(null);
    setError(`File must be an image and less than ${maxSize}MB.`);
    if (onUpload) onUpload(null);
  };

  return (
    <Stack spacing="sm" m={50}>
      <Dropzone
        onDrop={handleDrop}
        onReject={handleReject}
        accept={accept}
        maxSize={maxSize * 1024 ** 2} // Convert MB to bytes
        styles={{
          root: {
            border: "1px dashed #E91E63", // Pink Dashed Border
            backgroundColor: "#F8F9FC", // Light Gray Background
            padding: rem(24),
            textAlign: "center",
            cursor: "pointer",
            width: "100%",
          },
        }}
      >
        <Center>
          <Group spacing="xs">
            <IconUpload size={24} color="#1A1A1A" />
            <Text fw={500} fz="md">
              {label} or{" "}
              <Text
                span
                fw={600}
                color="pink"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {clickableText}
              </Text>
            </Text>
          </Group>
        </Center>
      </Dropzone>

      {/* Error Message Display */}
      {error && (
        <Group spacing="xs">
          <IconX size={16} color="red" />
          <Text color="red" fz="sm">
            {error}
          </Text>
        </Group>
      )}

      {/* Display Selected File Name */}
      {file && (
        <Text color="green" fz="sm">
          Selected File: {file.name}
        </Text>
      )}
    </Stack>
  );
};

export default TicketUpload;

// ***********************************************************
// Function to generate past 6 days dynamically
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

const DateSelector = ({ onDateChange }: DateSelectorProps) => {
  const [value, setValue] = useState<Date | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>(
    generatePastDates()[0].day
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

interface AboutSectionProps {
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  toc: string;
  honorific?: string; // "Mr." / "Mrs." / "Dr." etc.
}

const AboutSection = ({
  title = "About",
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
        <Grid.Col span={4}>
          <Stack spacing={4}>
            <Text fw={600}>Title</Text>
            <Text>{honorific}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack spacing={4}>
            <Text fw={600}>First Name</Text>
            <Text>{firstName}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack spacing={4}>
            <Text fw={600}>Last Name</Text>
            <Text>{lastName}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack spacing={4}>
            <Text fw={600}>Email</Text>
            <Text>{email}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack spacing={4}>
            <Text fw={600}>TOC</Text>
            <Text>{toc}</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

// ***********************************************************
interface AddressSectionProps {
  Line1: string;
  Line2: string;
  Country: string;
  Postcode: string;
}

const AddressSection = ({
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

// ***********************************************************

interface TicketCardProps {
  ticketNumber: string;
  origin: string;
  destination: string;
  ticketType: string;
  startDate: string;
  routeOperator: string;
  price: string;
}

const TicketCard = ({
  ticketNumber,
  origin,
  destination,
  ticketType,
  startDate,
  routeOperator,
  price,
}: TicketCardProps) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder m={50}>
      {/* Header */}
      <Group position="apart" mb="md">
        <Group spacing="xs">
          <ThemeIcon variant="light" color="pink" radius="xl" size="lg">
            <IconTicket size={18} />
          </ThemeIcon>
          <Text fw={600} fz="lg">
            Ticket Number
          </Text>
        </Group>
        <Text fw={700}>{ticketNumber}</Text>
      </Group>

      {/* Ticket Details */}
      <Grid>
        <Grid.Col span={6}>
          <Stack spacing={4}>
            <Text fw={600}>Origin</Text>
            <Text>{origin}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack spacing={4}>
            <Text fw={600}>Destination</Text>
            <Text>{destination}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack spacing={4}>
            <Text fw={600}>Ticket Type</Text>
            <Text>{ticketType}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack spacing={4}>
            <Text fw={600}>Start Date</Text>
            <Text>{startDate}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={12}>
          <Stack spacing={4}>
            <Text fw={600}>Route/Operator</Text>
            <Text>{routeOperator}</Text>
          </Stack>
        </Grid.Col>
      </Grid>

      <Divider my="md" />

      {/* Footer: Price + Select Button */}
      <Group position="apart">
        <Text fz="xl" fw={700} color="pink">
          {price}
        </Text>
        <Button variant="outline" radius="md">
          Select
        </Button>
      </Group>
    </Card>
  );
};

// ***********************************************************

interface JourneyCardProps {
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  transport: string;
  onView: () => void;
  onAmend: () => void;
}

const JourneyCard = ({
  origin,
  destination,
  departureTime,
  arrivalTime,
  transport,
  onView,
  onAmend,
}: JourneyCardProps) => (
  <Card shadow="sm" p={0} m={100} radius="md" withBorder>
    {/* Journey Header */}
    <Box p="lg">
      <Grid align="center">
        <Grid.Col span={5}>
          <Text fw={700} fz="lg">
            {origin}
          </Text>
        </Grid.Col>
        <Grid.Col span={2} style={{ textAlign: "center" }}>
          <Text fz="sm" color="gray">
            {transport}
          </Text>
        </Grid.Col>
        <Grid.Col span={5} style={{ textAlign: "right" }}>
          <Text fw={700} fz="lg">
            {destination}
          </Text>
        </Grid.Col>
      </Grid>
      <Grid align="center" mt="xs">
        <Grid.Col span={12}>
          <Flex align="center" justify="center">
            <Box
              sx={{
                borderRadius: "50%",
                width: "12px",
                height: "12px",
                backgroundColor: "gray",
              }}
            ></Box>
            <Box
              sx={{
                width: "100%",
                height: "1px",
                backgroundColor: "gray",
              }}
            ></Box>
            <Box
              sx={{
                borderRadius: "50%",
                width: "12px",
                height: "12px",
                backgroundColor: "gray",
              }}
            ></Box>
          </Flex>
        </Grid.Col>
      </Grid>

      {/* Journey Timeline */}
      <Grid align="center" mt="xs">
        <Grid.Col span={6}>
          <Group spacing="xs">
            <Text fz="sm">{departureTime}</Text>
          </Group>
        </Grid.Col>

        <Grid.Col span={6} style={{ textAlign: "right" }}>
          <Text fz="sm">{arrivalTime}</Text>
        </Grid.Col>
      </Grid>
    </Box>

    <Divider my="md" />

    {/* Actions */}
    <Grid p={10}>
      <Grid.Col span={6}>
        <Anchor
          onClick={onView}
          color="pink"
          fw={600}
          fz="sm"
          style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          View <IconChevronDown size={14} style={{ marginLeft: 4 }} />
        </Anchor>
        <Text fz="sm" color="gray" mt="xs">
          Direct Journey
        </Text>
      </Grid.Col>
      <Grid.Col span={6} style={{ textAlign: "right" }}>
        <Anchor
          onClick={onAmend}
          color="pink"
          fw={600}
          fz="sm"
          style={{ cursor: "pointer" }}
        >
          Amend
        </Anchor>
      </Grid.Col>
    </Grid>
  </Card>
);

// ***********************************************************

interface JourneyCardAccProps {
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  transport: string;
  trainNumber: string;
  duration: string;
  onView: () => void;
  onAmend: () => void;
  onSelect: () => void;
}

const JourneyCardAccordian = ({
  origin,
  destination,
  departureTime,
  arrivalTime,
  transport,
  trainNumber,
  duration,
  onView,
  onAmend,
  onSelect,
}: JourneyCardAccProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      shadow="sm"
      m={100}
      p={0}
      radius="md"
      withBorder
      style={{
        transition: "height 1s ease",
      }}
    >
      {/* Journey Header */}
      <Box p="lg">
        <Grid align="center">
          <Grid.Col span={5}>
            <Text fw={700} fz="md">
              {origin}
            </Text>
          </Grid.Col>
          <Grid.Col mt={30} span={2} style={{ textAlign: "center" }}>
            <Text fz="sm" color="gray">
              {transport}
            </Text>
          </Grid.Col>
          <Grid.Col span={5} style={{ textAlign: "right" }}>
            <Text fw={700} fz="md">
              {destination}
            </Text>
          </Grid.Col>
          <Grid.Col span={12} mt="xs">
            {/* <Divider size="xs" color="gray" /> */}
            <Flex align="center" justify="center">
              <Box
                sx={{
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "gray",
                }}
              ></Box>
              <Box
                sx={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "gray",
                }}
              ></Box>
              <Box
                sx={{
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "gray",
                }}
              ></Box>
            </Flex>
          </Grid.Col>
        </Grid>

        {/* Timeline */}
        <Grid align="center" mt="xs">
          <Grid.Col span={6}>
            <Text fz="sm">{departureTime}</Text>
          </Grid.Col>
          <Grid.Col span={6} style={{ textAlign: "right" }}>
            <Text fz="sm">{arrivalTime}</Text>
          </Grid.Col>
        </Grid>
      </Box>

      <Divider my="md" />

      {/* Actions */}
      <Grid p={10}>
        <Grid.Col span={6}>
          <Flex align="center" justify="start">
            <Anchor
              onClick={() => setExpanded(!expanded)}
              color="pink"
              fw={600}
              fz="sm"
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {expanded ? "Hide" : "View"}
              {expanded ? (
                <IconChevronUp size={14} style={{ marginLeft: 4 }} />
              ) : (
                <IconChevronDown size={14} style={{ marginLeft: 4 }} />
              )}
            </Anchor>
            <Text fz="sm" color="gray" ml={4}>
              Direct Journey
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={6} style={{ textAlign: "right" }}>
          <Anchor
            onClick={onAmend}
            color="pink"
            fw={600}
            fz="sm"
            style={{ cursor: "pointer" }}
          >
            Amend
          </Anchor>
        </Grid.Col>
      </Grid>

      {/* Expanded Details */}
      {expanded && (
        <Box px="lg" pb="lg">
          {/* <Divider size="xs" color="gray" /> */}
          <Grid align="center" mt="md">
            <Grid.Col span={1}>
              {/* <Text color="blue" fw={600}>
                {trainNumber}
              </Text> */}
              {/* <Image
                maw={50}
                src="https://i.ibb.co/7rW1zQ1/Train-Icon.png"
                alt="Train-Icon"
              /> */}
            </Grid.Col>
            <Grid.Col span={11}>
              <Grid>
                <Grid.Col span={6}>
                  <Text fw={700}>{origin}</Text>
                </Grid.Col>

                <Grid.Col span={6} style={{ textAlign: "right" }}>
                  <Text fw={700}>{destination}</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Divider style={{ borderStyle: "dashed" }} />
                  <Text fz="sm" fw={600} ta="center">
                    {duration}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="sm">{departureTime}</Text>
                </Grid.Col>
                <Grid.Col span={6} style={{ textAlign: "right" }}>
                  <Text fz="sm">{arrivalTime}</Text>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>

          {/* Select Journey Button */}
          <Grid>
            <Grid.Col span={1}>
              <ThemeIcon variant="transparent">
                <IconCheck size={20} color="pink" />
              </ThemeIcon>
            </Grid.Col>
            <Grid.Col span={11}>
              <Box mt="md" ta="center">
                <Button
                  variant="subtle"
                  color="pink"
                  fw={600}
                  onClick={onSelect}
                >
                  Select Journey
                </Button>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      )}
    </Card>
  );
};

// ***********************************************************

// Interface for journey data
interface Journey {
  origin: string;
  departureTime: string;
  destination: string;
  arrivalTime: string;
  operator: string;
}

// Props interface
interface JourneyTableProps {
  journeys: Journey[];
}

const JourneyTable = ({ journeys }: JourneyTableProps) => (
  <Table highlightOnHover m={50} maw={1280}>
    <thead>
      <tr>
        <th>Origin</th>
        <th>Departing At</th>
        <th>Destination</th>
        <th>Arriving At</th>
        <th>Route Or Operator</th>
      </tr>
    </thead>
    <tbody>
      {journeys.map((journey, index) => (
        <tr key={index}>
          <td>{journey.origin}</td>
          <td>
            <Text fw={700}>{journey.departureTime}</Text>
          </td>
          <td>{journey.destination}</td>
          <td>
            <Text fw={700}>{journey.arrivalTime}</Text>
          </td>
          <td>
            <Text fw={700}>{journey.operator}</Text>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

// ***********************************************************

// Interface for props
interface TicketFormProps {
  ticketType: string;
  price: string;
  endDate: Date;
  origin: string;
  destination: string;
  route: string;
  onChange: (field: string, value: string | Date) => void;
}

const TicketForm = ({
  ticketType,
  price,
  endDate,
  origin,
  destination,
  route,
  onChange,
}: TicketFormProps) => (
  <Grid gutter="md" m={50}>
    {/* First Row */}
    <Grid.Col span={4}>
      <NativeSelect
        label="Ticket Type"
        value={ticketType}
        onChange={(e) => onChange("ticketType", e.target.value)}
        data={["Return (00M01D)", "Single", "Weekly", "Monthly"]}
      />
    </Grid.Col>

    <Grid.Col span={4}>
      <TextInput
        label="Price"
        onChange={(e) => onChange("price", e.target.value)}
        value={price}
      />
    </Grid.Col>

    <Grid.Col span={4}>
      <DatePickerInput
        label="End Date"
        value={endDate}
        onChange={(date) => onChange("endDate", date || new Date())}
        rightSection={<IconCalendar size={18} />}
      />
    </Grid.Col>

    {/* Second Row */}
    <Grid.Col span={4}>
      <NativeSelect
        label="Origin"
        value={origin}
        onChange={(e) => onChange("origin", e.target.value)}
        data={["Southend Cen/Vic", "London Euston", "Manchester Piccadilly"]}
      />
    </Grid.Col>

    <Grid.Col span={4}>
      <NativeSelect
        label="Destination"
        value={destination}
        onChange={(e) => onChange("destination", e.target.value)}
        data={["Manchester Stns", "Birmingham New St", "Liverpool Lime St"]}
      />
    </Grid.Col>

    <Grid.Col span={4}>
      <NativeSelect
        label="Route"
        value={route}
        onChange={(e) => onChange("route", e.target.value)}
        data={["VIA LONDON", "VIA BIRMINGHAM", "VIA LEEDS"]}
      />
    </Grid.Col>
  </Grid>
);

// ***********************************************************

// Interface for props
interface FileUploadProps {
  onFileUpload: (file: File | null) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    onFileUpload(selectedFile);
  };

  return (
    <Stack spacing="xs" m={100}>
      <Text fw={600}>Ticket Image</Text>
      <FileInput
        label="Upload File"
        accept="image/*"
        value={file}
        onChange={handleFileChange}
      />

      {file && (
        <Group
          p="sm"
          sx={{
            border: "1px solid #E0E0E0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* File Icon and Name */}
          <Group>
            <IconPhoto size={24} color="gray" />
            <Stack spacing={0}>
              <Text fw={600}>{file.name}</Text>
              <Text fz="sm" color="gray">
                {(file.size / 1024).toFixed(1)} KB
              </Text>
            </Stack>
          </Group>

          {/* Download and Delete Actions */}
          <Group>
            <ActionIcon
              color="blue"
              variant="subtle"
              onClick={() => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(file);
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <IconDownload size={20} />
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="subtle"
              onClick={() => setFile(null)}
            >
              <IconTrash size={20} />
            </ActionIcon>
          </Group>
        </Group>
      )}
    </Stack>
  );
};

// ***********************************************************

// Interface for props
interface CustomerSearchProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch: (query: string) => void;
  onReset: () => void;
  data: string[]; // Add data prop
}

const CustomerSearch = ({
  placeholder = "Enter email",
  defaultValue = "",
  onSearch,
  onReset,
  data, // Add data prop
}: CustomerSearchProps) => {
  const [query, setQuery] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement | undefined>(null);

  return (
    <Flex align="center" gap={10} maw={700} m={50}>
      <Autocomplete
        styles={{
          label: {
            position: "relative",
            top: "-10px",
            left: "2px",
          },
          dropdown: {
            display: "block",
          },
          input: {
            height: rem(48),
          },
        }}
        initiallyOpened={true}
        value={query}
        placeholder={placeholder}
        onChange={(value) => setQuery(value)}
        data={data} // Use data prop
        reference={inputRef as any}
        onLoad={() => <div>Loading...</div>}
      />

      <Button
        leftIcon={<IconSearch size={16} />}
        disabled={!query}
        onClick={() => {
          onSearch(query);
          if (inputRef.current) inputRef.current.focus();
        }}
        styles={{
          root: {
            backgroundColor: "#05326E",
            color: "white",
            height: rem(48),
            width: rem(129),
            borderRadius: "4px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#05326E",
            },
          },
        }}
        variant="filled"
      >
        Search
      </Button>

      <Button
        variant="outline"
        color="blue"
        onClick={() => {
          setQuery("");
          onReset();
        }}
        styles={{
          root: {
            width: rem(85),
            height: rem(48),
            borderRadius: "4px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#F0F0F0",
            },
          },
        }}
      >
        Reset
      </Button>
    </Flex>
  );
};

// ***********************************************************

export {
  AboutSection,
  AddressSection,
  DateSelector,
  TicketUpload,
  TicketCard,
  JourneyCard,
  JourneyCardAccordian,
  JourneyTable,
  TicketForm,
  FileUpload,
  CustomerSearch,
};
