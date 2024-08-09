import React, { useState, useEffect, useRef } from "react";
import { Input } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { CgClose } from "react-icons/cg";

export const AddLanguage = ({
  selectedLanguage,
  setSelectedLanguage,
  LanguageError,
}) => {
  const [Languages, setLanguages] = useState([
    {
      name: "English",
    },
    {
      name: "Arabice",
    },
    {
      name: "Bangla",
    },
    {
      name: "Hindi",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setDropdownVisible(true);
  };

  const handleLanguageselect = (Language) => {
    if (selectedLanguage.length < 5 && !selectedLanguage.includes(Language)) {
      setSelectedLanguage([...selectedLanguage, Language]);
      setDropdownVisible(false);
    } else if (selectedLanguage.includes(Language)) {
      alert("Language already selected.");
    } else {
      alert("Maximum 5 Languages can be selected.");
    }
  };

  const handleLanguageAdd = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newLanguage = { name: inputValue.trim() };
      if (
        selectedLanguage.length < 5 &&
        !selectedLanguage.some((Language) => Language.name === newLanguage.name)
      ) {
        setLanguages([...Languages, newLanguage]);
        setSelectedLanguage([...selectedLanguage, newLanguage.name]);
        setInputValue("");
        setDropdownVisible(false);
      } else if (
        selectedLanguage.some((Language) => Language.name === newLanguage.name)
      ) {
        alert("Language already selected.");
      } else {
        alert("Maximum 5 Languages can be selected.");
      }
    }
  };

  const handleLanguageRemove = (LanguageToRemove) => {
    setSelectedLanguage(
      selectedLanguage.filter((Language) => Language !== LanguageToRemove)
    );
  };

  const filteredLanguages = Languages.map((Language) => Language.name).filter(
    (Language) => Language.toLowerCase().includes(inputValue.toLowerCase())
  );

  const showAllLanguages = () => {
    setInputValue("");
    setDropdownVisible(true);
  };
  return (
    <div ref={wrapperRef} className="mt-1">
      <label htmlFor="" className="font-semibold">
        Language (Multiple)
      </label>
      <div className="relative">
        <Input
          className={clsx(
            LanguageError === ""
              ? "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444] mb-2"
              : "block w-full rounded-md border-[1px] border-rose-600 outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 placeholder:text-rose-600 mb-2"
          )}
          placeholder={LanguageError === "" ? "Languages..." : LanguageError}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleLanguageAdd}
        />
        <button
          type="button"
          className="absolute top-1/2 right-8 transform -translate-y-1/2 text-[#444]"
          onClick={showAllLanguages}
        >
          Show All
        </button>
        <ChevronDownIcon className="size-4 fill-[#333] absolute top-1/2 right-2 transform -translate-y-1/2" />
        {dropdownVisible && (
          <div className="absolute z-30 h-[180px] overflow-y-auto bottom-11 w-full max-w-[180px] rounded-md bg-[#fffbfb] shadow-[0_5px_10px_-10px_rgba(0,0,0,0.3)] border-[1px] py-2">
            {filteredLanguages.length ? (
              filteredLanguages.map((Language) => (
                <div
                  key={Language}
                  className="cursor-pointer px-4 py-[2px] text-[14px] text-[#444] hover:bg-[#ededed]"
                  onClick={() => handleLanguageselect(Language)}
                >
                  {Language}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-[#444]">
                No Languages found
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedLanguage?.map((Language) => (
          <div
            key={Language}
            className="inline-flex justify-between items-center gap-1 rounded-sm bg-[#ededed] py-[2px] leading-4 pl-2 pr-1 text-[16px] font-medium text-[#333] shadow-inner shadow-white/10 focus:outline-none"
          >
            <span>{Language}</span>
            <CgClose
              className="w-3 h-3 text-red-500 cursor-pointer"
              onClick={() => handleLanguageRemove(Language)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
