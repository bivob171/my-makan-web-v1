"use client";

import PrivateRouteContext from "@/Context/PrivetRouteContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CardHeader } from "../ui/card";
import { BrandLogo } from "../Logo/brand-logo";
import { Button } from "../ui/button";

export const EmailVerificationCodePopUo = ({
  visible,
  closePopUp,
  role,
  email,
}) => {
  const { setRender, render } = PrivateRouteContext();
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(120);
  const [otp, setOtp] = useState(new Array(4).fill(""));
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

  const handleSubmit = async (event) => {
    // Adjust endpoint based on role
    const endpoint =
      role === "buyer"
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth/buyer/email-verify-code-check`
        : `${process.env.NEXT_PUBLIC_API_URL}/auth/agent/email-verify-code-check`;

    event.preventDefault();
    if (otp.some((str) => str === "")) {
      setError("Please enter all OTP digits.");
      return;
    }
    const ot = otp;
    const arrOfNum = ot.map((str) => {
      return parseInt(str, 10);
    });
    console.log(arrOfNum);
    const digits = arrOfNum;
    const int = digits.reduce((accum, digit) => accum * 10 + digit, 0);
    try {
      const response = await axios.post(endpoint, {
        email,
        code: JSON.stringify(int),
      });

      if (response.status === 200) {
        setRender((prev) => !prev);
        toast.success("Email successfully Verified");
        closePopUp(false);
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

  const handleEmailVerifyCodeSent = async () => {
    // Adjust endpoint based on role
    const endpoint =
      role === "buyer"
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth/buyer/email-verify`
        : `${process.env.NEXT_PUBLIC_API_URL}/auth/agent/email-verify`;

    try {
      const response = await axios.post(endpoint, {
        email: email,
      });

      if (response.status === 200) {
        toast.success("Email Verification code sent to your email");
        setOpenEmailVerify(true);
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
          <div className="bg-white relative w-auto h-[400px] flex justify-center  shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:p-0 md:p-0 p-2  rounded-[10px]">
            <label
              onClick={() => closePopUp(false)}
              className="cursor-pointer text-[20px] absolute right-4 top-2 text-black"
            >
              ✕
            </label>

            <div>
              <div className="bg-white h-[400px] rounded-[15px] px-[20px]">
                <div className=" ">
                  <div className="flex flex-col justify-center">
                    <CardHeader className="items-center text-center">
                      <BrandLogo />
                      <h1 className="text-[20px] font-semibold">
                        Verify your Email
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
                                <span
                                  className="text-[#C61E72] cursor-pointer"
                                  onClick={handleEmailVerifyCodeSent}
                                >
                                  Resend the code
                                </span>
                              </h1>
                            ) : (
                              <h1 className="font-noto font-normal text-[13px] leading-[18px] text-[#101011] text-center mt-[8px]">
                                Didn not receive any code? Resend the code{" "}
                                {counter}s
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
                                  <div>
                                    <h1 className="font-noto font-normal text-[14px] leading-[18px] text-[#101011] text-center mt-[5px]">
                                      Give the 4-digit code
                                    </h1>
                                  </div>
                                  <div className="mt-[17px]">
                                    <Button
                                      type="button"
                                      onClick={handleSubmit}
                                      className="w-[100%] focus:outline-none  bg-[#2682d5] hover:bg-[#1b6cb3]  text-white "
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          {error && (
                            <p className="text-red-500 mt-[5px]">{error}</p>
                          )}
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
