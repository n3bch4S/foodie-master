"use server";

import { PrismaClient } from "@prisma/client";

export type Food = {
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
};
export type FoodDetail = Food & { id: string };

const prisma = new PrismaClient();

export async function createFood(food: Food): Promise<FoodDetail> {
  console.log("Creating food", food);
  const newFood = await prisma.foodItem.create({ data: { ...food } });
  console.log("Food created with id", newFood.id);
  return {
    ...newFood,
    price: newFood.price.toNumber(),
    imageUrl: newFood.imageUrl ?? undefined,
  };
}

export async function fetchFood(id: string): Promise<FoodDetail> {
  function getFood(foods: FoodDetail[]): FoodDetail | undefined {
    return foods.find((food) => food.id === id);
  }

  return new Promise(async (resolve, reject) => {
    console.log(`Fetching food '${id}'...`);
    const foundFood = await fetchFoods().then(getFood);
    if (foundFood) {
      console.log(`Food '${id}' found`);
      resolve(foundFood);
    } else {
      const errorText = `Food '${id}' not found`;
      console.error(errorText);
      reject(errorText);
    }
  });
}

export async function fetchFoods(): Promise<FoodDetail[]> {
  console.log("Fetching foods");
  const foods = (await prisma.foodItem.findMany()).map((food) => ({
    ...food,
    price: food.price.toNumber(),
    imageUrl: food.imageUrl ?? undefined,
  }));
  console.log(`Fetched ${foods.length} foods`);
  return foods;
}

export async function editFood(id: string, newFood: Food): Promise<void> {
  console.log(`Editing food '${id}'...`);

  function updateFood(foods: FoodDetail[]): void {
    foods.map((food) => {
      if (food.id === id) {
        console.log(`Found food '${id}', updating...`);
        const editedFood: FoodDetail = { ...newFood, id };
        console.log(`Updated food '${id}'`);
        return editedFood;
      }
      return food;
    });
  }
  await fetchFoods().then(updateFood);
}

export async function deleteFood(id: string): Promise<FoodDetail> {
  console.log(`Deleting food '${id}'...`);
  const deletedFood = await prisma.foodItem
    .delete({ where: { id } })
    .then((food) => ({
      ...food,
      price: food.price.toNumber(),
      imageUrl: food.imageUrl ?? undefined,
    }))
    .catch((error) => {
      console.error(`Failed to delete food "${id}"`, error);
      return null;
    });
  if (!deletedFood) return Promise.reject(`ลบอาหารไม่สำเร็จ`);
  console.log(`Successfully delete`, deletedFood);
  return deletedFood;
}
