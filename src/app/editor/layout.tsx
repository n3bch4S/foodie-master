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
        {/* Page Selector */}
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="about">About</SelectItem>
            <SelectItem value="contact">Contact</SelectItem>
          </SelectContent>
        </Select>

        {/* Action Buttons */}
        <div className="flex space-x-2">
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
