import Image from "next/image";
import React from "react";
import { LuCheckCheck } from "react-icons/lu";

export const SingleChat = ({
  showDateHeader,
  msg,
  isSent,
  formattedDate,
  formattedTime,
  participantImage,
  user,
  status,
  uploadingProssing,
}) => {
  return (
    <div>
      {showDateHeader && (
        <div className="text-center text-gray-500 text-[15px] font-medium my-[14px]">
          {formattedDate}
        </div>
      )}
      <div
        className={`col-start-${isSent ? "6" : "1"} col-end-${
          isSent ? "13" : "8"
        } p-3 rounded-lg`}
      >
        <div
          className={`flex items-end ${
            isSent ? "justify-start flex-row-reverse" : "flex-row"
          }`}
        >
          {isSent ? (
            <Image
              alt=""
              src={user?.image}
              width={500}
              height={500}
              className="w-[30px] h-[30px] rounded-full"
            />
          ) : (
            <Image
              alt=""
              src={participantImage}
              width={500}
              height={500}
              className="w-[30px] h-[30px] rounded-full"
            />
          )}
          <div
            className={`relative ${isSent ? "mr-3" : "ml-3"} text-sm ${
              isSent ? "bg-indigo-100" : "bg-white"
            } py-2 px-4 rounded-xl min-w-[130px] max-w-[300px]`}
          >
            {/* Display content or image */}
            {msg.media?.length > 0 ? (
              <>
                <div className="flex gap-x-1">
                  {msg?.media.map((m, i) => {
                    const progressItem = uploadingProssing.find(
                      (item) => item._id === m._id
                    );
                    console.log(progressItem);

                    return (
                      <div key={i}>
                        <Image
                          alt="Message image"
                          src={m?.url}
                          width={300}
                          height={300}
                          className={`object-cover rounded-lg   ${
                            progressItem && progressItem.progress < 100
                              ? "blur-sm"
                              : ""
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
                {msg.content !== "" && (
                  <div className="mt-1">{msg.content}</div>
                )}
                <div className="mt-1">{status}</div>
              </>
            ) : (
              <div>
                {msg.content}
                {status}
              </div>
            )}
            <div className="flex justify-end gap-x-[3px] items-center -mb-3">
              <p className="text-[10px]">{formattedTime}</p>
              <div>
                <p
                  className={`${
                    msg.seen !== null ? "text-blue-500" : "text-green-500"
                  } text-[13px] font-bold`}
                >
                  {/* Assuming LuCheckCheck is a check mark icon */}
                  <LuCheckCheck />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
