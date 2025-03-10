import { fetchAllFood } from "@/lib/food";
import { foodColumns } from "./columns";
import { DataTable } from "./data-table";
import { CreateForm } from "./create-food-dialog";

export default async function Food() {
  const foodData = await fetchAllFood();

  return (
    <div className="container flex flex-col h-screen text-center">
      <div className="flex justify-end p-4">
        <CreateForm />
      </div>
      <div className="bg-slate-950 h-full p-4">
        <div className="border-4 border-green-400 w-full h-full rounded">
          Table
        </div>
      </div>
      <div className="bg-slate-600 flex justify-center py-4">
        <div className="bg-blue-400 h-12 px-24 rounded">Pagination</div>
      </div>
      {/* <DataTable columns={foodColumns} data={foodData} /> */}
    </div>
  );
}
