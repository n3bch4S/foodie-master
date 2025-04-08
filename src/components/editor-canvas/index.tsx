"use client";

import { Dom } from "@/lib/page/types";
import { useEditor } from "@/providers/editor/editor-context";
import { DropComp } from "../dnd/drop-comp";
import { DragDropComp } from "../dnd/drag-drop-comp";

export function EditorCanvas() {
  const editor = useEditor();
  console.log(editor.dom);

  return renderComponent(editor.dom);
}

function renderComponentHelper(component: Dom): React.ReactNode {
  if (component.id === "root" && component.children.length === 0)
    return <DropComp id={component.id} />;
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

export function renderComponent(component: Dom): React.ReactNode {
  return renderComponentHelper(component);
}
