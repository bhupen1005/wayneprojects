import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type ChildTableProps = {
  data: any[];
  columns: ColumnDef<any>[];
};

const ChildTable: React.FC<ChildTableProps> = ({ data, columns }) => {
  console.log("ChildTable data", data);
  console.log("ChildTable columns", columns);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("ChildTable table", table);
  console.log("ChildTable table.getRowModel()", table.getRowModel());
  console.log("ChildTable table.getHeaderGroups()", table.getHeaderGroups());

  table.getRowModel().rows.forEach((row) => {
    console.log("ChildTable row", row);
    row.getVisibleCells().forEach((cell) => {
      console.log("ChildTable cell", cell);
    });
  });

  return (
    <table className="child-table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} colSpan={4}>
                {row.getIsExpanded() &&
                  row.depth === 1 &&
                  flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ChildTable;
