"use client";
import {
  useDraggable,
  UseDraggableArguments,
  useDroppable,
  UseDroppableArguments,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";

interface DragNDropProps extends UseDroppableArguments, UseDraggableArguments {
  children?: React.ReactNode;
}

export function DragNDrop({
  id,
  disabled,
  data,
  attributes,
  children,
}: DragNDropProps) {
  const dropState = useDroppable({
    id,
    disabled,
    data,
  });
  const dragState = useDraggable({ id, disabled, data, attributes });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(dragState.transform),
    borderColor: dropState.isOver ? "green" : undefined,
  };

  return (
    <div
      ref={(element) => {
        dragState.setNodeRef(element);
        dropState.setNodeRef(element);
      }}
      {...dragState.listeners}
      // {...dragState.attributes}
      style={style}
      className="border-4 rounded-3xl p-4 m-4"
    >
      {children}
    </div>
  );
}
