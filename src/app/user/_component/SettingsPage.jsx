"use client";

import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { EmailChangePopup } from "@/app/Component/PopUp/EmailChangePopup";
import { EmailVerificationCodePopUo } from "@/app/Component/PopUp/EmailVerificationCodePopUo";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { MdVerifiedUser } from "react-icons/md";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageView from "react-single-image-viewer";
import "react-single-image-viewer/dist/index.css";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Worker } from "@react-pdf-viewer/core";
import { AccountDeletePopup } from "@/app/Component/PopUp/AccountDeletePopup";
export const SettingsPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const [open, setOpen] = useState(false);
  const [openEmailVerify, setOpenEmailVerify] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setRole(user?.role);
    setEmail(user?.email);
  }, [user]);

  const handleEmailVerifyCodeSent = async () => {
    const endpoint =
      role === "agent"
        ? "http://localhost:4000/auth/agent/email-verify"
        : "http://localhost:4000/auth/buyer/email-verify";

    try {
      const response = await axios.post(endpoint, {
        email: user?.email,
      });

      console.log("Response received", response);

      if (response.status === 200) {
        toast.success("Email Verification code sent to your email");
        setOpenEmailVerify(true);
      }
    } catch (err) {
      console.error("Error occurred", err);
      if (err.response) {
        setError(err.response.data.message || "An error occurred");
        console.error("Server error", err.response.data);
      } else {
        setError("Network error");
        console.error("Network error");
      }
    }
  };

  // password change

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setNewOldPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePasswordPopUp, setChangePasswordPopUp] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");

  const [identity, setIdentity] = useState([]);
  const [uploading, setUploading] = useState(false);

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

  const oldShow = () => {
    setNewOldPassword(!showOldPassword);
  };
  const newShow = () => {
    setNewShowPassword(!showNewPassword);
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
    if (!oldPassword) {
      setOldPasswordError("Old Password is required.");
      hasError = true;
    } else {
      setOldPasswordError("");
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

    const data = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/change-password",
        data
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Password Change Successfully");
        setRender((prev) => !prev);
        setOldPassword("");
        setNewPassword("");
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
    if (!oldPassword) {
      setOldPasswordError("Old Password is required.");
      hasError = true;
    } else {
      setOldPasswordError("");
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

    const data = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/agent/password-change",
        data
      );
      if (response.status === 200) {
        toast.success("Password Change Successfully");
        setRender((prev) => !prev);
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      if (error.response) {
        setResponseMessage(`${error.response.data.message}`);
      } else {
        setResponseMessage(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    setIdentity(user?.identity);
  }, [user]);

  const handleRemoveImage = (index) => {
    const newIdentity = identity.filter((_, i) => i !== index);
    setIdentity(newIdentity);
  };

  const updateAgentAccountIdentity = async () => {
    try {
      const updateCreateData = {
        identity: identity,
        reject: false,
      };

      const token = localStorage.getItem("agentAccessToken");
      const response = await fetch(
        "http://localhost:4000/agent/update-profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateCreateData),
        }
      );
      if (!response.ok) {
        console.error(` ${response.status}`);
        setError(` ${response.status}`);
      }
      const data = await response.json();
      toast.success("Identity upload Successfully");
      setRender((prev) => !prev);
    } catch (error) {
      setError(` ${error}`);
    }
  };

  const handlePdfView = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async (files) => {
    setUploading(true);
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/file-upload/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const links = response.data.map((item) => item.Location);
      setIdentity(links);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false); // Reset uploading state after upload attempt (whether success or failure)
    }
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      handleUpload(selectedFiles);
    }
  }, [selectedFiles]);
  const reloadPage = () => {
    window.location.reload();
  };

  const [deletePopup, setDeletePopup] = useState(false);
  console.log(identity);

  return (
    <>
      <div className="col-lg-8 ">
        <div className="forum-topic-add">
          <div className="block-box">
            <form>
              <div>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-x-2">
                    <p class="text-gray-600 -mb-0 ">
                      Your email address is <strong>{user?.email} </strong>{" "}
                    </p>
                    {user?.emailVerified === true && (
                      <span className="text-blue-500">
                        <RiVerifiedBadgeFill />
                      </span>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      class=" inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
                    >
                      Change
                    </button>
                    {user?.emailVerified === false && (
                      <button
                        type="button"
                        onClick={handleEmailVerifyCodeSent}
                        class="ml-[15px] focus:outline-none rounded-lg inline-flex text-sm font-medium text-red-600 px-[8px] py-[5px] border decoration-2"
                      >
                        verify your email
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {user?.role === "agent" && (
                <>
                  {user?.role === "agent" && user?.verified === false ? (
                    <div>
                      <hr class="mt-4 mb-2" />
                      <p class="py-2 text-xl font-semibold">Identity</p>

                      {user?.identity?.length > 0 && user?.reject === false ? (
                        <div>
                          <p className="top-[12px]  text-[15px] font-semibold text-black text-opacity-70">
                            Thank you for submit your Identity, Your profile is
                            under verification!
                            <button
                              onClick={reloadPage}
                              class="mt-[10px] flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
                            >
                              <svg
                                class="w-5 h-5 mx-1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                  clip-rule="evenodd"
                                />
                              </svg>

                              <span class="mx-1">Refresh</span>
                            </button>
                          </p>
                        </div>
                      ) : user.reject === true ? (
                        <div>
                          <div className="mb-[20px]">
                            <div className="my-[15px]">
                              <p className="top-[12px]  text-[15px] font-semibold text-black text-opacity-70">
                                Your submited document are not valid, please
                                reUpload!
                                <br />
                                <span className="text-[14px] font-medium text-black text-opacity-50">
                                  Supported formats are PNG, JPG and PDF.
                                </span>
                              </p>
                            </div>

                            <div>
                              <div className="w-[250px] ">
                                <div class="relative h-[70px] w-[200px]">
                                  <label
                                    title="Click to upload"
                                    for="documents"
                                    class="cursor-pointer flex items-center gap-x-4 px-2 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 h-[70px]"
                                  >
                                    <div class="w-[30px] h-[30px] relative">
                                      <Image
                                        class="w-[30px] h-[30px]"
                                        src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                                        alt="file upload icon"
                                        width={30}
                                        height={30}
                                      />
                                    </div>
                                    <div class="relative">
                                      <span class="block  whitespace-nowrap font-medium relative text-blue-900 group-hover:text-blue-500 text-[14px]">
                                        Upload your Identity
                                      </span>
                                      <span class="mt-0.5 text-[14px] block text-gray-500">
                                        Max 2 MB
                                      </span>
                                    </div>
                                  </label>
                                  <input
                                    className="hidden"
                                    type="file"
                                    name="documents"
                                    id="documents"
                                    // accept="application/pdf"
                                    multiple
                                    onChange={handleFileChange}
                                  />
                                </div>
                              </div>

                              <div className="mt-[20px] flex gap-x-[10px]">
                                {uploading === true ? (
                                  <div>
                                    <Image
                                      src="/imgloding.gif"
                                      alt="Loading..."
                                      width={90}
                                      height={90}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    {identity?.map((img, i) => {
                                      const isPdf = img.endsWith(".pdf");

                                      return (
                                        <div key={i} className="relative">
                                          {isPdf ? (
                                            <iframe
                                              className="object-cover w-[80px] h-[80px] rounded-sm"
                                              width="70"
                                              height="70"
                                              src={img}
                                              onClick={() => handlePdfView(img)}
                                            ></iframe>
                                          ) : (
                                            <img
                                              alt=""
                                              className="object-cover w-[80px] h-[80px] rounded-sm"
                                              width="70"
                                              height="70"
                                              src={img}
                                              onClick={() => handlePdfView(img)}
                                            />
                                          )}
                                          <button
                                            type="button"
                                            className="text-[10px] absolute top-0 right-0 p-1 bg-red-600 rounded-full text-white"
                                            onClick={() => handleRemoveImage(i)}
                                          >
                                            <AiOutlineClose />
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {role === "buyer" ? (
                            <button
                              type="button"
                              onClick={updateUserAccountIdentity}
                              class="mt-1 rounded-lg flex justify-end outline-none bg-blue-600 px-4 py-2 focus:none text-white"
                            >
                              Submit Identity
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={updateAgentAccountIdentity}
                              class="mt-1 rounded-lg flex justify-end bg-blue-600 px-4 focus:none py-2 text-white"
                            >
                              Submit Identity
                            </button>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="mb-[20px]">
                            <div className="my-[15px]">
                              <p className="top-[12px]  text-[15px] font-semibold text-black text-opacity-70">
                                Please upload your national/residence/work ID or
                                passport to verify your profile!
                                <br />
                                <span className="text-[14px] font-medium text-black text-opacity-50">
                                  Supported formats are PNG, JPG and PDF.
                                </span>
                              </p>
                            </div>

                            <div>
                              <div className="w-[250px] ">
                                <div class="relative h-[70px] w-[200px]">
                                  <label
                                    title="Click to upload"
                                    for="documents"
                                    class="cursor-pointer flex items-center gap-x-4 px-2 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 h-[70px]"
                                  >
                                    <div class="w-[30px] h-[30px] relative">
                                      <Image
                                        class="w-[30px] h-[30px]"
                                        src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                                        alt="file upload icon"
                                        width={30}
                                        height={30}
                                      />
                                    </div>
                                    <div class="relative">
                                      <span class="block  whitespace-nowrap font-medium relative text-blue-900 group-hover:text-blue-500 text-[14px]">
                                        Upload your Identity
                                      </span>
                                      <span class="mt-0.5 text-[14px] block text-gray-500">
                                        Max 2 MB
                                      </span>
                                    </div>
                                  </label>
                                  <input
                                    className="hidden"
                                    type="file"
                                    name="documents"
                                    id="documents"
                                    // accept="application/pdf"
                                    multiple
                                    onChange={handleFileChange}
                                  />
                                </div>
                              </div>

                              <div className="mt-[20px] flex gap-x-[10px]">
                                {uploading === true ? (
                                  <div>
                                    <Image
                                      src="/imgloding.gif"
                                      alt="Loading..."
                                      width={90}
                                      height={90}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    {identity?.map((img, i) => {
                                      return (
                                        <div key={i} className="relative">
                                          <iframe
                                            alt=""
                                            className="object-cover w-[80px] h-[80px] rounded-sm"
                                            width="70"
                                            height="70"
                                            src={img}
                                            onClick={() => handlePdfView(img)}
                                          ></iframe>
                                          <button
                                            type="button"
                                            className="text-[10px] absolute top-0 right-0 p-1 bg-red-600 rounded-full text-white"
                                            onClick={() => handleRemoveImage(i)}
                                          >
                                            <AiOutlineClose />
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {role === "buyer" ? (
                            <button
                              type="button"
                              onClick={updateUserAccountIdentity}
                              class="mt-1 rounded-lg flex justify-end outline-none bg-blue-600 px-4 py-2 focus:none text-white"
                            >
                              Submit Identity
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={updateAgentAccountIdentity}
                              class="mt-1 rounded-lg flex justify-end bg-blue-600 px-4 focus:none py-2 text-white"
                            >
                              Submit Identity
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-[20px]">
                      <p className="top-[12px] flex items-center gap-1 text-[15px] font-semibold text-blue-500 text-opacity-70">
                        Congratulations! You&lsquo;re now a verified user on our
                        platform. <MdVerifiedUser />
                      </p>
                    </div>
                  )}
                </>
              )}

              {user?.password !== null && (
                <div>
                  <hr class="mt-4 mb-4" />
                  <p class="py-2 text-xl font-semibold">Password</p>

                  <div class="flex items-center">
                    <div class="">
                      <div className="mb-[7px]">
                        <span class="text-sm text-gray-500">
                          Current Password
                        </span>
                        <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                          <input
                            id="NewPassword"
                            type={showOldPassword ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            class="w-full flex-shrink appearance-none focus:none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="Enter Current Password"
                          />
                          <div class="">
                            <button
                              type="button" // Prevent the button from triggering form submission
                              className="label-text focus:none outline-none	border-none absolute inset-y-0  right-4 top-[5px]"
                              onClick={oldShow}
                            >
                              {showOldPassword ? (
                                <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                              ) : (
                                <AiOutlineEye></AiOutlineEye>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span class="text-sm text-gray-500">New Password</span>
                        <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                          <input
                            id="NewPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            max={8}
                            onChange={(e) => setNewPassword(e.target.value)}
                            class="w-full flex-shrink appearance-none focus:none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="Enter New Password"
                          />
                          <div class="">
                            <button
                              type="button" // Prevent the button from triggering form submission
                              className="label-text absolute outline-none border-none inset-y-0 focus:none right-4 top-[5px]"
                              onClick={newShow}
                            >
                              {showNewPassword ? (
                                <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                              ) : (
                                <AiOutlineEye></AiOutlineEye>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {passwordError && (
                      <p className="text-red-500 text-[13px]  mt-[5px] -mb-0">
                        {passwordError}
                      </p>
                    )}
                  </div>
                  <p class="mt-2">
                    Can&rsquo;t remember your current password.{" "}
                    <Link
                      class="text-sm font-semibold text-blue-600 underline decoration-2"
                      href="/forgot-password"
                    >
                      Recover Password
                    </Link>
                  </p>
                  {role === "buyer" ? (
                    <button
                      type="button"
                      onClick={handlePasswordReset}
                      class="mt-1 rounded-lg outline-none bg-blue-600 px-4 py-2 focus:none text-white"
                    >
                      Save Password
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAgentPasswordReset}
                      class="mt-1 rounded-lg bg-blue-600 px-4 focus:none py-2 text-white"
                    >
                      Save Password
                    </button>
                  )}

                  <hr class="mt-4 mb-8" />
                </div>
              )}

              <div class="mb-10">
                <p class="py-2 text-xl font-semibold">Delete Account</p>
                <p class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Proceed with caution
                </p>
                <p class="mt-2">
                  Make sure you have taken backup of your account in case you
                  ever need to get access to your data. We will completely wipe
                  your data. There is no way to access your account after this
                  action.
                </p>
                <button
                  type="button"
                  onClick={() => setDeletePopup(true)}
                  class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2"
                >
                  Continue with deletion
                </button>
              </div>

              <div className=" w-[500px]"></div>
            </form>
          </div>
        </div>
      </div>
      <EmailChangePopup
        visible={open}
        closePopUp={setOpen}
        role={role}
        oldEmail={email}
      />
      <EmailVerificationCodePopUo
        visible={openEmailVerify}
        closePopUp={setOpenEmailVerify}
        role={role}
        email={email}
      />
      <AccountDeletePopup
        visible={deletePopup}
        closePopUp={setDeletePopup}
        role={role}
      />
    </>
  );
};
