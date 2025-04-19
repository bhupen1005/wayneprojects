import React from "react";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { makeData, Person } from "./makeData";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

type ColumnFiltersFacetedReusableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  initialFilters?: ColumnFiltersState;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
};

export default function ColumnFiltersFacetedReusable<TData>({
  data,
  columns,
  initialFilters = [],
  pageSizeOptions = [10, 20, 30, 40, 50],
  defaultPageSize = 10,
}: ColumnFiltersFacetedReusableProps<TData>) {
  const rerender = React.useReducer(() => ({}), {})[1];
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialFilters);

  const [count, setCount] = React.useState(0);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
  });

  if (count > 0) {
    return (
      <div className="p-2">
        <h1>Table is loading...</h1>
      </div>
    );
  }
  return (
    <div className="p-2">
      <table>
        <TableHeader table={table} />
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
      </table>
      <div className="h-2" />
      <Pagination table={table} pageSizeOptions={pageSizeOptions} />
      <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
    </div>
  );
}

function TableHeader({ table }: { table: any }) {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder ? null : (
                <>
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} />
                    </div>
                  ) : null}
                </>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

function Pagination({
  table,
  pageSizeOptions,
}: {
  table: any;
  pageSizeOptions: number[];
}) {
  return (
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
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
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
        {pageSizeOptions.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const { filterVariant } = column.columnDef.meta ?? {};

  const columnFilterValue = column.getFilterValue();

  // NOTE:  Generate unique values for select filter/autocomplete
  const sortedUniqueValues = React.useMemo(
    () =>
      filterVariant === "range"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant]
  );

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        {
          // NOTE: UI Component for range filter
        }
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] !== undefined
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      {sortedUniqueValues.map((value: any) => (
        //dynamically generated select options from faceted values feature
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  ) : (
    <>
      {/* Autocomplete suggestions from faceted values feature */}
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export const ColumnFiltersFacetedReusableWrapper = () => {
  const columns = React.useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        meta: {
          filterVariant: "range",
        },
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        meta: {
          filterVariant: "range",
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        meta: {
          filterVariant: "range",
        },
      },
    ],
    []
  );

  const [data, setData] = React.useState<Person[]>(() => makeData(50));

  return (
    <ColumnFiltersFacetedReusable
      data={data}
      columns={columns}
      defaultPageSize={20}
      pageSizeOptions={[10, 20, 50]}
    />
  );
};
