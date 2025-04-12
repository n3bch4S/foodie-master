import { getHomePage } from "./action";
import { ClientPage } from "./client";

export default async function Page(ctx: { params: { domain: string } }) {
  const page = await getHomePage(ctx.params.domain);
  return <ClientPage dom={page.dom} />;
}
