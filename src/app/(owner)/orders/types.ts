import { foodDetailSchema } from "@/lib/food/types";
import { z } from "zod";

export const sessionDetailSchema = z
  .object({
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    isOpen: z.boolean(),
    restaurantId: z.string().uuid(),
  })
  .strict();
export type SessionDetail = z.infer<typeof sessionDetailSchema>;
export const sessionSchema = sessionDetailSchema
  .omit({
    id: true,
    restaurantId: true,
  })
  .strict();
export type Session = z.infer<typeof sessionSchema>;
// model SessionTransaction {
//     id           String   @id @default(uuid())
//     createdAt    DateTime @default(now())
//     updatedAt    DateTime @updatedAt
//     isOpen       Boolean  @default(true)
//     restaurantId String

//     Restaurant Restaurant @relation(fields: [restaurantId], references: [id])
//     Order      Order[]

//     @@index([restaurantId])
//   }

export const orderStatusSchema = z.enum(["PENDING", "COMPLETED", "CANCELLED"]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderDetailSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: orderStatusSchema,
  quantity: z.number(),
  foodItemId: z.string().uuid(),
  sessionTransactionId: z.string().uuid(),
});
export type OrderDetail = z.infer<typeof orderDetailSchema>;
export const orderSchema = orderDetailSchema;
// model Order {
//     id                   String      @id @default(uuid())
//     createdAt            DateTime    @default(now())
//     updatedAt            DateTime    @updatedAt
//     status               OrderStatus @default(PENDING)
//     quantity             Int
//     foodItemId           String
//     sessionTransactionId String

//     FoodItem           FoodItem           @relation(fields: [foodItemId], references: [id])
//     SessionTransaction SessionTransaction @relation(fields: [sessionTransactionId], references: [id])

//     @@index([foodItemId])
//     @@index([sessionTransactionId])
//   }
export const orderWithFoodSchema = orderDetailSchema.extend({
  FoodItem: foodDetailSchema,
});
export type OrderWithFood = z.infer<typeof orderWithFoodSchema>;
