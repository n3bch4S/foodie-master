// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { deleteFood, FoodDetail } from "@/lib/food";
// import { Table } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// interface FoodsActionDropdownProps {
//   table: Table<FoodDetail>;
// }

// export function FoodsActionDropdown({ table }: FoodsActionDropdownProps) {
//   const router = useRouter();
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           disabled={
//             !table.getIsSomeRowsSelected() && !table.getIsAllPageRowsSelected()
//           }
//           className="h-8 w-8 p-0"
//         >
//           <span className="sr-only">เลือกการดำเนินการ</span>
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuLabel>ดำเนินการ</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem
//           onClick={() => {
//             const tryDeleteFoods = table.getSelectedRowModel().rows.map((row) =>
//               deleteFood(row.original.id).catch((error) => {
//                 toast.error(`ลบอาหารล้มเหลว`, {
//                   description: error.message,
//                 });
//                 return null;
//               })
//             );
//             Promise.all(tryDeleteFoods).then((statusList) => {
//               table.resetRowSelection();
//               const deletedCount = statusList.filter(
//                 (status) => status !== null
//               ).length;
//               toast.success(`ลบอาหารสำเร็จ`, {
//                 description: `ลบแล้ว ${deletedCount} รายการ`,
//               });
//               router.refresh();
//             });
//           }}
//           className="text-red-400 data-[highlighted]:bg-red-100 data-[highlighted]:text-red-400"
//         >
//           ลบ
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
