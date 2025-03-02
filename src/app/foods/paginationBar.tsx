"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Table } from "@tanstack/react-table";
import { Food } from "@/lib/food";
import { Button } from "@/components/ui/button";

type PaginationBarProps<TData> = { table: Table<TData> };

export function PaginationBar({ table }: PaginationBarProps<Food>) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ย้อนกลับ
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            ต่อไป
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
