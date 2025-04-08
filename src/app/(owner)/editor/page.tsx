import { EditorCanvas } from "@/components/editor-canvas";
import { EditorSidebar } from "@/components/editor-sidebar";

export default async function Editor() {
  return (
    <div className="container flex flex-row gap-1 p-4">
      <EditorSidebar />
      <EditorCanvas />
    </div>
  );
}
