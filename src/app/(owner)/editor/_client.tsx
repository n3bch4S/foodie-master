"use client";

import { EditorCanvas } from "@/components/editor-canvas";
import { EditorSidebar } from "@/components/editor-sidebar";
import { PageSelector } from "@/components/selector/page-selector";
import { Button } from "@/components/ui/button";
import { deletePage } from "@/lib/page";
import { PageDetail, SiteDetail } from "@/lib/page/types";
import {
  useEditor,
  useEditorDispatch,
} from "@/providers/editor/editor-provider";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

interface ClientPageProps {
  pages: PageDetail[];
  site: SiteDetail;
}
export function ClientPage(props: ClientPageProps) {
  const dispatch = useEditorDispatch();
  const editor = useEditor();
  const router = useRouter();

  useEffect(() => {
    const page = props.pages.find((page) => page.name === editor.currentPage);
    if (!page) return;
    dispatch({ type: "setPageId", setPageId: { pageId: page.id } });
    dispatch({ type: "setDom", setDom: { dom: page.dom } });
  }, [dispatch, editor.currentPage, props.pages]);

  const gotoPageHref = useMemo(() => {
    if (editor.currentPage !== "Order" && editor.currentPage !== "Home")
      return null;
    if (!process.env.NEXT_PUBLIC_SCHEME)
      throw new Error("NEXT_PUBLIC_SCHEME is not defined");
    const scheme = process.env.NEXT_PUBLIC_SCHEME;
    if (!process.env.NEXT_PUBLIC_DOMAIN)
      throw new Error("NEXT_PUBLIC_DOMAIN is not defined");
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    switch (editor.currentPage) {
      case "Home": {
        return `${scheme}${props.site.name}.${domain}`;
      }
      case "Order": {
        return `${scheme}${props.site.name}.${domain}/order`;
      }
    }
  }, [editor.currentPage, props.site.name]);

  return (
    <>
      {editor.isPreview ? (
        <>
          <Button
            className="fixed top-4 right-16"
            onClick={() => {
              dispatch({
                type: "setIsPreview",
                setIsPreview: { isPreview: false },
              });
            }}
          >
            <EyeOff />
          </Button>
          <EditorCanvas />
        </>
      ) : (
        <>
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex flex-row gap-2">
              <PageSelector pages={props.pages} />
              <Button
                variant={"destructive"}
                disabled={
                  editor.currentPage === "Home" ||
                  editor.currentPage === "Order" ||
                  !editor.pageId
                }
                onClick={(e) => {
                  if (!editor.currentPage || !editor.pageId) return;
                  deletePage(editor.currentPage).then(() => {
                    dispatch({
                      type: "changePage",
                      changePage: { page: "Home" },
                    });
                    toast.success("สำเร็จ", {
                      description: `ลบหน้า ${editor.currentPage} แล้ว`,
                    });
                    router.refresh();
                  });
                }}
              >
                <Trash2 />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                disabled={!editor.pageId}
                onClick={() => {
                  dispatch({
                    type: "setIsPreview",
                    setIsPreview: { isPreview: true },
                  });
                }}
              >
                <Eye />
              </Button>
              <Button
                disabled={
                  editor.currentPage !== "Order" &&
                  editor.currentPage !== "Home"
                }
                asChild
              >
                <Link
                  href={gotoPageHref ?? "#"}
                  target={gotoPageHref ? "_blank" : "_self"}
                >
                  ไปที่เว็บไซต์
                </Link>
              </Button>
              <Button
                disabled={!editor.pageId}
                onClick={() => {
                  if (!editor.pageId) return;
                  dispatch({ type: "saveDom" });
                  setTimeout(() => router.refresh(), 1);
                }}
              >
                Save
              </Button>
            </div>
          </header>
          <div className="w-full h-full flex flex-row">
            <EditorSidebar />
            <EditorCanvas />
          </div>
        </>
      )}
    </>
  );
}
