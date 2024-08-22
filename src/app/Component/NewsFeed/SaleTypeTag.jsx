import React, { useState, useEffect, useRef } from "react";
import { Input } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { CgClose } from "react-icons/cg";

const SaleTypeTag = ({ setSellType, sellType }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`https://q4m0gph5-4000.asse.devtunnels.ms/post-field-data/sell-type`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTags(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

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

  const handleTagSelect = (tag) => {
    if (sellType.length < 5 && !sellType.includes(tag)) {
      setSellType([...sellType, tag]);
      setDropdownVisible(false);
    } else if (sellType.includes(tag)) {
      alert("Tag already selected.");
    } else {
      alert("Maximum 5 tags can be selected.");
    }
  };

  const handleTagAdd = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newTag = { name: inputValue.trim() };
      if (
        sellType.length < 5 &&
        !sellType.some((tag) => tag.name === newTag.name)
      ) {
        setTags([...tags, newTag]);
        setSellType([...sellType, newTag.name]);
        setInputValue("");
        setDropdownVisible(false);
      } else if (sellType.some((tag) => tag.name === newTag.name)) {
        alert("Tag already selected.");
      } else {
        alert("Maximum 5 tags can be selected.");
      }
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setSellType(sellType.filter((tag) => tag !== tagToRemove));
  };

  const filteredTags = tags
    .map((tag) => tag.name)
    .filter((tag) => tag.toLowerCase().includes(inputValue.toLowerCase()));

  const showAllTags = () => {
    setInputValue("");
    setDropdownVisible(true);
  };

  return (
    <div ref={wrapperRef} className="mt-1">
      <label htmlFor="" className="font-semibold">
        Sale type (Multiple)
      </label>
      <div className="relative">
        <Input
          className={clsx(
            "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444] mb-2"
          )}
          placeholder="Sale type..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleTagAdd}
        />
        <button
          type="button"
          className="absolute top-1/2 right-8 transform -translate-y-1/2 text-[#444]"
          onClick={showAllTags}
        >
          Show All
        </button>
        <ChevronDownIcon className="size-4 fill-[#333] absolute top-1/2 right-2 transform -translate-y-1/2" />
        {dropdownVisible && (
          <div className="absolute z-30 h-[180px] overflow-y-auto bottom-11 w-full max-w-[180px] rounded-md bg-[#fffbfb] shadow-[0_5px_10px_-10px_rgba(0,0,0,0.3)] border-[1px] py-2">
            {filteredTags.length ? (
              filteredTags.map((tag) => (
                <div
                  key={tag}
                  className="cursor-pointer px-4 py-[2px] text-[14px] text-[#444] hover:bg-[#ededed]"
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-[#444]">No tags found</div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {sellType?.map((tag) => (
          <div
            key={tag}
            className="inline-flex justify-between items-center gap-1 rounded-sm bg-[#ededed] py-[2px] leading-4 pl-2 pr-1 text-[16px] font-medium text-[#333] shadow-inner shadow-white/10 focus:outline-none"
          >
            <span>{tag}</span>
            <CgClose
              className="w-3 h-3 text-red-500 cursor-pointer"
              onClick={() => handleTagRemove(tag)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleTypeTag;
