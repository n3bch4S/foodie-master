"use client";

import { useParams } from "next/navigation";

export function ClientPage() {
  const params = useParams();
  return <>{params["domain"]}</>;
}
