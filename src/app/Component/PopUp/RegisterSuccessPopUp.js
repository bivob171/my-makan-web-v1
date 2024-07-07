import Image from "next/image";
import Link from "next/link";
import React from "react";
export const RegisterSuccessPopUp = ({ visible, closePopUp }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-40 backdrop-blur-[10px]">
      <div className="">
        <div className=" w-full ">
          <div className="bg-white relative w-[350px] h-[250px] flex justify-center  shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:p-0 md:p-0 p-2  rounded-[10px]">
            <Link href="/user/newsfeed">
              <label
                // onClick={() => closePopUp(false)}
                className="cursor-pointer text-[20px] absolute right-4 top-2 text-black"
              >
                ✕
              </label>
            </Link>
            <div>
              <div className=" py-[37px]">
                <div className="flex justify-center mt-[10px]">
                  <Image
                    width={50}
                    height={50}
                    className="font-noto  w-[50px] h-[50px] "
                    src="/check.png"
                    alt="password-change-removebg-preview-removebg-preview"
                  />
                </div>
                <div className="mt-[30px]">
                  {" "}
                  <p className="font-noto text-[22px] font-semibold leading-[22px] text-[#212427]">
                    Your Successfully Register
                  </p>
                  <div className="flex justify-center mt-[25px] ">
                    <div>
                      <div className="flex gap-x-[15px]">
                        <Link href="/">
                          <button
                            type="submit"
                            className="w-[100px] rounded-sm h-[30px] bg-[#2682d5] text-white hover:bg-[#1b6cb3]"
                          >
                            Home
                          </button>
                        </Link>
                        <Link href="/user/newsfeed">
                          <button
                            type="button"
                            className="w-[100px] rounded-sm h-[30px] bg-[#2682d5] text-white hover:bg-[#1b6cb3]"
                          >
                            NewsFeed
                          </button>
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
    </div>
  );
};
