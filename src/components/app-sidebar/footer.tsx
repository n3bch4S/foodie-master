import { UserButton } from "@clerk/nextjs";
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";

export function Footer() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex justify-center">
            <UserButton showName />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
