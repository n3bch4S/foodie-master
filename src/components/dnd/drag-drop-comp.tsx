"use client";
import { TagName } from "@/lib/page/types";
import {
  useDraggable,
  UseDraggableArguments,
  useDroppable,
  UseDroppableArguments,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { CSSProperties } from "react";

type ImageArgs = {
  src: string;
  alt: string;
};

interface DragDropCompProps
  extends UseDroppableArguments,
    UseDraggableArguments {
  tagName: TagName;
  innerText?: string;
  imageTag?: ImageArgs;
  children?: React.ReactNode;
}

export function DragDropComp({
  id,
  disabled,
  data,
  attributes,
  tagName,
  innerText,
  imageTag,
  children,
}: DragDropCompProps) {
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

  switch (tagName) {
    case "p": {
      return (
        <p
          ref={(element) => {
            dragState.setNodeRef(element);
            dropState.setNodeRef(element);
          }}
          {...dragState.listeners}
          // {...dragState.attributes}
          style={style}
          className="hover:border-2"
        >
          {innerText}
        </p>
      );
    }
    case "div": {
      return (
        <div
          ref={(element) => {
            dragState.setNodeRef(element);
            dropState.setNodeRef(element);
          }}
          {...dragState.listeners}
          // {...dragState.attributes}
          style={style}
          className="border-2"
        >
          {innerText}
        </div>
      );
    }
    case "button": {
      return (
        <button
          ref={(element) => {
            dragState.setNodeRef(element);
            dropState.setNodeRef(element);
          }}
          {...dragState.listeners}
          // {...dragState.attributes}
          style={style}
        >
          {innerText}
        </button>
      );
    }
    case "image": {
      return <Image src={imageTag!.src} alt={imageTag!.alt} />;
    }
  }

  return (
    <div
      ref={(element) => {
        dragState.setNodeRef(element);
        dropState.setNodeRef(element);
      }}
      {...dragState.listeners}
      // {...dragState.attributes}
      style={style}
    >
      {children}
    </div>
  );
}
