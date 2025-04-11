import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { FoodDetail } from "@/lib/food/types";
import { FoodForm } from "./food-form";

interface FoodDialogProps<TData> {
  row?: Row<TData>;
  dialogTitle?: string;
  dialogDescription?: string;
  setIsOpen: (open: boolean) => void;
}

export function FoodDialogContent({
  row,
  dialogTitle,
  dialogDescription,
  setIsOpen,
}: FoodDialogProps<FoodDetail>) {
  return (
    <DialogContent>
      {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
      {dialogDescription && (
        <DialogDescription>{dialogDescription}</DialogDescription>
      )}
      <FoodForm />
    </DialogContent>
  );
}
