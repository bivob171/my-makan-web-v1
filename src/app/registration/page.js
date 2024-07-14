"use client";

import React from "react";
import { SignupForm } from "../Component/Login/signupForm";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/Component/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/Component/ui/select";
import { BrandLogo } from "@/app/Component/Logo/brand-logo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "../Component/ui/button";
export default function Registration() {
  const router = useRouter();
  const handleBack = () => {
    router.push("/login");
  };
  return (
    <div className="bg-[#2682d5] h-auto 2xl:px-[350px] xl:px-60 xl:py-12 ">
      <div>
        <div className="flex justify-between">
          <div
            onClick={handleBack}
            className="text-white my-auto flex gap-1 align-middle cursor-pointer"
          >
            <ArrowLeft className="w-4" />
            Back
          </div>
          <Select>
            <SelectTrigger className="w-fit px-0 text-md bg-transparent text-white border-0">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Bangla">Bangla</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-[15px] pb-[22px] pt-[12px]">
          <div className="lg:grid lg:grid-cols-2 lg:divide-x md:px- lg:px-2">
            <div className="hidden lg:block  mt-[100px]">
              <Image
                width={450}
                height={450}
                className="w-auto"
                src="/7677.jpg_wh860-removebg-preview.png"
                alt=""
              />
            </div>
            <div>
              <div className=" flex flex-col justify-center lg:px-">
                <CardHeader className="items-center text-center">
                  <BrandLogo />
                  <div>
                    <CardTitle>SingUp your Account</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <SignupForm />
                </CardContent>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 flex justify-between text-white text-sm">
        <div className="flex flex-wrap gap-4">
          <p className="text-white">Privacy</p>
          <p className="text-white">Terms</p>
          <p className="text-white">Contact Us</p>
        </div>
        <p className="text-white">Mymakan LLC © 2024</p>
      </div>
    </div>
  );
}
