import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CameraIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CreateCard = () => {
  return (
    <div className="flex  flex-col gap-6 w-[510px]">
      <div className="flex flex-col gap-[6px]">
        <p className="text-[24px] font-semibold">
          How would you like to bo paid?
        </p>
        <p className="text-[14px] font-medium text-[#71717A]">
          Enter location and payment details
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-medium">Name</p>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full justify-between gap-3">
          <div className=" w-full flex flex-col gap-2">
            <p className="text-[14px] font-medium">First name</p>
            <Input
              className="w-full placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal font-normal "
              placeholder="Enter your name here"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-[14px] font-medium">Last name</p>
            <Input
              className="w-full placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal font-normal "
              placeholder="Enter your name here"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-[14px] font-medium">Enter card number</p>
          <Input
            className="w-full placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal font-normal "
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-[14px] font-medium">Expires</p>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <SelectItem key={index} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-[14px] font-medium">Year</p>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    "2023",
                    "2024",
                    "2025",
                    "2026",
                    "2027",
                    "2028",
                    "2029",
                    "2030",
                  ].map((year, index) => (
                    <SelectItem key={index} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-[14px] font-medium">CVC</p>
            <Input
              className="w-full placeholder:text-[14px] placeholder:text-[#71717A] placeholder:font-normal font-normal "
              placeholder="CVC"
            />
          </div>
        </div>
      </div>
      <Button className="w-[246px] self-end">Continue</Button>
    </div>
  );
};
