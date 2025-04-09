import { FoodDetail } from "@/lib/food/types";
import { Table, useReactTable } from "@tanstack/react-table";
import { createContext } from "react";

interface FoodTableContextProviderProps {
  children: React.ReactNode;
}

export function FoodTableContextProvider({
  children,
}: FoodTableContextProviderProps) {
  const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    );
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: { sorting, columnFilters, columnVisibility, rowSelection },

  return (
    <FoodTableContext.Provider value={undefined}>
      {children}
    </FoodTableContext.Provider>
  );
}

type FoodTableControls = {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
}

export const FoodTableContext = createContext<Table<FoodDetail> | undefined>(
  undefined
);
