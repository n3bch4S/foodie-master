"use server";
import { PrismaClient } from "@prisma/client";
import { Restaurant, RestaurantDetail } from "./types";
import { auth } from "@clerk/nextjs";

const db = new PrismaClient();

export async function createRestaurant({
  name,
  description,
  logoKey,
}: Restaurant): Promise<RestaurantDetail> {
  const { userId } = auth();
  if (!userId) throw new Error(`User not authenticated`);
  return await db.restaurant
    .findFirst({ where: { ownerId: userId } })
    .then((maybeRestaurant) => {
      if (maybeRestaurant) throw new Error(`User already has a restaurant`);
    })
    .then(async () => {
      return await db.restaurant.create({
        data: { name, description, logoKey, ownerId: userId },
      });
    });
}

export async function editRestaurant({
  name,
  description,
  logoKey,
}: Restaurant): Promise<RestaurantDetail> {
  const { userId } = auth();
  if (!userId) throw new Error(`User not authenticated`);
  return await db.restaurant
    .findFirst({ where: { ownerId: userId } })
    .then(async (maybeRestaurant) => {
      if (!maybeRestaurant) {
        return await createRestaurant({ name, description, logoKey });
      }
      return maybeRestaurant;
    })
    .then(async (restaurant) => {
      return await db.restaurant.update({
        where: { id: restaurant.id },
        data: {
          name,
          description: description ?? restaurant.description,
          logoKey: logoKey ?? restaurant.logoKey,
        },
      });
    });
}

export async function getRestaurant(): Promise<RestaurantDetail | null> {
  const { userId } = auth();
  if (!userId) throw new Error(`User not authenticated`);
  return await db.restaurant
    .findFirst({ where: { ownerId: userId } })
    .then(async (maybeRestaurant) => {
      if (!maybeRestaurant) {
        return null;
      }
      return maybeRestaurant;
    });
}

// model Restaurant {
//     id          String  @id @default(uuid())
//     name        String
//     description String?
//     logoKey     String?
//     ownerId     String

//     FoodItem           FoodItem[]
//     SessionTransaction SessionTransaction[]
//     Site               Site?
//   }
