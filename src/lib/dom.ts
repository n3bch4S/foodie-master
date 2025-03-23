"use server";

import { PrismaClient } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export type DomDetail = {
  id: string;
  dom: JsonValue;
};

const db = new PrismaClient();

export async function createDom(): Promise<DomDetail> {
  return await db.dom.create({ data: {} });
}

export async function getDom(): Promise<DomDetail> {
  return await db.dom
    .findUnique({
      where: { id: "ebc07756-e210-4b25-9057-8c38711642f9" },
    })
    .then((maybeDom) =>
      maybeDom !== null
        ? maybeDom
        : Promise.reject(`No DOM found ebc07756-e210-4b25-9057-8c38711642f9`)
    );
}
