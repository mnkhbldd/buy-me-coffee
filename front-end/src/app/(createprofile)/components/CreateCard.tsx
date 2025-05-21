"use client";
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
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "@/lib/utils";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  country: z.string().min(1, {
    message: "Please select an country.",
  }),
  firstName: z.string().min(5, {
    message: "Please enter the name",
  }),
  lastName: z.string().min(2, {
    message: "Please enter the lastname",
  }),
  cardNumber: z.string().refine((value) => isValidCreditCardNumber(value), {}),
  month: z.string().min(1, {
    message: "Please select month",
  }),
  year: z.string().min(1, {
    message: "Please select year",
  }),
  cvc: z
    .string()
    .min(3, {
      message: "Please write CVC code",
    })
    .max(3, {
      message: "Its not cvc number",
    }),
});

function isValidCreditCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export const CreateCard = () => {
  const router = useRouter();
  const [countryNames, setCountryNames] = useState();

  const fetchCountryNames = async () => {
    try {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      setCountryNames(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCountryNames();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      cardNumber: "",
      month: "",
      year: "",
      cvc: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const [month, year] = [values.month, values.year];
    const expiryDate = new Date(Number(year), Number(month) - 1, 1);

    try {
      const request = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/bankcard`,
        {
          country: values.country,
          firstName: values.firstName,
          lastName: values.lastName,
          cardNumber: values.cardNumber,
          expiryDate: expiryDate,
          cvc: values.cvc,
        },
        {
          withCredentials: true,
        }
      );

      if (!request) {
        console.error("Error in onSubmit:", request);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select country</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(countryNames ?? []).map(
                          (
                            country: { name: { common: string } },
                            index: number
                          ) => (
                            <SelectItem key={index} value={country.name.common}>
                              {country.name.common}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="flex w-full justify-between gap-3">
          <div className=" w-full flex flex-col gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter card number </FormLabel>
                    <FormControl>
                      <Input placeholder="XXXX-XXXX-XXXX-XXXX" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month, index) => (
                              <SelectItem key={index} value={month.toString()}>
                                {month}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from(
                            { length: 11 },
                            (_, i) => new Date().getFullYear() + i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input placeholder="CVC" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-[246px] self-end">
                  Continue
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
