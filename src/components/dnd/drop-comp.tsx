"use client";
import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";
import { CSSProperties } from "react";

interface DropCompProps extends UseDroppableArguments {
  children?: React.ReactNode;
}

export function DropComp({ id, disabled, data, children }: DropCompProps) {
  const droppableState = useDroppable({ id, disabled, data });
  const style: CSSProperties = {
    borderColor: droppableState.isOver ? "green" : undefined,
  };

  return (
    <div
      ref={droppableState.setNodeRef}
      style={style}
      className="container border-2 rounded-md hover:border-2 hover:border-blue-400"
    >
      {children}
    </div>
  );
}
