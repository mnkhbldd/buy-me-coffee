"use client";
import { ChevronDown, CoffeeIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";

type NavBarProps = {
  pathname: string;
  className: string;
};

export const NavBar = ({ pathname, className }: NavBarProps) => {
  const { profile, handleLogOut } = useContext(AuthContext);
  const router = useRouter();
  return (
    <div
      className={
        `flex justify-between items-center px-40 py-2 w-full fixed z-50 ` +
        className
      }
    >
      <div className="flex gap-2">
        <CoffeeIcon />
        <p className="text-[16px] font-bold">Buy Me Coffee</p>
      </div>

      {pathname === "/login" || pathname === "/signup" ? (
        <Button
          onClick={() =>
            router.push(pathname === "/login" ? "/signup" : "/login")
          }
        >
          {pathname === "/login" ? "Signup" : "Login"}
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={
                profile?.avatarImage
                  ? profile?.avatarImage
                  : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center">
                <p className="w-[83px] text-start font-medium text-[14px]">
                  {profile?.name ? profile?.name : "Unkown"}
                </p>
                <ChevronDown className="size-[16px]" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {profile?.name ? (
                <DropdownMenuItem onClick={handleLogOut}>
                  Log out
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => router.push("/login")}>
                  Log in
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
