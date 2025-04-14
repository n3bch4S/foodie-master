import { z } from "zod";

export const restaurantSchema = z
  .object({
    name: z.string(),
    description: z.nullable(z.string()),
    logoKey: z.nullable(z.string()),
  })
  .strict();
export type Restaurant = z.infer<typeof restaurantSchema>;

export const restaurantDetailSchema = restaurantSchema.extend({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
});
export type RestaurantDetail = z.infer<typeof restaurantDetailSchema>;
