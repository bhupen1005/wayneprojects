import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowData,
} from "@tanstack/react-table";
import { Details } from "./makeDataWithSubRows";

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

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<any>> = {
  cell: (props) => {
    console.log("zzprops", props);
    return (
      <EditableCell
        getValue={props.getValue}
        row={props.row}
        column={props.column}
        table={props.table}
      />
    );
  },
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
type ChildBodyProps = {
  data: any[];
  columns: ColumnDef<any>[];
  setData: any;
};

const ChildBody: React.FC<ChildBodyProps> = ({ data, columns, setData }) => {
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row) => {
            if (row.subRows) {
              return {
                ...row,
                subRows: row.subRows.map((subRow, subIndex) => {
                  if (subIndex === rowIndex) {
                    return {
                      ...subRow,
                      [columnId]: value,
                    };
                  }
                  return subRow;
                }),
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default ChildBody;
