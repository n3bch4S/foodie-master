"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createFood } from "@/lib/food";
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const foodFormSchema = z.object({
  name: z.string(),
  category: z.string(),
  price: z.coerce.number().nonnegative(),
  imageUrl: z.string().url(),
});

export function FoodForm() {
  const [imageName, setImageName] = useState<string>("");
  const form = useForm<z.infer<typeof foodFormSchema>>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      imageUrl: "",
    },
  });
  const router = useRouter();

  const onSubmit = useCallback(
    async (values: z.infer<typeof foodFormSchema>) => {
      await createFood(values)
        .then(() => {
          form.reset(form.formState.defaultValues);
          setImageName("");
          toast.success(`บันทึก "${values.name}" สำเร็จ`);
          router.refresh();
        })
        .catch((e) => {
          toast.error(`บันทึก "${values.name}" ล้มเหลว ${e}`);
        });
    },
    [form, router]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-4">
          {form.getValues("imageUrl") ? (
            <Image
              src={form.getValues("imageUrl")}
              alt="food image"
              width={64}
              height={64}
              className="size-32"
            />
          ) : (
            <div className="size-32 rounded border-4 border-slate-200 border-dashed" />
          )}
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormLabel>อัปโหลดรูป</FormLabel>
                  <div>{imageName}</div>
                  <UploadButton
                    endpoint={"foodImage"}
                    onClientUploadComplete={([completedFile]) => {
                      form.setValue("imageUrl", completedFile.ufsUrl);
                      setImageName(completedFile.name);
                      toast.success("อัปโหลดรูปภาพสำเร็จ");
                    }}
                    onUploadError={() => {
                      toast.error(`อัปโหลดไม่สำเร็จ`, {
                        description: "โปรดลองอีกครั้ง",
                      });
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อ</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ส้มตำ..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ประเภท</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="จานหลัก..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ราคา</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            form.getValues().name === "" ||
            form.getValues().category === "" ||
            form.getValues().imageUrl === ""
          }
        >
          บันทึก
        </Button>
      </form>
    </Form>
  );
}
