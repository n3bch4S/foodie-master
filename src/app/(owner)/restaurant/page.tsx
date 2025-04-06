import { RestaurantForm } from "@/components/form/restaurant-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Restaurant() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>ร้านอาหารของคุณ</CardTitle>
          <CardDescription>โปรดกรอกรายละเอียดร้านอาหารของคุณ</CardDescription>
        </CardHeader>
        <CardContent>
          <RestaurantForm />
        </CardContent>
      </Card>
    </>
  );
}
