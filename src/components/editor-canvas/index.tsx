"use client";

import { Dom } from "@/lib/page/types";
import { useEditor } from "@/providers/editor/editor-provider";
import { DropComp } from "../dnd/drop-comp";
import { DragDropComp } from "../dnd/drag-drop-comp";

export function EditorCanvas() {
  const editor = useEditor();

  return renderComponent(editor.dom);
}

function renderComponent(component: Dom): React.ReactNode {
  if (component.id === "root" && component.children.length === 0)
    return <DropComp id={component.id} />;
  if (component.id === "root" && component.children.length > 0)
    return (
      <DropComp id={component.id}>
        {component.children.map((child) => renderComponent(child))}
      </DropComp>
    );

  if (component.canHaveChildren)
    return (
      <DragDropComp
        key={component.id}
        id={component.id}
        tagName={component.tagName}
        innerText={component.innerText}
      >
        {component.children.map((child) => renderComponent(child))}
      </DragDropComp>
    );
  return (
    <DragDropComp
      key={component.id}
      id={component.id}
      tagName={component.tagName}
      innerText={component.innerText}
    />
  );
}
