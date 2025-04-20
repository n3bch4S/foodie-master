"use server";
import { Food, FoodDetail } from "./types";
import { getRestaurant } from "../restaurant";
import { db } from "../db";
import { redirect } from "next/navigation";

// const db = new PrismaClient();

export async function createFood(food: Food): Promise<FoodDetail> {
  return await getRestaurant()
    .then((maybeRestaurant) => {
      if (!maybeRestaurant) throw new Error(`Restaurant not found`);
      return maybeRestaurant.id;
    })
    .then(async (rtrId) => {
      const foodDetail = await db.foodItem.create({
        data: { ...food, restaurantId: rtrId },
      });

      return foodDetail;
    })
    .then((newFood) => {
      const foodDetail: FoodDetail = {
        ...newFood,
        price: newFood.price.toNumber(),
      };
      return foodDetail;
    });
}

export async function fetchFoods(): Promise<FoodDetail[]> {
  return await getRestaurant()
    .then((maybeRtr) => {
      if (!maybeRtr) redirect("/restaurant");
      return maybeRtr;
    })
    .then(async (rtr) => {
      const foodDetail = await db.foodItem.findMany({
        where: { restaurantId: rtr.id },
      });

      return foodDetail;
    })
    .then((foods) => {
      return foods.map((food) => ({ ...food, price: food.price.toNumber() }));
    });
}

export async function getPublicFoods(rtrName: string): Promise<FoodDetail[]> {
  const foods = await db.foodItem.findMany({
    where: { Restaurant: { name: rtrName }, isActive: true },
  });
  return foods.map((food) => {
    return { ...food, price: food.price.toNumber() };
  });
}

export async function editFood(food: Food, id?: string): Promise<FoodDetail> {
  if (id) {
    const foodDetail = await db.foodItem
      .update({ where: { id }, data: food })
      .then((newFood) => {
        const foodDetail: FoodDetail = {
          ...newFood,
          price: newFood.price.toNumber(),
        };
        return foodDetail;
      });

    return foodDetail;
  }
  return await createFood(food);
}

export async function deleteFood(id: string): Promise<void> {
  await db.foodItem.delete({ where: { id } });
}
