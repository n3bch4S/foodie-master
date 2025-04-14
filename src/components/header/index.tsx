import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { badgeVariants } from "../ui/badge";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
  return (
    <div className="flex justify-between gap-4 p-4">
      <Link href="/" className={badgeVariants()}>
        Foodie Master
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <Link href="/foods" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                รายการอาหาร
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/editor" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                หน้าเว็บไซต์
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button>เข้าสู่ระบบ</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
