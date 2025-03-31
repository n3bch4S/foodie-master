import { fetchFoods, FoodDetail } from "@/lib/food";
import { DataTable } from "./data-table";
import { foodColumns } from "./columns";

export default async function Food() {
  const foodData = await fetchFoods().catch(() => {
    return [] as FoodDetail[];
  });
  return (
    <div className="container flex flex-col h-screen">
      <DataTable data={foodData} columns={foodColumns} />
    </div>
  );
}
