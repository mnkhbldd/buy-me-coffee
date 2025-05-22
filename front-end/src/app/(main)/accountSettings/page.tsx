"use client";

import { CreateCard } from "@/app/(createprofile)/components/CreateCard";
import { CreateProfile } from "@/app/(createprofile)/components/CreateProfile";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  confirmpassword: z.string(),
  successMessage: z.string(),
});

export default function AccountSettings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmpassword: "",
      successMessage: "Thank you for donations etc..",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex flex-col gap-8 w-1/2 items-center">
      <CreateProfile
        handleNextPage={() => {}}
        className="!w-full"
        isSettings={true}
      />
      <div className="p-6 border rounded-[8px] flex flex-col gap-6 w-full">
        <p className="text-[16px] font-bold">Set a new password</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="!w-full">
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <CreateCard className="w-full" isSettings={true} />
      <div className="p-6 border rounded-[8px] flex flex-col gap-6 w-full">
        <p className="text-[16px] font-bold">Success page</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="successMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter sucess message" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
