"use server";

import { UniqueIdentifier } from "@dnd-kit/core";
import { PrismaClient } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { z } from "zod";

const baseDomSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    innerText: z.optional(z.string()),
  })
  .strict();
export type Dom = z.infer<typeof baseDomSchema> & { children: Dom[] };
const domSchema: z.ZodType<Dom> = baseDomSchema
  .extend({
    children: z.lazy(() => domSchema.array()),
  })
  .strict();

const domDetailSchema = z.object({ id: z.string().uuid(), dom: domSchema });
type DomDetail = z.infer<typeof domDetailSchema>;

const db = new PrismaClient();

function jsonToDomDetail(json: JsonValue): DomDetail {
  const tryParse = domDetailSchema.safeParse(json);
  if (!tryParse.success) throw new Error(`Can't parse JsonValue to DomDetail`);
  return tryParse.data;
}

export async function createDom(): Promise<DomDetail> {
  return await db.dom
    .create({ data: {} })
    .then((domOrNull) =>
      domOrNull ? jsonToDomDetail(domOrNull) : Promise.reject(`No DOM create`)
    );
}

export async function getDomDetail(): Promise<DomDetail> {
  return await db.dom
    .findUnique({
      where: { id: "ebc07756-e210-4b25-9057-8c38711642f9" },
    })
    .then((domOrNull) =>
      domOrNull ? jsonToDomDetail(domOrNull) : Promise.reject(`No DOM found`)
    );
}

function findIn(component: Dom, id: UniqueIdentifier): Dom | null {
  if (component.id === id) return component;
  if (component.children.length === 0) return null;
  const foundChild = component.children.find(
    (child) => findIn(child, id) !== null
  );
  if (foundChild) return findIn(foundChild, id);
  return null;
}

function findParentIn(component: Dom, id: UniqueIdentifier): Dom | null {
  if (component.children.length === 0) return null;
  const foundChild = component.children.find((child) => child.id === id);
  if (foundChild) return component;
  const foundGrandChild = component.children.find(
    (child) => findIn(child, id) !== null
  );
  if (foundGrandChild) return findParentIn(foundGrandChild, id);
  return null;
}

function deepClone(component: Dom): Dom {
  return {
    ...component,
    children: component.children.map(deepClone),
  } as Dom;
}

export async function moveComponent(
  component: Dom,
  childId: UniqueIdentifier,
  newParentId: UniqueIdentifier
): Promise<Dom> {
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
