import { EditorCanvas } from "@/components/editor-canvas";
import { EditorSidebar } from "@/components/editor-sidebar";

export default async function Editor() {
  return (
    <div className="w-full h-full flex flex-row">
      <EditorSidebar />
      <EditorCanvas />
    </div>
  );
}
