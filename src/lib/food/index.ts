"use server";
import { PrismaClient } from "@prisma/client";
import { Food, FoodDetail } from "./types";
import { getRestaurant } from "../restaurant";

const db = new PrismaClient();

export async function createFood(food: Food): Promise<FoodDetail> {
  return await getRestaurant()
    .then((maybeRestaurant) => {
      if (!maybeRestaurant) throw new Error(`Restaurant not found`);
      return maybeRestaurant.id;
    })
    .then(async (rtrId) => {
      return await db.foodItem.create({
        data: { ...food, restaurantId: rtrId },
      });
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
      if (!maybeRtr) throw new Error(`Restaurant not found`);
      return maybeRtr;
    })
    .then(async (rtr) => {
      return await db.foodItem.findMany({ where: { restaurantId: rtr.id } });
    })
    .then((foods) => {
      return foods.map((food) => ({ ...food, price: food.price.toNumber() }));
    });
}

export async function editFood(food: Food, id?: string): Promise<FoodDetail> {
  if (id) {
    return await db.foodItem
      .update({ where: { id }, data: food })
      .then((newFood) => {
        const foodDetail: FoodDetail = {
          ...newFood,
          price: newFood.price.toNumber(),
        };
        return foodDetail;
      });
  }
  return await createFood(food);
}

export async function deleteFood(id: string): Promise<void> {
  await db.foodItem.delete({ where: { id } });
}
