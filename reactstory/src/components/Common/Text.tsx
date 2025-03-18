import React from "react";
import { Text as TextComponent, TextProps } from "@mantine/core";

interface TextStoryProps extends TextProps {
  children: React.ReactNode;
}

export const Text = ({ children, ...props }: TextStoryProps) => {
  return <TextComponent {...props}>{children}</TextComponent>;
};
