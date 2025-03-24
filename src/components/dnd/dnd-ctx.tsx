"use client";
import { DndContext } from "@dnd-kit/core";
import { Dom, moveComponent } from "@/lib/dom";

interface DndCtxProps {
  dom: Dom;
  children: React.ReactNode;
}

export function DndCtx({ dom, children }: DndCtxProps) {
  return (
    <DndContext
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) return;
        moveComponent(dom, active.id, over.id);
      }}
    >
      {children}
    </DndContext>
  );
}
