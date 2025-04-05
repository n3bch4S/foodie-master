import { AppWindow, ChartNoAxesCombined, ChefHat } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "จัดการอาหาร",
    url: "/foods",
    icon: ChefHat,
  },
  {
    title: "ออกแบบเว็บไซต์",
    url: "/editor",
    icon: AppWindow,
  },
  {
    title: "รายงาน",
    url: "/report",
    icon: ChartNoAxesCombined,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>แอปพลิเคชัน</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
