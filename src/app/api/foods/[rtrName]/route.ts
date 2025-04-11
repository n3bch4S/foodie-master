import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = {
  rtrName: string;
};
export async function GET(_req: Request, ctx: { params: Params }) {
  const { rtrName } = ctx.params;
  const foods = await db.foodItem.findMany({
    where: { Restaurant: { name: rtrName } },
  });
  const newFoods = foods.map((food) => {
    return { ...food, price: food.price.toNumber() };
  });

  return NextResponse.json({ foods: newFoods });
}
