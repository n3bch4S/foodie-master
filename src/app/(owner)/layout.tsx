import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Header />
      <Separator />
      {children}
    </ClerkProvider>
  );
}
