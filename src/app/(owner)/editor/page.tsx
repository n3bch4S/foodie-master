import { getPages } from "@/lib/page";
import { ClientPage } from "./_client";
import { EditorProvider } from "@/providers/editor/editor-provider";

export default async function Editor() {
  const pages = await getPages();

  return (
    <EditorProvider>
      <ClientPage pages={pages} />
    </EditorProvider>
  );
}
// hey
