"use client";
import React, { useState } from "react";
import { data } from "@/app/config/country_name";
export const Country = ({
  countryName,
  stateName,
  citieName,
  flag,
  phoneCode,
  selectedCountryError,
  selectedStateError,
  selectedCitieError,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountryDropdown, setSelectedCountryDropdown] = useState(false);
  const [selectedStateDropdown, setSelectedStateDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryState, setSearchQueryState] = useState("");
  const [states, setSatate] = useState([]);
  const handleCountryChange = (value) => {
    setSelectedCountry(value.name);
    flag(value.flags.png);
    phoneCode(value.phone_code);
    countryName(value.name);
    setSelectedCountryDropdown(false);
    setSearchQuery("");
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
    stateName(value.name);
    console.log(value.name);
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

  return (
    <>
      <div className="relative  mb-[16px]">
        <div className=" space-y-1.5 relative">
          <label
            htmlFor="Country"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
          >
            <input
              type="text"
              value={selectedCountry}
              onChange={handleInputChange}
              onClick={() => {
                setSelectedCountryDropdown(true);
                setSelectedStateDropdown(false);
              }}
              className="py-2 px-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
              placeholder="Country*"
            />

            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2682d5]">
              Selected Country
            </span>
          </label>
        </div>
        {selectedCountryError && (
          <p className="text-red-500 text-[13px] mt-[3px]">
            {selectedCountryError}
          </p>
        )}
        {selectedCountryDropdown && (
          <div
            onMouseLeave={() => setSelectedCountryDropdown(false)}
            className="font-noto absolute top-[5px] -left-[0px] bg-white border shadow-lg w-[360px] pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
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
      <div className="relative mb-[3px]">
        <div className=" space-y-1.5 relative">
          <label
            htmlFor="State"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
          >
            <input
              type="text"
              value={selectedState}
              onChange={handleStateInputChange}
              onClick={() => {
                setSelectedCountryDropdown(false);
                setSelectedStateDropdown(true);
              }}
              className="py-2 px-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
              placeholder="State*"
            />

            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2682d5]">
              Selected State
            </span>
          </label>
        </div>
        {selectedStateError && (
          <p className="text-red-500 text-[13px] mt-[3px]">
            {selectedStateError}
          </p>
        )}
        {selectedStateDropdown && (
          <div
            onMouseLeave={() => setSelectedStateDropdown(false)}
            className="font-noto absolute top-[5px] -left-[0px] bg-white border shadow-lg w-[360px] pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
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
    </>
  );
};
