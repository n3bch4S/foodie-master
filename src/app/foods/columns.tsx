"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { FoodDetail } from "@/lib/food";
import { MoreHorizontal } from "lucide-react";
import { getUtUrl } from "./utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";

export const foodColumns: ColumnDef<FoodDetail>[] = [
  {
    id: "เลือก",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "รูป",
    accessorFn: ({ imageKey }) => imageKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="รูป" />
    ),
    cell: ({ row }) =>
      row.original.imageKey ? (
        <Image
          src={getUtUrl(row.original.imageKey)}
          alt="food image"
          width={100}
          height={100}
          className="size-32"
        />
      ) : (
        "ไม่มีรูปภาพ"
      ),
    enableSorting: false,
  },
  {
    id: "ชื่อ",
    accessorFn: ({ name }) => name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ชื่อ" />
    ),
    cell: ({ row }) => row.original.name,
  },
  {
    id: "ประเภท",
    accessorFn: ({ category }) => category,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ประเภท" />
    ),
    cell: ({ row }) => row.original.category,
  },
  {
    id: "ราคา",
    accessorFn: ({ price }) => price,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ราคา" />
    ),
    cell: ({ row }) => row.original.price,
  },
  {
    id: "ดำเนินการ",
    cell: ({ row }) => {
      const foodDetail = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">เลือกการดำเนินการ</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>ดำเนินการ</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(foodDetail.id)}
            >
              คัดลอก ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>แก้ไข</DropdownMenuItem>
            <DropdownMenuItem>ลบ</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
