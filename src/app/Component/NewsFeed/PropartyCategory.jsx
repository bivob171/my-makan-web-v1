import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const PropertyCategory = ({
  setPropertyCategory,
  propertyCategoryName,
  propertyCategoryError,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`http://api.mymakan.ae/post-field-data/property-category`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Menu>
        <MenuButton
          className={
            propertyCategoryError === ""
              ? "inline-flex justify-between items-center gap-1 rounded-md bg-[#ededed] py-1.5 px-3 text-[14px] placeholder:text-[14px] font-medium text-[#333] shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#ededed] data-[open]:bg-[#ededed] data-[focus]:outline-1 data-[focus]:outline-white"
              : "inline-flex justify-between items-center gap-1 rounded-md bg-[#ededed] py-1.5 px-3 text-[14px] placeholder:text-[12px] text-nowrap font-medium text-rose-600 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#ededed] data-[open]:bg-[#ededed] data-[focus]:outline-1 data-[focus]:outline-white"
          }
        >
          {propertyCategoryError === ""
            ? propertyCategoryName
            : propertyCategoryError}

          <ChevronDownIcon className="size-3 fill-[#333]" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="w-full h-[180px] overflow-y-auto !max-w-[180px] origin-top-left rounded-md border bg-[#ededed] text-[#444] mt-[2px] text-[14px] placeholder:text-[14px] font-medium transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 relative z-50 "
        >
          {categories.map((category) => (
            <MenuItem key={category._id}>
              <button
                className="group flex w-full items-center gap-2 rounded-md py-[3px]  text-[15px] px-2 data-[focus]:bg-white/10"
                onClick={() => setPropertyCategory(category?.name)}
              >
                {category.name}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </>
  );
};

export default PropertyCategory;
