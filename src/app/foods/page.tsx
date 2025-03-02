import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 1,
      status: "pending",
      email: "q@example.com",
    },
    {
      id: "728ed52f",
      amount: 2,
      status: "pending",
      email: "w@example.com",
    },
    {
      id: "728ed52f",
      amount: 3,
      status: "pending",
      email: "e@example.com",
    },
    {
      id: "728ed52f",
      amount: 4,
      status: "pending",
      email: "r@example.com",
    },
    {
      id: "728ed52f",
      amount: 5,
      status: "pending",
      email: "t@example.com",
    },
    {
      id: "728ed52f",
      amount: 6,
      status: "pending",
      email: "y@example.com",
    },
    {
      id: "728ed52f",
      amount: 7,
      status: "pending",
      email: "u@example.com",
    },
    {
      id: "728ed52f",
      amount: 8,
      status: "pending",
      email: "i@example.com",
    },
    {
      id: "728ed52f",
      amount: 9,
      status: "pending",
      email: "o@example.com",
    },
    {
      id: "728ed52f",
      amount: 10,
      status: "pending",
      email: "p@example.com",
    },
    {
      id: "728ed52f",
      amount: 11,
      status: "pending",
      email: "a@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
