import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";

const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      style={{ width: "100%" }}
    />
  );
};

const createInitialData = () => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: i,
    col1: `Row ${i + 1} Col 1`,
    col2: `Row ${i + 1} Col 2`,
    col3: "",
    col4: "",
    col5: "",
    col6: "",
    col7: "",
    col8: "",
    col9: "",
    col10: "",
    children: Array.from({ length: 3 }, (_, j) => ({
      childCol1: `Child ${j + 1} Col 1`,
      childCol2: "",
      childCol3: "",
      childCol4: "",
      childCol5: "",
    })),
  }));
};

const ExpandableEditableTable = () => {
  const [data, setData] = useState(createInitialData());
  const [expanded, setExpanded] = useState({});

  const updateParentData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const updateChildData = (parentIndex, rowIndex, columnId, value) => {
    setData((old) => {
      const newData = [...old];
      const parent = newData[parentIndex];
      const childRow = parent?.children?.[rowIndex];

      if (childRow) {
        childRow[columnId] = value;
      }

      return newData;
    });
  };

  const parentColumns = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) =>
        row.getCanExpand() ? (
          <button onClick={row.getToggleExpandedHandler()}>
            {row.getIsExpanded() ? "▼" : "▶"}
          </button>
        ) : null,
    },
    ...Array.from({ length: 10 }, (_, i) => ({
      accessorKey: `col${i + 1}`,
      header: `Column ${i + 1}`,
      cell: EditableCell,
    })),
  ];

  const childColumns = Array.from({ length: 5 }, (_, i) => ({
    accessorKey: `childCol${i + 1}`,
    header: `Child Column ${i + 1}`,
    cell: EditableCell,
  }));

  const table = useReactTable({
    data,
    columns: parentColumns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    meta: {
      updateData: updateParentData,
    },
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
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
            <React.Fragment key={row.id}>
              <tr>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={parentColumns.length}>
                    {/* {renderSubComponent(row.index)} */}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpandableEditableTable;
