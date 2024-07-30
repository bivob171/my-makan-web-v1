import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export const AccountDeletePopup = ({ visible, closePopUp, role }) => {
  const router = useRouter();
  const homeRoute = () => {
    localStorage.clear();
    toast.success("Account Successfully delete.");
    router.push("/");
    signOut();
  };

  const handleDelete = async () => {
    try {
      const baseUrl =
        role === "buyer"
          ? `http://3.28.239.173:4000/user/delete`
          : `http://3.28.239.173:4000/agent/delete`;
      const token =
        role === "buyer"
          ? localStorage.getItem("buyerAccessToken")
          : localStorage.getItem("agentAccessToken");
      if (!token) {
        toast.error("Failed to delete, please try again");
        return;
      }

      const response = await fetch(baseUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });

      if (response.ok) {
        homeRoute();
      } else {
        toast.error("Failed to delete, please try again.");
      }
    } catch (error) {
      toast.error("Failed to delete, please try again.");
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
                  <svg
                    class="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div class="mt-3  sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Delete account
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of
                      your data will be permanently removed. This action cannot
                      be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 pb-3 sm:flex sm:flex-row-reverse ">
              <button
                onClick={handleDelete}
                type="button"
                class="mt-3 ml-[15px] inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:mt-0 sm:w-auto"
              >
                Delete
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
