"use client";
import React, { useContext, useEffect, useState } from "react";
import { CardHeader } from "@/app/Component/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/Component/ui/select";
import { BrandLogo } from "@/app/Component/Logo/brand-logo";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/Component/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SuccessPopUp } from "../Component/PopUp/SuccessPopUp";
import { PopupContext } from "@/Context/successPopupContext";

export default function ForgotPassword() {
  const router = useRouter();
  const [forgetType, setforgetType] = useState(true);
  const role = forgetType ? "buyer" : "agent";
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  console.log(error);
  const { responseMessage, setResponseMessage, popupMassage, setPopupMassage } =
    useContext(PopupContext);
  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let hasError = false;

      if (!email) {
        setEmailError("Email is required.");
        hasError = true;
      } else {
        setEmailError("");
      }

      if (hasError) {
        return;
      }

      const response = await fetch(
        `https://q4m0gph5-4000.asse.devtunnels.ms/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok === false) {
        setEmailError("Buyer Acount Not Found with this email.");
      } else {
        setResponseMessage("Successfully sent code to your email.");
        router.push("/forgot-password/code-check");
        localStorage.setItem("email", email);
        localStorage.setItem("accountRole", role);
        setPopupMassage(true);
      }
    } catch (error) {
      setEmailError(error.message);
    }
  };
  const handleAgentSubmit = async (e) => {
    e.preventDefault();

    try {
      let hasError = false;

      if (!email) {
        setEmailError("Email is required.");
        hasError = true;
      } else {
        setEmailError("");
      }

      if (hasError) {
        return; // exit function if any of the fields are empty
      }

      const response = await fetch(
        `https://q4m0gph5-4000.asse.devtunnels.ms/auth/agent/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      console.log(response);
      if (response.ok === false) {
        setEmailError("Agent Acount Not Found with this email.");
      } else {
        setResponseMessage("Successfully sent code to your email.");
        router.push("/forgot-password/code-check");
        localStorage.setItem("email", email);
        localStorage.setItem("accountRole", role);
        setPopupMassage(true);
      }
    } catch (error) {
      setEmailError(error.message);
    }
  };

  return (
    <div className="bg-[#2682d5] h-screen 2xl:px-[350px]  xl:px-60 xl:py-12    ">
      <div className="rounded-[15px] ">
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
            <SelectContent className=" border-0">
              <SelectGroup>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Bangla">Bangla</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white h-[500px] rounded-[15px]">
          <div className=" md:px-48 lg:px-2">
            <div className="2xl:px-20 flex flex-col justify-center lg:px-9 ">
              <div>
                <div class="mx-auto max-w-md">
                  <div class="rounded-xl  bg-white shadow-sm">
                    <div class="p-4 sm:p-7">
                      <div class="text-center">
                        <div class="mb-4 inline-block rounded-full bg-blue-200 p-2 text-blue-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                          </svg>
                        </div>
                        <h1 class="block text-2xl font-bold text-gray-800">
                          Forgot password?
                        </h1>
                        <p class="mt-2 text-sm text-gray-600">
                          Don&apos;t worry we&apos;ll send you reset
                          instructions.
                        </p>
                      </div>
                      <div className="mt-[10px]">
                        {forgetType === true ? (
                          <div className="w-full mb-2">
                            <Button className="w-1/2 rounded-r-none text-white">
                              Buyer
                            </Button>
                            <Button
                              onClick={() => setforgetType(false)}
                              className="w-1/2 rounded-l-none border  border-[#2682d5] bg-white  hover:bg-[#1b6cb313] text-[#2682d5]"
                            >
                              Agents
                            </Button>
                          </div>
                        ) : (
                          <div className="w-full mb-2">
                            <Button
                              className="w-1/2 rounded-r-none border border-[#2682d5] bg-white  hover:bg-[#1b6cb313] text-[#2682d5]"
                              onClick={() => setforgetType(true)}
                            >
                              Buyer
                            </Button>
                            <Button className="w-1/2 rounded-l-none text-white">
                              Agents
                            </Button>
                          </div>
                        )}
                      </div>
                      <div class="mt-6">
                        <form>
                          <div class="grid gap-y-4">
                            <div>
                              <label
                                for="email"
                                class="mb-2 block text-sm text-gray-600"
                              >
                                Email address
                              </label>
                              <div class="relative">
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  class="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter Your Email"
                                />
                                <div class="pointer-events-none absolute top-3 right-0 hidden items-center px-3 peer-invalid:flex">
                                  {error !== "" && (
                                    <svg
                                      class="h-5 w-5 text-rose-500"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      viewBox="0 0 16 16"
                                      aria-hidden="true"
                                    >
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  {emailError && (
                                    <p className="text-red-500 text-[13px] mt-[3px]">
                                      {emailError}
                                    </p>
                                  )}
                                </div>

                                <div>
                                  {error !== "" && (
                                    <p
                                      class="mt-2 hidden text-xs text-rose-600 peer-invalid:block"
                                      id="email-error"
                                    >
                                      {error}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {forgetType === true ? (
                              <button
                                type="button"
                                onClick={handleSubmit}
                                class="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Reset password
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={handleAgentSubmit}
                                class="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Reset password
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <p class="mt-3 flex items-center justify-center divide-x divide-gray-300 text-center">
                    <a
                      class="px-3 text-sm text-gray-600 decoration-2 hover:text-blue-600 hover:underline"
                      href="#"
                    >
                      {" "}
                      FAQs{" "}
                    </a>{" "}
                    <span class="inline pr-3 text-sm text-gray-600">
                      Remember your password?
                      <Link
                        class="font-medium text-blue-600 decoration-2 hover:underline"
                        href="/forget"
                      >
                        {" "}
                        Sign in here{" "}
                      </Link>
                    </span>
                    <a
                      class="pl-3 text-sm text-gray-600 decoration-2 hover:text-blue-600 hover:underline"
                      href="#"
                      target="_blank"
                    >
                      {" "}
                      Contact Support{" "}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-between text-white text-sm ">
        <div className="flex flex-wrap gap-4">
          <p className="text-white">Privacy</p>
          <p className="text-white">Terms</p>
          <p className="text-white">Contact Us</p>
        </div>
        <p className="text-white">Mymakan LLC © 2024</p>
      </div>
      <SuccessPopUp
        visible={popupMassage}
        closePopUp={setPopupMassage}
        massage={responseMessage}
      />
    </div>
  );
}
