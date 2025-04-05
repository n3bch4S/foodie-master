"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

const restaurantFormSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อร้านอาหาร" }),
  description: z.optional(z.string()),
  logoKey: z.optional(z.string()),
});
type RestaurantForm = z.infer<typeof restaurantFormSchema>;

export function RestaurantForm() {
  const form = useForm<RestaurantForm>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues: {
      name: "",
      description: "",
      logoKey: "",
    },
  });

  function onSubmit(values: RestaurantForm) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อร้านอาหาร</FormLabel>
              <FormControl>
                <Input placeholder="Foodie Master" {...field} />
              </FormControl>
              <FormDescription>
                ชื่อร้านอาหารที่จะแสดงในเว็บไซต์ของคุณ
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>คำอธิบายร้านอาหาร</FormLabel>
              <FormControl>
                <Input placeholder="เปิดมาแล้วกว่า 50 ปี" {...field} />
              </FormControl>
              <FormDescription>
                อธิบายเกี่ยวกับร้านอาหารของคุณ เช่น ประวัติความเป็นมา
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <UploadButton
          endpoint="restaurantLogo"
          onClientUploadComplete={(res) => {
            form.setValue("logoKey", res[0].key);
            toast.success("อัปโหลดสำเร็จ");
          }}
          onUploadError={() => {
            toast.error("อัปโหลดไม่สำเร็จ");
          }}
        />
        <Button type="submit">บันทึก</Button>
      </form>
    </Form>
  );
}
