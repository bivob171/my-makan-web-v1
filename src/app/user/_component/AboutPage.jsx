"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import React, { useEffect, useState } from "react";
import { data } from "@/app/config/country_name";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { AddLanguage } from "@/app/Component/NewsFeed/AddLanguage";
export const AboutPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();

  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  console.log(selectedImage);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [mobile, setMobile] = useState("");
  const [flag, setFlag] = useState("/defultFlag.png");
  const [phone_Code, setPhoneCode] = useState("971");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [LanguageError, setLanguageError] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountryDropdown, setSelectedCountryDropdown] = useState(false);
  const [selectedStateDropdown, setSelectedStateDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryState, setSearchQueryState] = useState("");
  const [states, setSatate] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    setSelectedImage(
      user?.image === null ? "  https://i.ibb.co/7298VDJ/user.png" : user?.image
    );
    setFullName(user?.fullName);
    setMobile(user?.mobile);
    setEmail(user?.email);
    if (role === "buyer") {
      setCompanyName("");
    } else {
      setCompanyName(user?.companyName);
    }
    setPhoneCode(user?.mobile_code);
    setSelectedCountry(user?.country);
    setSelectedState(user?.state);
    setBio(user?.bio);
    setSelectedLanguage(user?.language);
  }, [user, role]);

  const handleCountryChange = (value) => {
    setSelectedCountry(value.name);
    setFlag(value.flags.png);
    setPhoneCode(value.phone_code);
    setSelectedCountryDropdown(false);
    setSearchQuery("");
    console.log(value);
    setSatate(value.states);
  };

  const handleInputChange = (e) => {
    setSelectedCountry(e.target.value);
    setSearchQuery(e.target.value);
    setSelectedCountryDropdown(true);
    setSelectedStateDropdown(false);
  };

  const filteredCountries = data.filter((country) =>
    country.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // state
  const handleStateChange = (value) => {
    setSelectedState(value.name);
    setSelectedStateDropdown(false);
    setSearchQueryState("");
  };

  const handleStateInputChange = (e) => {
    setSelectedState(e.target.value);
    setSearchQueryState(e.target.value);
    setSelectedStateDropdown(true);
    setSelectedCountryDropdown(false);
  };

  const filteredStates = states.filter((state) =>
    state.name?.toLowerCase().includes(searchQueryState.toLowerCase())
  );

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
        `http://localhost:4000/file-upload/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const links = response.data.map((item) => item.Location);
      setSelectedImage(links[0]);
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

  const updateUserAccount = async () => {
    try {
      const userUpdateData = {
        image: selectedImage,
        fullName: fullName,
        mobile: mobile,
        mobile_code: phone_Code,
        country: selectedCountry,
        state: selectedState,
        bio: bio,
        language: selectedLanguage,
      };
      const token = localStorage.getItem("buyerAccessToken");

      const response = await fetch(
        `http://localhost:4000/user/update-profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userUpdateData),
        }
      );

      if (!response.ok) {
        setError(` ${response.status}`);
      }
      const data = await response.json();
      toast.success("Profile updated successfully.", {
        style: {
          whiteSpace: "nowrap",
        },
      });
      setRender((prev) => !prev);
    } catch (error) {
      console.error("", error);
      setError(` ${error}`);
    }
  };

  const updateAgentAccount = async () => {
    try {
      const updateCreateData = {
        image: selectedImage,
        fullName: fullName,
        mobile: mobile,
        mobile_code: phone_Code,
        companyName: companyName,
        country: selectedCountry,
        state: selectedState,
        bio: bio,
        language: selectedLanguage,
      };
      const token = localStorage.getItem("agentAccessToken");
      const response = await fetch(
        `http://localhost:4000/agent/update-profile`,
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
        setError(` ${response.status}`);
      }
      const data = await response.json();
      toast.success("Profile updated successfully.", {
        style: {
          whiteSpace: "nowrap",
        },
      });
      setRender((prev) => !prev);
    } catch (error) {
      console.error("", error);
      setError(` ${error}`);
    }
  };
  return (
    <div className="col-lg-8">
      <div className="forum-topic-add">
        <div className="block-box">
          <form>
            <div className="  mb-[20px]">
              <div className="relative flex gap-x-[30px]">
                <div className="relative h-[70px] w-[70px]">
                  {uploading === true ? (
                    <Image
                      src="/imgloding.gif"
                      alt="Loading..."
                      width={90}
                      height={90}
                    />
                  ) : (
                    <>
                      <Image
                        alt=""
                        width={100}
                        height={100}
                        src={selectedImage}
                        className="h-[70px] w-[70px]  rounded-full object-cover cursor-pointer"
                      />
                      <label htmlFor="upload">
                        <Image
                          alt=""
                          width={100}
                          height={100}
                          className="absolute bottom-0 right-0  cursor-pointer w-[20px] h-[20px]"
                          src="/camara.svg"
                        />
                      </label>
                    </>
                  )}
                </div>
                <p className="top-[12px] absolute bottom-0 left-[100px] text-[15px] leading-[22px] font-semibold text-black text-opacity-70">
                  Updated my profile picture! <br />
                  <span className="text-[14px] font-medium text-black text-opacity-50  ">
                    Make sure your pic is in PNG or JPG format for the best
                    quality!
                  </span>
                </p>
              </div>

              <input
                id="upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-control"
                name="topic_tag"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                value={email}
                readOnly
                className="form-control"
                name="topic_tag"
              />
            </div>
            {user?.role === "agent" ? (
              <div className="form-group">
                <label>Company Name:</label>
                <input
                  type="text"
                  value={companyName}
                  readOnly
                  className="form-control"
                  name="topic_tag"
                />
              </div>
            ) : (
              <></>
            )}
            <div className="form-group relative">
              <label>Country:</label>
              <input
                type="text"
                value={selectedCountry}
                onChange={handleInputChange}
                onClick={() => {
                  setSelectedCountryDropdown(true);
                  setSelectedStateDropdown(false);
                }}
                className="form-control"
                name="topic_tag"
              />
              {selectedCountryDropdown === true && (
                <div
                  onMouseLeave={() => setSelectedCountryDropdown(false)}
                  className="font-noto absolute top-[42px]  bg-white border shadow-sm w-full pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
                >
                  <div>
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country, i) => (
                        <p
                          key={i}
                          onClick={() => handleCountryChange(country)}
                          className="font-noto font-normal cursor-pointer text-[#95004A] text-[14px] leading-[36px] w-[360px] h-[30px] hover:bg-[#EBEBEB] flex items-center pt-[1px] pl-[20px] mb-[3px]"
                        >
                          {country?.name}
                        </p>
                      ))
                    ) : (
                      <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                        No countries found
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="form-group relative">
              <label>State:</label>
              <input
                type="text"
                value={selectedState}
                onChange={handleStateInputChange}
                onClick={() => {
                  setSelectedCountryDropdown(false);
                  setSelectedStateDropdown(true);
                }}
                className="form-control"
                name="topic_tag"
              />
              {selectedStateDropdown === true && (
                <div
                  onMouseLeave={() => setSelectedStateDropdown(false)}
                  className="font-noto absolute top-[42px]  bg-white border shadow-sm w-full pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
                >
                  <div>
                    {filteredStates?.length > 0 ? (
                      filteredStates?.map((state, i) => (
                        <p
                          key={i}
                          onClick={() => handleStateChange(state)}
                          className="font-noto font-normal cursor-pointer text-[#95004A] text-[14px] leading-[36px] w-[360px] h-[30px] hover:bg-[#EBEBEB] flex items-center pt-[1px] pl-[20px] mb-[3px]"
                        >
                          {state?.name}
                        </p>
                      ))
                    ) : (
                      <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                        No state found
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="form-group ">
              <label>Phone:</label>
              <div className="  ">
                <label
                  htmlFor="phone"
                  className="relative w-full pt-[7px] items-center rounded-md border border-gray-200 h-[50px] focus-within:none "
                >
                  <div>
                    <div className="gap-x-[7px] absolute pt-[7px]  left-0 flex items-center pl-[23px] pointer-events-none">
                      <Image
                        width={28}
                        height={16}
                        className="w-[28px] h-[16px]"
                        alt="flag"
                        src={flag}
                      />
                      <p className="text-[#212427] text-[16px] -mb-0">
                        +{phone_Code}
                      </p>
                    </div>
                    <input
                      type="text"
                      id="phone"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="  placeholder:text-[19px] pl-[103px] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full  pb-[12px] text-[#212427] text-[16px]"
                      placeholder="phone, email or phone number*"
                    />
                  </div>
                </label>
              </div>
            </div>
            <div>
              <AddLanguage
                setSelectedLanguage={setSelectedLanguage}
                selectedLanguage={selectedLanguage}
                LanguageError={LanguageError}
              />
            </div>
            <div className="mb-[22px]">
              <div className="form-group">
                <label>About me (optional):</label>
                <textarea
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="form-control"
                  name="topic_tag"
                />
              </div>
            </div>
            <div className="w-[500px]"></div>
            <div className="form-group">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Notify me of follow-up replies via email
                </label>
              </div>
            </div>
            {user?.role === "agent" ? (
              <div className="form-group">
                <button
                  onClick={updateAgentAccount}
                  type="button"
                  className="submit-btn"
                  name="btn-add"
                >
                  Update Now
                </button>
              </div>
            ) : (
              <div className="form-group">
                <button
                  onClick={updateUserAccount}
                  type="button"
                  className="submit-btn"
                  name="btn-add"
                >
                  Update Now
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
