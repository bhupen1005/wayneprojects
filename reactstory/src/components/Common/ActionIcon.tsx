import React from "react";
import {
  ActionIcon as ActionIconComponent,
  ActionIconProps,
} from "@mantine/core";

interface ActionIconStoryProps extends ActionIconProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const ActionIcon = ({
  children,
  onClick,
  ...props
}: ActionIconStoryProps) => {
  return (
    <ActionIconComponent onClick={onClick} {...props}>
      {children}
    </ActionIconComponent>
  );
};
