import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CameraIcon } from "lucide-react";

export const CreateProfile = () => {
  return (
    <div className="flex  flex-col gap-6 w-[510px]">
      <p className="text-[24px] font-semibold">Complete your profile</p>
      <div className="flex flex-col gap-3">
        <p className="text-[14px] font-medium">Add photo</p>
        <div className="w-[160px] h-[160px] rounded-full border-dashed border flex items-center justify-center">
          <CameraIcon className="text-gray-400" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-medium">Name</p>
          <Input
            className="w-full placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal font-normal "
            placeholder="Enter your name here"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-medium">About</p>
          <textarea
            className="border rounded-[6px] w-full h-[131px] text-[14px] placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal font-normal p-2 resize-none align-top"
            placeholder="Write about yourself here"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-medium">Social media URL</p>
          <Input
            className="w-full placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal font-normal "
            placeholder="https://"
          />
        </div>
      </div>
      <Button className="w-[246px] self-end">Continue</Button>
    </div>
  );
};
