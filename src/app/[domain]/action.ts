"use server";

import { db } from "@/lib/db";
import { domSchema, PageDetail } from "@/lib/page/types";

export async function getHomePage(domain: string): Promise<PageDetail> {
  const page = await db.page.findFirst({
    where: { name: "Home", site: { name: domain } },
  });
  if (!page) {
    throw new Error("Page not found");
  }
  return { ...page, dom: domSchema.parse(page.dom) };
}
