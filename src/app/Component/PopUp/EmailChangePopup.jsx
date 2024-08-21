"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const EmailChangePopup = ({ visible, closePopUp, role, oldEmail }) => {
  const { setRender, render } = PrivateRouteContext();
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const show = () => {
    setShowPassword(!showPassword);
  };

  const reset = () => {
    setRender((prev) => !prev);
    closePopUp(false);
  };

  const handleSubmit = async () => {
    setEmailError("");
    setPasswordError("");
    setError("");

    if (!email) {
      setEmailError("New email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    // Adjust endpoint based on role
    const endpoint =
      role === "buyer"
        ? `http://localhost:4000/auth/email-change`
        : `http://localhost:4000/auth/agent/email-change`;

    try {
      const response = await axios.post(endpoint, {
        oldEmail,
        newEmail: email,
        password,
      });

      if (response.status === 200) {
        toast.success("Email changed successfully", {
          style: {
            whiteSpace: "nowrap",
          },
        });
        reset();
      }
    } catch (err) {
      if (err.response) {
        // Handle error response from server
        setError(err.response.data.message || "An error occurred");
      } else {
        // Handle network error
        setError("Network error");
      }
    }
  };
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-40 backdrop-blur-[10px]">
      <div className="">
        <div className=" w-full ">
          <div className="bg-white relative w-auto h-auto pb-[20px] flex justify-center  shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:p-0 md:p-0 p-2  rounded-[10px]">
            <label
              onClick={() => closePopUp(false)}
              className="cursor-pointer text-[20px] absolute right-4 top-2 text-black"
            >
              ✕
            </label>

            <div>
              <div className=" h-auto  rounded-[15px] w-full">
                <div className=" ">
                  <div className=" flex flex-col justify-center  ">
                    <div>
                      <div class="mx-auto max-w-full">
                        <div class="">
                          <div class="p-4 sm:p-7">
                            <div class="text-center">
                              <div class="mb-2 inline-block rounded-full bg-blue-200 p-2 text-blue-500">
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
                                Change Email?
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
                                      Old Email address
                                    </label>
                                    <div class="">
                                      <input
                                        type="email"
                                        value={oldEmail}
                                        readOnly
                                        class="peer block w-[350px] rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter Your Email"
                                      />
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
                                        value={email}
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                        class="peer block w-[350px] rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
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
                                          <p className="text-red-500 -mb-0 text-[13px] mt-[3px]">
                                            {emailError}
                                          </p>
                                        )}
                                      </div>

                                      <div>
                                        {error !== "" && (
                                          <p
                                            class="mt-2 -mb-0 hidden text-xs text-rose-600 peer-invalid:block"
                                            id="email-error"
                                          >
                                            {error}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col space-y-1.5">
                                    <label
                                      htmlFor="password"
                                      className="relative block w-[350px] rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
                                    >
                                      <input
                                        id="password"
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                          setPassword(e.target.value)
                                        }
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
                                    </label>
                                    {passwordError && (
                                      <p className="text-red-500 text-[13px] ">
                                        {passwordError}
                                      </p>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={handleSubmit}
                                    class="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                  >
                                    Change Email
                                  </button>
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
          </div>
        </div>
      </div>
    </div>
  );
};
