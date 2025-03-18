import React from "react";
import { Table as TableComponent, TableProps } from "@mantine/core";

interface TableStoryProps extends TableProps {
  children: React.ReactNode;
}

export const Table = ({ children, ...props }: TableStoryProps) => {
  return <TableComponent {...props}>{children}</TableComponent>;
};
