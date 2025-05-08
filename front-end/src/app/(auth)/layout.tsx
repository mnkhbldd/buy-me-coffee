import { Coffee } from "lucide";
import { CoffeeIcon } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-full gap-[20px]">
      <div className="bg-[#FBBF24] w-[50%] h-screen flex flex-col items-center justify-center relative">
        <div className="flex gap-2 absolute top-[32px] left-[108px]">
          <CoffeeIcon />
          <p className="text-[16px] font-bold">Buy Me Coffee</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-[40px]">
          <Image
            alt="icon"
            height={240}
            width={240}
            className="w-[240px] h-[240px] "
            src={"/coffee.png"}
          ></Image>
          <div className="flex flex-col gap-3">
            <p className="text-[24px] font-bold self-center">
              Fund your creative work
            </p>
            <p className="text-[16px] font-normal text-center self-center w-[455px]">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
