"use client";
import { useEditor } from "@/providers/editor/editor-provider";
import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";
import { CSSProperties } from "react";

interface DropCompProps extends UseDroppableArguments {
  children?: React.ReactNode;
}

export function DropComp({ id, disabled, data, children }: DropCompProps) {
  const droppableState = useDroppable({ id, disabled, data });
  const editor = useEditor();
  const style: CSSProperties = {
    borderColor: droppableState.isOver ? "green" : undefined,
  };

  return (
    <>
      {editor.isPreview ? (
        <div className="container">{children}</div>
      ) : (
        <div
          ref={droppableState.setNodeRef}
          style={style}
          className="container border-2"
        >
          {children}
        </div>
      )}
    </>
  );
}
