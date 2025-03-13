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
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type ActionDropdownProps = {
  row: Row<FoodDetail>;
};

export function FoodActionDropdown({ row }: ActionDropdownProps) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>เพิ่มเติม</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>แก้ไข</DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () =>
            await deleteFood(row.original.id)
              .then(() => {
                toast.success(`ลบสำเร็จ`, {
                  description: `"${row.original.name}" ถูกลบแล้ว`,
                });
                router.refresh();
              })
              .catch((message) => {
                if (typeof message === "string")
                  toast.warning(`ลบไม่สำเร็จ`, { description: message });
              })
          }
        >
          ลบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
