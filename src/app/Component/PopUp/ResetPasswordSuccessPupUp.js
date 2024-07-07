import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export const ResetPasswordSuccessPupUp = ({ visible, closePopUp }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-40 backdrop-blur-[10px]">
      <div className="">
        <div className=" w-full ">
          <div className=" lg:w-[620px] bg-white lg:h-[350px] md:w-[750px] relative md:h-[350px] w-[330px] h-[350px] flex justify-center  shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:p-0 md:p-0 p-2  rounded-[10px]">
            <Link href="/">
              <label
                onClick={() => closePopUp(false)}
                className="cursor-pointer text-[20px] absolute right-4 top-2 text-black"
              >
                ✕
              </label>
            </Link>
            <div>
              <div className=" py-[37px]">
                <div className="mt-[10px]">
                  {" "}
                  <p className="font-noto text-[22px] font-semibold leading-[22px] text-[#212427]">
                    Your Password Successfully Updated.
                  </p>
                </div>

                <div className="flex justify-center mt-[38px]">
                  <Image
                    width={128}
                    height={128}
                    className="font-noto  w-[128px] h-[128px] "
                    src="/7677.jpg_wh860-removebg-preview.png"
                    alt="password-change-removebg-preview-removebg-preview"
                  />
                </div>
                <div className="flex justify-center mt-[38px] ">
                  <div>
                    <div className="flex gap-x-[15px]">
                      <Link href="/">
                        <Button
                          type="submit"
                          className="w-[100%] bg-[#2682d5] text-white hover:bg-[#1b6cb3]"
                        >
                          Go To Home Page
                        </Button>
                      </Link>
                      <Link href="/login">
                        <Button
                          type="submit"
                          className="w-[100%] bg-[#2682d5] text-white hover:bg-[#1b6cb3]"
                        >
                          Go To Login Page
                        </Button>
                      </Link>
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
