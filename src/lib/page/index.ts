"use server";

import { UniqueIdentifier } from "@dnd-kit/core";
import { PrismaClient } from "@prisma/client";
import { Dom, domSchema, PageDetail, PageType, SiteDetail } from "./types";
import { auth } from "@clerk/nextjs";
import { CUSTOM_PAGE_DOM, HOME_PAGE_DOM, ORDER_PAGE_DOM } from "./constants";
import { getRestaurant } from "../restaurant";

const db = new PrismaClient();

async function safeCreateSite(): Promise<SiteDetail> {
  return getRestaurant()
    .then((maybeRestaurant) => {
      if (!maybeRestaurant) throw new Error("Restaurant not found");
      return maybeRestaurant;
    })
    .then((restaurant) => {
      return {
        restaurant,
        maybeSite: db.site.findFirst({
          where: { restaurantId: restaurant.id },
        }),
      };
    })
    .then(({ restaurant, maybeSite }) => {
      if (!maybeSite)
        return db.site.create({
          data: { name: restaurant.name, restaurantId: restaurant.id },
        });
      return maybeSite;
    })
    .then((maybeSite) => {
      if (!maybeSite) throw new Error("Site not found");
      return maybeSite;
    });
}

async function validateNonCreatePage(
  siteId: string,
  name: string
): Promise<void> {
  console.log(`validate page ${name} not created for site`, siteId);
  await db.page.findFirst({ where: { name, siteId } }).then((page) => {
    if (page) {
      throw new Error(`Page with name ${name} already exists`);
    }
  });
  console.log(`page ${name} not created for site`, siteId);
}

function findDom(type: PageType): Dom {
  switch (type) {
    case "HOME":
      return HOME_PAGE_DOM;
    case "ORDER":
      return ORDER_PAGE_DOM;
    case "CUSTOM":
      return CUSTOM_PAGE_DOM;
  }
}

export async function createPage(
  name: string,
  type: PageType
): Promise<PageDetail> {
  return await getRestaurant()
    .then((maybeRtr) => {
      if (!maybeRtr) throw new Error("Restaurant not found");
      return maybeRtr;
    })
    .then((rtr) => {
      return { rtr, maybePage: db.page.findFirst({ where: { name } }) };
    })
    .then(({ rtr, maybePage }) => {
      if (!maybePage)
        return db.page.create({
          data: { name, type, dom: findDom(type), siteId: rtr.id },
        });
      throw new Error(`Page with name ${name} already exists`);
    })
    .then((maybePage) => {
      return {
        ...maybePage,
        type: maybePage.type.valueOf() as PageType,
        dom: domSchema.parse(maybePage.dom),
      };
    });
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
