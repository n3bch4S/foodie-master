"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const siteDetailSchema = z
  .object({ id: z.string().uuid(), ownerId: z.string().uuid() })
  .strict();
type SiteDetail = z.infer<typeof siteDetailSchema>;

const db = new PrismaClient();

export async function createSiteDetail(ownerId: string): Promise<SiteDetail> {
  return db.site.create({ data: { ownerId } });
}

export async function getSiteDetail(ownerId: string): Promise<SiteDetail> {
  return db.site
    .findFirst({ where: { ownerId } })
    .then((mightSite) =>
      mightSite
        ? mightSite
        : Promise.reject(`Can't find site for owner ${ownerId}`)
    );
}
