import { ClerkProvider, UserButton } from "@clerk/nextjs";
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
        <SidebarTrigger className="fixed top-4 left-4 bg-slate-200 hover:bg-slate-300 z-10" />
        <div className="fixed top-4 right-4">
          <UserButton />
        </div>
        <main className="container">{children}</main>
      </SidebarProvider>
    </ClerkProvider>
  );
}
