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
import { createFood, editFood, FoodDetail } from "@/lib/food";
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getUtUrl } from "./utils";
import { Row } from "@tanstack/react-table";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const foodFormSchema = z.object({
  name: z.string(),
  category: z.string(),
  price: z.coerce.number().nonnegative(),
  imageKey: z.string().optional(),
  isActive: z.boolean(),
});

interface FoodFormProps<TData> {
  row?: Row<TData>;
  setIsOpen?: (open: boolean) => void;
}

export function FoodForm({ row, setIsOpen }: FoodFormProps<FoodDetail>) {
  const [imageName, setImageName] = useState<string>("");
  const form = useForm<z.infer<typeof foodFormSchema>>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: row
      ? {
          name: row.original.name,
          category: row.original.category,
          price: row.original.price,
          imageKey: row.original.imageKey,
          isActive: row.original.isActive,
        }
      : {
          name: undefined,
          category: undefined,
          price: undefined,
          imageKey: undefined,
          isActive: true,
        },
  });
  const router = useRouter();
  const handleCreateFood = useCallback(
    async (value: z.infer<typeof foodFormSchema>) => {
      await createFood({ ...value, isActive: true })
        .then(() => {
          router.refresh();
          setIsOpen && setIsOpen(false);
          toast.success(`บันทึกอาหารสำเร็จ`, { description: value.name });
        })
        .catch((e) => {
          toast.error(`บันทึก "${value.name}" ล้มเหลว`, {
            description: e.message,
          });
        });
    },
    [form, router]
  );
  const handleUpdateFood = useCallback(
    async (value: z.infer<typeof foodFormSchema>) => {
      if (!row) return;
      editFood(row.original.id, { ...value })
        .then(() => {
          router.refresh();
          setIsOpen && setIsOpen(false);
          toast.success(`แก้ไขสำเร็จ`);
        })
        .catch((error) => {
          toast.error(`แก้ไขล้มเหลว`, { description: error.message });
        });
    },
    [form, router, row]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(row ? handleUpdateFood : handleCreateFood)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-4">
          {form.getValues("imageKey") ? (
            <div className="size-32">
              <AspectRatio>
                <Image
                  src={getUtUrl(form.getValues().imageKey ?? "")}
                  alt="รูปอาหาร"
                  fill
                  sizes="10vw"
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          ) : (
            <div className="size-32 rounded border-4 border-slate-200 border-dashed" />
          )}
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="imageKey"
              render={() => (
                <FormItem>
                  <FormLabel>อัปโหลดรูป</FormLabel>
                  <div>{imageName}</div>
                  <UploadButton
                    endpoint={"foodImage"}
                    onClientUploadComplete={([completedFile]) => {
                      form.setValue("imageKey", completedFile.key);
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
            form.getValues().imageKey === ""
          }
        >
          บันทึก
        </Button>
      </form>
    </Form>
  );
}
