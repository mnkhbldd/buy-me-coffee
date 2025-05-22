"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CameraIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { uploadImage } from "@/app/utils/image-upload";
import { axiosInstance } from "@/lib/utils";

interface Types {
  handleNextPage: () => void;
  className: string;
  isSettings: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter name",
  }),
  about: z
    .string()
    .min(10, {
      message: "about must be at least 10 characters.",
    })
    .max(160, {
      message: "about must not be longer than 30 characters.",
    }),
  socialMediaURL: z.string().url({ message: "Please enter URL Link" }).min(10, {
    message: "Please enter link",
  }),
  avatarImage: z
    .union([
      z.string().min(1, { message: "Please upload your image" }),
      z.instanceof(File),
    ])
    .refine(
      (val) => {
        if (typeof val === "string") return val.length > 0;
        if (val instanceof File) return val.size > 0;
        return false;
      },
      { message: "Please upload your image" }
    ),
});

export const CreateProfile = ({
  handleNextPage,
  className,
  isSettings,
}: Types) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
      socialMediaURL: "",
      avatarImage: "",
    },
  });
  const [file, setFile] = useState<File>();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!file) {
        console.error("No image was uploaded");
        return;
      }

      const imageUrl = await uploadImage(file);

      if (!imageUrl) {
        console.error("Failed to upload image.");
        return;
      }

      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/profile`,
        {
          name: values.name,
          about: values.about,
          socialMediaURL: values.socialMediaURL,
          avatarImage: imageUrl,
        },
        { withCredentials: true }
      );

      if (response) {
        handleNextPage();
      } else console.error("Error in onSubmit:", response);

      console.log(values);
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };
  return (
    <div className={`flex  flex-col gap-6 w-[510px] ` + className}>
      <p className="text-[24px] font-semibold">Complete your profile</p>
      <div className="flex flex-col gap-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="avatarImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Photo</FormLabel>
                  <FormControl>
                    {field.value ? (
                      <div className="relative w-[160px] h-[160px]">
                        <img
                          src={
                            typeof field.value === "string"
                              ? field.value
                              : URL.createObjectURL(field.value)
                          }
                          alt="Avatar"
                          className="w-full h-full object-cover rounded-full border"
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="absolute top-0 right-0 size-[160px] rounded-full bg-transparent"
                          onClick={() =>
                            form.setValue("avatarImage", "", {
                              shouldValidate: true,
                            })
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <Input
                          type="file"
                          accept="image/*"
                          className={`w-[160px] h-[160px] border-dashed rounded-full text-transparent cursor-pointer ${
                            form.formState.errors.avatarImage
                              ? "border-red-500"
                              : ""
                          }`}
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            const file = target.files?.[0];
                            if (file) {
                              try {
                                form.setValue("avatarImage", file, {
                                  shouldValidate: true,
                                });
                                setFile(file);
                              } catch (error) {
                                console.error(
                                  "Error setting avatarImage in form",
                                  error
                                );
                              }
                            } else {
                              try {
                                form.setValue("avatarImage", "", {
                                  shouldValidate: true,
                                });
                              } catch (error) {
                                console.error(
                                  "Error setting avatarImage to empty string in form",
                                  error
                                );
                              }
                            }
                          }}
                        />
                        <CameraIcon className="text-gray-400 absolute left-1/5 top-[45%]" />
                      </div>
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="flex flex-col gap-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="flex flex-col gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="socialMediaURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isSettings === true ? (
                <Button type="submit" className="w-full self-end">
                  Save changes
                </Button>
              ) : (
                <Button type="submit" className="w-[246px] self-end">
                  Continue
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
