import Link from "next/link";

const SalesPage = () => {
  return (
    <div>
      <h1>List of items Sold.</h1>
      <ul>
        <li>
          <Link href="sales/1">View Sales 1</Link>
        </li>
        <li>
          <Link href="sales/2">View Sales 2</Link>
        </li>
        <li>
          <Link href="sales/3">View Sales 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default SalesPage;

// we are using Link from next/link to navigate without refreshing the page