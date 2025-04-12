"use server";

import { OrderDetail, SessionDetail } from "@/app/(owner)/orders/types";
import { db } from "@/lib/db";
import { domSchema, PageDetail } from "@/lib/page/types";

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
  const session = await db.sessionTransaction.findUnique({
    where: { id: sessionId },
  });
  if (!session || !session.isOpen) {
    throw new Error("ไม่สามารถสั่งอาหารได้ เนื่องจากเซสชั่นนี้ถูกปิดไปแล้ว");
  }
  const order = await db.order.create({
    data: {
      sessionTransactionId: sessionId,
      foodItemId: foodId,
      quantity: quantity,
    },
  });
  return order;
}

export async function getSessionOfDomain(
  domain: string
): Promise<SessionDetail[]> {
  const sessions = await db.sessionTransaction.findMany({
    where: { Restaurant: { name: domain } },
  });
  return sessions;
}

export async function getOrderPage(domain: string): Promise<PageDetail> {
  const page = await db.page.findFirst({
    where: { name: "Order", site: { name: domain } },
  });
  if (!page) {
    throw new Error("Page not found");
  }
  return { ...page, dom: domSchema.parse(page.dom) };
}
