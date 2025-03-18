import React from "react";
import { Box as BoxComponent } from "@mantine/core";
import { BoxProps } from "@mantine/core";

interface MantineBoxComponentProps extends BoxProps {
  children?: React.ReactNode;
  onClick?: () => void;
  // Add other event handlers as needed
}

export const Box = ({ children, onClick, ...props }: MantineBoxComponentProps) => {
  return <BoxComponent onClick={onClick} {...props}>{children}</BoxComponent>;
};
