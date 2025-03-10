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
  // return [
  //   {
  //     name: "โจ๊ก",
  //     category: "จานหลัก",
  //     price: 50,
  //     imageUrl: "https://www.centralworld.co.th/storage/stores/K/kfc.jpg",
  //   },
  //   { name: "กะเพรา", category: "จานหลัก", price: 59 },
  //   { name: "ก๋วยเตี๋ยว", category: "จานหลัก", price: 55 },
  //   { name: "บะหมี่", category: "จานหลัก", price: 55 },
  //   { name: "หมูกรอบ", category: "จานรอง", price: 129 },
  //   { name: "เล้ง", category: "จานรอง", price: 199 },
  //   { name: "ส้มตำ", category: "จานหลัก", price: 59 },
  //   { name: "ปอเปี๊ยะทอด", category: "ของว่าง", price: 199 },
  //   { name: "ไก่ย่าง", category: "กับข้าว", price: 79 },
  //   { name: "ข้าวเหนียว", category: "อื่นๆ", price: 10 },
  //   { name: "น้ำเปล่า", category: "เครื่องดื่ม", price: 15 },
  // ];
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

export async function deleteFood(id: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    console.log(`Deleting food '${id}'...`);
    const foods = await fetchFoods();
    const foundFood = foods.find((food) => food.id === id);
    if (foundFood) {
      console.log(`Delete food '${id}' succussfully`);
      resolve();
    } else {
      const errorText = `Food '${id} not found, cannot delete'`;
      console.error(errorText);
      reject(errorText);
    }
  });
}
