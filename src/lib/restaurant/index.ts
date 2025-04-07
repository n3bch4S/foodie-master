"use server";
import { PrismaClient } from "@prisma/client";
import { Restaurant, RestaurantDetail } from "./types";
import { auth } from "@clerk/nextjs";
import { SiteDetail } from "../page/types";

const db = new PrismaClient();

export async function createSite(): Promise<SiteDetail> {
  return await getRestaurant()
    .then((maybeRtr) => {
      if (!maybeRtr) throw new Error(`Restaurant not found`);
      return maybeRtr;
    })
    .then(async (rtr) => {
      return {
        rtr,
        maybeSite: await db.site.findFirst({ where: { restaurantId: rtr.id } }),
      };
    })
    .then(async ({ rtr, maybeSite }) => {
      if (!maybeSite)
        return await db.site.create({
          data: { name: rtr.name, restaurantId: rtr.id },
        });
      throw new Error(`Site already exists for restaurant ${rtr.name}`);
    });
}

export async function getSite(): Promise<SiteDetail | null> {
  return await getRestaurant()
    .then((maybeRtr) => {
      if (!maybeRtr) throw new Error(`Restaurant not found`);
      return maybeRtr;
    })
    .then(async (rtr) => {
      return await db.site.findFirst({ where: { restaurantId: rtr.id } });
    });
}

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
    })
    .then(async (rtr) => {
      await createSite();
      return rtr;
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
    .then(async (rtr) => {
      return {
        rtr,
        maybeSite: await db.site.findFirst({ where: { restaurantId: rtr.id } }),
      };
    })
    .then(async ({ rtr, maybeSite }) => {
      if (!maybeSite) {
        await createSite();
      }
      return rtr;
    })
    .then(async (rtr) => {
      return await db.restaurant.update({
        where: { id: rtr.id },
        data: {
          name,
          description: description ?? rtr.description,
          logoKey: logoKey ?? rtr.logoKey,
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
