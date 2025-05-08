import { Input } from "@/components/ui/input";
import { on } from "events";
import { CircleCheck } from "lucide-react";
import React from "react";

type FormInputProps = {
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  usernameInputRef?: React.RefObject<HTMLInputElement | null>;
  
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormCustomInput = ({
  label,
  type,
  placeholder,
  error,
  usernameInputRef,
 
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] font-medium">{label}</p>
      <Input
        ref={usernameInputRef}
        className={`w-[335px] placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal ${
          error ? "border-[#EF4444]" : ""
        }`}
        placeholder={placeholder}
        type={type}
      />
      {error && (
        <div className="flex gap-1 items-center">
          <CircleCheck className="size-[14px] text-[#EF4444]" />
          <p className="text-[12px] font-normal text-[#EF4444]">{error}</p>
        </div>
      )}
    </div>
  );
};
