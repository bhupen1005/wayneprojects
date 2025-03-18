import React from "react";
import { Center as CenterComponent, CenterProps } from "@mantine/core";

interface CenterStoryProps extends CenterProps {
  children: React.ReactNode;
}

export const Center = ({ children, ...props }: CenterStoryProps) => {
  return <CenterComponent {...props}>{children}</CenterComponent>;
};
