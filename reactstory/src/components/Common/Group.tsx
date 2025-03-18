import React from "react";
import { Group as GroupComponent, GroupProps } from "@mantine/core";

interface GroupStoryProps extends GroupProps {
  children: React.ReactNode;
}

export const Group = ({ children, ...props }: GroupStoryProps) => {
  return <GroupComponent {...props}>{children}</GroupComponent>;
};
