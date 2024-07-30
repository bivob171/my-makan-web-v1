"use client";
import { EditPostLocationValueContext } from "@/Context/EditpostValueContext";
import { PostLocationValueContext } from "@/Context/postValueContext";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import toast from "react-hot-toast";

export const PostHiddenModal = ({ visible, closePopUp }) => {
  const { user } = PrivateRouteContext();
  const { newsFeedRender, setNewsFeedRender } = useContext(
    PostLocationValueContext
  );
  const { postId } = useContext(EditPostLocationValueContext);
  const handleSubmit = async (postId) => {
    try {
      const id = postId?._id;
      const postData = {
        hidden: true,
      };

      let token;
      if (user.role === "agent") {
        token = localStorage.getItem("agentAccessToken");
      } else {
        token = localStorage.getItem("buyerAccessToken");
      }
      const apiUrl = `http://3.28.239.173:4000/allposts/update/${id}`;
      console.log(apiUrl);
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        toast.error(`HTTP error! Status: ${response.status}`);
      } else {
        toast.success("Post Hide successfully!");
        closePopUp(false);
        setNewsFeedRender(!newsFeedRender);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-40 backdrop-blur-[10px]">
      <div className="">
        <div class="flex min-h-full items-end justify-center p-4  sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pt-[15px]">
              <div class="flex ">
                <div class="mx-auto mt-[10px] flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Image width={24} height={24} alt="img" src="/hidden.png" />
                </div>
                <div class="mt-3  sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Are you want to Hide this post?
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 pb-3 sm:flex sm:flex-row-reverse ">
              <button
                type="button"
                onClick={() => handleSubmit(postId)}
                class="mt-3 ml-[15px] inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:mt-0 sm:w-auto"
              >
                Hide
              </button>

              <button
                onClick={() => closePopUp(false)}
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
