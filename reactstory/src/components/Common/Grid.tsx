import React from "react";
import { Grid as GridComponent, GridProps, ColProps } from "@mantine/core";

interface GridStoryProps extends GridProps {
  children: React.ReactNode;
}

interface ColStoryProps extends ColProps {
  children?: React.ReactNode;
}

const Col = ({ children, ...props }: ColStoryProps) => {
  return <GridComponent.Col {...props}>{children}</GridComponent.Col>;
};

export const Grid = ({ children, ...props }: GridStoryProps) => {
  return <GridComponent {...props}>{children}</GridComponent>;
};

Grid.Col = Col;
