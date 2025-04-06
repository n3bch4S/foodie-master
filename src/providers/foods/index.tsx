"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface FoodProviderProps {
  children: React.ReactNode;
}

export function FoodProvider({ children }: FoodProviderProps) {
  const form = useForm<FoodForm>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      isActive: true,
    },
  });

  return (
    <FoodContext.Provider value={{ form }}>{children}</FoodContext.Provider>
  );
}

export const foodFormSchema = z.object({
  name: z.string(),
  category: z.string(),
  price: z.coerce.number().nonnegative(),
  imageKey: z.string().optional(),
  isActive: z.boolean(),
});
export type FoodForm = z.infer<typeof foodFormSchema>;

export const FoodContext = createContext<
  { form: UseFormReturn<FoodForm, any, undefined> } | undefined
>(undefined);
