"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React from "react";
import { FoodDetail } from "@/lib/food";
import { getUtUrl } from "./utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { FoodActionDropdown } from "./food-action-dropdown";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
        <AspectRatio>
          <Image
            src={getUtUrl(row.original.imageKey)}
            alt={"รูป: " + row.original.name}
            fill
            sizes="10vw"
            className="rounded-md object-cover"
            priority
          />
        </AspectRatio>
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
    header: ({ table }) => <FoodActionDropdown table={table} />,
    cell: ({ row }) => <FoodActionDropdown row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
