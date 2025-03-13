"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React from "react";
import { FoodActionDropdown } from "./food-action-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FoodDetail } from "@/lib/food";
import { ArrowDownUp } from "lucide-react";

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
    <div className="flex flex-col justify-center items-center h-24">
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

      {canSearch ? (
        <Input
          type={"text"}
          onChange={({ target }) => column.setFilterValue(target.value)}
        />
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
    id: "imageUrl",
    accessorFn: ({ imageUrl }) => imageUrl,
    header: ({ column }) => (
      <HeaderCell
        column={column}
        canSort={false}
        canSearch={false}
        inputType="hidden"
      >
        รูป
      </HeaderCell>
    ),
    cell: ({ row }) => <ImageCell url={row.original.imageUrl} />,
  },
  {
    id: "name",
    accessorFn: ({ name }) => name,
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
    id: "category",
    accessorFn: ({ category }) => category,
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
    id: "price",
    accessorFn: ({ price }) => price,
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
