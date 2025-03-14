import { fetchFoods, FoodDetail } from "@/lib/food";
import { CreateForm } from "./create-food-dialog";
import { DataTable } from "./data-table";
import { foodColumns } from "./columns";

export default async function Food() {
  const foodData = await fetchFoods().catch(() => [] as FoodDetail[]);
  return (
    <div className="container flex flex-col h-screen">
      <div className="flex justify-end px-4 pt-4">
        <CreateForm />
      </div>
      <DataTable data={foodData} columns={foodColumns} />
    </div>
  );
}
