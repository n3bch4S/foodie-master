"use server";

import { UniqueIdentifier } from "@dnd-kit/core";
import { PrismaClient } from "@prisma/client";
import {
  Dom,
  Page,
  PageDetail,
  pageDetailSchema,
  pageSchema,
  SiteDetail,
} from "./types";

const db = new PrismaClient();

function toPageDetail(value: unknown): PageDetail {
  const tryParse = pageDetailSchema.safeParse(value);
  if (!tryParse.success)
    throw new Error(`Can't parse value to PageDetail: ${tryParse.error}`);
  return tryParse.data;
}

// TODO: continue
async function safeFindSite(): SiteDetail {
  // find site by ownerId if no create new site with name "tempName" and ownerId id from clerk

  const site = db.site.findFirst({ where });
}

export async function createPage(name: string): Promise<PageDetail> {
  console.log(`creating page`, name);
  console.log(`created page`, createdPage);
  return createdPage;
}

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
