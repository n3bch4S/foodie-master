import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { MultiFoodForm } from "./food-form";
import { Row } from "@tanstack/react-table";
import { FoodDetail } from "@/lib/food/types";

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
      <MultiFoodForm />
    </DialogContent>
  );
}
