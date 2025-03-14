"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React from "react";
import { FoodActionDropdown } from "./food-action-dropdown";
import { Button } from "@/components/ui/button";
import { FoodDetail } from "@/lib/food";
import { ArrowDownUp } from "lucide-react";
import { getUtUrl } from "./utils";

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

function ImageCell({ url }: { url?: string }) {
  return url ? (
    <Image
      src={url}
      alt="รูปอาหาร"
      width={128}
      height={128}
      className="rounded"
      priority
    />
  ) : (
    <div>ไม่พบรูปภาพ</div>
  );
}

export const foodColumns: ColumnDef<FoodDetail>[] = [
  {
    accessorKey: "imageKey",
    header: ({ column }) =>
      "รูปอาหาร",
      // <HeaderCell
      //   column={column}
      //   canSort={false}
      //   canSearch={false}
      //   inputType="hidden"
      // >
      //   รูป
      // </HeaderCell>
    cell: ({ row }) =>
      row.original.imageKey ? (
        <Image
          src={getUtUrl(row.original.imageKey)}
          alt="food image"
          width={100}
          height={100}
        />
      ) : (
        "ไม่มีรูปภาพ"
      ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <HeaderCell
        column={column}
        canSort={true}
        canSearch={true}
        inputType="search"
      >
        ชื่อ
      </HeaderCell>
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
    cell: ({ row }) => <FoodActionDropdown row={row} />,
  },
];
