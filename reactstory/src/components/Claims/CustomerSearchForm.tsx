import { rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Autocomplete, Button, Flex } from "../Common";

// Interface for props
interface CustomerSearchProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch: (query: string) => void;
  onReset: () => void;
  data: string[]; // Add data prop
  loading?: boolean;
}

export const CustomerSearchForm = ({
  placeholder = "Enter email",
  defaultValue = "",
  onSearch,
  onReset,
  data, // Add data prop
  loading,
}: CustomerSearchProps) => {
  const [query, setQuery] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement | undefined>(null);

  return (
    <Flex align="center" gap={10} maw={700} m={50}>
      <Autocomplete
        disabled={loading}
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
        loading={loading}
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
