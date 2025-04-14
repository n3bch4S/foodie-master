"use client";
import { DndContext } from "@dnd-kit/core";

interface DndCtxProps {
  children: React.ReactNode;
}

export function DndCtx({ children }: DndCtxProps) {
  return <DndContext>{children}</DndContext>;
}
