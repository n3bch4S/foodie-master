"use client";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { DragNDrop } from "./drag-n-drop";
import { useCallback, useMemo, useState } from "react";

interface Component {
  id: UniqueIdentifier;
  innerText?: string;
  children: Component[];
}

function renderComponent(component: Component): React.ReactNode {
  if (component.id === "root" && component.children.length === 0) return null;
  if (component.id === "root" && component.children.length > 0)
    return <>{component.children.map((child) => renderComponent(child))}</>;
  return (
    <DragNDrop key={component.id} id={component.id}>
      {component.innerText ? component.innerText : null}
      {component.children.map((child) => renderComponent(child))}
    </DragNDrop>
  );
}

function findIn(component: Component, id: UniqueIdentifier): Component | null {
  if (component.id === id) return component;
  if (component.children.length === 0) return null;
  const foundChild = component.children.find(
    (child) => findIn(child, id) !== null
  );
  if (foundChild) return findIn(foundChild, id);
  return null;
}

function findParentIn(
  component: Component,
  id: UniqueIdentifier
): Component | null {
  if (component.children.length === 0) return null;
  const foundChild = component.children.find((child) => child.id === id);
  if (foundChild) return component;
  const foundGrandChild = component.children.find(
    (child) => findIn(child, id) !== null
  );
  if (foundGrandChild) return findParentIn(foundGrandChild, id);
  return null;
}

function deepClone(component: Component): Component {
  return {
    ...component,
    children: component.children.map(deepClone),
  } as Component;
}

function moveComponent(
  component: Component,
  childId: UniqueIdentifier,
  newParentId: UniqueIdentifier
): Component {
  const newComponent = deepClone(component);
  const oldParent = findParentIn(newComponent, childId);
  if (!oldParent)
    throw new Error(`Can't find parent of component id ${childId}`);
  const newParent = findIn(newComponent, newParentId);
  if (!newParent) throw new Error(`Can't find new parent id ${newParentId}`);
  if (oldParent.id === newParent.id) return newComponent;
  const child = findIn(oldParent, childId);
  if (!child) throw new Error(`Can't find child with id ${childId}`);

  newParent.children.push(child);
  oldParent.children = oldParent.children.filter(
    (child) => child.id !== childId
  );
  return newComponent;
}

export function Dnd() {
  const [body, setBody] = useState<Component>({
    id: "root",
    children: [
      { id: 0, innerText: "div0", children: [] },
      { id: 1, innerText: "div1", children: [] },
      { id: 2, innerText: "div2", children: [] },
    ],
  });
  const renderedBody = useMemo<React.ReactNode>(
    () => renderComponent(body),
    [body]
  );

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over && active.id !== over.id) {
        const adjustedComponent = moveComponent(body, active.id, over.id);
        setBody(adjustedComponent);
      }
    },
    [body]
  );

  return <DndContext onDragEnd={handleDragEnd}>{renderedBody}</DndContext>;
}
