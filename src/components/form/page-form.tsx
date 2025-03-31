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
import { createPage } from "@/lib/page";
import { toast } from "sonner";

const formSchema = z.object({
  pageName: z.string().min(1, { message: "กรุณากรอกชื่อหน้า" }),
});
type Form = z.infer<typeof formSchema>;

export function PageForm() {
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createPage({
      name: values.pageName,
      dom: { id: "1", innerText: "test", children: [] },
      siteId: crypto.randomUUID(),
    }).catch((err) => {
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
