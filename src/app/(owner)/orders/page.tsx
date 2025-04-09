import { getOrder, getSession } from "./action";
import { ClientPage } from "./client";

export default async function Page() {
  const sessionDetails = await getSession();
  const orderDetails = await getOrder();
  return (
    <ClientPage sessionDetails={sessionDetails} orderDetails={orderDetails} />
  );
}
