import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
export const SuccessPopUp = ({ visible, closePopUp, massage }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        closePopUp(false);
      }, 3000); // 33 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [visible, closePopUp]);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-40 ">
      <div className="">
        <div className=" w-full ">
          <div className="bg-[#479be5] relative w-auto px-[20px] h-[70px] flex justify-center  shadow-[0_8px_30px_rgb(0,0,0,0.12)] l  rounded-[7px]">
            <label
              onClick={() => closePopUp(false)}
              className="cursor-pointer text-[13px] absolute right-2 top-1 text-white"
            >
              ✕
            </label>

            <div>
              <div className=" ">
                <div className="mt-[30px] flex items-center gap-2 ">
                  <div className=" ">
                    <Image
                      width={15}
                      height={15}
                      className="font-noto  w-[15px] h-[15px]  "
                      src="/check1.png"
                      alt="img"
                    />
                  </div>{" "}
                  <p className=" text-[14px] font-semibold leading-[22px] text-white">
                    {massage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
