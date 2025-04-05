import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <Header />
          <Separator />
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ClerkProvider>
  );
}
