"use client";

import { EditorCanvas } from "@/components/editor-canvas";
import { EditorSidebar } from "@/components/editor-sidebar";
import { PageSelector } from "@/components/selector/page-selector";
import { Button } from "@/components/ui/button";
import { PageDetail } from "@/lib/page/types";
import { useEditorDispatch } from "@/providers/editor/editor-provider";
import { useRouter } from "next/navigation";

interface ClientPageProps {
  pages: PageDetail[];
}
export function ClientPage(props: ClientPageProps) {
  const dispatch = useEditorDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   const page = props.pages.find((page) => page.name === editor.currentPage);
  //   if (!page) return;
  //   dispatch({ type: "setPageId", setPageId: { pageId: page.id } });
  //   dispatch({ type: "setDom", setDom: { dom: page.dom } });
  // }, []);

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b">
        <PageSelector pages={props.pages} />

        <div className="flex gap-2">
          <Button>Preview</Button>
          <Button
            onClick={() => {
              dispatch({ type: "saveDom" });
              dispatch({ type: "setDom", setDom: {} });
              router.refresh();
              alert("saved");
            }}
          >
            Save
          </Button>
        </div>
      </header>
      <div className="w-full h-full flex flex-row">
        <EditorSidebar />
        <EditorCanvas />
      </div>
    </>
  );
}
