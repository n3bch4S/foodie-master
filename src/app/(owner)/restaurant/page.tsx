import { RestaurantForm } from "@/components/form/restaurant-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRestaurant } from "@/lib/restaurant";
import { Restaurant } from "@/lib/restaurant/types";

export default async function Page() {
  const restaurant: Restaurant | undefined = await getRestaurant().then(
    (maybeRestaurant) => {
      return maybeRestaurant
        ? {
            name: maybeRestaurant.name,
            description: maybeRestaurant.description,
            logoKey: maybeRestaurant.logoKey,
          }
        : undefined;
    }
  );
  return (
    <div className="w-96 p-4">
      <Card>
        <CardHeader>
          <CardTitle>ร้านอาหารของคุณ</CardTitle>
          <CardDescription>โปรดกรอกรายละเอียดร้านอาหารของคุณ</CardDescription>
        </CardHeader>
        <CardContent>
          <RestaurantForm restaurant={restaurant} />
        </CardContent>
      </Card>
    </div>
  );
}
