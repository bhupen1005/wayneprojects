import React from "react";
import { Card as CardComponent, CardProps } from "@mantine/core";

interface CardStoryProps extends CardProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card = ({ children, onClick, ...props }: CardStoryProps) => {
  return (
    <CardComponent onClick={onClick} {...props}>
      {children}
    </CardComponent>
  );
};
