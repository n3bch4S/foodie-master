"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Food } from "@/lib/food";
import Image from "next/image";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ActionDropdown } from "./action-dropdown";

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
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
    accessorFn: (row) => row.url,
    header: () => <HeaderCell>รูป</HeaderCell>,
    cell: ({ row }) => <ImageCell url={row.original.url} />,
  },
  {
    id: "name",
    accessorFn: (row) => row.name,
    header: () => <HeaderCell>ชื่อ</HeaderCell>,
    cell: ({ row }) => <TextCell>{row.original.name}</TextCell>,
  },
  {
    id: "category",
    accessorFn: (row) => row.category,
    header: () => <HeaderCell>ประเภท</HeaderCell>,
    cell: ({ row }) => <TextCell>{row.original.category}</TextCell>,
  },
  {
    id: "price",
    accessorFn: (row) => row.price,
    header: () => <HeaderCell>ราคา</HeaderCell>,
    cell: ({ row }) => <TextCell>{row.original.price}</TextCell>,
  },
];
