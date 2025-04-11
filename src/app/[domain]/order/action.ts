"use server";

import { OrderDetail } from "@/app/(owner)/orders/types";
import { db } from "@/lib/db";

export async function getOrdersOfSession(
  sessionId: string
): Promise<OrderDetail[]> {
  const orders = await db.order.findMany({
    where: { sessionTransactionId: sessionId },
  });
  return orders;
}

export async function createOrder(
  sessionId: string,
  foodId: string,
  quantity: number
): Promise<OrderDetail> {
  const order = await db.order.create({
    data: {
      sessionTransactionId: sessionId,
      foodItemId: foodId,
      quantity: quantity,
    },
  });
  return order;
}
