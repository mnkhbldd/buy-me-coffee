"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/utils";
import { CircleCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useRef, useState } from "react";

export const LoginPageSection = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<{
    email?: string;
    password?: string;
  }>({});
  const router = useRouter();

  const handleLogin = async () => {
    const email = emailRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value.trim() ?? "";

    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (email === "") {
      newErrors.email = "Enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (password === "") {
      newErrors.password = "Enter your password";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
        { email, password }
      );
      setError({});
      router.push("/");
      return res;
    } catch (err: any) {
      console.error("Check failed", err);
      setError({ password: "Email or Password incorrect." });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-[6px] p-[24px]">
        <p className="text-[24px] font-semibold">Welcome back</p>
      </div>
      <div className="px-[24px] flex flex-col gap-4 pb-[24px]">
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
            placeholder="Enter password here"
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
        <Button onClick={handleLogin} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
};
