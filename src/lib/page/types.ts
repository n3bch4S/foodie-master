import { z } from "zod";

export const baseDomSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    innerText: z.optional(z.string()),
  })
  .strict();
export type Dom = z.infer<typeof baseDomSchema> & { children: Dom[] };
export const domSchema: z.ZodType<Dom> = baseDomSchema
  .extend({
    children: z.lazy(() => domSchema.array()),
  })
  .strict();

export const pageDetailSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    dom: domSchema,
    siteId: z.string().uuid(),
  })
  .strict();
export type PageDetail = z.infer<typeof pageDetailSchema>;

export const pageSchema = pageDetailSchema.omit({ id: true });
export type Page = z.infer<typeof pageSchema>;
