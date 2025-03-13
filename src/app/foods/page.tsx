import { fetchFoods } from "@/lib/food";
import { CreateForm } from "./create-food-dialog";
import { DataTable } from "./data-table";
import { toast } from "sonner";

export default async function Food() {
  const foodData = await fetchFoods().catch((error) => {
    toast.error(`ไม่พบอาหาร`, { description: error });
  });
  return (
    <div className="container flex flex-col h-screen">
      <div className="flex justify-end px-4 pt-4">
        <CreateForm />
      </div>
      <DataTable data={foodData ?? []} />
    </div>
  );
}
