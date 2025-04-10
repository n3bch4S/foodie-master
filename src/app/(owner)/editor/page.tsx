import { getPages } from "@/lib/page";
import { ClientPage } from "./client";

export default async function Editor() {
  const pages = await getPages();

  return <ClientPage pages={pages} />;
}
