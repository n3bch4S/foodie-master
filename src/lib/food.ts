// "use server";

// import { currentUser } from "@clerk/nextjs/server";
// import { PrismaClient } from "@prisma/client";
// import { Decimal } from "@prisma/client/runtime/library";
// import { UTApi } from "uploadthing/server";

// export type FoodDetail = {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   imageKey?: string;
//   isActive: boolean;
//   ownerId: string;
// };

// export type Food = Omit<FoodDetail, "id" | "ownerId">;
// type UndefToNull<T> = T extends undefined ? null : T;
// type NumToDec<T> = T extends number ? Decimal : T;
// type ToDb<T> = NumToDec<T> extends T ? UndefToNull<T> : NumToDec<T>;
// type DbFood = {
//   [Property in keyof FoodDetail]-?: ToDb<FoodDetail[Property]>;
// };

// const prisma = new PrismaClient();
// const utapi = new UTApi();

// function transformFood(dbFood: DbFood): FoodDetail {
//   return {
//     ...dbFood,
//     price: dbFood.price.toNumber(),
//     imageKey: dbFood.imageKey ?? undefined,
//   };
// }

// export async function createFood(food: Food): Promise<FoodDetail> {
//   console.log("Creating food", food);
//   const user = await currentUser().catch((error) =>
//     console.error(`Failed to get current user `, error)
//   );
//   if (!user) return Promise.reject(`ไม่พบผู้ใช้`);

//   const newFood = await prisma.foodItem
//     .create({ data: { ...food, ownerId: user.id } })
//     .catch((error) => {
//       console.error(`Failed to create food`, error);
//       return null;
//     });
//   if (!newFood) return Promise.reject("ระบบไม่สามารถบันทึกอาหารได้");

//   console.log("Food created with id ", newFood.id);
//   return transformFood(newFood);
// }

// export async function fetchFoods(): Promise<FoodDetail[]> {
//   console.log("Fetching foods");
//   const user = await currentUser().catch((error) =>
//     console.error(`Failed to get current user `, error)
//   );
//   if (!user) return Promise.reject(`ไม่พบผู้ใช้ในระบบตอนนี้`);

//   const foods = await prisma.foodItem
//     .findMany({ where: { ownerId: user.id } })
//     .catch((error) => {
//       console.error(`Failed to fetch foods `, error);
//       return null;
//     });
//   if (!foods) return Promise.reject(`ระบบไม่สามารถโหลดรายการอาหารได้`);

//   console.log(`Fetched foods successfully with length`, foods.length);
//   return foods.map(transformFood);
// }

// export async function fetchFood(id: string): Promise<FoodDetail> {
//   console.log(`Fetching food `, id);
//   const food = await prisma.foodItem
//     .findUnique({ where: { id } })
//     .catch((error) => console.error(`Failed to fetch food `, error));
//   if (!food) return Promise.reject(`ไม่พบอาหาร`);

//   console.log(`Fetch food successfully `, food);
//   return transformFood(food);
// }

// export async function editFood(id: string, newFood: Food): Promise<FoodDetail> {
//   console.log(`Editing food `, id);
//   const updatedFood = await prisma.foodItem
//     .update({ where: { id }, data: newFood })
//     .catch((error) => console.error(`Failed to update food `, error));
//   if (!updatedFood) return Promise.reject(`ไม่สามารถแก้ไขอาหารได้`);

//   console.log(`Successfully edit food `, updatedFood);
//   return transformFood(updatedFood);
// }

// export async function deleteFood(id: string): Promise<FoodDetail> {
//   console.log(`Deleting food `, id);
//   const deletedFood = await prisma.foodItem
//     .delete({ where: { id } })
//     .catch((error) => console.error(`Failed to delete food `, error));
//   if (!deletedFood) return Promise.reject(`ลบอาหารไม่สำเร็จ`);

//   if (deletedFood.imageKey) {
//     console.log(`Deleting food image `, deletedFood.imageKey);
//     await utapi
//       .deleteFiles(deletedFood.imageKey)
//       .catch((error) => console.error(`Failed to delete food image `, error));
//   }

//   console.log(`Successfully delete`, deletedFood);
//   return transformFood(deletedFood);
// }
