import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FoodForm } from "./food-form";
import { Row } from "@tanstack/react-table";
import { FoodDetail } from "@/lib/food";

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
      <FoodForm setIsOpen={setIsOpen} row={row} />
    </DialogContent>
  );
}
