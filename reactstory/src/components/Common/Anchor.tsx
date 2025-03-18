import React from "react";
import { Anchor as AnchorComponent, AnchorProps } from "@mantine/core";

interface AnchorStoryProps extends AnchorProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Anchor = ({ children, onClick, ...props }: AnchorStoryProps) => {
  return (
    <AnchorComponent onClick={onClick} {...props}>
      {children}
    </AnchorComponent>
  );
};
