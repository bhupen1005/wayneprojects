import React, { useEffect, useState } from "react";

//
import {
  Column,
  Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import { makeData, Person } from "./makeData";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

function EditableCell({
  getValue,
  row: { index },
  column: { id, columnDef }, // Use columnDef to check if the column is editable
  table,
}: any) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [error, setError] = useState < string | null > (null);

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

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: (props) => (
    <EditableCell
      getValue={props.getValue}
      row={props.row}
      column={props.column}
      table={props.table}
    />
  ),
};

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export default function EditableData() {
  const rerender = React.useReducer(() => ({}), {})[1];

  const columns = React.useMemo < ColumnDef < Person > [] > (
    () => [
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

  // Maintain two states: originalData and editedData
  const [originalData, setOriginalData] = React.useState(() => makeData(1000));
  const [editedData, setEditedData] = React.useState(originalData);
  const refreshData = () => {
    const newData = makeData(1000);
    setOriginalData(newData);
    setEditedData(newData);
  };
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data: editedData,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setEditedData((old) =>
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
  });

  const handleSave = () => {
    setOriginalData(editedData); // Save changes by copying editedData to originalData
    alert("Changes saved!");
  };

  const handleCancel = () => {
    setEditedData(originalData); // Revert changes by resetting editedData to originalData
    alert("Changes reverted!");
  };

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSave}
          className="border rounded p-2 bg-green-500 text-white"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="border rounded p-2 bg-red-500 text-white"
        >
          Cancel
        </button>
      </div>
      <div>{JSON.stringify(editedData.slice(0, 1), null, 2)}</div>
      <div>{JSON.stringify(originalData.slice(0, 1), null, 2)}</div>
    </div>
  );
}
function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}
