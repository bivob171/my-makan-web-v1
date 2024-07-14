"use client";

import { Button } from "@/app/Component/ui/button";
import { Checkbox } from "@/app/Component/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LoginSuccessPopup } from "../PopUp/LoginSuccessPopup";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { signIn, signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { SocialLogin } from "../SocialLogin/SocialLogin";

export const LoginForm = () => {
  const router = useRouter();
  const { setRender, render } = PrivateRouteContext();

  const initialSignupType =
    localStorage.getItem("signupType") === "false" ? false : true;
  const [signupType, setSignupType] = useState(initialSignupType);
  useEffect(() => {
    localStorage.setItem("signupType", signupType);
  }, [signupType]);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccessPopUp, setloginSuccessPopUp] = useState(false);

  const show = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let hasError = false;

      if (!email) {
        setEmailError("Email is required.");
        hasError = true;
      } else {
        setEmailError("");
      }

      if (!password) {
        setPasswordError("Password is required.");
        hasError = true;
      } else {
        setPasswordError("");
      }
      if (hasError) {
        return; // exit function if any of the fields are empty
      }
      const response = await fetch(
        `https://q4m0gph5-4000.asse.devtunnels.ms/auth/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
      } else {
        localStorage.setItem("buyerAccessToken", data.access_token);
        localStorage.setItem("buyerRefreshToken", data.refresh_token);
        localStorage.setItem("buyerTokenExpires_in", data.expires_in);
        localStorage.setItem("buyerId", data.userId);
        localStorage.setItem("role", data.role);
        // setloginSuccessPopUp(true);
        toast.success("Successfully logged in to your account");
        router.push("/user/newsfeed");
        setRender((prev) => !prev);
      }
    } catch (error) {
      setError(error.message || "Login failed");
      toast.error(data.message);
    }
  };
  const handleAgentLogin = async (e) => {
    e.preventDefault();
    try {
      let hasError = false;

      if (!email) {
        setEmailError("Email is required.");
        hasError = true;
      } else {
        setEmailError("");
      }

      if (!password) {
        setPasswordError("Password is required.");
        hasError = true;
      } else {
        setPasswordError("");
      }
      if (hasError) {
        return; // exit function if any of the fields are empty
      }
      const response = await fetch(
        `https://q4m0gph5-4000.asse.devtunnels.ms/auth/agent/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      } else {
        localStorage.setItem("agentAccessToken", data.access_token);
        localStorage.setItem("agentRefreshToken", data.refresh_token);
        localStorage.setItem("agentTokenExpires_in", data.expires_in);
        localStorage.setItem("agentId", data.userId);
        localStorage.setItem("role", data.role);
        // setloginSuccessPopUp(true);
        toast.success("Successfully login your account");
        router.push("/user/newsfeed");
        setRender((prev) => !prev);
      }
    } catch (error) {
      setError(error.message || "Login failed");
      toast.error(data.message);
    }
  };

  return (
    <>
      <div></div>

      <div className="">
        <div className="grid w-full items-center gap-4">
          {signupType === true ? (
            <div className="w-full mb-2">
              <Button className="w-1/2 rounded-r-none text-white">Buyer</Button>
              <Button
                onClick={() => setSignupType(false)}
                className="w-1/2 rounded-l-none border  border-[#2682d5] bg-white  hover:bg-[#1b6cb313] text-[#2682d5]"
              >
                Agents
              </Button>
            </div>
          ) : (
            <div className="w-full mb-2">
              <Button
                className="w-1/2 rounded-r-none border border-[#2682d5] bg-white  hover:bg-[#1b6cb313] text-[#2682d5]"
                onClick={() => setSignupType(true)}
              >
                Buyer
              </Button>
              <Button className="w-1/2 rounded-l-none text-white">
                Agents
              </Button>
            </div>
          )}
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="email"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
            >
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer py-2 px-3 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                placeholder="email*"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2682d5]">
                email*
              </span>
            </label>
            {emailError && (
              <p className="text-red-500 text-[13px] mt-[3px]">{emailError}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="password"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer py-2 px-3 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                placeholder="password*"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2682d5]">
                password*
              </span>
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
              <p className="text-red-500 text-[13px] ">{passwordError}</p>
            )}
          </div>
          {email === "" || password === "" ? (
            <p className="leading-[5px]"></p>
          ) : (
            <div>
              {error && <p className="text-red-500 mt-[5px]">{error}</p>}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <div>
            {signupType === true ? (
              <Button
                onClick={handleLogin}
                type="submit"
                className="w-[100%] focus:outline-none text-white bg-[#2682d5] hover:bg-[#1b6cb3]"
              >
                Sign In
              </Button>
            ) : (
              <Button
                onClick={handleAgentLogin}
                type="submit"
                className="w-[100%] focus:outline-none text-white bg-[#2682d5] hover:bg-[#1b6cb3]"
              >
                Sign In
              </Button>
            )}
          </div>

          <div className="pb-[15px]">
            <div className="flex justify-center">
              <Link href="/forgot-password">
                <Button variant="link" className="text-sm text-[#2682d5]">
                  Forgot Password?
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/registration">
                <Button className="w-[100%]  focus:outline-none focus:border-[#2682d5] border border-[#2682d5] bg-white hover:bg-[#1b6cb313] text-[#2682d5]">
                  Don not have an account?
                </Button>
              </Link>
            </div>
            <div>
              <div className="flex items-center justify-center w-full my-4">
                <hr className="w-[24%] text-gray-400" />
                <p className="px-3 w-fit text-gray-400 text-xs">
                  OR SIGN IN USING
                </p>
                <hr className="w-[24%] text-gray-400" />
              </div>
              <div>
                <SocialLogin setError={setError} />
              </div>
            </div>
          </div>
        </div>
        <LoginSuccessPopup
          visible={loginSuccessPopUp}
          closePopUp={setloginSuccessPopUp}
        />
      </div>
    </>
  );
};
