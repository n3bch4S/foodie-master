"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteFood, FoodDetail } from "@/lib/food";
import { Row, Table } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FoodDialogContent } from "./food-dialog";

interface ActionDropdownProps<TData> {
  table?: Table<TData>;
  row?: Row<TData>;
}

export function FoodActionDropdown({
  table,
  row,
}: ActionDropdownProps<FoodDetail>) {
  if (!table && !row)
    throw new Error(`Either "table" or "row" must be defined`);
  if (table && row)
    throw new Error(`"table" and "row" can not defined at same time`);
  const router = useRouter();

  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);

  const handleDeleteFoods = useCallback(async () => {
    if (!table) return;
    const tryDeleteFoods = table.getSelectedRowModel().rows.map((row) =>
      deleteFood(row.original.id).catch((error) => {
        toast.error(`ลบอาหารล้มเหลว`, {
          description: error.message,
        });
        return null;
      })
    );
    Promise.all(tryDeleteFoods).then((statusList) => {
      table.resetRowSelection();
      const deletedCount = statusList.filter(
        (status) => status !== null
      ).length;
      toast.success(`ลบอาหารสำเร็จ`, {
        description: `ลบแล้ว ${deletedCount} รายการ`,
      });
      router.refresh();
    });
  }, [router, table]);

  const handleDeleteFood = useCallback(async () => {
    if (!row) return;
    await deleteFood(row.original.id)
      .then(() => {
        toast.success(`ลบสำเร็จ`, {
          description: `"${row.original.name}" ถูกลบแล้ว`,
        });
        router.refresh();
      })
      .catch((error) => {
        toast.error(`ลบอาหารล้มเหลว`, { description: error.message });
      });
  }, [router, row]);

  return (
    <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={row ? "ghost" : "outline"}
            disabled={
              table &&
              !table.getIsSomeRowsSelected() &&
              !table.getIsAllPageRowsSelected()
            }
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">เลือกการดำเนินการ</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>ดำเนินการ</DropdownMenuLabel>
          {row && (
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.id)}
            >
              คัดลอก ID
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {row && (
            <DialogTrigger asChild>
              <DropdownMenuItem>แก้ไข</DropdownMenuItem>
            </DialogTrigger>
          )}
          <DropdownMenuItem
            onClick={table ? handleDeleteFoods : handleDeleteFood}
            className="text-red-400 data-[highlighted]:bg-red-100 data-[highlighted]:text-red-400"
          >
            ลบ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FoodDialogContent
        setIsOpen={setIsUpdateOpen}
        row={row}
        dialogTitle="แก้ไขอาหาร"
        dialogDescription="โปรดใส่รายละเอียดอาหารของคุณ"
      />
    </Dialog>
  );
}
