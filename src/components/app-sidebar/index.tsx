import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { CustomeSidebarHeader } from "./sidebar-header";
import { CustomSidebarFooter } from "./sidebar-footer";
import { SidebarGroupApplication } from "./sidebar-group-application";

export function AppSidebar() {
  return (
    <Sidebar>
      <CustomeSidebarHeader />
      <SidebarContent>
        <SidebarGroupApplication />
      </SidebarContent>
      <CustomSidebarFooter />
    </Sidebar>
  );
}
