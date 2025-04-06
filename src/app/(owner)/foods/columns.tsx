"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { FoodActionDropdown } from "./food-action-dropdown";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FoodActiveSwitch } from "./food-active-switch";
import { FoodDetail } from "@/lib/food/types";

export const foodColumns: ColumnDef<FoodDetail>[] = [
  {
    id: "select",
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
    id: "image",
    accessorFn: ({ imageKey }) => imageKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="รูป" />
    ),
    cell: ({ row }) => (
      <div className="size-24">
        <AspectRatio>
          {row.original.imageKey ? (
            <Image
              src={toUtUrl(row.original.imageKey!)}
              alt={"รูป " + row.original.name}
              fill
              sizes="10vw"
              className="rounded-md object-cover border-2"
              priority
            />
          ) : (
            <span className="rounded-md w-full h-full border-2 flex items-center justify-center text-slate-400">
              ไม่มีรูปภาพ
            </span>
          )}
        </AspectRatio>
      </div>
    ),
    enableSorting: false,
  },
  {
    id: "name",
    accessorFn: ({ name }) => name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ชื่อ" />
    ),
    cell: ({ row }) => row.original.name,
  },
  {
    id: "category",
    accessorFn: ({ category }) => category,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ประเภท" />
    ),
    cell: ({ row }) => row.original.category,
  },
  {
    id: "price",
    accessorFn: ({ price }) => price,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ราคา" />
    ),
    cell: ({ row }) => row.original.price,
  },
  {
    id: "isActive",
    accessorFn: ({ isActive }) => isActive,
    header: "การมองเห็น",
    cell: ({ row }) => <FoodActiveSwitch row={row} />,
    enableSorting: false,
  },
  {
    id: "action",
    header: ({ table }) => <FoodActionDropdown table={table} />,
    cell: ({ row }) => <FoodActionDropdown row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];

function toUtUrl(key: string): string {
  const appId: string = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID!;
  return `https://${appId}.ufs.sh/f/${key}`;
}
