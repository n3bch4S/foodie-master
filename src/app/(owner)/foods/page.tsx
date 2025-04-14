import { DataTable } from "./data-table";
import { foodColumns } from "./columns";
import { fetchFoods } from "@/lib/food/index";

export default async function Food() {
  const foodDetails = await fetchFoods();

  return <DataTable data={foodDetails} columns={foodColumns} />;
}
