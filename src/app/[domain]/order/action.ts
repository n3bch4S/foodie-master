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
