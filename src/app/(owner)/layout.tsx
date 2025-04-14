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

        <div className="fixed top-4 right-4">
          <UserButton />
        </div>
        <main className="container">
          <SidebarTrigger className="fixed top-2 left-2 bg-slate-200 hover:bg-slate-300 z-10" />
          {children}
        </main>
      </SidebarProvider>
    </ClerkProvider>
  );
}
