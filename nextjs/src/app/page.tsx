// we need to define the type of component using "use client" or "use server".
"use client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // redirect to the dashboard/welcome page from the root page
    router.push("/dashboard/welcome");
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <Button />
    </div>
  );
}
