"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/Component/ui/card";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
import { useRouter } from "next/navigation";
import { ResetPasswordSuccessPupUp } from "../../Component/PopUp/ResetPasswordSuccessPupUp";
import axios from "axios";
export default function PasswordReset() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [accountRole, setaccountRole] = useState("");
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setaccountRole(localStorage.getItem("accountRole"));
  }, []);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPasswordPopUp, setResetPasswordPopUp] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (newPassword) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    if (newPassword.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    return "";
  };
  useEffect(() => {
    if (newPassword) {
      const passwordValidationError = validatePassword(newPassword);
      setPasswordError(passwordValidationError);
    } else {
      setPasswordError("");
    }
  }, [newPassword]);
  const newShow = () => {
    setNewShowPassword(!showNewPassword);
  };
  const confirmShow = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (!newPassword) {
      setPasswordError("Password is required.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) {
      return; // exit function if any of the fields are empty
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    const data = {
      email: email,
      password: confirmPassword,
    };

    try {
      const response = await axios.post(
        `https://api.mymakan.ae/auth/reset-password`,
        data
      );
      console.log(response);
      if (response.status === 200) {
        setResetPasswordPopUp(true);
        setResponseMessage("Password Reset Successfully");
      }
    } catch (error) {
      if (error.response) {
        setResponseMessage(`${error.response.data.message}`);
      } else {
        setResponseMessage(`Error: ${error.message}`);
      }
    }
  };
  const handleAgentPasswordReset = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (!newPassword) {
      setPasswordError("Password is required.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) {
      return; // exit function if any of the fields are empty
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    const data = {
      email: email,
      password: confirmPassword,
    };

    try {
      const response = await axios.post(
        `https://api.mymakan.ae/auth/agent/reset-password`,
        data
      );
      if (response.status === 200) {
        setResetPasswordPopUp(true);
        setResponseMessage("Password Reset Successfully");
      }
    } catch (error) {
      if (error.response) {
        setResponseMessage(`${error.response.data.message}`);
      } else {
        setResponseMessage(`Error: ${error.message}`);
      }
    }
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="bg-[#2682d5] h-screen 2xl:px-[350px] xl:px-60 xl:py-12    ">
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

        <div className="bg-white shadow-sm h-[450px] rounded-[15px]">
          <div className=" md:px-48 lg:px-2">
            <div className="2xl:px-20 flex flex-col justify-center lg:px-9">
              <div>
                <div class="mx-auto max-w-md">
                  <div class=" bg-white ">
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
                          Password Reset
                        </h1>
                      </div>

                      <div class="mt-6">
                        <form>
                          <div class="grid gap-y-4">
                            <div>
                              <label
                                for="email"
                                class="mb-2 block text-sm text-gray-600"
                              >
                                New Password
                              </label>
                              <div class="relative">
                                <input
                                  id="NewPassword"
                                  type={showNewPassword ? "text" : "password"}
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                  class="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter New Password"
                                />
                                <div class="">
                                  <button
                                    type="button" // Prevent the button from triggering form submission
                                    className="label-text absolute inset-y-0  right-4 top-[5px]"
                                    onClick={newShow}
                                  >
                                    {showNewPassword ? (
                                      <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                                    ) : (
                                      <AiOutlineEye></AiOutlineEye>
                                    )}
                                  </button>
                                </div>
                                <div>
                                  {passwordError && (
                                    <p className="text-red-500 text-[13px]  mt-[3px]">
                                      {passwordError}
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
                                Confirm Password
                              </label>
                              <div class="relative">
                                <input
                                  id="ConfirmPassword"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  class="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter Confirm Password"
                                />
                                <div class="">
                                  <button
                                    type="button" // Prevent the button from triggering form submission
                                    className="label-text absolute inset-y-0  right-4 top-[5px]"
                                    onClick={confirmShow}
                                  >
                                    {showConfirmPassword ? (
                                      <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                                    ) : (
                                      <AiOutlineEye></AiOutlineEye>
                                    )}
                                  </button>
                                </div>
                              </div>
                              <div>
                                {errorMessage && (
                                  <p className="text-red-500 ">
                                    {errorMessage}
                                  </p>
                                )}
                                {responseMessage && (
                                  <p className="text-red-500 ">
                                    {responseMessage}
                                  </p>
                                )}
                              </div>
                            </div>
                            {accountRole === "buyer" ? (
                              <button
                                type="button"
                                onClick={handlePasswordReset}
                                class="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Reset password
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={handleAgentPasswordReset}
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
      <ResetPasswordSuccessPupUp
        visible={resetPasswordPopUp}
        closePopUp={setResetPasswordPopUp}
      />
    </div>
  );
}
