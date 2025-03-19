export default async function SaleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div>My Sale: {slug}</div>;
}

// we use [slug] to create a dynamic route
// the slug will be passed as a prop to the component
// the slug here is a string
