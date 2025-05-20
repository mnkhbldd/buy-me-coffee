"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  ArrowDown,
  ChevronDown,
  Copy,
  SquareArrowOutUpRight,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [priceAmount, setPriceAmount] = useState([
    { label: "1$", value: 1, isChecked: false },
    { label: "2$", value: 2, isChecked: false },
    { label: "3$", value: 3, isChecked: false },
    { label: "5$", value: 5, isChecked: false },
    { label: "10$", value: 10, isChecked: false },
  ]);

  const selectedAmount = priceAmount.find((item) => item.isChecked);
  return (
    // flex justify-between items-center px-40 py-2  w-full
    <div className="">
      <div className="flex flex-col gap-6">
        <div className=" p-6 border rounded-[8px]">
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
              <Select onValueChange={(value) => setSelectedDateRange(value)}>
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
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-semibold">Recent transactions</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ChevronDown />
                Amount {selectedAmount ? selectedAmount.label : ""}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Amounts</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {priceAmount.map((item, index) => (
                <DropdownMenuCheckboxItem
                  key={item.value}
                  checked={item.isChecked}
                  onCheckedChange={() => {
                    const updated = priceAmount.map((itm, idx) => ({
                      ...itm,
                      isChecked: idx === index,
                    }));
                    setPriceAmount(updated);
                  }}
                >
                  {item.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col gap-4 p-6 border rounded-[8px]">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] font-normal">Guest</p>
                  <p className="text-[12px]">instagram.com/welesley</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[16px] font-bold">+ $1</p>
                <p className="text-[12px] text-[#71717A]">10 hours ago</p>
              </div>
            </div>
            <p className="text-[14px]">
              Thank you for being so awesome everyday! You always manage to
              brighten up my day when I’m feeling down. Although $1 isn’t that
              much money it’s all I can contribute at the moment Thank you for
              being so awesome everyday! You always manage to brighten up my day
              when I’m feeling down. Although $1 isn’t that much money it’s all
              I can contribute at the moment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
