"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PageDialog } from "@/components/dialog/page-dialog";
import {
  useEditor,
  useEditorDispatch,
} from "@/providers/editor/editor-provider";
import { PageDetail } from "@/lib/page/types";

interface PageSelectorProps {
  pages: PageDetail[];
}

export function PageSelector({ pages }: PageSelectorProps) {
  const editor = useEditor();
  const dispatch = useEditorDispatch();

  return (
    <>
      <Select
        value={editor.currentPage ?? undefined}
        open={editor.isOpenPageSelector}
        onOpenChange={() => {
          dispatch({
            type: "setIsOpenPageSelector",
            setIsOpenPageSelector: { isOpen: !editor.isOpenPageSelector },
          });
        }}
        onValueChange={(value) => {
          const page = pages.find((page) => page.name === value);
          if (!page) throw new Error("Page not found");
          dispatch({ type: "changePage", changePage: { page: value } });
          dispatch({ type: "setDom", setDom: { dom: page.dom } });
          dispatch({ type: "setPageId", setPageId: { pageId: page.id } });
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="เลือกหน้าเพจ" />
        </SelectTrigger>
        <SelectContent>
          {pages.map((page) => {
            return (
              <SelectItem key={page.id} value={page.name}>
                {page.name}
              </SelectItem>
            );
          })}
          <Separator className="my-2" />
          <PageDialog />
        </SelectContent>
      </Select>
    </>
  );
}
