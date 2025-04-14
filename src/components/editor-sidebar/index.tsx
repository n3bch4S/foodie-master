"use client";

import { DragComp } from "../dnd/drag-comp";

export function EditorSidebar() {
  return (
    <div className="flex flex-col gap-4 p-4 border-2 rounded-md w-64 h-full">
      <DragComp tagName="p" id="p">
        ข้อความ
      </DragComp>
      <DragComp tagName="div" id="div">
        กล่อง
      </DragComp>
      <DragComp tagName="button" id="button">
        ลิงก์
      </DragComp>
      <DragComp tagName="order" id="order">
        เมนูออเดอร์
      </DragComp>
    </div>
  );
}
