import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FoodForm } from "./food-form";
import { Button } from "@/components/ui/button";

export function CreateForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>เพิ่มอาหาร</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <FoodForm />
      </DialogContent>
    </Dialog>
  );
}
