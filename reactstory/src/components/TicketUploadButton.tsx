import { useState } from "react";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { Group, Text, Center, Stack, rem } from "@mantine/core";
import { IconUpload, IconX } from "@tabler/icons-react";

interface TicketUploadProps {
  onUpload?: (file: File | null) => void;
  accept?: string[];
  maxSize?: number; // in MB
  label?: string;
  clickableText?: string;
}

export default function TicketUpload({
  onUpload,
  accept = ["image/*"],
  maxSize = 5,
  label = "Upload Ticket Here",
  clickableText = "Click",
}: TicketUploadProps) {
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
    <Stack spacing="sm">
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
}
