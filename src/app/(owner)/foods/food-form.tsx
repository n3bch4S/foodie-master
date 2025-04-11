"use client";

// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { createFood } from "@/lib/food/index";
// import { FoodForm, useFoodForm } from "@/providers/foods/form";
// import { useMemo, useState } from "react";
// import Image from "next/image";
// import { Switch } from "@/components/ui/switch";
// import { toast } from "sonner";
// import { UploadButton } from "@/lib/uploadthing";
// import { useRouter } from "next/navigation";
// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// export function MultiFoodForm() {
//   const router = useRouter();
//   const [imageName, setImageName] = useState<string | null>(null);
//   const [imageKey, setImageKey] = useState<string | null>(null);
//   const form = useFoodForm();
//   const isDisableButton = useMemo<boolean>(() => {
//     const formValues = form.getValues();
//     return formValues.name === "" || formValues.category === "";
//   }, [form]);

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(() => {
//           submitForm(form.getValues(), router);
//           form.reset();
//         })}
//         className="flex flex-col gap-4"
//       >
//         <FormField
//           control={form.control}
//           name="isActive"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//               <div className="space-y-0.5">
//                 <FormLabel className="text-base">การมองเห็น</FormLabel>
//                 <FormDescription>
//                   หากเปิดอาหารนี้จะแสดงในระบบของคุณ
//                   หากปิดอาหารนี้จะไม่แสดงในระบบของคุณ
//                 </FormDescription>
//               </div>
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <div className="flex gap-4">
//           <div className="size-32">
//             {imageKey ? (
//               <AspectRatio>
//                 <Image
//                   src={toUtUrl(imageKey)}
//                   alt="รูปอาหาร"
//                   fill
//                   sizes="10vw"
//                   className="rounded-md object-cover border-4"
//                 />
//               </AspectRatio>
//             ) : (
//               <div className="w-full h-full rounded-md border-4 flex justify-center items-center">
//                 ไม่มีรูปภาพ
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col gap-4">
//             <FormField
//               control={form.control}
//               name="imageKey"
//               render={() => (
//                 <FormItem>
//                   <FormLabel>อัปโหลดรูป</FormLabel>
//                   <div>{imageName}</div>
//                   <UploadButton
//                     endpoint={"foodImage"}
//                     onClientUploadComplete={([completedFile]) => {
//                       form.setValue("imageKey", completedFile.key);
//                       setImageName(completedFile.name);
//                       setImageKey(completedFile.key);
//                       toast.success("อัปโหลดรูปภาพสำเร็จ");
//                     }}
//                     onUploadError={() => {
//                       toast.error(`อัปโหลดไม่สำเร็จ`, {
//                         description: "โปรดลองอีกครั้ง",
//                       });
//                     }}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>
//         <div className="flex gap-4">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>ชื่อ</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="ส้มตำ..." />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>ประเภท</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="จานหลัก..." />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <FormField
//           control={form.control}
//           name="price"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>ราคา</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" disabled={isDisableButton}>
//           บันทึก
//         </Button>
//       </form>
//     </Form>
//   );
// }

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
import { createFood, editFood } from "@/lib/food";
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
import { Switch } from "@/components/ui/switch";
import { FoodDetail } from "@/lib/food/types";

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
          imageKey: row.original.imageKey ?? undefined,
          isActive: row.original.isActive,
        }
      : {
          name: "",
          category: "",
          price: 0,
          imageKey: undefined,
          isActive: true,
        },
  });
  const router = useRouter();
  const handleCreateFood = useCallback(
    async (value: z.infer<typeof foodFormSchema>) => {
      await createFood({ ...value, imageKey: value.imageKey ?? null })
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
    [router, setIsOpen]
  );
  const handleUpdateFood = useCallback(
    async (value: z.infer<typeof foodFormSchema>) => {
      if (!row) return;
      editFood({ ...value, imageKey: value.imageKey ?? null }, row.original.id)
        .then(() => {
          router.refresh();
          setIsOpen && setIsOpen(false);
          toast.success(`แก้ไขสำเร็จ`);
        })
        .catch((error) => {
          toast.error(`แก้ไขล้มเหลว`, { description: error.message });
        });
    },
    [router, row, setIsOpen]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(row ? handleUpdateFood : handleCreateFood)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">การมองเห็น</FormLabel>
                <FormDescription>
                  หากเปิดอาหารนี้จะแสดงในระบบของคุณ
                  หากปิดอาหารนี้จะไม่แสดงในระบบของคุณ
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
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

// function submitForm(values: FoodForm, router: AppRouterInstance): void {
//   createFood({ ...values, imageKey: values.imageKey ?? null }).then(
//     (newFood) => {
//       toast.success(`สำเร็จ`, { description: `บันทึก ${newFood.name}` });
//       router.refresh();
//     }
//   );
// }

function toUtUrl(key: string): string {
  const appId: string = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID!;
  return `https://${appId}.ufs.sh/f/${key}`;
}
