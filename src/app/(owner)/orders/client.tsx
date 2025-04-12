"use client";

import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Table as TableType,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {
  AnalyticOrder,
  OrderDetail,
  OrderWithFood,
  SessionDetail,
} from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  EyeOff,
  Settings2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { editOrder, editSession, getAnalyticOrders } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ClientPageProps {
  sessionDetails: SessionDetail[];
  orderDetails: OrderWithFood[];
}
export function ClientPage(props: ClientPageProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        onClick={() => {
          getAnalyticOrders().then((orderData) => {
            downloadCSV(orderData);
          });
        }}
      >
        ดาวน์โหลด CSV
      </Button>
      <DataTable
        columns={sessionColumns}
        data={props.sessionDetails}
        tableName="เซสชั่น"
      />
      <Separator />
      <DataTable
        columns={orderColumn}
        data={props.orderDetails}
        tableName="ออเดอร์"
      />
    </div>
  );
}

const sessionColumns: ColumnDef<SessionDetail>[] = [
  { id: "ID", accessorKey: "id", header: "ID", enableSorting: false },
  {
    id: "สถานะ",
    accessorKey: "isOpen",
    header: (ctx) => {
      return <DataTableColumnHeader column={ctx.column} title="สถานะ" />;
    },
    cell: (ctx) => {
      const { isOpen, id } = ctx.row.original;
      return <StatusSwitch isOpen={isOpen} sessionId={id} />;
    },
  },
  {
    id: "สร้างเมื่อ",
    accessorKey: "createdAt",
    header: (ctx) => {
      return <DataTableColumnHeader column={ctx.column} title="สร้างเมื่อ" />;
    },
    cell: (ctx) => {
      return ctx.row.original.createdAt.toLocaleTimeString();
    },
  },
  {
    id: "แก้ไขเมื่อ",
    accessorKey: "updatedAt",
    header: (ctx) => {
      return <DataTableColumnHeader column={ctx.column} title="แก้ไขเมื่อ" />;
    },
    cell: (ctx) => {
      return ctx.row.original.updatedAt.toLocaleTimeString();
    },
  },
];

const orderColumn: ColumnDef<OrderWithFood>[] = [
  {
    id: "ID เซสชั่น",
    accessorKey: "sessionTransactionId",
    header: (ctx) => {
      return <DataTableColumnHeader column={ctx.column} title="ID เซสชั่น" />;
    },
  },
  {
    id: "เมนู",
    accessorKey: "FoodItem.name",
    header: (ctx) => {
      return <DataTableColumnHeader column={ctx.column} title="เมนู" />;
    },
  },
  {
    id: "จำนวน",
    accessorKey: "quantity",
    header: (ctx) => {
      return <DataTableColumnHeader column={ctx.column} title="จำนวน" />;
    },
  },
  {
    id: "สถานะ",
    accessorKey: "status",
    header: (ctx) => {
      return <DataTableColumnHeader column={ctx.column} title="สถานะ" />;
    },
    cell: (ctx) => {
      const { id, status } = ctx.row.original;
      return <StatusSelect orderId={id} status={status} />;
    },
  },
  {
    id: "สร้างเมื่อ",
    accessorKey: "createdAt",
    header: (ctx) => {
      return <DataTableColumnHeader column={ctx.column} title="สร้างเมื่อ" />;
    },
    cell: (ctx) => {
      return ctx.row.original.createdAt.toLocaleTimeString();
    },
  },
  {
    id: "แก้ไขเมื่อ",
    accessorKey: "updatedAt",
    header: (ctx) => {
      return <DataTableColumnHeader column={ctx.column} title="แก้ไขเมื่อ" />;
    },
    cell: (ctx) => {
      return ctx.row.original.updatedAt.toLocaleTimeString();
    },
  },
];

interface StatusSwitchProps {
  isOpen: boolean;
  sessionId: string;
}
function StatusSwitch(props: StatusSwitchProps) {
  const router = useRouter();
  return (
    <Switch
      checked={props.isOpen}
      onCheckedChange={(e) => {
        editSession(props.sessionId, e).then((ssn) => {
          toast.success("สำเร็จ", {
            description: `${ssn.isOpen ? "เปืด" : "ปิด"} ${ssn.id} แล้ว`,
          });
          router.refresh();
        });
      }}
    />
  );
}

interface StatusSelectProps {
  orderId: string;
  status: OrderDetail["status"];
}
function StatusSelect(props: StatusSelectProps) {
  const router = useRouter();
  return (
    <>
      <Select
        value={props.status}
        onValueChange={(value) => {
          const { orderId } = props;
          editOrder(orderId, value as OrderDetail["status"]).then((order) => {
            toast.success("สำเร็จ", {
              description: `เปลี่ยนสถานะ ${order.id} เป็น ${mapOrderStatus(
                order.status
              )}`,
            });
            router.refresh();
          });
        }}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder={mapOrderStatus(props.status)} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">กำลังดำเนินการ</SelectItem>
          <SelectItem value="COMPLETED">เสร็จสิ้น</SelectItem>
          <SelectItem value="CANCELLED">ยกเลิก</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableName: string;
  findKey?: string;
}

function DataTable<TData, TValue>({
  columns,
  data,
  ...props
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const findKey = useMemo(() => {
    return props.findKey;
  }, [props.findKey]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        {findKey && (
          <Input
            placeholder="ค้าหา..."
            value={(table.getColumn(findKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(findKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        {props.tableName}
        <DataTableViewOptions table={table} />
      </div>
      <div className="flex rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            น้อยไปมาก
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            มากไปน้อย
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
            ซ่อน
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface DataTablePaginationProps<TData> {
  table: TableType<TData>;
}
export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} จาก{" "}
        {table.getFilteredRowModel().rows.length} แถวที่เลือก
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">จำนวนแถวที่แสดง</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          หน้า {table.getState().pagination.pageIndex + 1} จาก{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DataTableViewOptionsProps<TData> {
  table: TableType<TData>;
}
export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 flex">
          <Settings2 />
          มุมมอง
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function downloadCSV(data: AnalyticOrder[]) {
  if (data.length === 0) {
    alert("ไม่มีข้อมูลให้ดาวน์โหลด");
    return;
  }
  const [sampleRow] = data;
  const now = new Date();
  const dateTimeText = now
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "")
    .replace(/:/g, "-");
  const csvContent =
    "data:text/csv;charset=utf-8," +
    Object.entries(sampleRow).map(([key]) => {
      return key;
    }) +
    "\n" +
    data
      .map((row) => {
        return Object.values(row)
          .map((value) => {
            if (typeof value === "object") {
              return JSON.stringify(value);
            }
            return value;
          })
          .join(",");
      })
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `report_${dateTimeText}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function mapOrderStatus(status: OrderDetail["status"]): string {
  switch (status) {
    case "PENDING":
      return "กำลังดำเนินการ";
    case "COMPLETED":
      return "เสร็จสิ้น";
    case "CANCELLED":
      return "ยกเลิก";
    default:
      return status;
  }
}
