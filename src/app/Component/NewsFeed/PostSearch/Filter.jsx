import React, { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { IoIosArrowRoundForward, IoIosCloseCircleOutline } from "react-icons/io";

const Filter = ({ onClose, setFilterCount, filterVisible, setFilterVisible }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPostTypes, setSelectedPostTypes] = useState([]);

  useEffect(() => {
    const savedSelectedType = localStorage.getItem("selectedType");
    const savedSelectedPostTypes = JSON.parse(localStorage.getItem("selectedPostTypes"));

    if (savedSelectedType) setSelectedType(savedSelectedType);
    if (savedSelectedPostTypes) setSelectedPostTypes(savedSelectedPostTypes);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedType", selectedType);
    localStorage.setItem("selectedPostTypes", JSON.stringify(selectedPostTypes));
  }, [selectedType, selectedPostTypes]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handlePostTypeToggle = (type) => {
    setSelectedPostTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleClear = () => {
    setSelectedType(null);
    setSelectedPostTypes([]);
    setFilterCount(0);
    localStorage.removeItem("selectedType");
    localStorage.removeItem("selectedPostTypes");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterCount(selectedPostTypes.length + (selectedType ? 1 : 0));
  };
  return (
    <div className="backdrop-blur-[20px] bg-[#ffffff80] bg-opacity-90 shadow rounded-md w-96 h-auto pt-4 relative">
      <button onClick={onClose} className="absolute -top-1 -right-1">
        <XCircleIcon className="w-6 h-6 text-[red]" />
      </button>
      <form
        onSubmit={handleSubmit}
        className="!text-[#000000] overflow-y-scroll h-[70vh]"
      >
        {/* single select */}
        <div className="px-4 border-b-[1px] pb-4">
          <p className="text-[14px] font-bold leading-3 m-0 mb-3">Type</p>
          <div className="flex justify-start items-center gap-2">
            <button
              className={`text-[12px] inline-flex px-2 rounded-lg border-[1px] ${
                selectedType === "Required"
                  ? "border-[#7e7aff] bg-[#7e7aff60]"
                  : "border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b]"
              }`}
              onClick={() => handleTypeSelect("Required")}
            >
              <span>Required</span>
            </button>
            <button
              className={`text-[12px] inline-flex px-2 rounded-lg border-[1px] ${
                selectedType === "Available"
                  ? "border-[#7e7aff] bg-[#7e7aff4b]"
                  : "border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b]"
              }`}
              onClick={() => handleTypeSelect("Available")}
            >
              <span>Available</span>
            </button>
            {selectedType && (
              <>
                <div className="">
                  <IoIosArrowRoundForward className="w-4 h-4" />
                </div>
                {/* single select */}
                <button
                  className={`text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b]`}
                >
                  <span>Sell</span>
                </button>
                <button
                  className={`text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b]`}
                >
                  <span>Rent</span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 px-4 border-b-[1px] py-4">
          {/* Select Location from map */}
          <div className="">
            <p className="text-[14px] font-bold leading-3 m-0 mb-3">
              Location from map
            </p>
            <div className="">
              <input
                type="text"
                placeholder="Select Location from map"
                className="border-[1px] rounded-md h-[40px] w-full placeholder:text-[12px] px-2 outline-[#7e7aff]"
              />
            </div>
          </div>
          {/* Towers or Building Name */}
          <div className="">
            <p className="text-[14px] font-bold leading-3 m-0 mb-3">
              Towers or Building
            </p>
            <div className="">
              <input
                type="text"
                placeholder="Towers or Building Name"
                className="border-[1px] rounded-md h-[40px] w-full placeholder:text-[12px] px-2 outline-[#7e7aff]"
              />
            </div>
          </div>
        </div>

        {/* Property category multiple select */}
        <div className="px-4 border-b-[1px] py-4">
          <p className="text-[14px] font-bold leading-3 m-0 mb-3">
            Property Category
          </p>
          <div className="grid grid-cols-2 items-start gap-2">
            <div className="text-[12px] flex justify-start items-center gap-2">
              <input type="checkbox" className="w-4 h-4 outline-none" />
              <span className="leading-none">Flat</span>
            </div>
            <div className="text-[12px] flex justify-start items-center gap-2">
              <input type="checkbox" className="w-4 h-4 outline-none" />
              <span className="leading-none">Building</span>
            </div>
            <div className="text-[12px] flex justify-start items-center gap-2">
              <input type="checkbox" className="w-4 h-4 outline-none" />
              <span className="leading-none">Villa</span>
            </div>
            <div className="text-[12px] flex justify-start items-center gap-2">
              <input type="checkbox" className="w-4 h-4 outline-none" />
              <span className="leading-none">Town House</span>
            </div>
            <div className="text-[12px] flex justify-start items-center gap-2">
              <input type="checkbox" className="w-4 h-4 outline-none" />
              <span className="leading-none">Commercial</span>
            </div>
          </div>
        </div>

        {/* Property type multiple select */}
        <div className="px-4 border-b-[1px] py-4">
          <p className="text-[14px] font-bold leading-3 m-0 mb-3">
            Property type
          </p>
          <div className="">
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>1BHK</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>2BHK</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>3BHK</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>4BHK</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>1BHK</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>2BHK</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>3BHK</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>4BHK</span>
            </div>
          </div>
        </div>
        {/*Parking multiple select */}
        <div className="px-4 border-b-[1px] py-4">
          <p className="text-[14px] font-bold leading-3 m-0 mb-3">Parking</p>
          <div className="grid grid-cols-1 items-start gap-2">
            <div className="text-[12px] flex justify-start items-center gap-2">
              <input type="checkbox" className="w-4 h-4 outline-none" />
              <span className="leading-none">With Parking</span>
            </div>
            <div className="text-[12px] flex justify-start items-center gap-2">
              <input type="checkbox" className="w-4 h-4 outline-none" />
              <span className="leading-none">No Parking</span>
            </div>
          </div>
        </div>
        {/*Sale type (multiple Selector) */}
        <div className="px-4 border-b-[1px] py-4">
          <p className="text-[14px] font-bold leading-3 m-0 mb-3">
            Sale type{" "}
            <span className="text-[12px] font-normal">(multiple Selector)</span>
          </p>
          <div className="">
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>Installment</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>Full Cash</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>Off Plan</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>Furnished</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>Empty</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>Partial Sea View</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>Open View</span>
            </div>
            <div className="text-[12px] inline-flex px-2 rounded-lg border-[1px] border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b] mr-2 mb-2">
              <span>Full Sea View</span>
            </div>
          </div>
        </div>
        {/*post type multiple select */}
        <div className="px-4 py-4 ">
          <p className="text-[14px] font-bold leading-3 m-0 mb-3">Post Type</p>
          <div className="grid grid-cols-1 items-start gap-2">
            <div className="text-[12px] flex justify-start items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 outline-none"
                checked={selectedPostTypes.includes("Urgent")}
                onChange={() => handlePostTypeToggle("Urgent")}
              />
              <span className="leading-none">Urgent</span>
            </div>
            <div className="text-[12px] flex justify-start items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 outline-none"
                checked={selectedPostTypes.includes("Normal")}
                onChange={() => handlePostTypeToggle("Normal")}
              />
              <span className="leading-none">Normal</span>
            </div>
            <div className="text-[12px] flex justify-start items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 outline-none"
                checked={selectedPostTypes.includes("Sponsored")}
                onChange={() => handlePostTypeToggle("Sponsored")}
              />
              <span className="leading-none">Sponsored</span>
            </div>
          </div>
        </div>
        <footer className="flex justify-between gap-3 sticky bottom-0 p-2 bg-white shadow rounded-b-md">
          <button
            type="button"
            className="w-[40%] py-[5px] border-[1px] border-[#615DFA] text-[#615DFA] rounded"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="submit"
            className="w-full py-[5px] bg-[#615DFA] text-white rounded"
          >
            Show Results
          </button>
        </footer>
      </form>
      <button
        type="button"
        onClick={() => setFilterVisible(!filterVisible)}
        className="absolute top-1 right-1"
      >
        <IoIosCloseCircleOutline className="w-6 h-6 text-[red]" />
      </button>
    </div>
  );
};

export default Filter;

// const [minPrice, setMinPrice] = useState(0);
// const [maxPrice, setMaxPrice] = useState(300);
// {/* price filter */}
// <div className="my-2">
//   <div className="flex justify-between items-center gap-3">
//     <ReactSlider
//       className="horizontal-slider !text-[white] !bg-white h-2 rounded-full w-[95%] slider"
//       thumbClassName="example-thumb"
//       trackClassName="example-track"
//       defaultValue={[0, 300]}
//       ariaLabelledby={["first-slider-label", "second-slider-label"]}
//       ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
//       renderThumb={(props, state) => (
//         <div {...props}>{state.valueNow}</div>
//       )}
//       pearling
//       minDistance={20}
//     />
//     <div className="w-full max-w-[100px] text-[0.9rem] leading-3 border h-8 bg-white rounded flex justify-start items-center text-[#615DFA] font-semibold">
//       <div className="bg-[#615DFA] w-8 rounded-l-md rounded-r-none h-full flex justify-center items-center mr-2">
//         <FaDollarSign className="text-white" />
//       </div>
//       <span className="flex justify-center items-center">
//         {minPrice} - {maxPrice}
//       </span>
//     </div>
//   </div>
// </div>
// <div></div>
// <footer className="flex justify-end gap-2">
//   <button className="px-[6px] py-[3px] bg-[#fc2323] text-white rounded-md">
//     <IoIosCloseCircleOutline className="w-5 h-5" />
//   </button>
//   <button className="px-[6px] py-[3px] bg-[#615DFA] text-white rounded-md">
//     <CiSearch className="w-5 h-5" />
//   </button>
// </footer>
// <style jsx>{`
//   .horizontal-slider {
//     position: relative;
//   }

//   .example-thumb {
//     position: absolute;
//     top: 50%;
//     -ms-transform: translateY(-50%);
//     transform: translateY(-50%);
//     width: 28px;
//     height: 28px;
//     border-radius: 50%;
//     background-color: #615dfa;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 2px;
//     font-size: 0.6rem;
//   }
// `}</style>
