"use client";

import { DragComp } from "../dnd/drag-comp";

export function EditorSidebar() {
  return (
    <div className="flex flex-col gap-4 p-4 border-2 rounded-md w-64 h-full">
      <DragComp tagName="p" id="p">
        text
      </DragComp>
      <DragComp tagName="div" id="div">
        div
      </DragComp>
    </div>
  );
}
