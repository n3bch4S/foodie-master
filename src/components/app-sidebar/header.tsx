import Link from "next/link";
import { SidebarHeader, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";

export function Header() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href="/">Foodie Master</Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
