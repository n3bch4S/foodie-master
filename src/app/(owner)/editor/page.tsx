import { getPages } from "@/lib/page";
import { ClientPage } from "./_client";
import { EditorProvider } from "@/providers/editor/editor-provider";
import { getSite } from "@/lib/restaurant";
import { redirect } from "next/navigation";

export default async function Editor() {
  const pages = await getPages();
  const site = await getSite().then((site) => {
    if (!site) redirect("/restaurant");
    return site;
  });

  return (
    <EditorProvider>
      <ClientPage pages={pages} site={site} />
    </EditorProvider>
  );
}
// hey
