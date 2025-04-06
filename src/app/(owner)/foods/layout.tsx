import { FoodProvider } from "@/providers/foods";

interface FoodsLayoutProps {
  children: React.ReactNode;
}

export default function FoodsLayout({ children }: FoodsLayoutProps) {
  return <FoodProvider>{children}</FoodProvider>;
}
