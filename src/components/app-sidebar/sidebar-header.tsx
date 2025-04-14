import Link from "next/link";
import { SidebarHeader, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";

export function CustomeSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex justify-center">
            <Link href="/">Foodie Master</Link>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
