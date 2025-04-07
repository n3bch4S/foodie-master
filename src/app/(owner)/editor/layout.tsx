import { PageSelector } from "@/components/selector/page-selector";
import { Button } from "@/components/ui/button";
import { getPages } from "@/lib/page";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const pages = await getPages();

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b">
        <PageSelector pages={pages} />

        <div className="flex gap-2">
          <Button>Preview</Button>
          <Button>Save</Button>
        </div>
      </header>
      {children}
    </>
  );
}
