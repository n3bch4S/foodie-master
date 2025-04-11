"use server";

import { OrderDetail } from "@/app/(owner)/orders/types";
import { db } from "@/lib/db";

type FoodWithName = {
  name: string;
};
export type OrderWithName = OrderDetail & { FoodItem: FoodWithName };
export async function getOrdersOfSession(
  sessionId: string
): Promise<OrderWithName[]> {
  const orders = await db.order.findMany({
    where: { sessionTransactionId: sessionId },
    orderBy: { createdAt: "desc" },
    include: { FoodItem: { select: { name: true } } },
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
