"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { PageForm } from "@/components/form/page-form";
import {
  useEditor,
  useEditorDispatch,
} from "@/providers/editor/editor-provider";

export function PageDialog() {
  const editor = useEditor();
  const dispatch = useEditorDispatch();

  return (
    <>
      <Dialog
        open={editor.isOpenPageDialog}
        onOpenChange={() => {
          dispatch({
            type: "setIsOpenPageSelector",
            setIsOpenPageSelector: { isOpen: false },
          });
          dispatch({
            type: "setIsOpenDialog",
            setIsOpenDialog: { isOpen: !editor.isOpenPageDialog },
          });
        }}
      >
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            เพิ่มหน้าใหม่
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ข้อมูลหน้า</DialogTitle>
            <DialogDescription>โปรดกรอกข้อมูลสำหรับหน้านี้</DialogDescription>
          </DialogHeader>
          <PageForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
