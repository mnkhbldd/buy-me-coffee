import { CoffeeIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavBar = () => {
  return (
    <div className="flex justify-between items-center px-40 py-2  w-full">
      <div className="flex gap-2 ">
        <CoffeeIcon />
        <p className="text-[16px] font-bold">Buy Me Coffee</p>
      </div>
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Select>
          <SelectTrigger className="w-[180px] border-none shadow-none">
            <SelectValue
              className="placeholder:text-black"
              placeholder="Jake"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Logout">Logout</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
