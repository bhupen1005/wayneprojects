import React from "react";
import { Stack as StackComponent, StackProps } from "@mantine/core";

interface StackStoryProps extends StackProps {
  children: React.ReactNode;
}

export const Stack = ({ children, ...props }: StackStoryProps) => {
  return <StackComponent {...props}>{children}</StackComponent>;
};
