"use client";

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
import React from "react";

async function removeFood(id: string, table: Table<FoodDetail>): Promise<void> {
  await deleteFood(id).then(() => 0);
}

type ActionDropdownProps = {
  row: Row<FoodDetail>;
};

export function FoodActionDropdown({ row }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>เพิ่มเติม</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>แก้ไข</DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => await deleteFood(row.original.id)}
        >
          ลบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
