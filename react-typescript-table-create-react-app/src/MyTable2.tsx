import React, { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

interface TableData {
  name: string;
  age: number;
  country: string;
  email: string;
  isActive: boolean;
  joinDate: string;
  salary: number;
  department: string;
  rating: number;
  phone: string;
  address: string;
  notes: string;
}

const data: TableData[] = [
  {
    name: "John Doe",
    age: 28,
    country: "USA",
    email: "john.doe@example.com",
    isActive: true,
    joinDate: "2020-01-15",
    salary: 50000,
    department: "Engineering",
    rating: 4.5,
    phone: "123-456-7890",
    address: "123 Main St, Springfield",
    notes: "Excellent performer",
  },
  {
    name: "Jane Smith",
    age: 32,
    country: "Canada",
    email: "jane.smith@example.com",
    isActive: false,
    joinDate: "2018-07-22",
    salary: 60000,
    department: "Marketing",
    rating: 4.0,
    phone: "987-654-3210",
    address: "456 Elm St, Toronto",
    notes: "On leave",
  },
  {
    name: "Carlos Garcia",
    age: 25,
    country: "Mexico",
    email: "carlos.garcia@example.com",
    isActive: true,
    joinDate: "2021-03-10",
    salary: 45000,
    department: "Sales",
    rating: 4.8,
    phone: "555-123-4567",
    address: "789 Oak St, Mexico City",
    notes: "Top salesperson",
  },
];

// const columnHelper = createColumnHelper<TableData>();

// const defaultColumns = [
//   // display column
//   columnHelper.display({
//     id: "actions",
//     cell: (props) => <RowActions row={props.row} />,
//   }),
//   // Grouping Column
//   columnHelper.group({
//     header: "Name",
//     footer: (props) => props.column.id,
//     columns: [
//       columnHelper.accessor("firstName", {
//         cell: (info) => info.getValue(),
//         footer: (props) => props.column.id,
//       }),
//       columnHelper.accessor("lastName", {
//         cell: (info) => info.getValue(),
//         header: () => <span>Last Name</span>,
//         footer: (props) => props.column.id,
//       }),
//     ],
//   }),
// ];

const columns: ColumnDef<TableData>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age", sortingFn: "basic" },
  { accessorKey: "country", header: "Country" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
  { accessorKey: "joinDate", header: "Join Date", sortingFn: "datetime" },
  { accessorKey: "salary", header: "Salary", sortingFn: "basic" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "rating", header: "Rating", sortingFn: "basic" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "notes", header: "Notes" },
];

const MyTable2 = () => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    // onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? " 🔼"
                    : header.column.getIsSorted() === "desc"
                    ? " 🔽"
                    : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ padding: "8px", border: "1px solid #ddd" }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTable2;
