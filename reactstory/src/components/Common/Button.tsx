import React from "react";
import { Button as MantineButton } from "@mantine/core";
import { ButtonProps } from "@mantine/core";

interface MantineButtonComponentProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  // Add other event handlers as needed
}

export const Button = ({
  children,
  onClick,
  ...props
}: MantineButtonComponentProps) => {
  return (
    <MantineButton onClick={onClick} {...props}>
      {children}
    </MantineButton>
  );
};
