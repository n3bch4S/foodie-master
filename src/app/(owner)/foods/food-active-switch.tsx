"use client";

import { Switch } from "@/components/ui/switch";
import { editFood, FoodDetail } from "@/lib/food";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FoodActiveSwitchProps<TData> {
  row: Row<TData>;
}

export function FoodActiveSwitch({ row }: FoodActiveSwitchProps<FoodDetail>) {
  const router = useRouter();
  return (
    <Switch
      onCheckedChange={() => {
        editFood(row.original.id, {
          name: row.original.name,
          category: row.original.category,
          price: row.original.price,
          isActive: !row.original.isActive,
        })
          .then(() => {
            router.refresh();
            toast.success(`ปรับการมองเห็นสำเร็จ`, {
              description: row.original.name,
            });
          })
          .catch(() => {
            toast.warning(`ปรับการมองเห็นไม่สำเร็จ`, {
              description: row.original.name,
            });
          });
      }}
      checked={row.original.isActive}
    />
  );
}
