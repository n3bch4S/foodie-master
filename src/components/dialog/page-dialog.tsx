"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { PageForm } from "@/components/form/page-form";

export function PageDialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
