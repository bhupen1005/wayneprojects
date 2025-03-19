import Link from "next/link";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard/welcome">Welcome</Link>
          </li>
          <li>
            <Link href="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link href="/dashboard/sales">Sales</Link>
          </li>
          <li>
            <Link href="/dashboard/purchases">Purchases</Link>
          </li>
        </ul>
      </nav>
      {children}
    </section>
  );
}

// we have layout.tsx in which we can define the layout of the page
// All the pages in the dashboard will have the same layout

// we are not having a page.tsx in this folder because we don't want to create additional page for dashboard.
