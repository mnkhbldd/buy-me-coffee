import { NavBar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { CoffeeIcon, SquareArrowOutUpRight } from "lucide-react";

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-full flex flex-col gap-[44px]">
      <NavBar pathname="" className="static" />
      <div className="flex justify-between pt-[44px] w-full px-40">
        <div className="w-[250px]">
          <p className="text-[14px] font-medium px-4 py-2">Home</p>
          <p className="text-[14px] font-medium px-4 py-2"> Explore</p>
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-medium px-4 py-2">View page </p>
            <SquareArrowOutUpRight className="size-[16px] text-black" />
          </div>
          <p className="text-[14px] font-medium px-4 py-2">Account settings</p>
        </div>
        {children}
      </div>
    </section>
  );
}
