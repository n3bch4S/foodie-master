import { z } from "zod";

export const tagNameSchema = z.enum(["p", "div", "button", "order"]);
export type TagName = z.infer<typeof tagNameSchema>;

export const baseDomSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    tagName: tagNameSchema,
    innerText: z.optional(z.string()),
    url: z.string().optional(),
    canHaveChildren: z.boolean(),
    gap: z.coerce.number().nonnegative().optional(),
    justify: z
      .enum(["justify-start", "justify-center", "justify-end"])
      .optional(),
    items: z.enum(["items-start", "items-center", "items-end"]).optional(),
    padding: z.coerce.number().nonnegative().optional(),
    width: z.coerce.number().nonnegative().optional(),
    height: z.coerce.number().nonnegative().optional(),
    fontFamily: z.enum(["font-sans", "font-serif", "font-mono"]).optional(),
    fontSize: z.coerce.number().nonnegative().optional(),
    textAlign: z
      .enum(["text-left", "text-center", "text-right", "text-justify"])
      .optional(),
    textColor: z.string().length(7).optional(),
    backgroundColor: z.string().length(7).optional(),
  })
  .strict();
export type Dom = z.infer<typeof baseDomSchema> & { children: Dom[] };
export const domSchema: z.ZodType<Dom> = baseDomSchema
  .extend({
    children: z.lazy(() => domSchema.array()),
  })
  .strict();

export const pageTypeEnum = z.enum(["HOME", "ORDER", "CUSTOM"]);
export type PageType = z.infer<typeof pageTypeEnum>;

export const pageDetailSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    type: pageTypeEnum,
    dom: domSchema,
    siteId: z.string().uuid(),
  })
  .strict();
export type PageDetail = z.infer<typeof pageDetailSchema>;

// model Page {
//   id     String   @id @default(uuid())
//   name   String
//   type   PageType
//   dom    Json
//   siteId String

//   site Site @relation(fields: [siteId], references: [id])

//   @@index([siteId])
// }

export const pageSchema = pageDetailSchema.omit({ id: true });
export type Page = z.infer<typeof pageSchema>;

export const siteDetailSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1),
    restaurantId: z.string().uuid(),
  })
  .strict();
export type SiteDetail = z.infer<typeof siteDetailSchema>;

// model Site {
//   id           String @id @default(uuid())
//   name         String
//   restaurantId String @unique

//   Restaurant Restaurant @relation(fields: [restaurantId], references: [id])
//   Page       Page[]

//   @@index([restaurantId])
// }
