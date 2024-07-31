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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function EmailChange() {
  const router = useRouter();
  const [forgetType, setforgetType] = useState(true);
  const role = forgetType ? "buyer" : "agent";
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailNew, setEmailNew] = useState("");
  const [emailNewError, setEmailNewError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  console.log(error);
  const { responseMessage, setResponseMessage, popupMassage, setPopupMassage } =
    useContext(PopupContext);
  const handleBack = () => {
    router.back();
  };

  const [showPassword, setShowPassword] = useState(false);

  const show = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let hasError = false;

      if (!email) {
        setEmailError("Old Email is required.");
        hasError = true;
      } else {
        setEmailError("");
      }
      if (!emailNew) {
        setEmailNewError("New Email is required.");
        hasError = true;
      } else {
        setEmailNewError("");
      }
      if (!password) {
        setPasswordError("New Email is required.");
        hasError = true;
      } else {
        setPasswordError("");
      }

      if (hasError) {
        return;
      }

      const emailChangeData = {
        oldEmail: email,
        newEmail: emailNew,
        password: password,
      };
      const response = await fetch(`https://api.mymakan.ae/auth/email-change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailChangeData),
      });

      if (response.ok === false) {
        setEmailError("Buyer Acount Not Found with this email.");
      } else {
        setResponseMessage("Successfully sent code to your email.");
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
        setEmailError("Old Email is required.");
        hasError = true;
      } else {
        setEmailError("");
      }
      if (!emailNew) {
        setEmailNewError("New Email is required.");
        hasError = true;
      } else {
        setEmailNewError("");
      }
      if (!password) {
        setPasswordError("New Email is required.");
        hasError = true;
      } else {
        setPasswordError("");
      }

      if (hasError) {
        return; // exit function if any of the fields are empty
      }

      const emailChangeData = {
        oldEmail: email,
        newEmail: emailNew,
        password: password,
      };

      const response = await fetch(
        `https://api.mymakan.ae/auth/agent/email-change`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailChangeData),
        }
      );
      console.log(response);
      if (response.ok === false) {
        setEmailError("Agent Acount Not Found with this email.");
      } else {
        setResponseMessage("Successfully sent code to your email.");
      }
    } catch (error) {
      setEmailError(error.message);
    }
  };
  return (
    <div className="bg-[#2682d5] h-screen 2xl:px-[350px] xl:px-60 xl:pb-[20px]    ">
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

        <div className="bg-white h-auto pb-[20px] rounded-[15px]">
          <div className=" md:px-48 lg:px-2">
            <div className="2xl:px-20 flex flex-col justify-center lg:px-9">
              <div>
                <div class="mx-auto max-w-md">
                  <div class="rounded-xl  bg-white shadow-sm">
                    <div class="p-4 sm:p-7">
                      <div class="text-center">
                        <div class="mb-4 inline-block rounded-full bg-blue-200 p-2 text-blue-500">
                          <Image
                            alt=""
                            width={1000}
                            height={100}
                            className="w-[50px] h-[50px]"
                            src="/emailchange.png"
                          />
                        </div>
                        <h1 class="block text-2xl font-bold text-gray-800">
                          Email Change!
                        </h1>
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
                                Old Email address
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
                            <div>
                              <label
                                for="email"
                                class="mb-2 block text-sm text-gray-600"
                              >
                                New Email address
                              </label>
                              <div class="relative">
                                <input
                                  type="email"
                                  value={emailNew}
                                  onChange={(e) => setEmailNew(e.target.value)}
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
                                  {emailNewError && (
                                    <p className="text-red-500 text-[13px] mt-[3px]">
                                      {emailNewError}
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
                            <div>
                              <label
                                for="email"
                                class="mb-2 block text-sm text-gray-600"
                              >
                                Enter Your Password
                              </label>
                              <div class="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  class="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter Your Password"
                                />
                                <button
                                  type="button" // Prevent the button from triggering form submission
                                  className="label-text absolute inset-y-0  right-4 top-[5px]"
                                  onClick={show}
                                >
                                  {showPassword ? (
                                    <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                                  ) : (
                                    <AiOutlineEye></AiOutlineEye>
                                  )}
                                </button>
                                <div>
                                  {passwordError && (
                                    <p className="text-red-500 text-[13px] ">
                                      {passwordError}
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
                                Change Email
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={handleAgentSubmit}
                                class="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Change Email
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <p class="mt-3 flex items-center justify-center divide-x divide-gray-300 text-center">
                    <a
                      class="pl-3 text-sm text-gray-600 decoration-2 hover:text-blue-600 hover:underline"
                      href="#"
                    >
                      {" "}
                      FAQs{" "}
                    </a>{" "}
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
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact Us</p>
        </div>
        <p>Mymakan LLC © 2024</p>
      </div>
    </div>
  );
}
