import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PageDialog } from "@/components/dialog/page-dialog";

export function PageSelector() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="home">Home</SelectItem>
          <SelectItem value="order">Order</SelectItem>
          <Separator className="my-2" />
          <PageDialog />
        </SelectContent>
      </Select>
    </>
  );
}
