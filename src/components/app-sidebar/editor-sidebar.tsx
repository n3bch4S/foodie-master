"use client";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { DragComp } from "../dnd/drag-comp";

export function EditorSidebar() {
  const pathname = usePathname();

  return (
    pathname.includes("/editor") && (
      <SidebarGroup>
        <SidebarGroupLabel>แอปพลิเคชัน</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <DragComp tagName="p" id="side_p">
                ข้อความ
              </DragComp>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  );
}
