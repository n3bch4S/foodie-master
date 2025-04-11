"use client";

import { createPublicSession } from "@/app/(owner)/orders/action";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FoodDetail } from "@/lib/food/types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface ClientPageProps {
  foods: FoodDetail[];
  children?: React.ReactNode;
}
export function ClientPage(props: ClientPageProps) {
  const searchParams = useSearchParams();
  const sessionId = useMemo(() => {
    return searchParams.get("sessionId");
  }, [searchParams]);

  if (!sessionId) {
    return <NoSessionPage foods={props.foods} />;
  }

  return (
    <>
      {props.foods.map((food) => {
        return <FoodCard key={food.id} food={food}></FoodCard>;
      })}
    </>
  );
}

interface NoSessionPageProps {
  foods: FoodDetail[];
  children?: React.ReactNode;
}
export function NoSessionPage(props: NoSessionPageProps) {
  const { foods } = useMemo(() => {
    return props;
  }, [props]);
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <h1 className="text-slate-400 text-lg">ไม่พบเซสชั่น</h1>
      <Button
        variant={"ghost"}
        className="w-32 h-32 border-2 border-dashed rounded-lg text-slate-600"
        onClick={async () => {
          if (foods.length === 0) {
            toast.warning("ไม่สำเร็จ", {
              description: "โปรดสร้างอาหารก่อน",
            });
          }
          const rtrId = foods[0].restaurantId;
          const ssn = await createPublicSession(rtrId);
          router.push("/order?sessionId=" + ssn.id);
        }}
      >
        สร้างเซสชั่น
      </Button>
      {props.children}
    </div>
  );
}

interface FoodCardProps {
  food: FoodDetail;
  children?: React.ReactNode;
}
function FoodCard(props: FoodCardProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const food = useMemo(() => {
    return props.food;
  }, [props.food]);

  return (
    <div className="w-4/5 flex flex-row rounded-lg bg-pink-50 border-2 border-rose-400">
      <div className="size-32">
        {food.imageKey ? (
          <AspectRatio>
            <Image
              src={getImageUrl(food.imageKey)}
              alt={food.name}
              fill
              sizes={"10vw"}
              className="object-cover rounded-lg"
            />
          </AspectRatio>
        ) : (
          <div className="h-full w-full bg-slate-100 flex justify-center items-center text-slate-400 text-sm">
            ไม่มีรูป
          </div>
        )}
      </div>
      <div className="flex w-1/2 flex-col justify-center px-4">
        <p className="text-4xl">{food.name}</p>
        <p className="text-sm text-slate-400 italic">{food.category}</p>
        <p className="underline text-slate-600">฿{food.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <Label htmlFor={`quantity-${food.id}`}>จำนวน</Label>
          <Input
            id={`quantity-${food.id}`}
            type="number"
            value={quantity}
            className="w-16"
            onChange={(e) => {
              const quan = parseInt(e.target.value);
              if (quan < 1) {
                return;
              }
              setQuantity(parseInt(e.target.value));
            }}
          />
        </div>
        <Button
          variant={"ghost"}
          className="border-2 bg-lime-50 border-lime-600"
        >
          สั่งซื้อ
        </Button>
      </div>
      {props.children}
    </div>
  );
}

function getImageUrl(key: string): string {
  const appId = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID;
  if (!appId) {
    throw new Error("NEXT_PUBLIC_UPLOADTHING_APP_ID is not defined");
  }
  return `https://${appId}.ufs.sh/f/${key}`;
}
