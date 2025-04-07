import {
  AppWindow,
  ChartNoAxesCombined,
  ShoppingBag,
  Store,
  Utensils,
} from "lucide-react";
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
import { Header } from "./header";
import { Footer } from "./footer";
import { EditorSidebar } from "./editor-sidebar";

const items = [
  {
    title: "ร้านอาหารของคุณ",
    url: "/restaurant",
    icon: Store,
  },
  {
    title: "เมนูอาหาร",
    url: "/foods",
    icon: Utensils,
  },
  {
    title: "ออกแบบเว็บไซต์",
    url: "/editor",
    icon: AppWindow,
  },
  {
    title: "จัดการการสั่งซื้อ",
    url: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "รายงาน",
    url: "/report",
    icon: ChartNoAxesCombined,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="none">
      <Header />
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
        <EditorSidebar />
      </SidebarContent>
      <Footer />
    </Sidebar>
  );
}
