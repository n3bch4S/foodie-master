"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React from "react";
import { FoodActionDropdown } from "./food-action-dropdown";
import { Button } from "@/components/ui/button";
import { FoodDetail } from "@/lib/food";
import { ArrowDownUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
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

type HeaderCellProps = {
  column: Column<FoodDetail>;
  inputType: React.HTMLInputTypeAttribute;
  canSort: boolean;
  canSearch: boolean;
  children: React.ReactNode;
};

function HeaderCell({
  column,
  inputType,
  canSort,
  canSearch,
  children,
}: HeaderCellProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      {children}
      {canSort ? (
        <Button
          size={"icon"}
          onClick={() => column.toggleSorting()}
          variant={"outline"}
        >
          <ArrowDownUp size={16} strokeWidth={2} />
        </Button>
      ) : null}
    </div>
  );
}

function TextCell({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

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
    accessorKey: "imageKey",
    header: "รูปอาหาร",
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
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ชื่อ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <TextCell>{row.original.name}</TextCell>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <HeaderCell
        column={column}
        canSort={true}
        canSearch={true}
        inputType="search"
      >
        ประเภท
      </HeaderCell>
    ),
    cell: ({ row }) => <TextCell>{row.original.category}</TextCell>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <HeaderCell
        column={column}
        canSort={true}
        canSearch={false}
        inputType="hidden"
      >
        ราคา
      </HeaderCell>
    ),
    cell: ({ row }) => <TextCell>{row.original.price}</TextCell>,
  },
  {
    id: "action",
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
  },
];
