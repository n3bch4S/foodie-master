import { fetchFoods } from "@/lib/food";
import { CreateForm } from "./create-food-dialog";
import { DataTable } from "./data-table";

export default async function Food() {
  const foodData = await fetchFoods();
  return (
    <div className="container flex flex-col h-screen text-center">
      <div className="flex justify-end p-4">
        <CreateForm />
      </div>
      <DataTable data={foodData} />
    </div>
  );
}
