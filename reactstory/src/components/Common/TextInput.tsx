import React from "react";
import { TextInput as TextInputComponent, TextInputProps } from "@mantine/core";

interface TextInputStoryProps extends TextInputProps {
  label?: React.ReactNode;
}

export const TextInput = ({ ...props }: TextInputStoryProps) => {
  return <TextInputComponent {...props} />;
};
