import { getSession } from "./action";
import { ClientPage } from "./client";

export default async function Page() {
  const sessionDetails = await getSession();
  return <ClientPage sessionDetails={sessionDetails} />;
}
