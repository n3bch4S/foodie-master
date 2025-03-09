import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FoodForm } from "./food-form";
import { Button } from "@/components/ui/button";

export function CreateForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>+ เพิ่มอาหาร</Button>
      </DialogTrigger>
      <DialogContent>
        <FoodForm />
      </DialogContent>
    </Dialog>
  );
}
