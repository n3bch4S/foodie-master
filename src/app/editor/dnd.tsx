"use client";
import { DndContext, UniqueIdentifier } from "@dnd-kit/core";
import { DragNDrop } from "./drag-n-drop";
import { useState } from "react";

export function Dnd() {
  const [div1Parent, setDiv1Parent] = useState<UniqueIdentifier | null>(null);

  return (
    <DndContext
      onDragEnd={({ over }) => {
        setDiv1Parent(over ? over.id : null);
      }}
    >
      {div1Parent === null ? <DragNDrop id={1}>div1</DragNDrop> : null}
      <DragNDrop id={2}>
        div2{div1Parent === 2 ? <DragNDrop id={1}>div1</DragNDrop> : null}
      </DragNDrop>
      <DragNDrop id={3}>div3</DragNDrop>
    </DndContext>
  );
}
