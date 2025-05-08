"use client";
import { Button } from "@/components/ui/button";
import { FormCustomInput } from "./FormInput";
import { useRef, useState } from "react";

export const UsernameSection = () => {
  const usernameInputRef = useRef(null);
  const [username, setUsername] = useState("");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-[6px] p-[24px]">
        <p className="text-[24px] font-semibold">Create Your Account</p>
        <p className="text-[12px] font-normal text-[#71717A]">
          Choose a username for your page
        </p>
      </div>
      <div className="px-[24px]">
        <FormCustomInput
          usernameInputRef={usernameInputRef}
          label="Username"
          type="text"
          placeholder="Enter username here"
          error="The username is already taken"
        />
      </div>
      <div className="w-full px-[24px]">
        <Button className="w-full">Continue</Button>
      </div>
    </div>
  );
};
