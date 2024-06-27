"use client";
import { Button } from "@/app/Component/ui/button";
import { Checkbox } from "@/app/Component/ui/checkbox";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Country } from "./Country";
import { RegisterSuccessPopUp } from "../PopUp/RegisterSuccessPopUp";
import Image from "next/image";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
export const SignupForm = () => {
  const { setRender, render } = PrivateRouteContext();
  const [country, setCountry] = useState([]);
  const initialSignupType =
    localStorage.getItem("signupType") === "false" ? false : true;
  const [signupType, setSignupType] = useState(initialSignupType);
  useEffect(() => {
    localStorage.setItem("signupType", signupType);
  }, [signupType]);

  const role = signupType ? "buyer" : "agent";

  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [flag, setFlag] = useState("/defultFlag.png");
  const [phone_Code, setPhoneCode] = useState("971");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [selectedCountryError, setSelectedCountryError] = useState("");
  const [selectedStateError, setSelectedStateError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginSuccessPopUp, setloginSuccessPopUp] = useState(false);

  const [error, setError] = useState("");
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

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
    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    return "";
  };
  useEffect(() => {
    if (password) {
      const passwordValidationError = validatePassword(password);
      setPasswordError(passwordValidationError);
    } else {
      setPasswordError("");
    }
  }, [password]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleUpload(selectedFile);
  };

  const handleUpload = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Send file to ImageBB API
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=c2c551cba75c38c77abfe198c7752c47",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.data && data.data.url) {
        setSelectedImage(data.data.url);
        console.log("File uploaded:", data.data);
      } else {
        console.error("Error uploading file:", data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const createUserAccount = async () => {
    try {
      let hasError = false;

      if (!fullName) {
        setFullNameError("Name is required.");
        hasError = true;
      } else {
        setFullNameError("");
      }

      if (!email) {
        setEmailError("Email is required.");
        hasError = true;
      } else {
        setEmailError("");
      }

      if (!mobile) {
        setMobileError("Phone is required.");
        hasError = true;
      } else {
        setMobileError("");
      }

      if (!password) {
        setPasswordError("Password is required.");
        hasError = true;
      } else {
        setPasswordError("");
      }
      if (!selectedCountry) {
        setSelectedCountryError("Country is required.");
        hasError = true;
      } else {
        setSelectedCountryError("");
      }

      if (!selectedState) {
        setSelectedStateError("State Name is required.");
        hasError = true;
      } else {
        setSelectedStateError("");
      }

      // if (!citieName) {
      //   setCitieNameError("City Name is required.");
      //   hasError = true;
      // } else {
      //   setCitieNameError("");
      // }

      const passwordValidationError = validatePassword(password);
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        hasError = true;
      } else {
        setPasswordError("");
      }

      if (hasError) {
        return; // exit function if any of the fields are empty
      }

      const userCreateData = {
        email: email,
        password: password,
        fullName: fullName,
        mobile: mobile,
        mobile_code: phone_Code,
        country: selectedCountry,
        state: selectedState,
        role: role,
      };

      const response = await fetch(
        "https://q4m0gph5-4000.asse.devtunnels.ms/auth/user/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCreateData),
        }
      );

      if (!response.ok) {
        console.error(` ${response.status}`);
        setError(` ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("buyerAccessToken", data.access_token);
      localStorage.setItem("buyerRefreshToken", data.refresh_token);
      localStorage.setItem("buyerTokenExpires_in", data.expires_in);
      localStorage.setItem("buyerId", data.userId);
      localStorage.setItem("role", data.role);
      // setloginSuccessPopUp(true);
      toast.success("Successfully login your account");
      router.push("/user/newsfeed");
      setRender((prev) => !prev);
    } catch (error) {
      console.error("", error);
      setError(` ${error}`);
    }
  };

  const createAgentAccount = async () => {
    try {
      let hasError = false;

      if (!fullName) {
        setFullNameError("Name is required.");
        hasError = true;
      } else {
        setFullNameError("");
      }

      if (!email) {
        setEmailError("Email is required.");
        hasError = true;
      } else {
        setEmailError("");
      }

      if (!mobile) {
        setMobileError("Phone is required.");
        hasError = true;
      } else {
        setMobileError("");
      }

      if (!password) {
        setPasswordError("Password is required.");
        hasError = true;
      } else {
        setPasswordError("");
      }
      if (!companyName) {
        setCompanyNameError("Company Name is required.");
        hasError = true;
      } else {
        setCompanyNameError("");
      }

      if (!selectedCountry) {
        setSelectedCountryError("Country is required.");
        hasError = true;
      } else {
        setSelectedCountryError("");
      }

      if (!selectedState) {
        setSelectedStateError("State Name is required.");
        hasError = true;
      } else {
        setSelectedStateError("");
      }

      // if (!citieName) {
      //   setCitieNameError("City Name is required.");
      //   hasError = true;
      // } else {
      //   setCitieNameError("");
      // }

      const passwordValidationError = validatePassword(password);
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        hasError = true;
      } else {
        setPasswordError("");
      }

      if (hasError) {
        return;
      }

      const agentCreateData = {
        email: email,
        password: password,
        fullName: fullName,
        mobile: mobile,
        mobile_code: phone_Code,
        role: role,
        companyName: companyName,
        country: selectedCountry,
        state: selectedState,
      };

      const response = await fetch(
        "https://q4m0gph5-4000.asse.devtunnels.ms/auth/agent/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agentCreateData),
        }
      );
      console.log(response);
      if (!response.ok) {
        console.error(` ${response.status}`);
        setError(` ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("agentAccessToken", data.access_token);
      localStorage.setItem("agentRefreshToken", data.refresh_token);
      localStorage.setItem("agentTokenExpires_in", data.expires_in);
      localStorage.setItem("agentId", data.userId);
      localStorage.setItem("role", data.role);
      // setloginSuccessPopUp(true);
      toast.success("Successfully login your account");
      router.push("/user/newsfeed");
      setRender((prev) => !prev);
    } catch (error) {
      console.error("", error);
      setError(` ${error}`);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const show = () => {
    setShowPassword(!showPassword);
  };

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompanyDropdown, setSelectedCompanyDropdown] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchCompanies();
  }, [search, page]);

  const fetchCompanies = async () => {
    console.log("Fetching companies..."); // Debug log
    setIsFetching(true);
    try {
      const response = await axios.get(
        "https://q4m0gph5-4000.asse.devtunnels.ms/company",
        {
          params: {
            search,
            page,
            limit,
          },
        }
      );
      const newCompanies = response.data;
      console.log("Fetched companies:", newCompanies); // Debug log
      setHasMore(newCompanies.length === limit);
      setCompanies((prevCompanies) => {
        return page === 1 ? newCompanies : [...prevCompanies, ...newCompanies];
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanyNameError("Failed to fetch companies");
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setSelectedCompany(e.target.value);
    setPage(1); // Reset to first page on search change
    setCompanies([]); // Clear current companies
    setHasMore(true); // Reset hasMore when search changes
  };

  const handleCompanyChange = (company) => {
    setSelectedCompany(company.Office_name_english);
    // Assuming setCompanyName is a function to set company name somewhere else
    setCompanyName(company.Office_name_english);
    setSelectedCompanyDropdown(false);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5 &&
      !isFetching &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1); // Increment page when user scrolls to the bottom
    }
  };

  const session = useSession();
  console.log(session);
  const createUserAccountWithGoogle = async () => {
    try {
      const userCreateData = {
        fullName: session?.data?.user?.name,
        email: session?.data?.user?.email,
        image: session?.data?.user?.image,
        role: role,
      };

      const response = await fetch(
        "https://q4m0gph5-4000.asse.devtunnels.ms/auth/user/signUp-with-Google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCreateData),
        }
      );

      if (!response.ok) {
        console.error(` ${response.status}`);
        setError(` ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("buyerAccessToken", data.access_token);
      localStorage.setItem("buyerRefreshToken", data.refresh_token);
      localStorage.setItem("buyerTokenExpires_in", data.expires_in);
      localStorage.setItem("buyerId", data.userId);
      localStorage.setItem("role", data.role);
      // setloginSuccessPopUp(true);
      toast.success("Successfully login your account");
      router.push("/user/newsfeed");
      setRender((prev) => !prev);
    } catch (error) {
      console.error("", error);
      setError(` ${error}`);
    }
  };

  const createAgentAccountWithGoogle = async () => {
    try {
      const agentCreateData = {
        fullName: session?.data?.user?.name,
        email: session?.data?.user?.email,
        image: session?.data?.user?.image,
        role: role,
      };

      const response = await fetch(
        "https://q4m0gph5-4000.asse.devtunnels.ms/auth/agent/signUp-with-gmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agentCreateData),
        }
      );
      console.log(response);
      if (!response.ok) {
        console.error(` ${response.status}`);
        setError(` ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("agentAccessToken", data.access_token);
      localStorage.setItem("agentRefreshToken", data.refresh_token);
      localStorage.setItem("agentTokenExpires_in", data.expires_in);
      localStorage.setItem("agentId", data.userId);
      localStorage.setItem("role", data.role);
      // setloginSuccessPopUp(true);
      toast.success("Successfully login your account");
      router.push("user/profile/add-company-name");
      setRender((prev) => !prev);
    } catch (error) {
      console.error("", error);
      setError(` ${error}`);
    }
  };

  useEffect(() => {
    if (session?.status !== "unauthenticated" && session?.data) {
      const user = session.data.user;
      if (role === "buyer" && (user?.name || user?.email)) {
        createUserAccountWithGoogle();
      } else if (role === "agent" && (user?.name || user?.email)) {
        createAgentAccountWithGoogle();
      }
    }
  }, [session, role]);

  return (
    <>
      {signupType === true ? (
        <div className="w-full mb-6">
          <Button className="w-1/2 rounded-r-none  text-white">Buyer</Button>
          <Button
            onClick={() => setSignupType(false)}
            className="w-1/2 rounded-l-none border  border-[#2682d5] bg-white  hover:bg-[#1b6cb313] text-[#2682d5]"
          >
            Agents
          </Button>
        </div>
      ) : (
        <div className="w-full mb-6">
          <Button
            className="w-1/2 rounded-r-none border border-[#2682d5] bg-white  hover:bg-[#1b6cb313] text-[#2682d5]"
            onClick={() => setSignupType(true)}
          >
            Buyer
          </Button>
          <Button className="w-1/2 rounded-l-none text-white">Agents</Button>
        </div>
      )}
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col space-y-1.5 relative">
            <label
              htmlFor="email"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
            >
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 px-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                placeholder="email, email or phone number*"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2682d5]">
                Email
              </span>
            </label>
            {emailError && (
              <p className="text-red-500 text-[13px] mt-[3px]">{emailError}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1.5 relative">
            <div>
              <Country
                countryName={setSelectedCountry}
                stateName={setSelectedState}
                flag={setFlag}
                phoneCode={setPhoneCode}
                selectedCountryError={selectedCountryError}
                selectedStateError={selectedStateError}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5 relative">
            <label
              htmlFor="phone"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
            >
              <div className="gap-x-[7px] absolute   left-0 flex  pl-[7px] pointer-events-none">
                <Image
                  width={28}
                  height={16}
                  className="w-[28px] h-[16px] mt-[10px]"
                  alt="flag"
                  src={flag}
                />
                <p className="text-[#212427] text-[16px] pt-[7px]">
                  +{phone_Code}
                </p>
              </div>
              <input
                type="text"
                id="phone"
                onChange={(e) => setMobile(e.target.value)}
                className="py-[7px] px-3 placeholder:text-[19px] ml-[72px] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full "
                placeholder="phone, email or phone number*"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white ml-[78px] text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[15.5px] peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2682d5]">
                Phone
              </span>
            </label>
            {mobileError && (
              <p className="text-red-500 text-[13px] mt-[3px]">{mobileError}</p>
            )}
          </div>
          {signupType === true ? (
            <></>
          ) : (
            <div className="relative">
              <div className="">
                <label
                  htmlFor="companyName"
                  className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
                >
                  <input
                    type="text"
                    id="companyName"
                    value={selectedCompany}
                    onChange={handleInputChange}
                    onClick={() => setSelectedCompanyDropdown(true)}
                    className="py-2 px-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                    placeholder="companyName, *"
                  />

                  <span className=" pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2682d5]">
                    Company Name
                  </span>
                </label>
                {companyNameError && (
                  <p className="text-red-500 text-[13px] mt-[3px]">
                    {companyNameError}
                  </p>
                )}
              </div>
              {selectedCompanyDropdown && (
                <div
                  onMouseLeave={() => setSelectedCompanyDropdown(false)}
                  ref={containerRef}
                  onScroll={handleScroll}
                  className="font-noto absolute top-[5px] -left-[0px] bg-white border shadow-lg w-[360px] pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
                >
                  <div>
                    {companies?.length > 0 ? (
                      companies?.map((company, i) => (
                        <p
                          key={i}
                          onClick={() => handleCompanyChange(company)}
                          className="font-noto font-normal cursor-pointer text-[#95004A] text-[14px] leading-[36px] w-[360px] h-[30px] hover:bg-[#EBEBEB] flex items-center pt-[1px] pl-[20px] mb-[3px]"
                        >
                          {company.Office_name_english}
                        </p>
                      ))
                    ) : (
                      <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                        No company name found
                      </p>
                    )}
                    {isFetching && (
                      <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                        Loading...
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col space-y-1.5 relative">
            <label
              htmlFor="name"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
            >
              <input
                type="text"
                id="name"
                onChange={(e) => setFullName(e.target.value)}
                className="py-2 px-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                placeholder="name, email or phone number*"
              />

              <span className=" pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2682d5]">
                Full Name
              </span>
            </label>
            {fullNameError && (
              <p className="text-red-500 text-[13px] mt-[3px]">
                {fullNameError}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5 relative">
            <label
              htmlFor="password"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="py-2 px-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                placeholder="password, email or phone number*"
              />

              <span className=" pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2682d5]">
                Password
              </span>
              <button
                type="button" // Prevent the button from triggering form submission
                className="label-text absolute inset-y-0  right-4 top-[3px]"
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
              <p className="text-red-500 text-[13px]  mt-[3px]">
                {passwordError}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm mt-[8px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          {email === "" ||
          password === "" ||
          fullName === "" ||
          mobile === "" ? (
            <></>
          ) : (
            <div>
              {error && <p className="text-red-500 mt-[5px]">{error}</p>}
            </div>
          )}
          <div>
            {signupType === true ? (
              <Button
                onClick={createUserAccount}
                type="submit"
                className="w-[100%] focus:outline-none bg-[#2682d5] text-white hover:bg-[#1b6cb3]"
              >
                REGISTER
              </Button>
            ) : (
              <Button
                onClick={createAgentAccount}
                type="submit"
                className="w-[100%] bg-[#2682d5] focus:outline-none text-white hover:bg-[#1b6cb3]"
              >
                REGISTER
              </Button>
            )}
          </div>
          <div className="mt-6">
            <Button
              onClick={() => router.push("/login")}
              className="w-[100%] focus:outline-none focus:border-[#2682d5] py-[7px] outline-none border border-[#2682d5] bg-white hover:bg-[#1b6cb313] text-[#2682d5]"
            >
              Already have an account?
            </Button>
          </div>
          <div className="">
            <div className="flex items-center justify-center w-full my-4">
              <hr className="w-[24%] text-gray-400" />
              <p className="px-3 w-fit text-gray-400 text-xs">
                OR SIGN UP USING
              </p>
              <hr className="w-[24%] text-gray-400" />
            </div>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => signIn("google")}
                class="py-2.5 pl-4 text-sm font-semibold rounded text-blue-500 bg-blue-100 hover:bg-blue-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  class="inline mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => signIn("facebook")}
                class="py-2.5 px-4 text-sm font-semibold rounded text-blue-500 bg-blue-100 hover:bg-blue-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#007bff"
                  viewBox="0 0 167.657 167.657"
                >
                  <path
                    d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                    data-original="#010002"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                class="py-2.5 px-4 text-sm font-semibold rounded text-blue-500 bg-blue-100 hover:bg-blue-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#000"
                  viewBox="0 0 22.773 22.773"
                >
                  <path
                    d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <RegisterSuccessPopUp
          visible={loginSuccessPopUp}
          closePopUp={setloginSuccessPopUp}
        />
      </div>
    </>
  );
};
