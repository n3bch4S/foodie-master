"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { Food } from "@/lib/food";
import Image from "next/image";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ActionDropdown } from "./action-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeaderCellProps = {
  column: Column<Food>;
  columnType: React.HTMLInputTypeAttribute;
  children: React.ReactNode;
};

function HeaderCell({ column, columnType, children }: HeaderCellProps) {
  return (
    <div>
      {children}
      <Button onClick={() => column.toggleSorting()}>เรียง</Button>
      <Input
        type={columnType}
        placeholder="ค้นหา"
        onChange={({ target }) => column.setFilterValue(target.value)}
      />
    </div>
  );
}

function TextCell({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function ImageCell({ url }: { url?: string }) {
  return url ? (
    <AspectRatio ratio={16 / 9}>
      <Image src={url} alt="รูปอาหาร" fill sizes="10vw" priority />
    </AspectRatio>
  ) : (
    <div>ไม่พบรูปภาพ</div>
  );
}

export const foodColumns: ColumnDef<Food>[] = [
  {
    id: "action",
    cell: ({ row }) => <ActionDropdown row={row} />,
  },
  {
    id: "url",
    accessorFn: ({ url }) => url,
    header: ({ column }) => (
      <HeaderCell column={column} columnType="hidden">
        รูป
      </HeaderCell>
    ),
    cell: ({ row }) => <ImageCell url={row.original.url} />,
  },
  {
    id: "name",
    accessorFn: ({ name }) => name,
    header: ({ column }) => (
      <HeaderCell column={column} columnType="search">
        ชื่อ
      </HeaderCell>
    ),
    cell: ({ row }) => <TextCell>{row.original.name}</TextCell>,
  },
  {
    id: "category",
    accessorFn: ({ category }) => category,
    header: ({ column }) => (
      <HeaderCell column={column} columnType="search">
        ประเภท
      </HeaderCell>
    ),
    cell: ({ row }) => <TextCell>{row.original.category}</TextCell>,
  },
  {
    id: "price",
    accessorFn: ({ price }) => price,
    header: ({ column }) => (
      <HeaderCell column={column} columnType="hidden">
        ราคา
      </HeaderCell>
    ),
    cell: ({ row }) => <TextCell>{row.original.price}</TextCell>,
  },
];
