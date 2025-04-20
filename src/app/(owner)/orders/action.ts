"use server";
import { getRestaurant } from "@/lib/restaurant";
import {
  AnalyticOrder,
  OrderDetail,
  OrderStatus,
  SessionDetail,
} from "./types";
import { FoodDetail } from "@/lib/food/types";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createSession(): Promise<SessionDetail> {
  return await getRestaurant()
    .then((maybeRtr) => {
      if (!maybeRtr) throw new Error("Restaurant not found");
      return maybeRtr;
    })
    .then(async (rtr) => {
      const ssn = await db.sessionTransaction.create({
        data: { restaurantId: rtr.id },
      });
      await db.$disconnect();
      return ssn;
    });
}

export async function createPublicSession(
  rtrId: string
): Promise<SessionDetail> {
  const ssn = await db.sessionTransaction.create({
    data: { restaurantId: rtrId },
  });
  return ssn;
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
      if (!maybeRtr) redirect("/restaurant");
      return maybeRtr;
    })
    .then(async (rtr) => {
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
  const order = await db.order.update({
    where: { id: orderId },
    data: { status },
  });
  await db.$disconnect();
  return order;
}

export async function deleteOrder(orderId: string): Promise<OrderDetail> {
  const deletedOrder = await db.order.delete({ where: { id: orderId } });
  return deletedOrder;
}

export async function getOrder(): Promise<
  (OrderDetail & { FoodItem: FoodDetail })[]
> {
  return await getRestaurant()
    .then((maybeRtr) => {
      if (!maybeRtr) throw new Error("Restaurant not found");
      return maybeRtr;
    })
    .then(async (rtr) => {
      const order = await db.order.findMany({
        where: { SessionTransaction: { restaurantId: rtr.id } },
        include: { FoodItem: true },
      });
      await db.$disconnect();
      return order.map((o) => {
        return {
          ...o,
          FoodItem: { ...o.FoodItem, price: o.FoodItem.price.toNumber() },
        };
      });
    });
}

export async function getAnalyticOrders(): Promise<AnalyticOrder[]> {
  const rtr = await getRestaurant();
  if (!rtr) throw new Error("Restaurant not found");
  const { id } = rtr;
  const orderDetails = await db.order.findMany({
    where: { SessionTransaction: { restaurantId: id } },
    include: { FoodItem: true, SessionTransaction: true },
  });
  const orderData = orderDetails.map((order) => {
    const { FoodItem, SessionTransaction } = order;
    const orderRow: AnalyticOrder = {
      quantity: order.quantity,
      orderId: order.id,
      orderCreatedAt: order.createdAt,
      orderUpdatedAt: order.updatedAt,
      orderStatus: order.status,
      sessionCreatedAt: SessionTransaction.createdAt,
      sessionUpdatedAt: SessionTransaction.updatedAt,
      sessionIsOpen: SessionTransaction.isOpen,
      foodName: FoodItem.name,
      foodCategory: FoodItem.category,
      foodPrice: FoodItem.price.toNumber(),
      foodIsActive: FoodItem.isActive,
    };
    return orderRow;
  });
  return orderData;
}
