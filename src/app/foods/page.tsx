import { fetchAllFood } from "@/lib/food";
import { foodColumns } from "./columns";
import { DataTable } from "./data-table";

export default async function Food() {
  const foodData = await fetchAllFood();

  return (
    <div className="container">
      <DataTable columns={foodColumns} data={foodData} />
    </div>
  );
}
