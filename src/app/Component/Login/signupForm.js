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
import toast from "react-hot-toast";
import { SocialLogin } from "../SocialLogin/SocialLogin";
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
        device: "web",
      };

      const response = await fetch(
        `https://q4m0gph5-4000.asse.devtunnels.ms/auth/user/signUp`,
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
        device: "web",
      };

      const response = await fetch(
        `https://q4m0gph5-4000.asse.devtunnels.ms/auth/agent/signUp`,
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
    setIsFetching(true);
    try {
      const response = await axios.get(
        `https://q4m0gph5-4000.asse.devtunnels.ms/company`,
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
            <div>
              <SocialLogin setError={setError} />
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
