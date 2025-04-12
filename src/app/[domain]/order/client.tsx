"use client";

import { createPublicSession } from "@/app/(owner)/orders/action";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FoodDetail } from "@/lib/food/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createOrder, getOrdersOfSession, OrderWithName } from "./action";
import { Separator } from "@/components/ui/separator";
import { OrderDetail, SessionDetail } from "@/app/(owner)/orders/types";
import { ReceiptText, UtensilsCrossed } from "lucide-react";
import { renderDom } from "../client";
import { PageDetail } from "@/lib/page/types";

interface ClientPageProps {
  foods: FoodDetail[];
  sessions: SessionDetail[];
  page: PageDetail;
  children?: React.ReactNode;
}
export function ClientPage(props: ClientPageProps) {
  const searchParams = useSearchParams();
  const sessionId = useMemo(() => {
    return searchParams.get("sessionId");
  }, [searchParams]);
  const groupedFoods = useMemo(() => {
    return getFoodsAsGroup(props.foods);
  }, [props.foods]);
  const foundSession = useMemo(() => {
    return props.sessions.find((session) => session.id === sessionId);
  }, [props.sessions, sessionId]);
  const isSessionClose = useMemo(() => {
    if (!foundSession) {
      return false;
    }
    return !foundSession.isOpen;
  }, [foundSession]);

  if (!sessionId || !foundSession || isSessionClose) {
    return <NoSessionPage foods={props.foods} />;
  }

  return (
    <>
      {renderDom(
        props.page.dom,
        <div className="flex flex-col w-4/5">
          <Receipt sessionId={sessionId} />
          {Object.entries(groupedFoods).map(([groupName, foods]) => {
            return (
              <div className="flex flex-col gap-8" key={groupName}>
                <FoodGroup
                  foods={foods}
                  groupName={groupName}
                  sessionId={sessionId}
                />
                <Separator />
              </div>
            );
          })}
        </div>
      )}
      <>
        {/* <Receipt sessionId={sessionId} />
        {Object.entries(groupedFoods).map(([groupName, foods]) => {
          return (
            <div className="flex flex-col gap-8" key={groupName}>
              <FoodGroup
                foods={foods}
                groupName={groupName}
                sessionId={sessionId}
              />
              <Separator />
            </div>
          );
        })} */}
      </>
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
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center bg-slate-800">
      <h1 className="text-slate-400 text-lg">
        ไม่พบเซสชั่น หรือเซสชั่นปิดแล้ว
      </h1>
      <Button
        variant={"ghost"}
        className="w-32 h-32 border-2 border-blue-400 border-dashed rounded-lg text-slate-600 bg-slate-100"
        onClick={async () => {
          if (foods.length === 0) {
            toast.warning("ไม่สำเร็จ", {
              description: "ร้านนี้ไม่มีอาหาร",
            });
            return;
          }
          const rtrId = foods[0].restaurantId;
          const ssn = await createPublicSession(rtrId);
          router.push("/order?sessionId=" + ssn.id);
        }}
      >
        <UtensilsCrossed />
        สร้างเซสชั่น
      </Button>
      {props.children}
    </div>
  );
}

interface ReceiptProps {
  sessionId: string;
  children?: React.ReactNode;
}
function Receipt(props: ReceiptProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderWithName[] | null>(null);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(e) => {
          getOrdersOfSession(props.sessionId).then((orders) => {
            setOrders(orders);
            setOpen(e);
          });
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant={"secondary"}
            className="size-16 rounded-full fixed bottom-4 right-4"
          >
            <ReceiptText />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>รายการที่สั่ง</DialogTitle>
          </DialogHeader>
          <OrderList orders={orders ?? []} />
        </DialogContent>
      </Dialog>
    </>
  );
}

interface OrderListProps {
  orders: OrderWithName[];
  children?: React.ReactNode;
}
function OrderList(props: OrderListProps) {
  const orders = useMemo(() => {
    return props.orders;
  }, [props.orders]);
  return (
    <>
      {orders.map((order) => {
        return (
          <div
            key={order.id}
            className="border-b-2 flex flex-row justify-evenly"
          >
            <p className="w-2/5">{order.FoodItem.name}</p>
            <p>x{order.quantity}</p>
            <p>เมื่อ {order.createdAt.toLocaleTimeString()}</p>
            <p>{mapStatus(order.status)}</p>
          </div>
        );
      })}
    </>
  );
}

interface FoodGroupProps {
  foods: FoodDetail[];
  groupName: string;
  sessionId: string;
  children?: React.ReactNode;
}
function FoodGroup(props: FoodGroupProps) {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2 className="w-4/5 text-6xl m-4">{props.groupName}</h2>
        {props.foods.map((food) => {
          return (
            <FoodCard key={food.id} food={food} sessionId={props.sessionId} />
          );
        })}
      </div>
    </>
  );
}

interface FoodCardProps {
  food: FoodDetail;
  sessionId: string;
  children?: React.ReactNode;
}
function FoodCard(props: FoodCardProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
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
              className="object-cover rounded-l-lg"
            />
          </AspectRatio>
        ) : (
          <div className="h-full w-full rounded-l-lg bg-slate-100 flex justify-center items-center text-slate-400 text-sm">
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

        <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
          <AlertDialogTrigger asChild>
            <Button
              variant={"ghost"}
              className="border-2 bg-lime-50 border-lime-600"
            >
              สั่งซื้อ
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ต้องการสั่ง {food.name} จำนวน {quantity} หรือไม่?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  createOrder(props.sessionId, food.id, quantity)
                    .then((order) => {
                      toast.success("สำเร็จ", {
                        description: `สั่ง ${food.name} จำนวน ${quantity} เรียบร้อย`,
                      });
                    })
                    .catch((e) => {
                      toast.error("ไม่สำเร็จ", {
                        description: e.message,
                      });
                    });
                }}
              >
                ยืนยันการสั่ง
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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

function getFoodsAsGroup(foods: FoodDetail[]): {
  [key: string]: FoodDetail[];
} {
  const groupMap = new Map<string, FoodDetail[]>();
  foods.forEach((food) => {
    const { category } = food;
    if (groupMap.has(category)) {
      const foodGroup = groupMap.get(category);
      if (!foodGroup) {
        throw new Error("Food group is not found");
      }
      groupMap.set(category, [...foodGroup, food]);
    } else {
      groupMap.set(category, [food]);
    }
  });
  return Object.fromEntries(groupMap.entries());
}

function mapStatus(status: OrderDetail["status"]): string {
  switch (status) {
    case "PENDING":
      return "กำลังรอ";
    case "COMPLETED":
      return "เสร็จสิ้น";
    case "CANCELLED":
      return "ยกเลิก";
    default:
      return status;
  }
}
