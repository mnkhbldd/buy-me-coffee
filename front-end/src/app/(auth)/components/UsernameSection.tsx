"use client";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { CircleCheck } from "lucide";
import { CircleCheckIcon } from "lucide-react";

interface UsernameSectionProps {
  usernameRef: React.RefObject<HTMLInputElement | null>;
  error: { username?: string };
  onClick: () => void;
}

export const UsernameSection = ({
  usernameRef,
  error,
  onClick,
}: UsernameSectionProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-[6px] p-[24px]">
        <p className="text-[24px] font-semibold">Create Your Account</p>
        <p className="text-[12px] font-normal text-[#71717A]">
          Choose a username for your page
        </p>
      </div>
      <div className="px-[24px]">
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-medium">Username</p>
          <Input
            ref={usernameRef}
            className={`w-[335px] placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal font-normal  ${
              error.username ? "border-[#EF4444]" : ""
            }`}
            placeholder="Enter username here"
            type="email"
          />
          {error.username && (
            <div className="flex gap-1 items-center">
              <CircleCheckIcon className="size-[14px] text-[#EF4444]" />
              <p className="text-[12px] font-normal text-[#EF4444]">
                {error.username}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full px-[24px]">
        <Button
          onClick={onClick}
          className={`w-full !hover:none hover:bg-* hover:cursor-pointer ${
            error ? "bg-gray-300 text-white" : "bg-black text-white"
          }`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
