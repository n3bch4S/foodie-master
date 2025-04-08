import {
  AppWindow,
  ChartNoAxesCombined,
  ShoppingBag,
  Store,
  Utensils,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

export function SidebarGroupApplication() {
  return (
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
  );
}

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
