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
} from "@/providers/editor/editor-context";
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
        value={editor.currentPage}
        onValueChange={(value) => {
          dispatch({ type: "changePage", page: value });
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Page" />
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
