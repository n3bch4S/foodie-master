import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteFood, Food } from "@/lib/food";
import { Row } from "@tanstack/react-table";

async function deleteRow(row: Row<Food>) {
  await deleteFood(row.original.id);
}

type ActionDropdownProps = {
  row: Row<Food>;
};

export function ActionDropdown({ row }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>เพิ่มเติม</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>แก้ไข</DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => await deleteFood(row.original.id)}
        >
          ลบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
