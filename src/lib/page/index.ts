"use server";

import { UniqueIdentifier } from "@dnd-kit/core";
import { PrismaClient } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { z } from "zod";

const basePageSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    innerText: z.optional(z.string()),
  })
  .strict();
export type Page = z.infer<typeof basePageSchema> & { children: Page[] };
const pageSchema: z.ZodType<Page> = basePageSchema
  .extend({
    children: z.lazy(() => pageSchema.array()),
  })
  .strict();

const pageDetailSchema = z
  .object({
    id: z.string().uuid(),
    dom: pageSchema,
    updateAt: z.date(),
    siteId: z.string().uuid(),
  })
  .strict();
type PageDetail = z.infer<typeof pageDetailSchema>;

const db = new PrismaClient();

function toPageDetail(value: unknown): PageDetail {
  const tryParse = pageDetailSchema.safeParse(value);
  if (!tryParse.success)
    throw new Error(`Can't parse value to PageDetail: ${tryParse.error}`);
  return tryParse.data;
}
// TODO: continue tomorrow
// export async function createPage(): Promise<PageDetail> {
//   return await db.page.create({data: {}})
// };

// export async function createDom(dom: Page, siteId: string): Promise<PageDetail> {
//   return await db.dom
//     .create({ data: { dom, siteId } })
//     .then((mightDom) =>
//       mightDom ? toDomDetail(mightDom) : Promise.reject(`Can't create DOM`)
//     );
// }

// export async function getDomDetail(siteId: string): Promise<PageDetail> {
//   return await db.dom
//     .findFirst({
//       where: { siteId },
//     })
//     .then((mightDom) =>
//       mightDom ? toDomDetail(mightDom) : Promise.reject(`No DOM found`)
//     );
// }

export async function getLatestPage(
  ownerId: string,
  siteId: string
): Promise<PageDetail> {
  return db.domStack
    .findFirst({
      include: { page: { include: { site: true } } },
      where: { page: { siteId, site: { ownerId } } },
    })
    .then((mightPage) => {
      return mightPage
        ? toPageDetail(mightPage)
        : Promise.reject(`Can't find page`);
    });
}

// export async function updateDomDetail(): Promise<DomDetail> {
//   return await db.dom.update({ data: {}, where: { id } });
// }

function findIn(component: Page, id: UniqueIdentifier): Page | null {
  if (component.id === id) return component;
  if (component.children.length === 0) return null;
  const foundChild = component.children.find(
    (child) => findIn(child, id) !== null
  );
  if (foundChild) return findIn(foundChild, id);
  return null;
}

function findParentIn(component: Page, id: UniqueIdentifier): Page | null {
  if (component.children.length === 0) return null;
  const foundChild = component.children.find((child) => child.id === id);
  if (foundChild) return component;
  const foundGrandChild = component.children.find(
    (child) => findIn(child, id) !== null
  );
  if (foundGrandChild) return findParentIn(foundGrandChild, id);
  return null;
}

function deepClone(component: Page): Page {
  return {
    ...component,
    children: component.children.map(deepClone),
  } as Page;
}

export async function moveComponent(
  component: Page,
  childId: UniqueIdentifier,
  newParentId: UniqueIdentifier
): Promise<Page> {
  const newComponent = deepClone(component);
  const oldParent = findParentIn(newComponent, childId);
  if (!oldParent)
    return Promise.reject(`Can't find parent of component id ${childId}`);
  const newParent = findIn(newComponent, newParentId);
  if (!newParent)
    return Promise.reject(`Can't find new parent id ${newParentId}`);
  if (oldParent.id === newParent.id) return newComponent;
  const child = findIn(oldParent, childId);
  if (!child) return Promise.reject(`Can't find child with id ${childId}`);

  newParent.children.push(child);
  oldParent.children = oldParent.children.filter(
    (child) => child.id !== childId
  );
  return newComponent;
}
