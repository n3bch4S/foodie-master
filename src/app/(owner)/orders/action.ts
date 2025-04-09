"use server";
import { getRestaurant } from "@/lib/restaurant";
import { PrismaClient } from "@prisma/client";
import {
  OrderDetail,
  OrderStatus,
  orderStatusSchema,
  SessionDetail,
} from "./types";

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

export async function createOrder(
  sessionId: string,
  foodId: string,
  quantity: number
): Promise<OrderDetail> {
  const db = new PrismaClient();
  const order = await db.order.create({
    data: { sessionTransactionId: sessionId, foodItemId: foodId, quantity },
  });
  await db.$disconnect();
  return order;
}

export async function editOrder(
  orderId: string,
  status: OrderStatus
): Promise<OrderDetail> {
  const db = new PrismaClient();
  const order = await db.order.update({
    where: { id: orderId },
    data: { status },
  });
  await db.$disconnect();
  return order;
}

export async function getOrder(): Promise<OrderDetail[]> {
  return await getRestaurant()
    .then((maybeRtr) => {
      if (!maybeRtr) throw new Error("Restaurant not found");
      return maybeRtr;
    })
    .then(async (rtr) => {
      const db = new PrismaClient();
      const order = await db.order.findMany({
        where: { SessionTransaction: { restaurantId: rtr.id } },
      });
      await db.$disconnect();
      return order;
    });
}
