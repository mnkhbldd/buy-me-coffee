"use client";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Copy, SquareArrowOutUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    // flex justify-between items-center px-40 py-2  w-full
    <div className="flex justify-between pt-[44px] w-full px-40">
      <div className="w-[250px]">
        <p className="text-[14px] font-medium px-4 py-2">Home</p>
        <p className="text-[14px] font-medium px-4 py-2"> Explore</p>
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-medium px-4 py-2">View page </p>
          <SquareArrowOutUpRight className="size-[16px] text-black" />
        </div>
        <p className="text-[14px] font-medium px-4 py-2">Account settings</p>
      </div>
      <div>
        <div className="w-[1300px] p-6 border rounded-[8px]">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Avatar className="size-[48px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-[16px] font-bold">Jake</p>
                <p className="text-[14px]">buymecoffee.com/baconpancakes1</p>
              </div>
            </div>
            <Button>
              <Copy />
              Share page link
            </Button>
          </div>
          <div className="py-4">
            <Separator className="my-4 border" />
          </div>
          <div className="flex flex-col gap-6">
            {" "}
            <div className="flex gap-4 items-center">
              <p className="text-[20px] font-semibold">Earnings</p>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="alltime">All time</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <p className="text-[36px] font-bold">$450</p>
          </div>
        </div>
        <div>
          <p>Recent transactions</p>
        </div>
      </div>
    </div>
  );
}
