import { PageForm } from "@/components/form/page-form";
import { PageSelector } from "@/components/selector/page-selector";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className="flex items-center justify-between p-4 border-b">
        <PageSelector />

        <div className="flex gap-2">
          <Button variant="outline">Desktop</Button>
          <Button variant="outline">Mobile</Button>
          <Button>Save</Button>
          <Button>Preview</Button>
          <Button>Publish</Button>
        </div>
      </header>
      {children}
    </>
  );
}
