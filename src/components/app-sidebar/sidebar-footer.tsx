import { UserButton } from "@clerk/nextjs";
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
export function CustomSidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <UserButton />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
