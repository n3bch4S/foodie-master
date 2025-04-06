import { DataTable } from "./data-table";
import { foodColumns } from "./columns";
import { fetchFoods } from "@/lib/food/index";

export default async function Food() {
  const foodDetails = await fetchFoods();
  return (
    <div className="container flex flex-col h-screen">
      <DataTable data={foodDetails} columns={foodColumns} />
    </div>
  );
}
