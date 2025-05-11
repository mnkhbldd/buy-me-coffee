import { Button } from "@/components/ui/button";
import { CoffeeIcon } from "lucide-react";

export default function CreateProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-full">
      <div className="flex justify-between items-center px-40 py-2 fixed w-full">
        <div className="flex gap-2 ">
          <CoffeeIcon />
          <p className="text-[16px] font-bold">Buy Me Coffee</p>
        </div>

        <Button className="w-[83px]">Log out</Button>
      </div>
      {children}
    </section>
  );
}
