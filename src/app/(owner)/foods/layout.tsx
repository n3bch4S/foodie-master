import { FoodFormContextProvider } from "@/providers/foods/form";

interface FoodsLayoutProps {
  children: React.ReactNode;
}

export default function FoodsLayout({ children }: FoodsLayoutProps) {
  return <FoodFormContextProvider>{children}</FoodFormContextProvider>;
}
