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
import React, { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { editRestaurant } from "@/lib/restaurant";
import { Restaurant } from "@/lib/restaurant/types";

const restaurantFormSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อร้านอาหาร" }),
  description: z.optional(z.string()),
  logoKey: z.optional(z.string()),
});
type RestaurantForm = z.infer<typeof restaurantFormSchema>;

async function onSubmit(values: RestaurantForm): Promise<void> {
  await editRestaurant({
    name: values.name,
    description: values.description ?? null,
    logoKey: values.logoKey ?? null,
  })
    .then((rtrDetail) => {
      toast.success("สำเร็จ", { description: `บันทึก ${rtrDetail.name}` });
    })
    .catch(() => {
      toast.error(`ไม่สำเร็จ`, { description: `โปรดลองใหม่อีกครั้ง` });
    });
}
function toUTUrl(key: string): string {
  return `https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh/f/${key}`;
}

interface RestaurantFormProps {
  restaurant?: Restaurant;
}

export function RestaurantForm({ restaurant }: RestaurantFormProps) {
  const [logoName, setLogoName] = useState<string | null>(null);
  const [logoKey, setLogoKey] = useState<string | null>(
    restaurant ? restaurant.logoKey : null
  );
  const form = useForm<RestaurantForm>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues: restaurant
      ? {
          name: restaurant.name,
          description: restaurant.description ?? undefined,
          logoKey: restaurant.logoKey ?? undefined,
        }
      : undefined,
  });

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
        <div className="flex gap-4 items-center justify-center">
          <div className="w-32">
            <AspectRatio>
              {logoKey ? (
                <Image
                  src={toUTUrl(logoKey)}
                  alt="โลโก้ร้านอาหาร"
                  fill
                  sizes="10vw"
                  className="rounded-md object-cover border-4"
                  priority
                />
              ) : (
                <div className="w-full h-full border-4 rounded-md flex justify-center items-center text-slate-400">
                  ไม่มีโลโก้
                </div>
              )}
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <p>{logoName}</p>
            <UploadButton
              endpoint="restaurantLogo"
              onClientUploadComplete={(res) => {
                form.setValue("logoKey", res[0].key);
                setLogoName(res[0].name);
                setLogoKey(res[0].key);
                toast.success("อัปโหลดสำเร็จ");
              }}
              onUploadError={() => {
                toast.error("อัปโหลดไม่สำเร็จ");
              }}
            />
          </div>
        </div>
        <Button type="submit">บันทึก</Button>
      </form>
    </Form>
  );
}
