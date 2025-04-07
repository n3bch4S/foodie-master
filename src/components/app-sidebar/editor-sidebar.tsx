"use client";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";

export function EditorSidebar() {
  const pathname = usePathname();

  return (
    pathname.includes("/editor") && (
      <SidebarGroup>
        <SidebarGroupLabel>แอปพลิเคชัน</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>h1</SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  );
}
