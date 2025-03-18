import React from "react";
import { Tooltip } from "@mantine/core";

import { TooltipProps } from "@mantine/core";

interface TooltipWithIconProps extends TooltipProps {
  children: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
}

export const TooltipWithIcon = ({
  children,
  ...props
}: TooltipWithIconProps) => {
  return <Tooltip {...props}>{children}</Tooltip>;
};

export default TooltipWithIcon;
