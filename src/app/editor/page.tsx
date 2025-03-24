import { getDomDetail } from "@/lib/dom";
import { DndCtx } from "./dnd-ctx";
import { renderComponent } from "@/lib/dom/tsx";

export default async function Editor() {
  const domDetail = await getDomDetail();
  const rendered = await renderComponent(domDetail.dom);

  return <DndCtx dom={domDetail.dom}>{rendered}</DndCtx>;
}
