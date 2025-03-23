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
      className="container border-4 rounded-3xl"
    >
      {children}
    </div>
  );
}
