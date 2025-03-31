"use server";

import { DropComp } from "@/components/dnd/drop-comp";
import { DragDropComp } from "@/components/dnd/drag-drop-comp";
import { Dom } from "./types";

function renderComponentHelper(component: Dom): React.ReactNode {
  if (component.id === "root" && component.children.length === 0) return null;
  if (component.id === "root" && component.children.length > 0)
    return (
      <DropComp id={component.id}>
        body
        {component.children.map((child) => renderComponentHelper(child))}
      </DropComp>
    );
  return (
    <DragDropComp key={component.id} id={component.id}>
      {component.innerText ? component.innerText : null}
      {component.children.map((child) => renderComponentHelper(child))}
    </DragDropComp>
  );
}

export async function renderComponent(
  component: Dom
): Promise<React.ReactNode> {
  return renderComponentHelper(component);
}
