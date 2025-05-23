"use client";
import { TagName } from "@/lib/page/types";
import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import { Button } from "../ui/button";

type ImageArgs = {
  src: string;
  alt: string;
};

type ButtonArgs = {
  href: string;
};

interface DragCompProps extends UseDraggableArguments {
  tagName: TagName;
  children?: React.ReactNode;
  imageTag?: ImageArgs;
  buttonTag?: ButtonArgs;
}

export function DragComp({
  id,
  disabled,
  data,
  attributes,
  tagName,
  children,
  imageTag,
  buttonTag,
}: DragCompProps) {
  const dragState = useDraggable({ id, disabled, data, attributes });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(dragState.transform),
  };

  switch (tagName) {
    case "p":
      return (
        <p
          ref={dragState.setNodeRef}
          style={style}
          {...dragState.listeners}
          {...dragState.attributes}
          className={
            "hover:border-2 hover:border-blue-400 flex flex-col justify-center items-center gap-2 p-4 w-full h-8"
          }
        >
          {children}
        </p>
      );
    case "div":
      return (
        <div
          ref={dragState.setNodeRef}
          style={style}
          {...dragState.listeners}
          {...dragState.attributes}
          className="border-2 hover:border-blue-400 flex flex-col justify-center items-center gap-2 p-4 w-full h-8"
        >
          {children}
        </div>
      );
    case "button":
      return (
        <Button
          ref={dragState.setNodeRef}
          style={style}
          {...dragState.listeners}
          {...dragState.attributes}
          onClick={() => 1}
          className="bg-blue-950"
        >
          {children}
        </Button>
      );
    case "order": {
      return (
        <div
          ref={dragState.setNodeRef}
          style={style}
          {...dragState.listeners}
          {...dragState.attributes}
          className="flex justify-center items-center border-4 border-slate-200 border-dotted h-16"
        >
          เมนูออเดอร์
        </div>
      );
    }
  }
}
