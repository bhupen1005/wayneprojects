import React from "react";
import { Text } from "@mantine/core";

import { TextProps } from "@mantine/core";

interface MantineTextComponentProps extends TextProps {
  text: string;
}

export const MantineTextComponent = ({
  text,
  ...props
}: MantineTextComponentProps) => {
  return <Text {...props}>{text}</Text>;
};

export default MantineTextComponent;
