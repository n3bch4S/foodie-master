import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="fixed top-4 left-4 bg-blue-400 hover:bg-blue-300" />
        <main>{children}</main>
      </SidebarProvider>
    </ClerkProvider>
  );
}
