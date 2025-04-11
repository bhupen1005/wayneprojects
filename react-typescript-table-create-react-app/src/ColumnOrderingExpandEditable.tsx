import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { makeDataWithSubRows } from "./makeDataWithSubRows";
import { Person } from "./makeData";

function EditableCell({
  getValue,
  row: { index },
  column: { id, columnDef }, // Use columnDef to check if the column is editable
  table,
}: any) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [error, setError] = useState<string | null>(null);

  const onBlur = () => {
    if (columnDef.validate) {
      const validationResult = columnDef.validate(value); // access validation function from columnDef
      if (validationResult !== true) {
        setError(validationResult as string); // Set error message
        return; // Do not update the value if validation fails
      }
    }

    setError(null); // Clear any previous errors
    table.options.meta?.updateData(index, id, value);
    setIsEditing(false); // Exit edit mode on blur
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Check if the column is editable
  const isEditable = columnDef.editable !== false;

  return isEditable ? (
    isEditing ? (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        autoFocus // Automatically focus the input when entering edit mode
        style={{
          border: error ? "1px solid red" : "1px solid #ccc", // Red border if error exists
          borderRadius: "4px",
          padding: "4px",
        }}
      />
    ) : (
      <div
        onClick={() => setIsEditing(true)} // Enter edit mode on click
        style={{ cursor: "pointer" }}
      >
        {value as string}
      </div>
    )
  ) : (
    <div>{value as string}</div> // Render as plain text if not editable
  );
}

const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: (props) => (
    <EditableCell
      getValue={props.getValue}
      row={props.row}
      column={props.column}
      table={props.table}
    />
  ),
  //   cell: ({ getValue, row: { index }, column: { id }, table }) => {
  //     const initialValue = getValue();
  //     // We need to keep and update the state of the cell normally
  //     const [value, setValue] = useState(initialValue);

  //     // When the input is blurred, we'll call our table meta's updateData function
  //     const onBlur = () => {
  //       table.options.meta?.updateData(index, id, value);
  //     };

  //     // If the initialValue is changed external, sync it up with our state
  //     useEffect(() => {
  //       setValue(initialValue);
  //     }, [initialValue]);

  //     return (
  //       <input
  //         value={value as string}
  //         onChange={(e) => setValue(e.target.value)}
  //         onBlur={onBlur}
  //       />
  //     );
  //   },
};

export default function ColumnOrderingExpand() {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "expander", // Add an expander column
        header: () => null,
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <button
              onClick={row.getToggleExpandedHandler()}
              style={{ cursor: "pointer" }}
            >
              {row.getIsExpanded() ? "▼" : "▶"}
            </button>
          ) : null,
      },
      {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "firstName",
            footer: (props) => props.column.id,
            editable: true,
          },
          {
            accessorFn: (row) => row.lastName,
            id: "lastName",
            header: () => <span>Last Name</span>,
            footer: (props) => props.column.id,
            editable: true,
          },
        ],
      },
      {
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "age",
            header: () => "Age",
            footer: (props) => props.column.id,
            editable: true, //Disable Editing on few columns
            validate: (value: any) => {
              // validation function for age column
              if (isNaN(value) || value <= 0) {
                return "Age must be a positive number.";
              }
              return true; // Validation passed
            },
          },
          {
            header: "More Info",
            columns: [
              {
                accessorKey: "visits",
                header: () => <span>Visits</span>,
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "status",
                header: "Status",
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "progress",
                header: "Profile Progress",
                footer: (props) => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );
  const [data, setData] = React.useState(() => makeDataWithSubRows());

  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);

  const rerender = () => setData(() => makeDataWithSubRows());

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    state: {
      columnVisibility,
      columnOrder,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(), // Enable expanded row model
    getSubRows: (row) => row.subRows || [], // Provide subrows
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        // skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const randomizeColumns = () => {
    table.setColumnOrder(
      faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id))
    );
  };

  return (
    <div className="p-2">
      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
              {...{
                type: "checkbox",
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{" "}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{" "}
                {column.id}
              </label>
            </div>
          );
        })}
      </div>
      <div className="h-4" />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => rerender()} className="border p-1">
          Regenerate
        </button>
        <button onClick={() => randomizeColumns()} className="border p-1">
          Shuffle Columns
        </button>
      </div>
      <div className="h-4" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
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
            <React.Fragment key={row.id}>
              <tr>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() &&
                row.subRows?.map((subRow) => (
                  <tr key={subRow.id} className="sub-row">
                    {subRow.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre>
    </div>
  );
}
