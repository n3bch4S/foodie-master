import { z } from "zod";

export const foodSchema = z
  .object({
    name: z.string(),
    category: z.string(),
    price: z.number().nonnegative(),
    imageKey: z.string().nullable(),
    isActive: z.boolean(),
  })
  .strict();
export type Food = z.infer<typeof foodSchema>;

export const foodDetailSchema = foodSchema
  .extend({
    id: z.string().uuid(),
    restaurantId: z.string().uuid(),
  })
  .strict();
export type FoodDetail = z.infer<typeof foodDetailSchema>;

// model FoodItem {
//     id           String  @id @default(uuid())
//     name         String
//     category     String
//     price        Decimal
//     imageKey     String?
//     isActive     Boolean @default(true)
//     restaurantId String

//     Restaurant Restaurant @relation(fields: [restaurantId], references: [id])
//     Order      Order[]

//     @@index([restaurantId])
//   }
