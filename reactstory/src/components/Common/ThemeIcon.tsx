import React from "react";
import { ThemeIcon as ThemeIconComponent, ThemeIconProps } from "@mantine/core";

interface ThemeIconStoryProps extends ThemeIconProps {
  children: React.ReactNode;
}

export const ThemeIcon = ({ children, ...props }: ThemeIconStoryProps) => {
  return <ThemeIconComponent {...props}>{children}</ThemeIconComponent>;
};
