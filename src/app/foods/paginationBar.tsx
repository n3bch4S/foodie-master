"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Table } from "@tanstack/react-table";
import { FoodDetail } from "@/lib/food";
import { Button } from "@/components/ui/button";

type PaginationBarProps<TData> = { table: Table<TData> };

export function PaginationBar({ table }: PaginationBarProps<FoodDetail>) {
  return (
    <Pagination className="pb-4 flex-none">
      <PaginationContent className="flex gap-4">
        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ก่อนหน้า
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            ถัดไป
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
