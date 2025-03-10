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

export async function createFood(food: Food) {
  console.log("Creating food", food);
  const newFood = await prisma.foodItem.create({ data: { ...food } });
  console.log("Food created with id", newFood.id);
}

export async function fetchFood(id: string): Promise<FoodDetail> {
  function getFood(foods: FoodDetail[]): FoodDetail | undefined {
    return foods.find((food) => food.id === id);
  }

  return new Promise(async (resolve, reject) => {
    console.log(`Fetching food '${id}'...`);
    const foundFood = await fetchAllFood().then(getFood);
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

export async function fetchAllFood(): Promise<FoodDetail[]> {
  console.log("Fetching all foods...");
  console.log("Done fetching all foods");
  return [
    {
      id: "1",
      name: "โจ๊ก",
      category: "จานหลัก",
      price: 50,
      imageUrl: "https://www.centralworld.co.th/storage/stores/K/kfc.jpg",
    },
    { id: "2", name: "กะเพรา", category: "จานหลัก", price: 59 },
    { id: "3", name: "ก๋วยเตี๋ยว", category: "จานหลัก", price: 55 },
    { id: "4", name: "บะหมี่", category: "จานหลัก", price: 55 },
    { id: "5", name: "หมูกรอบ", category: "จานรอง", price: 129 },
    { id: "6", name: "เล้ง", category: "จานรอง", price: 199 },
    { id: "7", name: "ส้มตำ", category: "จานหลัก", price: 59 },
    { id: "8", name: "ปอเปี๊ยะทอด", category: "ของว่าง", price: 199 },
    { id: "9", name: "ไก่ย่าง", category: "กับข้าว", price: 79 },
    { id: "10", name: "ข้าวเหนียว", category: "อื่นๆ", price: 10 },
    { id: "11", name: "น้ำเปล่า", category: "เครื่องดื่ม", price: 15 },
  ];
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
  await fetchAllFood().then(updateFood);
}

export async function deleteFood(id: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    console.log(`Deleting food '${id}'...`);
    const foods = await fetchAllFood();
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
