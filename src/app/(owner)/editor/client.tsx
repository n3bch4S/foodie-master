"use client";

import { EditorCanvas } from "@/components/editor-canvas";
import { EditorSidebar } from "@/components/editor-sidebar";
import { PageSelector } from "@/components/selector/page-selector";
import { Button } from "@/components/ui/button";
import { PageDetail } from "@/lib/page/types";
import { EditorProvider } from "@/providers/editor/editor-provider";

interface ClientPageProps {
  pages: PageDetail[];
}
export function ClientPage(props: ClientPageProps) {
  return (
    <EditorProvider>
      <header className="flex items-center justify-between p-4 border-b">
        <PageSelector pages={props.pages} />

        <div className="flex gap-2">
          <Button>Preview</Button>
          <Button>Save</Button>
        </div>
      </header>
      <div className="w-full h-full flex flex-row">
        <EditorSidebar />
        <EditorCanvas />
      </div>
    </EditorProvider>
  );
}
