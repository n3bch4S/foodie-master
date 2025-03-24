"use client";
import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";

interface DragCompProps extends UseDraggableArguments {
  children?: React.ReactNode;
}

export function DragComp({ id, children }: DragCompProps) {
  const dragState = useDraggable({ id });

  return (
    <button
      ref={dragState.setNodeRef}
      {...dragState.listeners}
      {...dragState.attributes}
    >
      {children}
    </button>
  );
}
