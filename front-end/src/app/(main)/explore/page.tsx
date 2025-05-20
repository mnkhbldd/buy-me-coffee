import { Input } from "@/components/ui/input";

import { Search, SquareArrowOutUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Explore() {
  const about =
    "All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.";
  const splittedAbout = about.slice(0, 245);
  return (
    <div className="flex flex-col gap-6">
      <div className="gap-6 flex flex-col ">
        <p className="text-[20px] font-semibold">Explore creators</p>
        <div className="flex items-center gap-[10px] border rounded-[8px] px-3">
          <Search className="size-[16px]" />
          <Input
            placeholder="Search name"
            className="border-none shadow-none outline-none focus-visible:ring-0"
          />
        </div>
      </div>
      <div className="flex gap-5 p-6 border rounded-[8px]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-[20px] font-semibold">Space ranger</p>
            </div>
            <Button className="text-black bg-[#F4F4F5]">
              View profile{" "}
              <SquareArrowOutUpRight className="size-[16px] text-black" />
            </Button>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col w-[420px] gap-2">
              <p className="text-[20px] font-semibold">About Space ranger</p>
              <p className="text-[14px]">
                {splittedAbout}
                {about.length > 245 ? "..." : ""}
              </p>
            </div>
            <div className="flex flex-col w-[420px] gap-2">
              <p className="text-[20px] font-semibold">Social media URL</p>
              <p className="text-[14px]">http:/test.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
