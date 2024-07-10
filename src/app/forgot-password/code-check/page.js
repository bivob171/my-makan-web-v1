"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/Component/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SuccessPopUp } from "@/app/Component/PopUp/SuccessPopUp";
import { PopupContext } from "@/Context/successPopupContext";

export default function CodeCheck() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [accountRole, setaccountRole] = useState("");
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setaccountRole(localStorage.getItem("accountRole"));
  }, []);
  const [counter, setCounter] = useState(120);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [error, setError] = useState(null);
  const { responseMessage, setResponseMessage, popupMassage, setPopupMassage } =
    useContext(PopupContext);
  const handleBack = () => {
    router.back();
  };
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  console.log(otp);

  const handleCodeCheck = async (event) => {
    event.preventDefault();
    if (otp.some((str) => str === "")) {
      setResponseMessage("Please enter all OTP digits.");
      return;
    }
    const ot = otp;
    const arrOfNum = ot.map((str) => {
      return parseInt(str, 10);
    });
    console.log(arrOfNum);
    const digits = arrOfNum;
    const int = digits.reduce((accum, digit) => accum * 10 + digit, 0);
    const data = {
      email: email,
      code: JSON.stringify(int),
    };
    console.log(data);

    try {
      const response = await axios.post(
        `https://q4m0gph5-4000.asse.devtunnels.ms/auth/reset-password-code-check`,
        data
      );
      setResponseMessage("Code Match Successfully");
      router.push("/forgot-password/password-reset");
      setPopupMassage(true);
    } catch (error) {
      if (error.response) {
        setCounter(0);
        setResponseMessage(`${error.response.data.message}`);
      } else {
        setCounter(0);
        setResponseMessage(`Error: ${error.message}`);
      }
    }
  };
  const handleAgentCodeCheck = async (event) => {
    event.preventDefault();
    if (otp.some((str) => str === "")) {
      setResponseMessage("Please enter all OTP digits.");
      return;
    }
    const ot = otp;
    const arrOfNum = ot.map((str) => {
      return parseInt(str, 10);
    });
    console.log(arrOfNum);
    const digits = arrOfNum;
    const int = digits.reduce((accum, digit) => accum * 10 + digit, 0);
    const data = {
      email: email,
      code: JSON.stringify(int),
    };
    console.log(data);

    try {
      const response = await axios.post(
        `https://q4m0gph5-4000.asse.devtunnels.ms/auth/agent/reset-password-code-check`,
        data
      );
      setResponseMessage("Code Match Successfully");
      router.push("/forgot-password/password-reset");
      setPopupMassage(true);
    } catch (error) {
      if (error.response) {
        setCounter(0);
        setResponseMessage(`${error.response.data.message}`);
      } else {
        setCounter(0);
        setResponseMessage(`Error: ${error.message}`);
      }
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();

    // Your email post logic here
    try {
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

      if (response.ok) {
        // Handle success
        console.log("Email submitted successfully!");
        router.push("/code-check");
        localStorage.setItem("email", email);
        setCounter(180);
      } else {
        // Handle error
        console.error("Failed to submit email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAgentSendCode = async (e) => {
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

      if (response.ok) {
        // Handle success
        setResponseMessage("Successfully sent code to your email!");
        router.push("/forgot-password/code-check");
        localStorage.setItem("email", email);
        localStorage.setItem("accountRole", role);
        setPopupMassage(true);
      } else {
        // Handle error
        setError("Failed to submit code to your email");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
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

        <div className="bg-white h-[400px] rounded-[15px]">
          <div className=" md:px-48 lg:px-2">
            <div className="2xl:px-20 flex flex-col justify-center lg:px-9">
              <CardHeader className="items-center text-center">
                <BrandLogo />
                <h1 className="text-[20px] font-semibold">
                  Password Reset Code
                </h1>
              </CardHeader>
              <div>
                <div className="flex w-full mt-[10px] justify-center">
                  <div>
                    <div>
                      <h1 className="font-noto font-normal text-[15px] leading-[18px] text-[#101011] text-center mt-[10px]">
                        The code has been sent to the Email: {email}
                      </h1>
                      {counter === 0 ? (
                        <h1 className="font-noto font-normal text-[13px] leading-[18px] text-[#101011] text-center mt-[8px]">
                          Did not receive any code?{" "}
                          {accountRole === "buyer" ? (
                            <span
                              className="text-[#C61E72] cursor-pointer"
                              onClick={handleSendCode}
                            >
                              Resend the code
                            </span>
                          ) : (
                            <span
                              className="text-[#C61E72] cursor-pointer"
                              onClick={handleAgentSendCode}
                            >
                              Resend the code
                            </span>
                          )}
                        </h1>
                      ) : (
                        <h1 className="font-noto font-normal text-[13px] leading-[18px] text-[#101011] text-center mt-[8px]">
                          Didn not receive any code? Resend the code {counter}s
                        </h1>
                      )}{" "}
                    </div>
                    <div className="">
                      <div className="grid w-full items-center gap-4">
                        <div className="mt-[15px]">
                          <form>
                            <div className="flex justify-center">
                              <div className=" flex gap-5">
                                {otp.map((data, index) => {
                                  return (
                                    <input
                                      type="text"
                                      name="otp"
                                      key={index}
                                      value={data}
                                      onChange={(e) =>
                                        handleChange(e.target, index)
                                      }
                                      onFocus={(e) => e.target.select()}
                                      maxLength="1"
                                      className="focus:outline-none   border-[1px] border-[#101011] border-opacity-30 rounded pl-[27px] w-[62px] h-[40px] mb-4 "
                                    />
                                  );
                                })}
                              </div>
                            </div>
                            <div className="flex justify-center ">
                              <div>
                                {responseMessage ===
                                "Successfully sent code to your email." ? (
                                  <p className="text-red-500 text-opacity-90 text-[14px] font-noto font-normal leading-[18px] mt-[10px]"></p>
                                ) : (
                                  <p className="text-red-500 text-opacity-90 text-[14px] font-noto font-normal leading-[18px] mt-[10px]">
                                    {responseMessage}
                                  </p>
                                )}
                                {error && (
                                  <p className="text-red-500 mt-[5px]">
                                    {error}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <h1 className="font-noto font-normal text-[14px] leading-[18px] text-[#101011] text-center mt-[5px]">
                                Give the 4-digit code
                              </h1>
                            </div>
                            <div className="mt-[17px]">
                              {accountRole === "buyer" ? (
                                <Button
                                  type="button"
                                  onClick={handleCodeCheck}
                                  className="w-[100%]  bg-[#2682d5] hover:bg-[#1b6cb3]  text-white "
                                >
                                  Submit
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  onClick={handleAgentCodeCheck}
                                  className="w-[100%]  bg-[#2682d5] hover:bg-[#1b6cb3]  text-white "
                                >
                                  Submit
                                </Button>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* {error && <p className="text-red-500 mt-[5px]">{error}</p>} */}
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
      <SuccessPopUp
        visible={popupMassage}
        closePopUp={setPopupMassage}
        massage={responseMessage}
      />
    </div>
  );
}
