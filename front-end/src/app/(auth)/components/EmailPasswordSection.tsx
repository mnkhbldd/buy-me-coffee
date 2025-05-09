"use client";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { CircleCheck } from "lucide";
import { CircleCheckIcon } from "lucide-react";
import { on } from "events";

interface EmailPasswordSectionProps {
  emailRef: React.RefObject<HTMLInputElement | null>;
  passwordRef: React.RefObject<HTMLInputElement | null>;
  username: string;
  error: { email?: string; password?: string };
  onClick: () => void;
}

export const EmailPasswordSection = ({
  emailRef,
  passwordRef,
  username,
  error,
  onClick,
}: EmailPasswordSectionProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-[6px] p-[24px]">
        <p className="text-[24px] font-semibold">Welcome, {username}</p>
        <p className="text-[12px] font-normal text-[#71717A]">
          Connect email and set a password
        </p>
      </div>
      <div className="px-[24px] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-medium">Email</p>
          <Input
            ref={emailRef}
            className={`w-[335px] placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal font-normal ${
              error.email ? "border-[#EF4444]" : ""
            }`}
            placeholder="Enter email here"
            type="email"
          />
          {error.email && (
            <div className="flex gap-1 items-center">
              <CircleCheckIcon className="size-[14px] text-[#EF4444]" />
              <p className="text-[12px] font-normal text-[#EF4444]">
                {error.email}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-medium">Password</p>
          <Input
            ref={passwordRef}
            className={`w-[335px] placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal font-normal ${
              error.password ? "border-[#EF4444]" : ""
            }`}
            placeholder="Enter username here"
            type="password"
          />
          {error.password && (
            <div className="flex gap-1 items-center">
              <CircleCheckIcon className="size-[14px] text-[#EF4444]" />
              <p className="text-[12px] font-normal text-[#EF4444]">
                {error.password}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full px-[24px]">
        <Button onClick={onClick} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
};
