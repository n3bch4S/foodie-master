import { getOrderPage, getSessionOfDomain } from "./action";
import { ClientPage, NoSessionPage } from "./client";
import { getPublicFoods } from "@/lib/food/index";

type Params = {
  domain: string;
};
type SearchParams = { [key: string]: string | string[] | undefined };
export default async function Page(ctx: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { domain } = ctx.params;
  const { sessionId } = ctx.searchParams;
  const foods = await getPublicFoods(domain);
  const sessions = await getSessionOfDomain(domain);
  const page = await getOrderPage(domain);

  if (!sessionId || typeof sessionId !== "string") {
    return <NoSessionPage foods={foods} />;
  }

  return (
    <ClientPage foods={foods} sessions={sessions} page={page}></ClientPage>
  );
}
