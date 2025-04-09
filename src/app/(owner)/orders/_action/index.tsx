"use server";
import { getRestaurant } from "@/lib/restaurant";
import { PrismaClient } from "@prisma/client";
import { SessionDetail } from "./types";

export async function createSession(): Promise<SessionDetail> {
  return await getRestaurant()
    .then((maybeRtr) => {
      if (!maybeRtr) throw new Error("Restaurant not found");
      return maybeRtr;
    })
    .then(async (rtr) => {
      const db = new PrismaClient();
      const ssn = await db.sessionTransaction.create({
        data: { restaurantId: rtr.id },
      });
      await db.$disconnect();
      return ssn;
    });
}

export async function editSession(
  id: string,
  isOpen: boolean
): Promise<SessionDetail> {
  return await getRestaurant()
    .then((maybeRtr) => {
      if (!maybeRtr) throw new Error("Restaurant not found");
      return maybeRtr;
    })
    .then(async (rtr) => {
      const db = new PrismaClient();
      const ssn = await db.sessionTransaction.update({
        where: { id: id },
        data: { isOpen },
      });
      await db.$disconnect();
      return ssn;
    });
}

export async function getSession(): Promise<SessionDetail[]> {
  return await getRestaurant()
    .then((maybeRtr) => {
      if (!maybeRtr) throw new Error("Restaurant not found");
      return maybeRtr;
    })
    .then(async (rtr) => {
      const db = new PrismaClient();
      const ssn = await db.sessionTransaction.findMany({
        where: { restaurantId: rtr.id },
      });
      await db.$disconnect();
      return ssn;
    });
}
