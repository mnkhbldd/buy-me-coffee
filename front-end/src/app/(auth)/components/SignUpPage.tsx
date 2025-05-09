"use client";
import { useRef, useState } from "react";
import { EmailPasswordSection } from "./EmailPasswordSection";
import { User } from "lucide";
import { UsernameSection } from "./UsernameSection";
import axios from "axios";
import { axiosInstance } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [pageCount, setPageCount] = useState(0);
  const router = useRouter();

  const handleNextStep = async () => {
    const usernameValue = usernameRef.current?.value.trim() ?? "";

    if (pageCount === 0) {
      if (usernameValue === "") {
        setError({ username: "Enter your username" });
        return;
      }

      try {
        const res = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/checkUser`,
          { username: usernameValue }
        );

        setError({});
        setUsername(usernameValue);
        setPageCount(1);
      } catch (err: any) {
        if (err.response?.status === 409) {
          setError({ username: "This username already exists" });
        } else {
          console.error("Check failed", err);
          setError({ username: "Something went wrong. Try again." });
        }
      }
    }

    if (pageCount === 1) {
      const emailValue = emailRef.current?.value.trim() ?? "";
      const passwordValue = passwordRef.current?.value.trim() ?? "";

      const newErrors: { email?: string; password?: string } = {};

      if (emailValue === "") newErrors.email = "Enter your email";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        newErrors.email = "Enter a valid email";
      }

      if (passwordValue === "") newErrors.password = "Enter your password";

      if (Object.keys(newErrors).length > 0) {
        setError(newErrors);
        return;
      }

      setEmail(emailValue);
      setPassword(passwordValue);

      try {
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
          {
            email: emailValue,
            password: passwordValue,
            username: username,
          }
        );

        setError({});
        router.push("/login");
      } catch (err: any) {
        console.error("Sign up failed", err);
        setError({ email: "Something went wrong. Try again." });
      }
    }
  };

  const pages = [
    <UsernameSection
      usernameRef={usernameRef}
      error={error}
      onClick={handleNextStep}
    />,
    <EmailPasswordSection
      error={error}
      emailRef={emailRef}
      passwordRef={passwordRef}
      username={username}
      onClick={handleNextStep}
    />,
  ][pageCount];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {pages}
    </div>
  );
};
