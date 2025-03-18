import React from "react";
import { Flex as FlexComponent } from "@mantine/core";
import { FlexProps } from "@mantine/core";

interface FlexProp extends FlexProps {
  children?: React.ReactNode;
  onClick?: () => void;
  // Add other event handlers as needed
}

export const Flex = ({ children, onClick, ...props }: FlexProp) => {
  return (
    <FlexComponent onClick={onClick} {...props}>
      {children}
    </FlexComponent>
  );
};
