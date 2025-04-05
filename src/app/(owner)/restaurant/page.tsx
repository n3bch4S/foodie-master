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
      <p>restaurant page name, logo, description</p>
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
