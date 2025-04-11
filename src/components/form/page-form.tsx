"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createPage } from "@/lib/page";
import {
  useEditor,
  useEditorDispatch,
} from "@/providers/editor/editor-provider";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  pageName: z.string().min(1, { message: "กรุณากรอกชื่อหน้า" }),
});
type Form = z.infer<typeof formSchema>;

export function PageForm() {
  const editor = useEditor();
  const dispatch = useEditorDispatch();
  const router = useRouter();
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createPage(values.pageName, "CUSTOM")
      .then((pageDetail) => {
        dispatch({
          type: "setIsOpenDialog",
          setIsOpenDialog: { isOpen: false },
        });
        dispatch({ type: "changePage", changePage: { page: pageDetail.name } });
        dispatch({ type: "setPageId", setPageId: { pageId: pageDetail.id } });
        router.refresh();
        toast.success(`สร้างหน้าสำเร็จ`, { description: pageDetail.name });
      })
      .catch((err) => {
        toast.error(`สร้างหน้าไม่สำเร็จ`, { description: err.message });
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pageName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อหน้า</FormLabel>
                <FormControl>
                  <Input placeholder="หน้าหลัก..." {...field} />
                </FormControl>
                <FormDescription>
                  ชื่อนี้จะถูกใช้เป็น URL ของหน้านี้
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">บันทึก</Button>
        </form>
      </Form>
    </>
  );
}
