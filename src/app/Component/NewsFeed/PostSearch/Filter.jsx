import React, { useState, useEffect, useRef, useContext } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import {
  IoIosArrowRoundForward,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import axios from "axios";
import FilterMap from "./FilterMap";
import { usePathname } from "next/navigation";
import { FilterRenderContext } from "@/Context/filterRenderContext";

const Filter = ({
  setFilterCount,
  filterCount,
  filterVisible,
  setFilterVisible,
}) => {
  const pathname = usePathname();
  // postType
  const {
    filterRenderAgentPost,
    setfilterRenderAgentPost,
    filterRenderBuyerPost,
    setfilterRenderBuyerPost,
    filterRenderAllPost,
    setfilterRenderAllPost,
    selectedType,
    setSelectedType,
    postType,
    setPostType,
    forPost,
    setForPost,
    towersorBuildingName,
    setTowersorBuildingName,
    propertyCategoryName,
    setPropertyCategory,
    propertyTypeName,
    setPropertyType,
    parking,
    setParking,
    sellType,
    setSellType,
    tags,
    setTags,
    lata,
    setLata,
    lon,
    setLon,
    formatted_address,
    setFormatted_address,
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
  } = useContext(FilterRenderContext);
  const [filterRender, setfilterRender] = useState(false);
  const [filterMapOpen, setFilterMapOpen] = useState(false);

  function open() {
    setFilterMapOpen(true);
  }

  const handleTypeSelect = (type) => {
    setSelectedType(selectedType === "" ? type : "");
  };

  const handelPostFor = (value) => {
    setForPost(forPost === value ? "" : value);
  };
  // tower fatch

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedTower, setSelectedTower] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const containerRefTowerResult = useRef(null);

  const fetchTower = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`https://api.mymakan.ae/country/tower`, {
        params: {
          search,
          page,
          limit,
        },
      });
      const newTower = response.data;
      setHasMore(newTower.length === limit);
      setFilteredSuggestions((prevTower) => {
        return page === 1 ? newTower : [...prevTower, ...newTower];
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchTower();
  }, [search, page]);
  const handleInputTowerChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setSelectedTower(searchTerm);
    setTowersorBuildingName(searchTerm);
    setPage(1); // Reset to first page on search change
    setFilteredSuggestions([]); // Clear current companies
    setHasMore(true); // Reset hasMore when search changes
  };

  const handleTowerChange = (tower) => {
    setSelectedTower(tower.name);
    setTowersorBuildingName(tower.name);
    setShowSuggestions(false);
  };

  const handleScroll = () => {
    const container = containerRefTowerResult.current;
    if (
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5 &&
      !isFetching &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1); // Increment page when user scrolls to the bottom
    }
  };

  //   Property Category

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`https://api.mymakan.ae/post-field-data/property-category`)
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
  //   Property type

  const [types, setTypes] = useState([]);
  const [loadingT, setLoadingT] = useState(true);
  const [errorT, setErrorT] = useState(null);
  useEffect(() => {
    fetch(`https://api.mymakan.ae/post-field-data/property-category`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTypes(data);
        setLoadingT(false);
      })
      .catch((error) => {
        setErrorT(error);
        setLoadingT(false);
      });
  }, []);

  // sell type

  const [sellTypesList, setSellTypesList] = useState([]);
  const [loadingSell, setLoadingSell] = useState(true);
  const [errorSell, setErrorSell] = useState(null);
  useEffect(() => {
    fetch(`https://api.mymakan.ae/post-field-data/sell-type`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSellTypesList(data);
        setLoadingSell(false);
      })
      .catch((error) => {
        setErrorSell(error);
        setLoadingSell(false);
      });
  }, []);

  const handleSellTypeClick = (sellName) => {
    if (sellType.includes(sellName)) {
      // If already selected, remove it from the list
      const newSellType = sellType.filter((type) => type !== sellName);
      setSellType(newSellType);
    } else if (sellType.length < 5) {
      // If not selected and the number of selected items is less than 5, add it
      setSellType([...sellType, sellName]);
    } else {
      alert("You can only select up to 5 Sell Types.");
    }
  };

  // tags

  const [tagsList, setTagsList] = useState([]);
  const [loadingTag, setLoadingTag] = useState(true);
  const [errorTag, setErrorTag] = useState(null);
  useEffect(() => {
    fetch(`https://api.mymakan.ae/post-field-data/tags`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTagsList(data);
        setLoadingTag(false);
      })
      .catch((error) => {
        setErrorTag(error);
        setLoadingTag(false);
      });
  }, []);

  const handleTagClick = (tagName) => {
    if (tags?.includes(tagName)) {
      // If the tag is already selected, remove it
      const newTags = tags.filter((type) => type !== tagName);
      setTags(newTags);
    } else if (tags?.length < 5) {
      // If not selected and the number of selected items is less than 5, add it
      setTags([...tags, tagName]);
    } else {
      // Alert the user if they try to select more than 5 tags
      alert("You can only select up to 5 tags.");
    }
  };

  // Function to save newsfeed post
  const handleSaveFilterValue = (e) => {
    const newsfeedFilterValue = {
      selectedType,
      postType,
      forPost,
      towersorBuildingName,
      propertyCategoryName,
      propertyTypeName,
      parking,
      sellType,
      tags,
      country,
      state,
      city,
      filterRender: filterRender === false ? true : false,
    };

    // Get an array of non-empty values, excluding `filterRender`
    const nonEmptyValues = Object.entries(newsfeedFilterValue)
      .filter(([key, value]) => {
        // Exclude `filterRender` from the check
        if (key === "filterRender") return false;

        // Check if the field is either `sellType` or `tags` and ensure it's an array with elements
        if ((key === "sellType" || key === "tags") && Array.isArray(value)) {
          return value.length > 0;
        }

        // General check for non-empty values
        return value !== undefined && value !== null && value !== "";
      })
      .map(([_, value]) => value); // Extract the values after filtering

    const filterCounteNumber = nonEmptyValues.length;
    const updatednewsfeedFilterValue = {
      ...newsfeedFilterValue,
      filterCounteNumber,
    };

    localStorage.setItem(
      "newsfeedFilterValue",
      JSON.stringify(updatednewsfeedFilterValue)
    );
  };
  // Function to save agent post
  const handleSaveAgentPostFilterValue = (e) => {
    const agentPostFilterValue = {
      selectedType,
      postType,
      forPost,
      towersorBuildingName,
      propertyCategoryName,
      propertyTypeName,
      parking,
      sellType,
      tags,
      country,
      state,
      city,
      filterRender: filterRender === false ? true : false,
    };
    // Get an array of non-empty values, excluding `filterRender`
    const nonEmptyValues = Object.entries(agentPostFilterValue)
      .filter(([key, value]) => {
        // Exclude `filterRender` from the check
        if (key === "filterRender") return false;

        // Check if the field is either `sellType` or `tags` and ensure it's an array with elements
        if ((key === "sellType" || key === "tags") && Array.isArray(value)) {
          return value.length > 0;
        }

        // General check for non-empty values
        return value !== undefined && value !== null && value !== "";
      })
      .map(([_, value]) => value); // Extract the values after filtering

    const filterCounteNumber = nonEmptyValues.length;
    const updatedAgentPostFilterValue = {
      ...agentPostFilterValue,
      filterCounteNumber,
    };

    localStorage.setItem(
      "agentPostFilterValue",
      JSON.stringify(updatedAgentPostFilterValue)
    );
  };
  // Function to save buyer post
  const handleSaveBuyerFilterValue = (e) => {
    const buyerPostFilterValue = {
      selectedType,
      postType,
      forPost,
      towersorBuildingName,
      propertyCategoryName,
      propertyTypeName,
      parking,
      sellType,
      tags,
      country,
      state,
      city,
      filterRender: filterRender === false ? true : false,
    };

    // Get an array of non-empty values, excluding `filterRender`
    const nonEmptyValues = Object.entries(buyerPostFilterValue)
      .filter(([key, value]) => {
        // Exclude `filterRender` from the check
        if (key === "filterRender") return false;

        // Check if the field is either `sellType` or `tags` and ensure it's an array with elements
        if ((key === "sellType" || key === "tags") && Array.isArray(value)) {
          return value.length > 0;
        }

        // General check for non-empty values
        return value !== undefined && value !== null && value !== "";
      })
      .map(([_, value]) => value); // Extract the values after filtering

    const filterCounteNumber = nonEmptyValues.length;
    const updatedBuyerPostFilterValue = {
      ...buyerPostFilterValue,
      filterCounteNumber,
    };

    localStorage.setItem(
      "buyerPostFilterValue",
      JSON.stringify(updatedBuyerPostFilterValue)
    );
  };

  // Load the city value based on the current route
  useEffect(() => {
    if (pathname === "/user/newsfeed" || pathname === "/user") {
      const newsfeedFilterValue = localStorage.getItem("newsfeedFilterValue");
      setCity(newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).city : "");
      setState(
        newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).state : ""
      );
      setCountry(
        newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).country : ""
      );
      setSelectedType(
        newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).selectedType : ""
      );
      setPostType(
        newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).postType : ""
      );
      setForPost(
        newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).forPost : ""
      );
      setTowersorBuildingName(
        newsfeedFilterValue
          ? JSON.parse(newsfeedFilterValue).towersorBuildingName
          : ""
      );
      setPropertyCategory(
        newsfeedFilterValue
          ? JSON.parse(newsfeedFilterValue).propertyCategoryName
          : ""
      );
      setPropertyType(
        newsfeedFilterValue
          ? JSON.parse(newsfeedFilterValue).propertyTypeName
          : ""
      );
      setParking(
        newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).parking : ""
      );
      setSellType(
        newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).sellType : ""
      );
      setTags(newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).tags : "");
    } else if (pathname === "/user/agent-posts") {
      const agentPostFilterValue = localStorage.getItem("agentPostFilterValue");
      setCity(
        agentPostFilterValue ? JSON.parse(agentPostFilterValue).city : ""
      );
      setState(
        agentPostFilterValue ? JSON.parse(agentPostFilterValue).state : ""
      );
      setCountry(
        agentPostFilterValue ? JSON.parse(agentPostFilterValue).country : ""
      );
      setSelectedType(
        agentPostFilterValue
          ? JSON.parse(agentPostFilterValue).selectedType
          : ""
      );
      setPostType(
        agentPostFilterValue ? JSON.parse(agentPostFilterValue).postType : ""
      );
      setForPost(
        agentPostFilterValue ? JSON.parse(agentPostFilterValue).forPost : ""
      );
      setTowersorBuildingName(
        agentPostFilterValue
          ? JSON.parse(agentPostFilterValue).towersorBuildingName
          : ""
      );
      setPropertyCategory(
        agentPostFilterValue
          ? JSON.parse(agentPostFilterValue).propertyCategoryName
          : ""
      );
      setPropertyType(
        agentPostFilterValue
          ? JSON.parse(agentPostFilterValue).propertyTypeName
          : ""
      );
      setParking(
        agentPostFilterValue ? JSON.parse(agentPostFilterValue).parking : ""
      );
      setSellType(
        agentPostFilterValue ? JSON.parse(agentPostFilterValue).sellType : ""
      );
      setTags(
        agentPostFilterValue ? JSON.parse(agentPostFilterValue).tags : ""
      );
    } else if ("/user/buyer-posts") {
      const buyerPostFilterValue = localStorage.getItem("buyerPostFilterValue");
      setCity(
        buyerPostFilterValue ? JSON.parse(buyerPostFilterValue).city : ""
      );
      setState(
        buyerPostFilterValue ? JSON.parse(buyerPostFilterValue).state : ""
      );
      setCountry(
        buyerPostFilterValue ? JSON.parse(buyerPostFilterValue).country : ""
      );
      setSelectedType(
        buyerPostFilterValue
          ? JSON.parse(buyerPostFilterValue).selectedType
          : ""
      );
      setPostType(
        buyerPostFilterValue ? JSON.parse(buyerPostFilterValue).postType : ""
      );
      setForPost(
        buyerPostFilterValue ? JSON.parse(buyerPostFilterValue).forPost : ""
      );
      setTowersorBuildingName(
        buyerPostFilterValue
          ? JSON.parse(buyerPostFilterValue).towersorBuildingName
          : ""
      );
      setPropertyCategory(
        buyerPostFilterValue
          ? JSON.parse(buyerPostFilterValue).propertyCategoryName
          : ""
      );
      setPropertyType(
        buyerPostFilterValue
          ? JSON.parse(buyerPostFilterValue).propertyTypeName
          : ""
      );
      setParking(
        buyerPostFilterValue ? JSON.parse(buyerPostFilterValue).parking : ""
      );
      setSellType(
        buyerPostFilterValue ? JSON.parse(buyerPostFilterValue).sellType : ""
      );
      setTags(
        buyerPostFilterValue ? JSON.parse(buyerPostFilterValue).tags : ""
      );
    }
  }, [pathname]);

  // Load the city value based on the current route

  // Function to save  values
  const handleResultButtonClick = () => {
    if (pathname === "/user/newsfeed") {
      handleSaveFilterValue(); // Call the function to save newsfeed data
      setfilterRenderAllPost(!filterRenderAllPost);
    } else if (pathname === "/user/agent-posts") {
      handleSaveAgentPostFilterValue(); // Call the function to save agent data
      setfilterRenderAgentPost(!filterRenderAgentPost);
    } else if (pathname === "/user/buyer-posts") {
      handleSaveBuyerFilterValue(); // Call the function to save buyer data
      setfilterRenderBuyerPost(!filterRenderBuyerPost);
    }
  };

  // Function to clear data based on pathname
  const handleSaveClear = () => {
    if (pathname === "/user/newsfeed") {
      localStorage.removeItem("newsfeedFilterValue");
      setfilterRenderAllPost(!filterRenderAllPost);
    } else if (pathname === "/user/agent-posts") {
      localStorage.removeItem("agentPostFilterValue");
      setfilterRenderAgentPost(!filterRenderAgentPost);
    } else if (pathname === "/user/buyer-posts") {
      localStorage.removeItem("buyerPostFilterValue");
      setfilterRenderBuyerPost(!filterRenderBuyerPost);
    }

    // Reset all states to their initial values
    setCity(""),
      setState(""),
      setCountry(""),
      setSelectedType(""),
      setPostType(""),
      setForPost(""),
      setTowersorBuildingName(""),
      setPropertyCategory(""),
      setPropertyType(""),
      setParking(""),
      setSellType([]),
      setTags([]);
    setfilterRender(!filterRender);
    setFilterCount(0);
    localStorage.removeItem("selectedType");
    localStorage.removeItem("selectedPostTypes");
  };

  function towerClear() {
    setTowersorBuildingName("");
    setSelectedTower("");
  }
  function locationClear() {
    setCity("");
    setCountry("");
    setState("");
    setLata("");
    setLon("");
    setFormatted_address("");
  }

  const handelPropertyCategory = (value) => {
    setPropertyCategory(propertyCategoryName === value ? "" : value);
  };
  const handelPropertyType = (value) => {
    setPropertyType(propertyTypeName === value ? "" : value);
  };
  const handelParking = (value) => {
    setParking(parking === value ? "" : value);
  };
  const handelPostType = (value) => {
    setPostType(postType === value ? "" : value);
  };

  useEffect(() => {
    if (pathname === "/user/newsfeed" || pathname === "/user") {
      const newsfeedFilterValue = localStorage.getItem("newsfeedFilterValue");
      setFilterCount(
        newsfeedFilterValue
          ? JSON.parse(newsfeedFilterValue).filterCounteNumber
          : 0
      );
    } else if (pathname === "/user/agent-posts") {
      const agentPostFilterValue = localStorage.getItem("agentPostFilterValue");
      setFilterCount(
        agentPostFilterValue
          ? JSON.parse(agentPostFilterValue).filterCounteNumber
          : 0
      );
    } else if ("/user/buyer-posts") {
      const buyerPostFilterValue = localStorage.getItem("buyerPostFilterValue");
      setFilterCount(
        buyerPostFilterValue
          ? JSON.parse(buyerPostFilterValue).filterCounteNumber
          : 0
      );
    }
  }, [
    pathname,
    filterRenderAgentPost,
    filterRenderBuyerPost,
    filterRenderAllPost,
  ]);

  return (
    <div className="backdrop-blur-[20px] bg-[#ffffff80] bg-opacity-90 shadow rounded-md w-96 h-auto pt-4 relative">
      {filterMapOpen === false ? (
        <div>
          <button
            type="button"
            onClick={() => setFilterVisible(!filterVisible)}
            className="absolute top-1 right-1"
          >
            <XCircleIcon className="w-6 h-6 text-[red]" />
          </button>
          <form
            onSubmit={handleResultButtonClick}
            className="!text-[#000000] overflow-y-scroll h-[70vh]"
          >
            {/* single select */}
            <div className="px-4 border-b-[1px] pb-4">
              <p className="text-[14px] font-bold leading-3 m-0 mb-3">Type</p>
              <div className="flex justify-start items-center gap-2">
                <button
                  type="button"
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
                  type="button"
                  className={`text-[12px] inline-flex px-2 rounded-lg border-[1px] ${
                    selectedType === "Available"
                      ? "border-[#7e7aff] bg-[#7e7aff4b]"
                      : "border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b]"
                  }`}
                  onClick={() => handleTypeSelect("Available")}
                >
                  <span>Available</span>
                </button>
                {selectedType !== "" && (
                  <>
                    <div className="">
                      <IoIosArrowRoundForward className="w-4 h-4" />
                    </div>
                    {/* single select */}
                    <button
                      type="button"
                      onClick={() => handelPostFor("Sell")}
                      className={`text-[12px] inline-flex px-2 rounded-lg border-[1px] ${
                        forPost === "Sell"
                          ? "border-[#7e7aff] bg-[#7e7aff4b]"
                          : "border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b]"
                      }`}
                    >
                      <span>Sell</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handelPostFor("Rent")}
                      className={`text-[12px] inline-flex px-2 rounded-lg border-[1px] ${
                        forPost === "Rent"
                          ? "border-[#7e7aff] bg-[#7e7aff4b]"
                          : "border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b]"
                      }`}
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
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select Location from map"
                      value={formatted_address}
                      onClick={open}
                      className="border-[1px] rounded-md h-[40px] w-full placeholder:text-[12px] px-2 outline-[#7e7aff]"
                    />
                    {city === "" ? null : (
                      <button
                        type="button"
                        onClick={locationClear}
                        className="absolute top-[13px] right-1 flax items-center"
                      >
                        <XCircleIcon className="w-[15px] h-[15px] text-[red]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* Towers or Building Name */}
              <div className="">
                <p className="text-[14px] font-bold leading-3 m-0 mb-3">
                  Towers or Building
                </p>
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Towers or Building Name"
                      onChange={handleInputTowerChange}
                      onClick={() => setShowSuggestions(true)}
                      value={towersorBuildingName}
                      className="border-[1px] rounded-md h-[40px] w-full placeholder:text-[12px] px-2 outline-[#7e7aff]"
                    />
                    {towersorBuildingName === "" ? null : (
                      <button
                        type="button"
                        onClick={towerClear}
                        className="absolute top-[13px] right-1 flax items-center"
                      >
                        <XCircleIcon className="w-[15px] h-[15px] text-[red]" />
                      </button>
                    )}
                  </div>
                  {showSuggestions && (
                    <div
                      onMouseLeave={() => setShowSuggestions(false)}
                      ref={containerRefTowerResult}
                      onScroll={handleScroll}
                      className="font-noto absolute top-full bg-white border shadow-lg max-w-[350px] pb-[11px] rounded-b-[10px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[180px] overflow-auto"
                    >
                      <div>
                        {filteredSuggestions?.length > 0 &&
                          filteredSuggestions.map((tower, i) => (
                            <p
                              key={i}
                              onClick={() => handleTowerChange(tower)}
                              className="font-noto font-normal cursor-pointer text-[#95004A] text-[14px] leading-[36px] w-[360px] h-[30px] hover:bg-[#EBEBEB] flex items-center pt-[1px] pl-[20px] mb-[3px] left-0 right-0"
                            >
                              {tower.name}
                            </p>
                          ))}
                        {isFetching === false &&
                          filteredSuggestions.length === 0 && (
                            <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                              No tower found
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
              </div>
            </div>

            {/* Property category multiple select */}
            <div className="px-4 border-b-[1px] py-4">
              <p className="text-[14px] font-bold leading-3 m-0 mb-3">
                Property Category
              </p>
              <div className="grid grid-cols-2 items-start gap-2">
                {categories?.map((category, i) => (
                  <div
                    key={i}
                    className="text-[12px] flex justify-start items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={propertyCategoryName === category?.name}
                      onChange={() => handelPropertyCategory(category.name)}
                      className="w-4 h-4 outline-none"
                    />
                    <span className="leading-none">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property type multiple select */}
            <div className="px-4 border-b-[1px] py-4">
              <p className="text-[14px] font-bold leading-3 m-0 mb-3">
                Property type
              </p>
              <div className="">
                {types.map((type, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handelPropertyType(type?.name)}
                    className={`text-[12px] inline-flex px-2 rounded-lg border-[1px] ${
                      propertyTypeName === type?.name
                        ? "border-[#7e7aff] bg-[#7e7aff60]"
                        : "border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b]"
                    } mr-2 mb-2`}
                  >
                    <span>{type?.name}</span>
                  </button>
                ))}
              </div>
            </div>
            {/*Parking multiple select */}
            <div className="px-4 border-b-[1px] py-4">
              <p className="text-[14px] font-bold leading-3 m-0 mb-3">
                Parking
              </p>
              <div className="grid grid-cols-1 items-start gap-2">
                <div className="text-[12px] flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    checked={parking === "With Parking"}
                    onChange={() => handelParking("With Parking")}
                    className="w-4 h-4 outline-none"
                  />
                  <span className="leading-none">With Parking</span>
                </div>
                <div className="text-[12px] flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    checked={parking === "No Parking"}
                    onChange={() => handelParking("No Parking")}
                    className="w-4 h-4 outline-none"
                  />
                  <span className="leading-none">No Parking</span>
                </div>
              </div>
            </div>
            {/*Sale type (multiple Selector) */}
            <div className="px-4 border-b-[1px] py-4">
              <p className="text-[14px] font-bold leading-3 m-0 mb-3">
                Sale type{" "}
                <span className="text-[12px] font-normal">
                  (multiple Selector)
                </span>
              </p>
              <div className="">
                {sellTypesList.map((sell, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSellTypeClick(sell?.name)}
                    className={`text-[12px] inline-flex px-2 rounded-lg border-[1px] ${
                      sellType.includes(sell?.name)
                        ? "border-[#7e7aff] bg-[#7e7aff60]"
                        : "border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b]"
                    } mr-2 mb-2`}
                  >
                    <span>{sell?.name}</span>
                  </button>
                ))}
              </div>
            </div>
            {/*post type multiple select */}
            <div className="px-4 py-4 ">
              <p className="text-[14px] font-bold leading-3 m-0 mb-3">
                Post Type
              </p>
              <div className="grid grid-cols-1 items-start gap-2">
                <div className="text-[12px] flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 outline-none"
                    checked={postType === "Normal"}
                    onChange={() => handelPostType("Normal")}
                  />
                  <span className="leading-none">Normal</span>
                </div>
                <div className="text-[12px] flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 outline-none"
                    checked={postType === "Urgent"}
                    onChange={() => handelPostType("Urgent")}
                  />
                  <span className="leading-none">Urgent</span>
                </div>
                <div className="text-[12px] flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 outline-none"
                    checked={postType === "Sponsored"}
                    onChange={() => handelPostType("Sponsored")}
                  />
                  <span className="leading-none">Sponsored</span>
                </div>
              </div>
            </div>
            {/*Tags (multiple Selector) */}
            <div className="px-4 border-b-[1px] py-4">
              <p className="text-[14px] font-bold leading-3 m-0 mb-3">
                Tags{" "}
                <span className="text-[12px] font-normal">
                  (multiple Selector)
                </span>
              </p>
              <div className="">
                {tagsList.map((tag, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleTagClick(tag?.name)}
                    className={`text-[12px] inline-flex px-2 rounded-lg border-[1px] ${
                      tags?.includes(tag?.name)
                        ? "border-[#7e7aff] bg-[#7e7aff60]"
                        : "border-[#afadfa9c] bg-[#7e7aff2a] hover:bg-[#7e7aff4b]"
                    } mr-2 mb-2`}
                  >
                    <span>{tag?.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <footer className="flex justify-between gap-3 sticky bottom-0 p-2 bg-white shadow rounded-b-md">
              <button
                type="button"
                className="w-[40%] py-[5px] border-[1px] border-[#615DFA] text-[#615DFA] rounded"
                onClick={handleSaveClear}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleResultButtonClick}
                className="w-full py-[5px] bg-[#615DFA] text-white rounded"
              >
                Show Results
              </button>
            </footer>
          </form>
        </div>
      ) : (
        <FilterMap
          open={open}
          filterMapOpen={filterMapOpen}
          setFilterMapOpen={setFilterMapOpen}
          lata={lata}
          setLata={setLata}
          lon={lon}
          setLon={setLon}
          formatted_address={formatted_address}
          setFormatted_address={setFormatted_address}
          country={country}
          setCountry={setCountry}
          state={state}
          setState={setState}
          city={city}
          setCity={setCity}
          setFilterCount={setFilterCount}
          filterCount={filterCount}
        />
      )}
    </div>
  );
};

export default Filter;
